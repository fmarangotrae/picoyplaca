/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GOOGLE_ADSENSE_CLIENT_ID: string;
  readonly GA4_MEASUREMENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type RuntimeMode = 'development' | 'production' | 'preview';
