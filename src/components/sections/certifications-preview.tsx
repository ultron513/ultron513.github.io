import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { certifications } from "@/data/certifications";

export function CertificationsPreview() {
  return (
    <section className="border-t border-white/10 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Certifications
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Continuous learning.
              </h2>
            </div>

            <Link
              href="/certificates"
              className="text-sm text-zinc-500 transition-colors hover:text-white"
            >
              View credentials →
            </Link>
          </div>
        </FadeIn>

        <Stagger className="mt-14 flex flex-wrap gap-3">
          {certifications.map((certificate) => (
            <StaggerItem key={certificate.title}>
              <span className="inline-flex rounded-full border border-white/10 px-5 py-3 text-sm text-zinc-400">
                {certificate.title}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}