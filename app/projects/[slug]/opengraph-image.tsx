import { ImageResponse } from "next/og"
import { CASE_STUDIES, getCaseStudy } from "@/lib/case-studies"

export const alt = "Case study by Brandon Dylan Narito"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }))
}

// Same look as the site-wide preview in app/opengraph-image.tsx, with the
// project's name and tagline in place of the portfolio headline.
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getCaseStudy(slug)

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#fafafa",
          padding: "96px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 30, color: "#a1a1a1", marginBottom: 28 }}>
            Case study
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            {study?.title ?? "Project"}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              color: "#a1a1a1",
              marginTop: 28,
              lineHeight: 1.3,
              maxWidth: 960,
            }}
          >
            {study?.tagline ?? ""}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1a1" }}>
          Brandon Dylan Narito · brandonnarito.com
        </div>
      </div>
    ),
    { ...size }
  )
}
