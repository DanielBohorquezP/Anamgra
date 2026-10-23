import type { MetadataRoute } from "next";
import { DATA as D } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ["GPTBot", "OAI-SearchBot", "PerplexityBot", "Google-Extended", "ClaudeBot"], allow: "/" },
    ],
    sitemap: `${D.site}/sitemap.xml`,
  };
}
