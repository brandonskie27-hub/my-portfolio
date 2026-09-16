import { ImageResponse } from "next/og"

export const alt = "Brandon Dylan Narito - Full-stack developer portfolio"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#fafafa",
          padding: "96px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#a1a1a1",
            marginBottom: 28,
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Brandon Dylan Narito
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#a1a1a1",
            marginTop: 28,
          }}
        >
          Full-stack developer, frontend-leaning
        </div>
      </div>
    ),
    { ...size }
  )
}
