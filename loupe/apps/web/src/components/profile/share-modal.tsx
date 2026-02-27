"use client";

// ─────────────────────────────────────────────────────────────────────────────
// ShareModal — Quote selection + share export flow
//
// Flow:
//   1. User sees 3 quote options extracted from their profile
//   2. User selects one (radio-style)
//   3. Card preview updates in real-time
//   4. User taps "Copy image" or "Share" to export
//
// Export methods:
//   - Copy to clipboard (primary — works everywhere)
//   - Native share (if Web Share API available)
//   - Download as image (fallback)
//
// Uses html2canvas to render the ShareCard as a PNG.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShareCard } from "./share-card";
import type { ShareQuote } from "@/lib/share-quotes";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotes: ShareQuote[];
  lensColour: string;
  lensName: string;
}

export function ShareModal({
  isOpen,
  onClose,
  quotes,
  lensColour,
  lensName,
}: ShareModalProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const selectedQuote = quotes[selectedIndex]?.text ?? "";

  const exportCard = useCallback(async (): Promise<Blob | null> => {
    if (!cardRef.current) return null;

    try {
      // Dynamic import — only load html2canvas when needed
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
        logging: false,
      });

      return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), "image/png", 1.0);
      });
    } catch {
      return null;
    }
  }, []);

  const handleCopyImage = useCallback(async () => {
    setExporting(true);
    try {
      const blob = await exportCard();
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Clipboard API not supported — fallback to download
      handleDownload();
    }
    setExporting(false);
  }, [exportCard]);

  const handleShare = useCallback(async () => {
    setExporting(true);
    try {
      const blob = await exportCard();
      if (blob && navigator.share) {
        const file = new File([blob], "loupe-share.png", { type: "image/png" });
        await navigator.share({
          text: `"${selectedQuote}" — Which lens do you see the world through?`,
          url: "https://loupe.app",
          files: [file],
        });
      } else {
        handleCopyImage();
      }
    } catch {
      // Share cancelled or failed — no action needed
    }
    setExporting(false);
  }, [exportCard, selectedQuote, handleCopyImage]);

  const handleDownload = useCallback(async () => {
    setExporting(true);
    try {
      const blob = await exportCard();
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "loupe-share.png";
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {
      // Download failed
    }
    setExporting(false);
  }, [exportCard]);

  const canShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-modal-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-x-4 bottom-4 top-auto z-50 mx-auto max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-warm-200/60 px-5 py-4">
              <h2 id="share-modal-title" className="font-serif text-lg font-medium text-warm-900">
                Share your lens
              </h2>
              <button
                onClick={onClose}
                aria-label="Close share modal"
                className="flex h-8 w-8 items-center justify-center rounded-full text-warm-400 transition-colors hover:bg-warm-100 hover:text-warm-600"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 4L12 12M12 4L4 12" />
                </svg>
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-5 py-4">
              {/* Card preview */}
              <div className="mb-5 flex justify-center">
                <div className="overflow-hidden rounded-xl shadow-lg" style={{ transform: "scale(0.65)", transformOrigin: "top center", marginBottom: "-120px" }}>
                  <ShareCard
                    ref={cardRef}
                    quote={selectedQuote}
                    lensColour={lensColour}
                    lensName={lensName}
                  />
                </div>
              </div>

              {/* Quote selection */}
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-warm-400">
                Choose your quote
              </p>
              <div className="space-y-2" role="radiogroup" aria-label="Choose your quote">
                {quotes.map((quote, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    role="radio"
                    aria-checked={selectedIndex === index}
                    className={`w-full rounded-xl border p-3 text-left transition-all ${
                      selectedIndex === index
                        ? "border-warm-900 bg-warm-50"
                        : "border-warm-200/60 hover:border-warm-300"
                    }`}
                  >
                    <span className="text-[10px] font-medium uppercase tracking-wider text-warm-400">
                      {quote.source}
                    </span>
                    <p className="mt-0.5 text-sm leading-relaxed text-warm-700">
                      &ldquo;{quote.text}&rdquo;
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 border-t border-warm-200/60 px-5 py-4">
              {canShare ? (
                <button
                  onClick={handleShare}
                  disabled={exporting}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-warm-900 px-4 py-3 text-sm font-medium text-cream transition-all hover:bg-warm-800 active:scale-[0.98] disabled:opacity-50"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8V13H12V8" />
                    <path d="M8 2V10" />
                    <path d="M5 5L8 2L11 5" />
                  </svg>
                  {exporting ? "Preparing…" : "Share"}
                </button>
              ) : (
                <button
                  onClick={handleCopyImage}
                  disabled={exporting}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-warm-900 px-4 py-3 text-sm font-medium text-cream transition-all hover:bg-warm-800 active:scale-[0.98] disabled:opacity-50"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="5" width="9" height="9" rx="1" />
                    <path d="M2 11V2.5C2 2.22 2.22 2 2.5 2H11" />
                  </svg>
                  {copied ? "Copied!" : exporting ? "Preparing…" : "Copy image"}
                </button>
              )}
              <button
                onClick={handleDownload}
                disabled={exporting}
                className="flex items-center justify-center gap-1.5 rounded-full border border-warm-200/80 px-4 py-3 text-sm font-medium text-warm-600 transition-all hover:bg-warm-50 active:scale-[0.98] disabled:opacity-50"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 2V9.5" />
                  <path d="M4 7L7 10L10 7" />
                  <path d="M2 12H12" />
                </svg>
                Save
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
