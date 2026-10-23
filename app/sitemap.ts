import type { MetadataRoute } from "next";
import { DATA as D } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (path: string, lastModified: string, priority: number) => ({ url: `${D.site}${path}`, lastModified, priority });
  return [
    u("/", D.updated, 1.0),
    u("/irina-perez/", "2026-10-22", 0.8),
    u("/blog/", D.updated, 0.7),
    ...D.services.map((x) => u(`/terapias/${x.slug}/`, D.updated, 0.9)),
    ...D.plans.map((x) => u(`/experiencias/${x.slug}/`, D.updated, 0.9)),
    ...D.posts.map((x) => u(`/blog/${x.slug}/`, D.updated, 0.6)),
  ];
}
