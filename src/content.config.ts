import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 随笔：src/content/posts/ 下的每篇 .md 文章
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
  }),
});

// 短动态：src/content/moments/ 下的每条一句话记录
const moments = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/moments' }),
  schema: z.object({
    date: z.coerce.date(),
    // 可选：配图文件名列表，图片文件放在 src/assets/moments/ 文件夹里
    images: z.array(z.string()).default([]),
    mood: z.string().optional(),
  }),
});

// 相册：src/content/albums/ 下每本相册对应一个 .md，
// 照片放在 src/assets/albums/<folder>/ 文件夹里（folder 填文件夹名）
const albums = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/albums' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    folder: z.string(),
    summary: z.string().optional(),
  }),
});

export const collections = { posts, moments, albums };
