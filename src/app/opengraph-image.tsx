import { ImageResponse } from "next/og";

export const alt = "DYCH Technologies, Smart School Systems";
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
          backgroundColor: "#0d1611",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              backgroundColor: "#d9932f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
              color: "#14100a",
            }}
          >
            D
          </div>
          <div style={{ display: "flex", flexDirection: "column", color: "#e9ede6" }}>
            <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>
              DYCH
            </span>
            <span style={{ fontSize: 14, letterSpacing: 3, color: "#7d8b80" }}>
              TECHNOLOGIES
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: -2.5,
              color: "#e9ede6",
              maxWidth: 900,
            }}
          >
            Every child accounted for.
          </span>
          <span
            style={{
              marginTop: 26,
              fontSize: 30,
              lineHeight: 1.4,
              color: "#a9b5ab",
              maxWidth: 820,
            }}
          >
            Biometric attendance, secured entry points and same-minute alerts to
            parents.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            color: "#e5a84a",
          }}
        >
          <span
            style={{
              width: 36,
              height: 2,
              backgroundColor: "#d9932f",
              display: "flex",
            }}
          />
          Smart School Systems · Kampala, Uganda
        </div>
      </div>
    ),
    size,
  );
}
