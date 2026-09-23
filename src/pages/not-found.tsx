import { useEffect } from "react";
import { setPageMetadata } from "../lib/seo";

export default function NotFound() {
  useEffect(() => {
    setPageMetadata({
      title: "Page Not Found | Novix One",
      description: "The page you're looking for doesn't exist. Head back to Novix One's homepage for AI voice agents and automation for small businesses.",
    });
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        background: "#061426",
        color: "#f2f5f9",
        fontFamily: '"DM Sans", sans-serif',
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", margin: 0 }}>404 — Page not found</h1>
      <p style={{ color: "#99aabd", maxWidth: 480 }}>
        The page you're looking for doesn't exist or may have moved.
      </p>
      <a
        href="/"
        style={{
          marginTop: "0.5rem",
          background: "linear-gradient(135deg, #9bc8ed 0%, #86d5d0 100%)",
          color: "#061426",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Back to homepage
      </a>
    </main>
  );
}
