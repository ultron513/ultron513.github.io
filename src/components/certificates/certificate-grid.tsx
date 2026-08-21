"use client";

import { useState } from "react";

import { CertificateCard } from "./certificate-card";
import { CertificateModal } from "./certificate-modal";

export type Certificate = {
  title: string;
  issuer: string;
  category: string;
  year?: string;
  credentialId?: string;
  image?: string;
};

type CertificateGridProps = {
  certificates: readonly Certificate[];
};

export function CertificateGrid({
  certificates,
}: CertificateGridProps) {
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        {certificates.map((certificate) => (
          <CertificateCard
            key={`${certificate.issuer}-${certificate.title}`}
            {...certificate}
            onClick={() =>
              setSelectedCertificate(certificate)
            }
          />
        ))}
      </div>

      <CertificateModal
        certificate={selectedCertificate}
        onClose={() =>
          setSelectedCertificate(null)
        }
      />
    </>
  );
}