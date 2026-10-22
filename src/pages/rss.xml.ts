import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const reviews = await getCollection('reviews');
  return rss({
    title: '节点实验室 · NodeLab',
    description: 'NodeLab 节点实验室 — 最专业的机场梯子代理评测与科学上网指南，每日晚高峰真实节点测速数据更新。',
    site: context.site!,
    items: reviews
      .sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime())
      .map((review) => ({
        title: review.data.title,
        description: review.data.description,
        pubDate: new Date(review.data.pubDate),
        link: `/reviews/${review.id}/`,
      })),
    customData: `<language>zh-CN</language>`,
  });
}
