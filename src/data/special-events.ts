import type { SpecialEvent } from '../types';

export const SPECIAL_EVENTS: SpecialEvent[] = [
  {
    id: 'dia-sin-carro-bogota-2026',
    title: 'Día sin Carro y sin Moto Bogotá 2026',
    startDate: '2026-02-05',
    description:
      'Jornada de Día sin Carro en Bogotá. Restricción TOTAL para carros particulares y motos (incluyendo híbridos). Taxis y buses SITP/TM operan con dígito restringido. Vehículos 100% eléctricos SÍ circulan exentos. Horario 05:00 - 21:00.',
    citySlugs: ['bogota'],
    vehiclePolicies: [
      { vehicle: 'carro', exempt: false, note: 'Prohibida circulación 05-21h' },
      { vehicle: 'moto', exempt: false, note: 'Prohibida circulación 05-21h' },
      { vehicle: 'electricos', exempt: true, note: 'Vehículos cero emisiones sí circulan' },
      { vehicle: 'emergencia', exempt: true },
      { vehicle: 'taxi', exempt: false, note: 'Cumple dígito restringido del día' },
      { vehicle: 'publico', exempt: false, note: 'Operación normal controlada SITP/TM' }
    ],
    sourceUrl:
      'https://www.movilidadbogota.gov.co/conozca-detalles-de-lo-que-sera-la-jornada-de-dia-sin-carro-y-sin-moto-2026'
  },
  {
    id: 'rotacion-pedagogica-medellin-2s-2026',
    title: 'Jornada Pedagógica Medellín 2S-2026',
    startDate: '2026-08-03',
    endDate: '2026-08-06',
    description:
      'Los primeros 4 días del inicio de la rotación no hay comparendos. Solo hay pedagogía. Horario habitual 05:00-20:00.',
    citySlugs: ['medellin', 'envigado', 'itagui', 'sabaneta', 'bello', 'copacabana', 'la-estrella', 'caldas'],
    sourceUrl:
      'https://www.losmejorestop10.com.elcolombiano.com/medellin/rotacion-pico-y-placa-medellin-segundo-semestre-de-2026-PP39145875'
  },
  {
    id: 'emision-uvb-2026',
    title: 'Actualización valor UVB 2026',
    startDate: '2026-01-01',
    description:
      'Valor UVB 2026 ajustado por Inflación. Multa por incumplimiento pico y placa: 52,29 UVB ≈ $633.111 COP (saldo).',
    vehiclePolicies: []
  }
];

export function getActiveEvents(dateISO: string, citySlugs: string[] = []): SpecialEvent[] {
  return SPECIAL_EVENTS.filter(ev => {
    const startOk = dateISO >= ev.startDate;
    const endOk = ev.endDate ? dateISO <= ev.endDate : dateISO === ev.startDate;
    if (!(startOk && endOk)) return false;
    if (!ev.citySlugs || ev.citySlugs.length === 0) return true;
    return ev.citySlugs.some(s => citySlugs.includes(s));
  });
}
