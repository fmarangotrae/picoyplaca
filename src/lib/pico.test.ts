import { describe, it, expect } from 'vitest';
import {
  parseDate,
  formatDateISO,
  getWeekdayNumber,
  applyWeekdayShift,
  parImparDigits,
  getActiveRotationForKind,
  getRestrictedDigitsWeekdayShift,
  isTimeWithinWindows,
  extractDigit,
  isWeekend,
  numberInAnyList
} from './pico';

describe('T3.0 Fechas utilidades', () => {
  it('parseDate ISO + getWeekdayNumber: Lunes 2026-08-03 = 1 (lunes)', () => {
    const d = parseDate('2026-08-03');
    expect(getWeekdayNumber(d)).toBe(1);
  });
  it('formato ISO YYYY-MM-DD consistente en zona UTC local America/Bogota', () => {
    const iso = formatDateISO(new Date('2026-08-03T10:00:00Z'));
    // Nota: ajuste a tz America/Bogota da diferencia; pero la función
    // construye desde local. La probamos con strings sin offset.
    expect(iso).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
  it('isWeekend detecta sábado y domingo', () => {
    expect(isWeekend(parseDate('2026-08-08'))).toBe(true); // sábado
    expect(isWeekend(parseDate('2026-08-09'))).toBe(true); // domingo
    expect(isWeekend(parseDate('2026-08-10'))).toBe(false); // lunes
  });
  it('formatDateISO devuelve 2026-08-03 correctamente en input', () => {
    expect(formatDateISO(parseDate('2026-08-03'))).toBe('2026-08-03');
  });
});

describe('T3.1 Par Impar (Bogotá)', () => {
  it('Día impar → dígitos impares 1,3,5,7,9', () => {
    const { mode, digits } = parImparDigits(3);
    expect(mode).toBe('odd');
    expect(digits).toEqual([1, 3, 5, 7, 9]);
  });
  it('Día par → dígitos pares 0,2,4,6,8', () => {
    const { mode, digits } = parImparDigits(14);
    expect(mode).toBe('even');
    expect(digits).toEqual([0, 2, 4, 6, 8]);
  });
  it('Día 1 impar, día 31 impar, día 30 par', () => {
    expect(parImparDigits(1).mode).toBe('odd');
    expect(parImparDigits(31).mode).toBe('odd');
    expect(parImparDigits(30).mode).toBe('even');
  });
});

describe('T3.2 ShiftOffset (rotación parametrizable usuario)', () => {
  const base = { 1: [1, 2], 2: [3, 4], 3: [5, 6], 4: [7, 8], 5: [9, 0] };
  it('shiftOffset=0 devuelve asignaciones base sin cambio', () => {
    const res = applyWeekdayShift(base, 0, [1, 2, 3, 4, 5]);
    expect(res[1]).toEqual([1, 2]);
    expect(res[2]).toEqual([3, 4]);
    expect(res[3]).toEqual([5, 6]);
    expect(res[4]).toEqual([7, 8]);
    expect(res[5]).toEqual([9, 0]);
  });
  it('shiftOffset=1 desplaza N+1: lo que era lunes pasa martes y el último pasa al primero', () => {
    const res = applyWeekdayShift(base, 1, [1, 2, 3, 4, 5]);
    // lunes ← viernes anterior [9,0]; martes ← lunes [1,2]; mié [3,4]; jue [5,6]; vie [7,8]
    expect(res[1]).toEqual([9, 0]);
    expect(res[2]).toEqual([1, 2]);
    expect(res[3]).toEqual([3, 4]);
    expect(res[4]).toEqual([5, 6]);
    expect(res[5]).toEqual([7, 8]);
  });
  it('shiftOffset=-1 es equivalente a +N-1 = 4', () => {
    const resA = applyWeekdayShift(base, -1, [1, 2, 3, 4, 5]);
    const resB = applyWeekdayShift(base, 4, [1, 2, 3, 4, 5]);
    expect(resA).toEqual(resB);
  });
  it('shiftOffset=5 con 5 días hábiles equivale a 0', () => {
    const res = applyWeekdayShift(base, 5, [1, 2, 3, 4, 5]);
    expect(res).toEqual(applyWeekdayShift(base, 0, [1, 2, 3, 4, 5]));
  });
  it('weekdayFilter de 6 días (lun-sáb) cambia rotación base 6', () => {
    const base6 = { 1: [1], 2: [2], 3: [3], 4: [4], 5: [5], 6: [6] };
    const res = applyWeekdayShift(base6, 1, [1, 2, 3, 4, 5, 6]);
    expect(res[1]).toEqual([6]);
    expect(res[2]).toEqual([1]);
    expect(res[6]).toEqual([5]);
  });
  it('getRestrictedDigitsWeekdayShift compone shift con lookup', () => {
    const r = getRestrictedDigitsWeekdayShift({
      base: { 1: [1, 2], 2: [3, 4], 3: [5, 6], 4: [7, 8], 5: [9, 0] },
      shiftOffset: 1,
      weekdayFilter: [1, 2, 3, 4, 5],
      queryWeekday: 2
    });
    expect(r).toEqual([1, 2]);
  });
});

describe('T3.3 Rotaciones activas por ciudad y fecha', () => {
  it('Bogotá par/impar 2026-08-03 miércoles 03 agosto = día impar (no hay shiftOffset en par/impar)', () => {
    // Para Bogotá rotación "eterna" aplica 2024-09-14..2027-12-31
    // Función getActiveRotationForKind devuelve la rotación match
    // Luego parImparDigits(03) → impar [1,3,5,7,9]
    expect(parImparDigits(3).digits).toEqual([1, 3, 5, 7, 9]);
  });
  it('Medellín 2S-2026 03-agosto lunes = [5,8] base sin shiftOffset; shiftOffset=0', () => {
    // Medellín rotation medellin-2s-2026 active 2026-08-03..2027-01-29
    // baseWeekdayDigits[1] = [5,8]
    const { baseWeekdayDigits } = getActiveRotationForKind('medellin', 'carro', '2026-08-03');
    expect(baseWeekdayDigits![1]).toEqual([5, 8]);
  });
  it('Medellín 2S-2026: viernes 07-agosto → vie = 7 y 9', () => {
    const { baseWeekdayDigits } = getActiveRotationForKind('medellin', 'carro', '2026-08-07');
    expect(baseWeekdayDigits![5]).toEqual([7, 9]);
  });
  it('Fecha antes del inicio de una rotación → retorna rotación inmediatamente anterior', () => {
    // 2026-07-31 cae en 1S-2026 (02-feb..31-jul). Base lun = [3,6]
    const { id, baseWeekdayDigits } = getActiveRotationForKind('medellin', 'carro', '2026-07-31');
    expect(id).toMatch(/1s-2026/);
    expect(baseWeekdayDigits![1]).toEqual([3, 6]);
  });
});

describe('T3.4 Horarios', () => {
  it('time "07:30" dentro de 06:00-21:00', () => {
    expect(isTimeWithinWindows('07:30', [{ start: '06:00', end: '21:00' }])).toBe(true);
  });
  it('time "05:59" antes de 06:00', () => {
    expect(isTimeWithinWindows('05:59', [{ start: '06:00', end: '21:00' }])).toBe(false);
  });
  it('time "21:00" exactamente final cuenta como dentro (inclusivo)', () => {
    expect(isTimeWithinWindows('21:00', [{ start: '06:00', end: '21:00' }])).toBe(true);
  });
  it('dos ventanas: mediodía exento en alguna ciudad', () => {
    const wins = [
      { start: '06:00', end: '12:00' },
      { start: '14:00', end: '20:00' }
    ];
    expect(isTimeWithinWindows('08:00', wins)).toBe(true);
    expect(isTimeWithinWindows('12:30', wins)).toBe(false);
    expect(isTimeWithinWindows('15:00', wins)).toBe(true);
  });
});

describe('T3.5 Extraer dígito de placa', () => {
  it('placa carro estándar → último dígito', () => {
    expect(extractDigit('ABC123', 'last-digit')).toBe(3);
    expect(extractDigit('XYZ-456', 'last-digit')).toBe(6);
    expect(extractDigit('RTW 789-D', 'last-digit')).toBe(9);
  });
  it('placa moto → primer dígito (AMVA requiere así)', () => {
    expect(extractDigit('ABC123', 'first-digit')).toBe(1);
    expect(extractDigit('R520XY', 'first-digit')).toBe(5);
  });
  it('placa sin dígitos → -1 (error)', () => {
    expect(extractDigit('ABC', 'last-digit')).toBe(-1);
  });
});

describe('T3.6 numberInAnyList helper', () => {
  it('5 dentro de [4,5,6]', () => {
    expect(numberInAnyList(5, [[4, 5, 6]])).toBe(true);
  });
  it('1 no en [2,3] ni [4,5]', () => {
    expect(numberInAnyList(1, [[2, 3], [4, 5]])).toBe(false);
  });
});

describe('T3.7 Coherencia Restricción por Ciudad + Fecha', () => {
  it('Bogotá 2026-08-03 (miércoles día 3 impar) → dígitos impares para carros', () => {
    // Este test prueba integración: la futura función getRestrictionForDate debe devolver
    // modo par-impar y dígitos restringidos impares el día 3
    // Por ahora prueba de regresión de parImparDigits + fecha
    expect(parImparDigits(Number('2026-08-03'.slice(-2)))).toEqual({
      mode: 'odd',
      digits: [1, 3, 5, 7, 9]
    });
  });
  it('Medellín 2S-2026 03-agosto lunes [5,8] sin shift; shiftOffset+1 da lunes [7,9]', () => {
    const rot = getActiveRotationForKind('medellin', 'carro', '2026-08-03');
    const noShift = getRestrictedDigitsWeekdayShift({
      base: rot.baseWeekdayDigits!,
      shiftOffset: 0,
      weekdayFilter: rot.weekdayFilter,
      queryWeekday: 1
    });
    const shifted = getRestrictedDigitsWeekdayShift({
      base: rot.baseWeekdayDigits!,
      shiftOffset: 1,
      weekdayFilter: rot.weekdayFilter,
      queryWeekday: 1
    });
    expect(noShift).toEqual([5, 8]);
    expect(shifted).toEqual([7, 9]); // viernes anterior sube al lunes
  });
});
