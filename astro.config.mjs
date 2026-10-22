import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://nodebench.cc', // 线上正式域名，sitemap 与 canonical 依赖此配置
  output: 'static',
  build: {
    format: 'directory' // 生成 clean URL: /reviews/speedcat/ 结构，最利于 Bing 和 Google 收录
  },
  server: {
    open: true, // 本地启动 dev 或 preview 时自动在默认浏览器中打开页面
    port: 4321,
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
      configFile: './tailwind.config.mjs',
    }),
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
      serialize(item) {
        // 首页最高权重
        if (item.url === 'https://nodebench.cc/' || item.url === 'https://nodebench.cc') {
          item.changefreq = 'daily';
          item.priority = 1.0;
        } else if (
          item.url.includes('/reviews') || 
          item.url.includes('/comparison-matrix') || 
          item.url.includes('/speedtest-reports')
        ) {
          item.changefreq = 'daily';
          item.priority = 0.9;
        } else if (item.url.includes('/tutorials')) {
          item.changefreq = 'weekly';
          item.priority = 0.85;
        } else if (item.url.includes('/category') || item.url.includes('/tools')) {
          item.changefreq = 'weekly';
          item.priority = 0.8;
        } else if (item.url.includes('/disclaimer')) {
          item.changefreq = 'monthly';
          item.priority = 0.3;
        }
        return item;
      },
    }),
  ],
});
