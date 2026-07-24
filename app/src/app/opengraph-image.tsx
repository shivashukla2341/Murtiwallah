import { ImageResponse } from "next/og";

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
          alignItems: "center",
          justifyContent: "center",
          background: "#f3f2f2",
          color: "#201f1d",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
          <span style={{ fontSize: 92, color: "#b68235" }}>ॐ</span>
          <span style={{ fontSize: 76, fontWeight: 600 }}>Murtiwallah</span>
        </div>
        <div style={{ marginTop: 20, fontSize: 30, color: "#5a5754" }}>
          Crafted with Devotion. Delivered with Trust.
        </div>
      </div>
    ),
    { ...size }
  );
}
