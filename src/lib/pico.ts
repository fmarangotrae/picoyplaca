import type {
  CityConfig,
  RotationPeriod,
  TimeWindow,
  VehicleKind,
  WeekdayDigitMap,
  WeekdayNum
} from '../types';
import { CITIES, CITIES_BY_SLUG } from '../data/cities';
import { isHoliday } from '../data/holidays';

export function parseDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1, 0, 0, 0, 0);
}

export function formatDateISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function getWeekdayNumber(d: Date): WeekdayNum {
  const n = d.getDay();
  // JS getDay: 0=domingo..6=sábado. Lo mantenemos igual; la rotación usa
  // 1=lunes .. 5=viernes (WeekdayNum=0..6)
  return n as WeekdayNum;
}

export function isWeekend(d: Date): boolean {
  const wd = d.getDay();
  return wd === 0 || wd === 6;
}

export function numberInAnyList(n: number, lists: Array<number[] | undefined>): boolean {
  for (const list of lists) if (list?.includes(n)) return true;
  return false;
}

/**
 * Regla Pico y Placa par-impar por día calendario (Bogotá).
 * Convención del proyecto, documentada en src/data/cities.ts como
 * `customRestrictions.parImparRule = 'odd-day-1-5-odd-digits'`:
 * - Día IMPAR del mes → restringidos dígitos impares (1,3,5,7,9).
 * - Día PAR del mes   → restringidos dígitos pares (0,2,4,6,8).
 * (ADVERTENCIA externa, no verificable desde este repo: varios decretos de
 * movilidad describen la regla al revés — "día par, placa par no circula".
 * Si se confirma cambio normativo, basta invertir las listas aquí; los tests
 * T3.1 lo protegen.)
 */
export function parImparDigits(dayOfMonth: number): { mode: 'odd' | 'even'; digits: number[] } {
  if (dayOfMonth % 2 === 1) return { mode: 'odd', digits: [1, 3, 5, 7, 9] };
  return { mode: 'even', digits: [0, 2, 4, 6, 8] };
}

export function normalizeShift(shift: number, filterLength: number): number {
  if (filterLength === 0) return 0;
  const mod = ((shift % filterLength) + filterLength) % filterLength;
  return mod;
}

/**
 * applyWeekdayShift: traslada las asignaciones de dígitos N días.
 * Concepto del usuario: "lo que había lunes ahora pasa martes" → shiftOffset=+1.
 * Se implementa mediante rotación: result[weekdayN] = base[weekdayN - shiftOffset].
 */
export function applyWeekdayShift(
  base: WeekdayDigitMap,
  shiftOffset: number,
  weekdayFilter: WeekdayNum[]
): WeekdayDigitMap {
  const len = weekdayFilter.length;
  const safeShift = normalizeShift(shiftOffset, len);
  const sorted = [...weekdayFilter].sort((a, b) => a - b);
  const out: WeekdayDigitMap = {};
  for (let i = 0; i < len; i++) {
    const current = sorted[i];
    const prevIdx = (i - safeShift + len) % len;
    const prev = sorted[prevIdx];
    out[current] = base[prev] ?? [];
  }
  return out;
}

export function getRestrictedDigitsWeekdayShift(input: {
  base: WeekdayDigitMap;
  shiftOffset: number;
  weekdayFilter: WeekdayNum[];
  queryWeekday: WeekdayNum;
}): number[] {
  const { base, shiftOffset, weekdayFilter, queryWeekday } = input;
  if (!weekdayFilter.includes(queryWeekday)) return [];
  const shifted = applyWeekdayShift(base, shiftOffset, weekdayFilter);
  return shifted[queryWeekday] ?? [];
}

export function getActiveRotationForKind(
  cityOrSlug: string | CityConfig,
  kind: VehicleKind,
  dateISO: string
): RotationPeriod & { _source: 'match' | 'last-known' | 'none'; globalShiftApplied: boolean } {
  const city: CityConfig =
    typeof cityOrSlug === 'string' ? CITIES_BY_SLUG[cityOrSlug]! : cityOrSlug;
  const rotations = (city.rotations || []).filter(r => r.appliesToKinds.includes(kind));
  let match: RotationPeriod | undefined = rotations.find(
    r => dateISO >= r.startDate && dateISO <= r.endDate
  );
  let source: 'match' | 'last-known' | 'none' = 'match';
  if (!match) {
    // Si la fecha es ANTES del primer período conocido → devolvemos el primero
    // Si es DESPUÉS → devolvemos el último (extrapolamos)
    const sorted = [...rotations].sort((a, b) => a.startDate.localeCompare(b.startDate));
    if (sorted.length === 0) {
      return {
        id: `fallback-none-${city.slug}-${kind}`,
        label: 'Sin restricción para este tipo',
        startDate: '1970-01-01',
        endDate: '2999-12-31',
        baseWeekdayDigits: {},
        shiftOffset: 0,
        weekdayFilter: [],
        appliesToKinds: [kind],
        _source: 'none',
        globalShiftApplied: false
      };
    }
    if (dateISO < sorted[0].startDate) {
      match = sorted[0];
      source = 'last-known';
    } else {
      match = sorted[sorted.length - 1];
      source = 'last-known';
    }
  }
  return { ...match, _source: source, globalShiftApplied: false };
}

export function timeToMinutes(t: string): number {
  const [hh, mm] = t.split(':').map(Number);
  return (hh ?? 0) * 60 + (mm ?? 0);
}

export function isTimeWithinWindows(time24: string, windows: TimeWindow[]): boolean {
  if (!windows || windows.length === 0) return true;
  const t = timeToMinutes(time24);
  for (const w of windows) {
    const s = timeToMinutes(w.start);
    const e = timeToMinutes(w.end);
    if (t >= s && t <= e) return true;
  }
  return false;
}

export function extractDigit(plate: string, source: 'last-digit' | 'first-digit'): number {
  const digits = (plate || '').replace(/[^0-9]/g, '');
  if (!digits) return -1;
  if (source === 'first-digit') return Number(digits.charAt(0));
  return Number(digits.charAt(digits.length - 1));
}

export function plateDigits(plate: string): number[] {
  return Array.from((plate || '').replace(/[^0-9]/g, '')).map(Number);
}

export function getAllCities(): CityConfig[] {
  return CITIES;
}

export function getCityBySlug(slug: string): CityConfig | undefined {
  return CITIES_BY_SLUG[slug];
}

export function restrictionModeForKind(city: CityConfig, kind: VehicleKind) {
  return city.modes.perKind?.[kind] ?? city.modes.default;
}

export function timeWindowsForKind(city: CityConfig, kind: VehicleKind): TimeWindow[] {
  const kindSpecific = city.timeWindows.perKind?.[kind];
  if (kindSpecific) return kindSpecific;
  return city.timeWindows.default ?? [];
}

export interface DailyRestriction {
  city: CityConfig;
  dateISO: string;
  weekday: WeekdayNum;
  dayOfMonth: number;
  isHoliday: boolean;
  isWeekend: boolean;
  perVehicle: Record<VehicleKind, VehicleRestrictionEntry>;
  warnings: string[];
}

export interface VehicleRestrictionEntry {
  mode: 'par-impar' | 'digits-per-weekday' | 'holidays-only' | 'none';
  exempt: boolean;
  canCirculateFullDay: boolean;
  restrictedDigits?: number[];
  restrictedParImpar?: 'odd' | 'even';
  timeWindows: TimeWindow[];
  activeRotationId?: string;
  shiftOffset: number;
  note?: string;
  parImparDigitsRestricted?: number[];
  digitsPerWeekdayRestricted?: number[];
}

const EMPTY_DIGIT_RESULT = -1;

export function getDailyRestriction(city: CityConfig, dateISO: string): DailyRestriction {
  const d = parseDate(dateISO);
  const weekday = getWeekdayNumber(d) as WeekdayNum;
  const dayOfMonth = d.getDate();
  const holiday = isHoliday(dateISO);
  const weekend = isWeekend(d);
  const warnings: string[] = [];
  if (holiday) warnings.push('Festivo nacional: sin restricción según la mayoría de decretos.');
  // Nota: antes había una condición muerta (`!city.weekendExempt === false`) sin efecto.
  // La exención de fin de semana se aplica por tipo de vehículo más abajo usando
  // `city.weekendExempt`; si una ciudad NO es exenta en fin de semana, lo avisamos.
  if (weekend && !city.weekendExempt) {
    warnings.push('Fin de semana con restricción aplicada en esta ciudad.');
  }
  const kinds: VehicleKind[] = [
    'carro',
    'moto',
    'taxi',
    'carga',
    'publico',
    'escolar',
    'emergencia',
    'electricos'
  ] as const;
  const perVehicle = {} as DailyRestriction['perVehicle'];
  for (const kind of kinds) {
    const exempt =
      city.exemptions.includes(kind) ||
      (city.holidayExempt && holiday) ||
      (city.weekendExempt && weekend) ||
      restrictionModeForKind(city, kind) === 'none';
    const mode = restrictionModeForKind(city, kind);
    const timeWindows = timeWindowsForKind(city, kind);
    const rotation = getActiveRotationForKind(city, kind, dateISO);
    const shiftOffset = rotation.shiftOffset ?? 0;
    const entry: VehicleRestrictionEntry = {
      mode,
      exempt,
      canCirculateFullDay: exempt,
      timeWindows,
      activeRotationId: rotation.id,
      shiftOffset,
      note: rotation._source === 'last-known'
        ? 'No hay rotación oficial para esta fecha, se extrapola la última conocida.'
        : undefined
    };
    if (rotation._source === 'last-known') warnings.push(entry.note!);
    if (!exempt) {
      if (mode === 'par-impar') {
        const p = parImparDigits(dayOfMonth);
        entry.restrictedParImpar = p.mode;
        entry.parImparDigitsRestricted = p.digits;
        entry.restrictedDigits = p.digits;
      } else if (mode === 'digits-per-weekday') {
        const list = getRestrictedDigitsWeekdayShift({
          base: rotation.baseWeekdayDigits,
          shiftOffset,
          weekdayFilter: rotation.weekdayFilter as WeekdayNum[],
          queryWeekday: weekday
        });
        entry.digitsPerWeekdayRestricted = list;
        entry.restrictedDigits = list;
      }
      // canCirculateFullDay = mode === 'none' ya está exento; sino falso hasta que sepamos dígitos
      entry.canCirculateFullDay = mode === 'none' || mode === 'holidays-only';
    } else {
      entry.canCirculateFullDay = true;
    }
    if (entry.restrictedDigits && entry.restrictedDigits.length === 0 && !exempt && mode === 'digits-per-weekday') {
      // Día fuera de weekdayFilter → libre (ej: fin de semana no exento pero no filtrado)
      entry.canCirculateFullDay = true;
    }
    void EMPTY_DIGIT_RESULT;
    perVehicle[kind] = entry;
  }
  return { city, dateISO, weekday, dayOfMonth, isHoliday: holiday, isWeekend: weekend, perVehicle, warnings };
}

export interface PlateCheckResultSummary {
  plate: string;
  kind: VehicleKind;
  digit: number;
  time24: string;
  digitSource: 'last-digit' | 'first-digit';
  canCirculateNow: boolean;
  canCirculateFullDay: boolean;
  restrictedDigitMatch: boolean;
  restrictedTimeMatch: boolean;
  exemption: boolean;
  timeWindows: TimeWindow[];
  fineAmount: string;
  fineUvb: number;
  recommendations: string[];
}

export function checkPlate(input: {
  city: CityConfig;
  dateISO: string;
  plate: string;
  kind: VehicleKind;
  time24: string;
  globalShiftOffsetOverride?: number;
}): PlateCheckResultSummary {
  const { city, dateISO, plate, kind, time24, globalShiftOffsetOverride } = input;
  const daily = getDailyRestriction(city, dateISO);
  const ent = daily.perVehicle[kind];
  const digitSource = city.digitSources[kind] ?? 'last-digit';
  const digit = extractDigit(plate, digitSource);
  const restrictedDigitMatch =
    !ent.exempt &&
    ent.restrictedDigits &&
    ent.restrictedDigits.length > 0 &&
    digit >= 0 &&
    ent.restrictedDigits.includes(digit);
  const exemption = ent.exempt;
  // Corrección de lógica (errores confirmados en la versión anterior):
  // 1) Inconsistencia: `restrictedTimeMatch` usaba `!isTimeWithinWindows(...)` pero
  //    `canCirculateNow` usaba `|| isTimeWithinWindows(...)`, interpretando la misma
  //    llamada con sentidos opuestos.
  // 2) Falso negativo: la fórmula anterior marcaba "NO puedes circular" a placas con
  //    dígito NO restringido dentro del horario de restricción (p. ej. Bogotá, día
  //    impar, placa terminada en 2 a las 07:00 → debería poder circular).
  // 3) Falso positivo: permitía circular a dígitos coincidentes DENTRO de la ventana
  //    de restricción (solo porque la hora caía "dentro"), cuando lo correcto es que
  //    la ventana define el horario PROHIBIDO para los dígitos coincidentes.
  // Convención corregida: timeWindows = horarios DE RESTRICCIÓN (Bogotá 06:00-21:00).
  const insideRestrictedHours = isTimeWithinWindows(time24, ent.timeWindows);
  const restrictedDigitMatchSafe = Boolean(restrictedDigitMatch);
  // Coincide el dígito y la hora cae dentro del horario de restricción → infracción.
  const restrictedTimeMatch = restrictedDigitMatchSafe && insideRestrictedHours;
  const canCirculateNow = exemption || !restrictedTimeMatch;
  // Puede circular todo el día si es exento o su dígito no está restringido hoy.
  const canCirculateFullDay = exemption || !restrictedDigitMatchSafe;
  const fineAmount = '$633.111 COP (52,29 UVB 2026)';
  const fineUvb = 52.29;
  const recommendations: string[] = [];
  if (exemption) recommendations.push('✅ Tu vehículo es exento permanentemente.');
  else if (canCirculateNow) recommendations.push('✅ Puedes circular en este momento.');
  else {
    recommendations.push('⛔ No circules en este momento.');
    if (restrictedDigitMatch) recommendations.push('⚠️ Tu dígito coincide con la restricción.');
    if (restrictedTimeMatch) recommendations.push('⏱️ Fuera de los horarios permitidos.');
    recommendations.push(`💵 Multa estimada: ${fineAmount}.`);
  }
  void globalShiftOffsetOverride; // Future: global override
  return {
    plate,
    kind,
    digit,
    time24,
    digitSource,
    canCirculateNow,
    canCirculateFullDay,
    restrictedDigitMatch,
    restrictedTimeMatch,
    exemption,
    timeWindows: ent.timeWindows,
    fineAmount,
    fineUvb,
    recommendations
  };
}
