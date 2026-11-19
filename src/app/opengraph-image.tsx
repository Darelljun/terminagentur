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
          background: "radial-gradient(900px at 15% 20%, rgba(2, 62, 151, 0.35), rgba(0, 0, 0, 0) 65%), radial-gradient(700px at 80% 60%, rgba(255, 143, 0, 0.16), rgba(0, 0, 0, 0) 60%), #0c0c0c",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 22, height: 20, borderRadius: 6, background: "#0c0c0c" }} />
            <div style={{ width: 10, height: 10, borderRadius: 10, background: "#FF8F00", marginLeft: 6 }} />
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: 6, color: "#ffffff" }}>KAYCO</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -5, color: "#ffffff", lineHeight: 1 }}>Keine Leads.</div>
          <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -5, color: "#FF8F00", lineHeight: 1.05 }}>Termine.</div>
        </div>
        <div style={{ fontSize: 30, color: "#d1d1d1" }}>Qualifizierte Beratungstermine für Finanzdienstleister · kayco.io</div>
      </div>
    ),
    size,
  );
}
