import type { Metadata } from "next";
import Link from "next/link";

import { CertificateGrid } from "@/components/certificates/certificate-grid";
import { certifications } from "@/data/certifications";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "Certifications",
  "Professional certifications earned by Ashish Kumar Patra across artificial intelligence, cybersecurity, Python automation, cloud, and geospatial analysis.",
);

export default function CertificatesPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-6 pb-24 pt-36 text-[var(--foreground)]">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm text-zinc-600 transition-colors hover:text-white"
        >
          ← Back home
        </Link>

        <header className="mt-14">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Credentials
          </p>

          <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-7xl">
            Certifications
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
            Professional certifications spanning artificial intelligence,
            cybersecurity, Python automation, cloud, and geospatial analysis.
          </p>
        </header>

        <section className="mt-16">
          <CertificateGrid certificates={certifications} />
        </section>
      </div>
    </main>
  );
}