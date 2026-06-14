// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.flowtech.co.jp',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
