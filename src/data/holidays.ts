import type { HolidayEntry } from '../types';

export const HOLIDAYS_COLOMBIA: Record<number, HolidayEntry[]> = {
  2025: [
    { date: '2025-01-01', name: 'Año Nuevo' },
    { date: '2025-01-06', name: 'Reyes Magos' },
    { date: '2025-03-24', name: 'San José' },
    { date: '2025-04-17', name: 'Jueves Santo' },
    { date: '2025-04-18', name: 'Viernes Santo' },
    { date: '2025-05-01', name: 'Día del Trabajo' },
    { date: '2025-06-02', name: 'Ascensión del Señor' },
    { date: '2025-06-23', name: 'Corpus Christi' },
    { date: '2025-06-30', name: 'Sagrado Corazón' },
    { date: '2025-07-07', name: 'San Pedro y San Pablo' },
    { date: '2025-07-20', name: 'Día de la Independencia' },
    { date: '2025-08-07', name: 'Batalla de Boyacá' },
    { date: '2025-08-18', name: 'Asunción de la Virgen' },
    { date: '2025-10-13', name: 'Día de la Raza' },
    { date: '2025-11-03', name: 'Todos los Santos' },
    { date: '2025-11-17', name: 'Independencia de Cartagena' },
    { date: '2025-12-08', name: 'Inmaculada Concepción' },
    { date: '2025-12-25', name: 'Navidad' }
  ],
  2026: [
    { date: '2026-01-01', name: 'Año Nuevo' },
    { date: '2026-01-12', name: 'Reyes Magos' },
    { date: '2026-03-16', name: 'San José' },
    { date: '2026-04-02', name: 'Jueves Santo' },
    { date: '2026-04-03', name: 'Viernes Santo' },
    { date: '2026-05-01', name: 'Día del Trabajo' },
    { date: '2026-05-18', name: 'Ascensión del Señor' },
    { date: '2026-06-08', name: 'Corpus Christi' },
    { date: '2026-06-15', name: 'Sagrado Corazón' },
    { date: '2026-06-29', name: 'San Pedro y San Pablo' },
    { date: '2026-07-20', name: 'Día de la Independencia' },
    { date: '2026-08-07', name: 'Batalla de Boyacá' },
    { date: '2026-08-17', name: 'Asunción de la Virgen' },
    { date: '2026-10-12', name: 'Día de la Raza' },
    { date: '2026-11-02', name: 'Todos los Santos' },
    { date: '2026-11-16', name: 'Independencia de Cartagena' },
    { date: '2026-12-08', name: 'Inmaculada Concepción' },
    { date: '2026-12-25', name: 'Navidad' }
  ],
  2027: [
    { date: '2027-01-01', name: 'Año Nuevo' },
    { date: '2027-01-11', name: 'Reyes Magos' },
    { date: '2027-03-22', name: 'San José' },
    { date: '2027-04-01', name: 'Jueves Santo' },
    { date: '2027-04-02', name: 'Viernes Santo' },
    { date: '2027-05-01', name: 'Día del Trabajo' },
    { date: '2027-05-10', name: 'Ascensión del Señor' },
    { date: '2027-05-31', name: 'Corpus Christi' },
    { date: '2027-06-07', name: 'Sagrado Corazón' },
    { date: '2027-07-05', name: 'San Pedro y San Pablo' },
    { date: '2027-07-20', name: 'Día de la Independencia' },
    { date: '2027-08-07', name: 'Batalla de Boyacá' },
    { date: '2027-08-16', name: 'Asunción de la Virgen' },
    { date: '2027-10-11', name: 'Día de la Raza' },
    { date: '2027-11-01', name: 'Todos los Santos' },
    { date: '2027-11-15', name: 'Independencia de Cartagena' },
    { date: '2027-12-08', name: 'Inmaculada Concepción' },
    { date: '2027-12-25', name: 'Navidad' }
  ]
};

export function getHoliday(date: string): HolidayEntry | undefined {
  const year = Number(date.slice(0, 4));
  const list = HOLIDAYS_COLOMBIA[year] ?? [];
  return list.find(h => h.date === date);
}

export function isHoliday(date: string): boolean {
  return Boolean(getHoliday(date));
}
