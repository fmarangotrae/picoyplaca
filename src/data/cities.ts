import type { CityConfig, VehicleKind, WeekdayDigitMap } from '../types';

function wdMap(
  lun: number[],
  mar: number[],
  mie: number[],
  jue: number[],
  vie: number[]
): WeekdayDigitMap {
  return { 1: lun, 2: mar, 3: mie, 4: jue, 5: vie };
}

const BOGOTA_MODES: CityConfig['modes'] = {
  default: 'par-impar',
  perKind: {
    electricos: 'none',
    emergencia: 'none',
    escolar: 'none',
    publico: 'none'
  }
};

const MEDELLIN_MODES: CityConfig['modes'] = {
  default: 'digits-per-weekday',
  perKind: {
    electricos: 'none',
    emergencia: 'none'
  }
};

const TAXIS_MEDELLIN_S2 = wdMap([6, 9], [2, 5], [7, 0], [1, 4], [3, 8]);

const BOGOTA: CityConfig = {
  slug: 'bogota',
  name: 'Bogotá D.C.',
  department: 'Bogotá D.C.',
  region: 'Cundinamarca / Altiplano',
  lat: 4.711,
  lng: -74.072,
  timezone: 'America/Bogota',
  modes: BOGOTA_MODES,
  timeWindows: {
    default: [
      { start: '06:00', end: '21:00' }
    ]
  },
  holidayExempt: true,
  weekendExempt: true,
  exemptions: ['electricos', 'emergencia', 'escolar', 'publico', 'carga'],
  digitSources: {
    carro: 'last-digit',
    moto: 'last-digit',
    taxi: 'last-digit'
  },
  rotations: [
    {
      id: 'bogota-2024-eterna',
      label: 'Par/Impar calendario (inicio 14-sep-2024, sin rotación semestral)',
      startDate: '2024-09-14',
      endDate: '2027-12-31',
      baseWeekdayDigits: {},
      shiftOffset: 0,
      weekdayFilter: [1, 2, 3, 4, 5],
      appliesToKinds: ['carro', 'taxi', 'moto']
    }
  ],
  specialEvents: ['dia-sin-carro-bogota-2026'],
  customRestrictions: {
    parImparRule: 'odd-day-1-5-odd-digits',
    solidario: true
  },
  sourceUrls: [
    'https://www.movilidadbogota.gov.co',
    'https://www.mintransporte.gov.co'
  ],
  lastUpdated: '2026-07-29'
};

const MEDELLIN: CityConfig = {
  slug: 'medellin',
  name: 'Medellín y Valle de Aburrá',
  department: 'Antioquia',
  region: 'Eje Cafetero / Antioquia',
  lat: 6.2442,
  lng: -75.5812,
  timezone: 'America/Bogota',
  modes: MEDELLIN_MODES,
  timeWindows: {
    default: [
      { start: '05:00', end: '20:00' }
    ]
  },
  holidayExempt: true,
  weekendExempt: true,
  exemptions: ['electricos', 'emergencia'],
  digitSources: {
    carro: 'last-digit',
    moto: 'first-digit',
    taxi: 'last-digit'
  },
  rotations: [
    {
      id: 'medellin-1s-2026',
      label: 'Primer Semestre 2026',
      startDate: '2026-02-02',
      endDate: '2026-07-31',
      baseWeekdayDigits: wdMap([3, 6], [7, 9], [0, 2], [1, 4], [5, 8]),
      shiftOffset: 0,
      weekdayFilter: [1, 2, 3, 4, 5],
      appliesToKinds: ['carro', 'moto']
    },
    {
      id: 'medellin-2s-2026',
      label: 'Segundo Semestre 2026 — Lun:5&8  Mar:1&4  Mié:0&2  Jue:3&6  Vie:7&9',
      startDate: '2026-08-03',
      endDate: '2027-01-29',
      baseWeekdayDigits: wdMap([5, 8], [1, 4], [0, 2], [3, 6], [7, 9]),
      shiftOffset: 0,
      weekdayFilter: [1, 2, 3, 4, 5],
      appliesToKinds: ['carro', 'moto']
    },
    {
      id: 'medellin-taxis-2s-2026',
      label: 'Taxis — 2S 2026 — Lun:6&9  Mar:2&5  Mié:7&0  Jue:1&4  Vie:3&8',
      startDate: '2026-08-03',
      endDate: '2027-01-29',
      baseWeekdayDigits: TAXIS_MEDELLIN_S2,
      shiftOffset: 0,
      weekdayFilter: [1, 2, 3, 4, 5],
      appliesToKinds: ['taxi']
    }
  ],
  specialEvents: ['rotacion-pedagogica-medellin-2s-2026'],
  sourceUrls: [
    'https://www.losmejorestop10.com.elcolombiano.com/medellin/rotacion-pico-y-placa-medellin-segundo-semestre-de-2026-PP39145875',
    'https://www.amva.gov.co/es/temas/pico-y-placa'
  ],
  lastUpdated: '2026-07-28'
};

const CALI: CityConfig = {
  slug: 'cali',
  name: 'Cali',
  department: 'Valle del Cauca',
  region: 'Pacífico / Valle del Cauca',
  lat: 3.4516,
  lng: -76.5319,
  timezone: 'America/Bogota',
  modes: {
    default: 'digits-per-weekday',
    perKind: { electricos: 'none', emergencia: 'none' }
  },
  timeWindows: {
    default: [{ start: '06:00', end: '19:00' }]
  },
  holidayExempt: true,
  weekendExempt: true,
  exemptions: ['electricos', 'emergencia', 'publico'],
  digitSources: {
    carro: 'last-digit',
    moto: 'last-digit',
    taxi: 'last-digit'
  },
  rotations: [
    {
      id: 'cali-2s-2026',
      label: 'Rotación 2S 2026',
      startDate: '2026-07-06',
      endDate: '2027-01-03',
      baseWeekdayDigits: wdMap([1, 4], [2, 5], [3, 6], [7, 8], [0, 9]),
      shiftOffset: 0,
      weekdayFilter: [1, 2, 3, 4, 5],
      appliesToKinds: ['carro', 'taxi', 'moto']
    }
  ],
  sourceUrls: ['https://www.cali.gov.co/movilidad/'],
  lastUpdated: '2026-07-29'
};

const BARRANQUILLA: CityConfig = {
  slug: 'barranquilla',
  name: 'Barranquilla',
  department: 'Atlántico',
  region: 'Caribe',
  lat: 10.9878,
  lng: -74.7889,
  timezone: 'America/Bogota',
  modes: {
    default: 'none',
    perKind: {
      taxi: 'digits-per-weekday',
      carro: 'none',
      moto: 'none',
      electricos: 'none',
      emergencia: 'none'
    }
  },
  timeWindows: {
    default: [{ start: '00:00', end: '23:59' }],
    perKind: {
      taxi: [{ start: '05:00', end: '22:00' }]
    }
  },
  holidayExempt: true,
  weekendExempt: true,
  exemptions: ['carro', 'moto', 'publico', 'carga', 'electricos', 'emergencia'],
  digitSources: { taxi: 'last-digit' },
  rotations: [
    {
      id: 'baq-taxis-2026',
      label: 'Restricción de sobreoferta taxis 2026',
      startDate: '2026-01-05',
      endDate: '2027-12-31',
      baseWeekdayDigits: wdMap([0, 1], [2, 3], [4, 5], [6, 7], [8, 9]),
      shiftOffset: 0,
      weekdayFilter: [1, 2, 3, 4, 5],
      appliesToKinds: ['taxi']
    }
  ],
  customRestrictions: {
    note: 'Restricción solo aplica a taxis por sobreoferta; particulares sin restricción permanente.'
  },
  sourceUrls: ['https://www.barranquilla.gov.co/movilidad/'],
  lastUpdated: '2026-07-29'
};

const BUCARAMANGA: CityConfig = {
  slug: 'bucaramanga',
  name: 'Bucaramanga',
  department: 'Santander',
  region: 'Oriente / Santander',
  lat: 7.1193,
  lng: -73.1227,
  timezone: 'America/Bogota',
  modes: {
    default: 'digits-per-weekday',
    perKind: { electricos: 'none', emergencia: 'none' }
  },
  timeWindows: {
    default: [{ start: '06:00', end: '20:00' }]
  },
  holidayExempt: true,
  weekendExempt: true,
  exemptions: ['electricos', 'emergencia'],
  digitSources: {
    carro: 'last-digit',
    moto: 'last-digit',
    taxi: 'last-digit'
  },
  rotations: [
    {
      id: 'bga-2026',
      label: '2026 — Lun:0&3  Mar:1&4  Mié:2&5  Jue:6&8  Vie:7&9',
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      baseWeekdayDigits: wdMap([0, 3], [1, 4], [2, 5], [6, 8], [7, 9]),
      shiftOffset: 0,
      weekdayFilter: [1, 2, 3, 4, 5],
      appliesToKinds: ['carro', 'taxi', 'moto']
    }
  ],
  sourceUrls: ['https://movilidadbucaramanga.gov.co/'],
  lastUpdated: '2026-07-29'
};

const CARTAGENA: CityConfig = {
  slug: 'cartagena',
  name: 'Cartagena de Indias',
  department: 'Bolívar',
  region: 'Caribe',
  lat: 10.391,
  lng: -75.4794,
  timezone: 'America/Bogota',
  modes: {
    default: 'digits-per-weekday',
    perKind: { electricos: 'none', emergencia: 'none' }
  },
  timeWindows: {
    default: [{ start: '06:30', end: '19:30' }]
  },
  holidayExempt: true,
  weekendExempt: true,
  exemptions: ['electricos', 'emergencia', 'publico'],
  digitSources: {
    carro: 'last-digit',
    moto: 'last-digit',
    taxi: 'last-digit'
  },
  rotations: [
    {
      id: 'ctg-2026',
      label: '2026 — Lun:2&6  Mar:3&7  Mié:4&8  Jue:5&9  Vie:0&1',
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      baseWeekdayDigits: wdMap([2, 6], [3, 7], [4, 8], [5, 9], [0, 1]),
      shiftOffset: 0,
      weekdayFilter: [1, 2, 3, 4, 5],
      appliesToKinds: ['carro', 'taxi', 'moto']
    }
  ],
  sourceUrls: ['https://cartagena.gov.co/movilidad/'],
  lastUpdated: '2026-07-29'
};

export const CITIES: CityConfig[] = [BOGOTA, MEDELLIN, CALI, BARRANQUILLA, BUCARAMANGA, CARTAGENA];

export const CITIES_BY_SLUG: Record<string, CityConfig> = Object.fromEntries(
  CITIES.map(c => [c.slug, c])
);

export const ALL_KINDS: VehicleKind[] = [
  'carro',
  'moto',
  'taxi',
  'carga',
  'publico',
  'escolar',
  'emergencia',
  'electricos'
];
