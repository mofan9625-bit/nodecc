import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('机场测速实验室'),
    badge: z.string().optional(),
    rank: z.number().optional(),
    featured: z.boolean().default(false),
    lineType: z.string().default('IPLC 纯专线'),
    speedPeakMbps: z.number().default(500),
    slaGuarantee: z.string().default('99.9%'),
    rating: z.object({
      overall: z.number().min(1).max(10),
      speed: z.number().min(1).max(10),
      stability: z.number().min(1).max(10),
      streaming: z.number().min(1).max(10),
      support: z.number().min(1).max(10),
    }),
    pricing: z.object({
      minMonthly: z.number(),
      currency: z.string().default('¥'),
      period: z.string().default('/月起'),
    }),
    protocols: z.array(z.string()).default([]),
    features: z.array(z.string()).default([]),
    streamingUnlock: z.array(z.string()).default([]),
    serverLocations: z.array(z.string()).default([]),
    affiliateUrl: z.string(),
    couponCode: z.string().optional(),
    discountText: z.string().optional(),
    pros: z.array(z.string()).default([]),
    cons: z.array(z.string()).default([]),
  }),
});

const tutorials = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/tutorials' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('机场测速实验室'),
    category: z.string().default('客户端教程'),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    readTime: z.string().default('5 分钟阅读'),
  }),
});

export const collections = { reviews, tutorials };
