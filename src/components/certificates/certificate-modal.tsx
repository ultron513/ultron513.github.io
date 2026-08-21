"use client";

import { useEffect } from "react";

type CertificateModalData = {
  title: string;
  issuer: string;
  year?: string;
  credentialId?: string;
  image?: string;
};

type CertificateModalProps = {
  certificate: CertificateModalData | null;
  onClose: () => void;
};

export function CertificateModal({
  certificate,
  onClose,
}: CertificateModalProps) {
  useEffect(() => {
    if (!certificate) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [certificate, onClose]);

  if (!certificate) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-5 backdrop-blur-md sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${certificate.title} certificate`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-auto rounded-3xl border border-white/10 bg-[#0b0b0b] shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close certificate preview"
          className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border border-white/10 bg-black/70 text-zinc-400 transition-colors hover:text-white"
        >
          ×
        </button>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="min-h-[18rem] bg-black p-4 sm:p-6 lg:p-8">
            {certificate.image ? (
              <img
                src={certificate.image}
                alt={`${certificate.title} certificate`}
                className="h-full max-h-[70vh] w-full object-contain"
              />
            ) : (
              <div className="flex aspect-video h-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02]">
                <span className="text-xs uppercase tracking-[0.3em] text-zinc-700">
                  Certificate preview
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center border-t border-white/10 p-7 sm:p-9 lg:border-l lg:border-t-0">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
              {certificate.issuer}
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight">
              {certificate.title}
            </h2>

            <div className="mt-7 space-y-3 text-sm text-zinc-500">
              {certificate.year ? (
                <p>
                  <span className="text-zinc-700">Year:</span>{" "}
                  {certificate.year}
                </p>
              ) : null}

              {certificate.credentialId ? (
                <p className="break-all">
                  <span className="text-zinc-700">Credential ID:</span>{" "}
                  {certificate.credentialId}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}