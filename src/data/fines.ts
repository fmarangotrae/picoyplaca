export interface FineConfig {
  uvb2026: number;
  amountCops2026: number;
  smdlv2025: number;
  uvbDescription: string;
  notes: string[];
}

export const FINE_CONFIG: FineConfig = {
  uvb2026: 52.29,
  amountCops2026: 633111,
  smdlv2025: 15,
  uvbDescription:
    'Valor de Unidad de Valor Tributario (UVB) ajustado por inflación a 2026. Antes del 2024 la multa era 15 SMDLV.',
  notes: [
    '50% de descuento pronto pago + curso de educación vial en los primeros 5 días hábiles.',
    'Genera comparendo tipo 02 con inmovilización del vehículo.',
    'Suspensión de licencia de conducción en reincidentes del mismo año.'
  ]
};

export interface RecommendationTemplate {
  vehicle: string;
  allowed: string;
  restricted: string;
}

export const DAY_RECOMMENDATIONS: Record<'allowed' | 'restricted' | 'electric' | 'taxi-allowed' | 'taxi-restricted', string[]> = {
  allowed: [
    '✅ Tu vehículo sí circula hoy.',
    '🚦 Respeta horarios pico y zonas de control.',
    '🧑‍🦼 Cede el paso a peatones y ciclistas.'
  ],
  restricted: [
    '⛔ Tu vehículo NO circula hoy en el horario del pico y placa.',
    '💵 Multa: ~$633.111 COP (52,29 UVB 2026).',
    '🅿️ Usa parqueaderos P&R o transborda a transporte público SITP/TM/Metro.',
    '🔋 Considera compartir el viaje (P2P) o teletrabajar.'
  ],
  electric: [
    '⚡ Vehículo 0 emisiones: exento en la mayoría de ciudades de Colombia.',
    '🟢 En Bogotá par/impar: tu auto eléctrico no tiene restricción ni placa solidaria.',
    '📋 Siempre consulta con la Secretaría de Movilidad local.'
  ],
  'taxi-allowed': [
    '🚕 Tu taxi puede operar en este turno.',
    '🛣️ Respeta carriles exclusivos y paraderos autorizados.',
    '📱 Habilita la app de pago digital para mayor seguridad.'
  ],
  'taxi-restricted': [
    '⏸️ Tu taxi NO debe operar en este turno.',
    '🧾 Revisa la rotación especial para taxis de tu ciudad.',
    '💡 Usa la jornada para mantenimiento o descanso obligatorio del conductor.'
  ]
};
