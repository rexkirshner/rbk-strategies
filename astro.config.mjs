// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://rbkstrategies.com',
  output: 'server', // Server mode with prerendering for static pages
  adapter: cloudflare({
    mode: 'directory', // Deploy to Cloudflare Pages
  }),
});
