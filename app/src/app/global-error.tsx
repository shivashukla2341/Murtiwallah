"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "24px",
          fontFamily: "system-ui, sans-serif",
          background: "#f3f2f2",
          color: "#201f1d",
        }}
      >
        <span style={{ fontSize: 48, color: "#b68235", marginBottom: 20 }}>ॐ</span>
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>500 — Our Workshop Hit a Snag</h1>
        <p style={{ maxWidth: "46ch", color: "#5a5754", marginBottom: 28 }}>
          Something broke on our end. Please try again in a moment.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            border: "1px solid #b68235",
            background: "transparent",
            color: "#7d5411",
            borderRadius: 4,
            padding: "10px 24px",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
