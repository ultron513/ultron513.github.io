import type { Metadata } from "next";

import { PatchGallery } from "@/components/certificates/patch-gallery";
import { PageHeader } from "@/components/sections/page-header";
import { certifications } from "@/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Certificates",
  description:
    "Certifications earned by Ashish Kumar Patra: Google AI Essentials, Google Cybersecurity, Google IT Automation with Python, AWS S3 Basics and GIS Mapping & Spatial Analysis.",
  path: "/certificates",
  og: "certificates",
});

export default function CertificatesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-28 sm:pt-32">
      <PageHeader
        context={`${certifications.length} patches`}
        title="Mission patches"
        lead="Each patch stands for one certification. Select a patch to see the certificate."
      />
      <div className="mt-12">
        <PatchGallery certifications={certifications} />
      </div>
    </div>
  );
}
