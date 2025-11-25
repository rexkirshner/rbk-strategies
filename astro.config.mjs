// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://rbkstrategies.com',
  output: 'hybrid', // Use hybrid mode: static by default, server-rendered when needed
  adapter: cloudflare({
    mode: 'directory', // Deploy to Cloudflare Pages
  }),
});
