// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://rbkstrategies.com',
  output: 'static', // Static site generation (no SSR needed)
  adapter: cloudflare({
    mode: 'directory', // Deploy to Cloudflare Pages
  }),
});
