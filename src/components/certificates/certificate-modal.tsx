"use client";

import { useEffect } from "react";

type CertificateModalData = {
  title: string;
  issuer: string;
  category: string;
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${certificate.title} certificate`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative max-h-[92vh] w-full max-w-6xl overflow-auto rounded-[2rem] border border-white/[0.1] bg-[#090909] shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close certificate preview"
          className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border border-white/[0.1] bg-black/70 text-zinc-500 transition-colors hover:text-white"
        >
          ×
        </button>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
          <div className="bg-black p-4 sm:p-7 lg:p-8">
            {certificate.image ? (
              <img
                src={certificate.image}
                alt={`${certificate.title} certificate`}
                className="max-h-[72vh] w-full object-contain"
              />
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-[1.5rem] border border-white/[0.07] bg-white/[0.015]">
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-700">
                    Credential
                  </p>

                  <p className="mt-3 text-sm text-zinc-600">
                    No preview available
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center border-t border-white/[0.08] p-7 sm:p-10 lg:border-l lg:border-t-0">
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-700">
              {certificate.category}
            </p>

            <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-zinc-600">
              {certificate.issuer}
            </p>

            <h2 className="mt-5 text-3xl font-medium leading-tight tracking-[-0.03em] text-white">
              {certificate.title}
            </h2>

            {certificate.year ? (
              <p className="mt-7 text-sm text-zinc-600">
                {certificate.year}
              </p>
            ) : null}

            {certificate.credentialId ? (
              <p className="mt-2 break-all text-xs leading-6 text-zinc-700">
                Credential ID: {certificate.credentialId}
              </p>
            ) : null}

            <div className="mt-10 h-px w-12 bg-white/15" />
          </div>
        </div>
      </div>
    </div>
  );
}