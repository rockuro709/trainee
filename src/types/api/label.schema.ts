// src/types/api/label.schema.ts
import { z } from "zod";

export const labelReleasesParamsSchema = z.object({
  page: z.number().optional(),
  per_page: z.number().optional(),
});

export const releaseSchema = z.object({
  id: z.number(),
  status: z.string(),
  format: z.string(),
  catno: z.string(),
  thumb: z.string(),
  resource_url: z.string().url(),
  title: z.string(),
  year: z.number(),
  artist: z.string(),
});

export const paginationSchema = z.object({
  page: z.number(),
  pages: z.number(),
  per_page: z.number(),
  items: z.number(),
  urls: z.object({}).passthrough(), // объект с любыми полями
});

export const getReleasesByLabelIdSchema = z.object({
  pagination: paginationSchema,
  releases: z.array(releaseSchema),
});

// Выводим (infer) TypeScript типы прямо из схем.
export type LabelReleasesParams = z.infer<typeof labelReleasesParamsSchema>;
export type Release = z.infer<typeof releaseSchema>;
export type GetReleasesByLabelIdDto = z.infer<
  typeof getReleasesByLabelIdSchema
>;
