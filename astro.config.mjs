import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://picoyplaca.co',
  output: 'hybrid',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    },
    imageService: 'passthrough'
  }),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false
    }),
    mdx()
  ],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  server: {
    port: 4321,
    host: true
  },
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@lib': '/src/lib',
        '@data': '/src/data'
      }
    }
  }
});
