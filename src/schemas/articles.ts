// © 2024 Vlad-Stefan Harbuz <vlad@vlad.website>
// SPDX-License-Identifier: Apache-2.0

import { z } from "astro:content";

export const articleSchema = z.object({
  title: z.string(),
  author: z.string(),
  authorImageSrc: z.string(),
  canonicalUrl: z.string().optional(),
  isDraft: z.boolean(),
  imageSrc: z.string().optional(),
  imageAlt: z.string().optional(),
  publishDate: z.string().transform((str) => new Date(str)),
});

export type Article = z.infer<typeof articleSchema>;
