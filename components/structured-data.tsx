// components/structured-data.tsx (simplified)
"use client";

import { useEffect } from "react";

interface StructuredDataProps {
  data: Record<string, unknown>;
}

export default function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    // Create a script element
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);

    // Add it to the document head
    document.head.appendChild(script);

    // Clean up when the component unmounts
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [data]);

  // This component doesn't render anything visible
  return null;
}
