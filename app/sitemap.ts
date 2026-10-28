import type { MetadataRoute } from "next"
import { CASE_STUDIES } from "@/lib/case-studies"
import { siteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...CASE_STUDIES.map((study) => ({
      url: `${siteUrl}/projects/${study.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]
}
