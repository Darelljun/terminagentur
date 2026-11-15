import { ImageResponse } from "next/og";

export const alt = "KAYCO – Keine Leads. Termine.";
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
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: "#0b0b0d", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 22, height: 20, borderRadius: 6, background: "#fff" }} />
            <div style={{ width: 10, height: 10, borderRadius: 10, background: "#2FBF85", marginLeft: 6 }} />
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: 6, color: "#0b0b0d" }}>KAYCO</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -5, color: "#0b0b0d", lineHeight: 1 }}>Keine Leads.</div>
          <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -5, color: "#0e7a52", lineHeight: 1.05 }}>Termine.</div>
        </div>
        <div style={{ fontSize: 30, color: "#5b5b62" }}>Qualifizierte Beratungstermine für Finanzdienstleister · kayco.de</div>
      </div>
    ),
    size,
  );
}
