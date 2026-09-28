import type { BlogPostSummary, ComparisonItem } from '../types';

export const BLOG_POSTS_SEED: BlogPostSummary[] = [
  {
    slug: 'como-saber-cual-es-mi-digito-de-pico-y-placa',
    title: 'Cómo saber cuál es mi dígito de pico y placa en 2026',
    description:
      'Aprende paso a paso cómo identificar el dígito que te aplica según tu tipo de vehículo y ciudad: carros, motos, taxis y más.',
    category: 'Guías',
    tags: ['digito', 'guia', 'bogota', 'medellin', 'cali'],
    publishedAt: '2026-09-01',
    author: 'Equipo picoyplaca.co',
    cover: '/blog/digito-pico-placa.jpg'
  },
  {
    slug: 'exenciones-pico-y-placa-vehiculos-electricos',
    title: 'Vehículos eléctricos exentos de pico y placa en Colombia 2026',
    description:
      'Listado completo de ciudades que eximen a carros y motos 0 emisiones. Requisitos Ley 1964 de 2019 y actualizaciones MINTRANS.',
    category: 'Normativas',
    tags: ['electricos', 'exenciones', 'ley-1964'],
    publishedAt: '2026-08-25',
    author: 'Equipo picoyplaca.co',
    cover: '/blog/vehiculos-electricos.jpg'
  },
  {
    slug: 'rotacion-pico-y-placa-segundo-semestre-2026',
    title: 'Rotación pico y placa Segundo Semestre 2026 en Medellín, Cali y ciudades',
    description:
      'Nuevas asignaciones de dígitos desde agosto 2026. Calendario día por día y horarios actualizados AMVA y Secretarías.',
    category: 'Actualizaciones',
    tags: ['rotacion', '2s-2026', 'medellin', 'cali'],
    publishedAt: '2026-07-30',
    author: 'Equipo picoyplaca.co',
    cover: '/blog/rotacion-2s-2026.jpg'
  },
  {
    slug: 'multa-pico-y-placa-2026-valor-y-recursos',
    title: 'Valor multa pico y placa 2026: 52,29 UVB ($633.111) y cómo recurrir',
    description:
      'Actualización UVB 2026, descuentos pronto pago, curso educación vial y modelos de recurso de reposición.',
    category: 'Multas y comparendos',
    tags: ['multa', 'uvb', 'comparendo', 'recursos'],
    publishedAt: '2026-08-08',
    author: 'Equipo picoyplaca.co',
    cover: '/blog/multa-pico-placa.jpg'
  },
  {
    slug: 'dia-sin-carro-bogota-2026-que-no-circula',
    title: 'Día sin Carro Bogotá 2026: qué no circula y exenciones oficiales',
    description:
      '5 de febrero de 2026. Restricción carros/motos/híbridos. Taxis y eléctricos cómo operan. Multa especial y rutas seguras.',
    category: 'Eventos',
    tags: ['dia-sin-carro', 'bogota', 'evento'],
    publishedAt: '2026-01-20',
    modifiedAt: '2026-08-01',
    author: 'Equipo picoyplaca.co',
    cover: '/blog/dia-sin-carro.jpg'
  },
  {
    slug: 'pico-y-placa-solidario-bogota-como-funciona',
    title: 'Pico y Placa Solidario Bogotá: costos, registro y cómo funciona',
    description:
      'Paga por circular los días que te toca parar. Tarifa diaria 2026, registro oficial SDM, vehículos que pueden inscribirse.',
    category: 'Bogotá',
    tags: ['solidario', 'bogota', 'pago'],
    publishedAt: '2026-08-18',
    author: 'Equipo picoyplaca.co',
    cover: '/blog/placa-solidaria.jpg'
  },
  {
    slug: 'mejores-apps-para-rutas-sin-pico-y-placa',
    title: '7 apps y webs para rutas que evitan pico y placa en Colombia',
    description:
      'Comparativa de Waze, Google Maps, Moovit y apps locales con alertas de dígito, horario y cámaras de Fotocívicas.',
    category: 'Herramientas',
    tags: ['apps', 'rutas', 'waze', 'maps'],
    publishedAt: '2026-09-02',
    author: 'Equipo picoyplaca.co',
    cover: '/blog/apps-rutas.jpg'
  },
  {
    slug: 'taxis-medellin-restricciones-especiales',
    title: 'Taxis en Medellín: restricciones, rotación especial y jornada pedagógica',
    description:
      'Rotación específica para taxis AMVA 2026. Horarios, jornada pedagógica 4 primeros días y excepciones de servicio.',
    category: 'Medellín / Antioquia',
    tags: ['taxi', 'medellin', 'amva'],
    publishedAt: '2026-08-05',
    author: 'Equipo picoyplaca.co',
    cover: '/blog/taxis-medellin.jpg'
  },
  {
    slug: 'festivos-colombia-sin-pico-y-placa',
    title: 'Festivos de Colombia 2025-2027: días SIN pico y placa en todas las ciudades',
    description:
      'Calendario completo de festivos oficiales colombianos y confirmación de exención por ciudad.',
    category: 'Calendarios',
    tags: ['festivos', 'calendario', 'exento'],
    publishedAt: '2026-07-01',
    author: 'Equipo picoyplaca.co',
    cover: '/blog/festivos.jpg'
  },
  {
    slug: 'diferencias-pico-y-placa-bogota-medellin-cali',
    title: 'Diferencias entre pico y placa Bogotá vs Medellín vs Cali en 2026',
    description:
      'Par/impar vs dígitos por día, horarios, rotaciones, multas y exenciones. Tabla comparativa por ciudad y tipo vehículo.',
    category: 'Comparativas',
    tags: ['comparativa', 'bogota', 'medellin', 'cali'],
    publishedAt: '2026-08-20',
    author: 'Equipo picoyplaca.co',
    cover: '/blog/diferencias-ciudades.jpg'
  }
];

export const COMPARISON_SEED: Record<string, ComparisonItem[]> = {
  'mejores-seguros-vehiculares-colombia': [
    {
      slug: 'seguros-bolivar',
      name: 'Seguros Bolívar',
      description: 'Líder mercado, red 800+ talleres, asistencia 24/7.',
      price: 'Desde $69.900/mes',
      rating: 4.6,
      pros: ['Amplia red talleres', 'Asistencia km ilimitado', 'Cobertura hurto total'],
      cons: ['Precio medio-alto', 'Deducible alto en plan básico'],
      affiliateUrl: 'https://ejemplo.com/afiliado/bolivar?utm_source=picoyplaca',
      badge: '🏆 Top 1'
    },
    {
      slug: 'allianz',
      name: 'Allianz Seguros',
      description: 'Cobertura internacional, app muy valorada.',
      price: 'Desde $62.000/mes',
      rating: 4.4,
      pros: ['App móvil intuitiva', 'Descuentos por no siniestro', 'Coche sustitución 30d'],
      cons: ['Requisitos de edad'],
      affiliateUrl: 'https://ejemplo.com/afiliado/allianz?utm_source=picoyplaca'
    },
    {
      slug: 'axa-colpatria',
      name: 'AXA Colpatria',
      description: 'Cotización en 2 min, SOAT incluido en packs.',
      price: 'Desde $54.900/mes',
      rating: 4.2,
      pros: ['Mejor precio promocional', 'SOAT + todo riesgo combinado', 'Pago digital 1-click'],
      cons: ['Talleres menos en ciudades intermedias'],
      affiliateUrl: 'https://ejemplo.com/afiliado/axa?utm_source=picoyplaca',
      badge: '💸 Mejor precio'
    },
    {
      slug: 'sura',
      name: 'Seguros SURA',
      description: 'Fuerte presencia nacional, convenios empresariales.',
      price: 'Desde $71.500/mes',
      rating: 4.3,
      pros: ['Muy buena atención al cliente', 'Convenios con empleadores'],
      cons: ['Planes menos flexibles'],
      affiliateUrl: 'https://ejemplo.com/afiliado/sura?utm_source=picoyplaca'
    }
  ],
  'comparar-soat-2026': [
    {
      slug: 'aseguradora1-soat',
      name: 'ComparaOnline SOAT',
      description: 'Comparador oficial autorizado Superfinanciera.',
      price: 'Desde $512.000/año',
      rating: 4.7,
      pros: ['Cotiza 15+ aseguradoras', 'Documento 100% digital', 'Descuento familiar x2'],
      cons: ['Pago solo tarjeta'],
      affiliateUrl: 'https://ejemplo.com/afiliado/cmp-soat?utm_source=picoyplaca',
      badge: '🏆 Comparador oficial'
    },
    {
      slug: 'la-equitativa-soat',
      name: 'La Equitativa',
      description: 'Soporte presencial y pago en corresponsales bancarios.',
      price: 'Desde $530.000/año',
      rating: 4.3,
      pros: ['Pago en efectivo corresponsales', 'Cobertura accidentes conductor'],
      cons: ['Sin app móvil avanzada'],
      affiliateUrl: 'https://ejemplo.com/afiliado/eq?utm_source=picoyplaca'
    }
  ],
  'mejores-renting-carros-colombia': [
    {
      slug: 'localiza-renting',
      name: 'Localiza Renting Colombia',
      description: 'Planes empresariales sin pico y placa.',
      price: 'Desde $2.490.000/mes',
      rating: 4.5,
      pros: ['Vehículos 0km exentos pico y placa', 'Seguro todo riesgo', 'Mantenimiento incluido'],
      cons: ['Contrato mínimo 24 meses'],
      affiliateUrl: 'https://www.rentingcolombia.com.localiza-corporativo/blog/pico-y-placa-colombia?hs_amp=true&utm_source=picoyplaca',
      badge: '⭐ Exento pico y placa'
    },
    {
      slug: 'alphabet',
      name: 'Alphabet (BMW Group)',
      description: 'Alta gama, gestión total de flota.',
      price: 'Desde $3.800.000/mes',
      rating: 4.4,
      pros: ['Flota premium', 'Fuel card + mantenimiento', 'Reporting BI'],
      cons: ['Precio elevado'],
      affiliateUrl: 'https://ejemplo.com/afiliado/alphabet?utm_source=picoyplaca'
    }
  ]
};
