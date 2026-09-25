import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 上线部署后，把下面的网址换成你的正式网址（例如 https://你的名字.pages.dev）
export default defineConfig({
  site: 'https://my-site-hct.pages.dev',
  integrations: [sitemap()],
});
