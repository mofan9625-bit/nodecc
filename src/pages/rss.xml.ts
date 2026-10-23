import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const reviews = await getCollection('reviews');
  const tutorials = await getCollection('tutorials');

  const reviewItems = reviews.map((review) => ({
    title: `[评测] ${review.data.title}`,
    description: review.data.description,
    pubDate: new Date(review.data.pubDate),
    link: `/reviews/${review.id}/`,
  }));

  const tutorialItems = tutorials.map((tutorial) => ({
    title: `[教程] ${tutorial.data.title}`,
    description: tutorial.data.description,
    pubDate: new Date(tutorial.data.pubDate),
    link: `/tutorials/${tutorial.id}/`,
  }));

  const allItems = [...reviewItems, ...tutorialItems].sort(
    (a, b) => b.pubDate.getTime() - a.pubDate.getTime()
  );

  return rss({
    title: '节点实验室 · NodeLab',
    description: 'NodeLab 节点实验室 — 最专业的机场梯子代理评测与科学上网指南，每日晚高峰真实节点测速数据与配置教程更新。',
    site: context.site!,
    items: allItems,
    customData: `<language>zh-CN</language>`,
  });
}
