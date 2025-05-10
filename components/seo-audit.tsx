// components/seo-audit.tsx
"use client";

import { useEffect, useState } from "react";

interface SEOIssue {
  type: "error" | "warning";
  message: string;
  element?: string;
}

export default function SEOAuditTool() {
  const [issues, setIssues] = useState<SEOIssue[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Only run in development and client-side
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV !== "production"
    ) {
      const foundIssues: SEOIssue[] = [];

      // Check for H1 issues
      const h1Elements = document.querySelectorAll("h1");
      if (h1Elements.length === 0) {
        foundIssues.push({
          type: "error",
          message: "Page missing H1 heading",
        });
      } else if (h1Elements.length > 1) {
        foundIssues.push({
          type: "error",
          message: `Multiple H1 headings found (${h1Elements.length})`,
        });
      }

      // Check heading hierarchy
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      let lastLevel = 0;

      headings.forEach((heading) => {
        const level = parseInt(heading.tagName.substring(1));
        const text = heading.textContent?.trim() || "";

        if (level > lastLevel + 1 && lastLevel !== 0) {
          foundIssues.push({
            type: "warning",
            message: `Heading level skipped from H${lastLevel} to H${level}`,
            element: `"${text}"`,
          });
        }

        lastLevel = level;
      });

      // Check images for alt text
      const images = document.querySelectorAll("img");
      images.forEach((img) => {
        const src = img.getAttribute("src") || "";
        if (!img.hasAttribute("alt")) {
          foundIssues.push({
            type: "error",
            message: "Image missing alt text",
            element: src,
          });
        } else if (img.alt === "" && !img.closest("[aria-hidden='true']")) {
          // Empty alt is only ok for decorative images
          foundIssues.push({
            type: "warning",
            message: "Image has empty alt text but is not marked as decorative",
            element: src,
          });
        }
      });

      // Check external links
      const links = document.querySelectorAll("a[href^='http']");
      links.forEach((link) => {
        const href = link.getAttribute("href") || "";
        if (!link.getAttribute("rel")?.includes("noopener")) {
          foundIssues.push({
            type: "warning",
            message: "External link missing rel='noopener noreferrer'",
            element: href,
          });
        }
      });

      setIssues(foundIssues);
    }
  }, []);

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
      }}
    >
      <button
        onClick={() => setShowResults(!showResults)}
        style={{
          background: issues.length > 0 ? "#f44336" : "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "8px 16px",
          cursor: "pointer",
        }}
      >
        SEO: {issues.length} issues
      </button>

      {showResults && (
        <div
          style={{
            position: "fixed",
            bottom: "70px",
            right: "20px",
            width: "400px",
            maxHeight: "400px",
            overflowY: "auto",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "16px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h4 style={{ margin: "0 0 16px 0" }}>SEO Issues</h4>
          {issues.length === 0 ? (
            <p style={{ color: "#4caf50" }}>No issues found!</p>
          ) : (
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {issues.map((issue, index) => (
                <li
                  key={index}
                  style={{
                    padding: "8px 0",
                    borderBottom: "1px solid #eee",
                    color: issue.type === "error" ? "#f44336" : "#ff9800",
                  }}
                >
                  <strong>
                    {issue.type === "error" ? "Error" : "Warning"}
                  </strong>
                  : {issue.message}
                  {issue.element && (
                    <div style={{ fontSize: "12px", opacity: 0.8 }}>
                      {issue.element}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => setShowResults(false)}
            style={{
              background: "#ddd",
              border: "none",
              borderRadius: "4px",
              padding: "6px 12px",
              marginTop: "16px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
