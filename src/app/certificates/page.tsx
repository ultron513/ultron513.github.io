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
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-white"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          >
            ←
          </span>
          Back home
        </Link>

        <header className="mt-14 max-w-5xl">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-white/30"
            />

            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-zinc-600">
              Credentials
            </p>
          </div>

          <h1 className="mt-6 text-5xl font-medium leading-[0.98] tracking-[-0.05em] sm:text-7xl">
            Certifications.
          </h1>

          <p className="mt-7 max-w-3xl text-base leading-8 text-zinc-500 sm:text-lg">
            Industry-recognized learning across artificial intelligence,
            cybersecurity, Python automation, cloud, and geospatial analysis.
          </p>
        </header>

        <section className="mt-16">
          <CertificateGrid
            certificates={certifications}
          />
        </section>
      </div>
    </main>
  );
}