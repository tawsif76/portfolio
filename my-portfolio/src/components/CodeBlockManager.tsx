"use client";

import { useEffect } from "react";
import { Copy, Check } from "lucide-react";
import ReactDOM from "react-dom/client";

export default function CodeBlockManager() {
  useEffect(() => {
    // Find all <pre> elements inside the blog content
    const preElements = document.querySelectorAll(".prose pre");

    preElements.forEach((pre) => {
      // Avoid adding multiple buttons if this effect runs twice
      if (pre.querySelector(".copy-btn-container")) return;

      // Create a container for our React button
      const buttonContainer = document.createElement("div");
      buttonContainer.className = "copy-btn-container";

      // Append the container to the <pre> block
      pre.appendChild(buttonContainer);

      // Render the button using React Portal logic
      const root = ReactDOM.createRoot(buttonContainer);
      root.render(<CopyButton preElement={pre as HTMLElement} />);
    });
  }, []);

  return null;
}

// Internal Button Component
function CopyButton({ preElement }: { preElement: HTMLElement }) {
  const [copied, setCopied] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => setMounted(true), []);

  const handleCopy = async () => {
    const code = preElement.querySelector("code")?.innerText || "";
    if (!code) return;

    try {
      // Check if the Clipboard API is supported and available
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
      } else {
        // Fallback for non-secure contexts (HTTP)
        const textArea = document.createElement("textarea");
        textArea.value = code;

        // CHANGED: Use 'fixed' instead of 'absolute' to prevent scrolling to top
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        try {
          document.execCommand("copy");
        } catch (err) {
          console.error("Fallback: Oops, unable to copy", err);
        }

        document.body.removeChild(textArea);
      }

      // Success state
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!mounted) return null;

  return (
    // ... rest of your JSX
    <button
      onClick={handleCopy}
      className={`copy-btn ${copied ? "copied" : ""}`}
      aria-label="Copy code"
    >
      {copied ? (
        <>
          <Check size={14} />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy size={12} strokeWidth={2} />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

import React from "react";
