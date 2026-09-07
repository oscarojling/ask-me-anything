import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ask Oscar Anything";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#12211d",
          color: "#f2ede1",
        }}
      >
        <div style={{ fontSize: 90, color: "#b8823f", lineHeight: 1 }}>
          &ldquo;
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 20 }}>
          Ask Oscar Anything
        </div>
        <div style={{ fontSize: 32, color: "#8fa39a", marginTop: 20 }}>
          Frontend developer · Futuregames student
        </div>
      </div>
    ),
    { ...size }
  );
}