import type { AdSlotConfig, BannerSponsor } from '../types';

export const DEFAULT_AD_SLOTS: AdSlotConfig[] = [
  {
    id: 'home-hero',
    slotId: '',
    sizes: ['leaderboard-728x90', 'mobile-leaderboard-320x50'],
    sticky: false,
    lazy: false,
    pathPatterns: ['/'],
    enabled: true
  },
  {
    id: 'home-inline-mid',
    slotId: '',
    sizes: ['medium-rectangle-300x250', 'large-rectangle-336x280'],
    sticky: false,
    lazy: true,
    pathPatterns: ['/', '/bogota', '/medellin', '/cali'],
    enabled: true
  },
  {
    id: 'sidebar-city',
    slotId: '',
    sizes: ['medium-rectangle-300x250', 'half-page-300x600'],
    sticky: true,
    lazy: true,
    pathPatterns: ['/bogota*', '/medellin*', '/cali*', '/barranquilla*', '/bucaramanga*', '/cartagena*'],
    enabled: true
  },
  {
    id: 'verificador-below',
    slotId: '',
    sizes: ['medium-rectangle-300x250', 'auto-fluid'],
    sticky: false,
    lazy: true,
    pathPatterns: ['/', '/bogota', '/medellin', '/cali'],
    enabled: true
  },
  {
    id: 'blog-post-end',
    slotId: '',
    sizes: ['medium-rectangle-300x250', 'leaderboard-728x90'],
    sticky: false,
    lazy: true,
    pathPatterns: ['/blog/*'],
    enabled: true
  },
  {
    id: 'comparativa-top',
    slotId: '',
    sizes: ['leaderboard-728x90', 'mobile-leaderboard-320x50'],
    sticky: false,
    lazy: false,
    pathPatterns: ['/mejores-seguros-vehiculares-colombia', '/comparar-soat-2026', '/mejores-renting-carros-colombia'],
    enabled: true
  }
];

export const DEFAULT_BANNERS: BannerSponsor[] = [
  {
    id: 'seguro-econo-2026',
    name: 'SeguroAutoEconómico.co',
    text: 'Compara 18+ aseguradoras y ahorra hasta 40% en tu SOAT + TODO RIESGO en 2 minutos.',
    cta: 'Cotiza gratis ahora →',
    href: 'https://tu-enlace-afiliado.ejemplo.com/seguros',
    utmCampaign: 'picoyplaca-co_banner_top',
    startDate: '2026-09-01',
    endDate: '2027-02-28',
    pathPatterns: ['/', '/bogota', '/medellin', '/cali'],
    enabled: false,
    position: 'top-hero'
  },
  {
    id: 'renting-corporativo-2026',
    name: 'Renting Colombia Oficial',
    text: 'Renting empresarial sin pico y placa. Factura electrónica, mantenimiento y seguro TODO incluido.',
    cta: 'Ver planes corporativos',
    href: 'https://www.rentingcolombia.com.localiza-corporativo/blog/pico-y-placa-colombia?hs_amp=true',
    utmCampaign: 'picoyplaca-co_renting_lateral',
    startDate: '2026-09-01',
    endDate: '2027-08-31',
    pathPatterns: ['/pro', '/mejores-renting-carros-colombia'],
    enabled: false,
    position: 'side'
  }
];

export const DEFAULT_KV_CONFIG: Record<string, unknown> = {
  version: 1,
  lastModifiedAt: new Date().toISOString(),
  global: {
    siteName: 'Pico y Placa Colombia',
    siteUrl: 'https://picoyplaca.co',
    defaultCitySlug: 'bogota',
    supportEmail: 'soporte@picoyplaca.co',
    globalShiftOffset: 0,
    globalShiftEnabled: false
  },
  ads: {
    provider: 'adsense',
    clientId: '',
    slots: DEFAULT_AD_SLOTS,
    banners: DEFAULT_BANNERS,
    adBlockingMessage: '¡Desactiva el bloqueador de anuncios para mantener este servicio gratuito! 🙏',
    minConsentRequired: ['marketing']
  },
  analytics: {
    ga4MeasurementId: '',
    cloudflareAnalyticsEnabled: true,
    hotjarId: '',
    minConsentRequired: ['analytics']
  },
  seo: {
    siteVerificationGoogle: '',
    siteVerificationBing: '',
    defaultKeywords: ['pico y placa', 'pico y placa hoy', 'pico y placa colombia']
  },
  pro: {
    landingEnabled: true,
    turnstileEnabled: false,
    resendEnabled: false,
    notifyAdminByEmail: false
  }
};
