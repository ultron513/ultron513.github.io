import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { certifications } from "@/data/certifications";

export function CertificationsPreview() {
  return (
    <section className="relative border-t border-white/[0.08] px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-white/30"
                />

                <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-zinc-600">
                  06 / Certifications
                </p>
              </div>

              <h2 className="mt-6 max-w-3xl text-4xl font-medium leading-[1.04] tracking-[-0.035em] sm:text-5xl">
                Continuous
                <span className="text-zinc-600">
                  {" "}
                  learning.
                </span>
              </h2>
            </div>

            <Link
              href="/certificates"
              className="group inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-white"
            >
              View credentials
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </FadeIn>

        <Stagger className="mt-14 flex flex-wrap gap-2.5">
          {certifications.map((certificate) => (
            <StaggerItem key={certificate.title}>
              <Link
                href="/certificates"
                className="group inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.015] px-5 py-3 text-sm text-zinc-500 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.035] hover:text-zinc-200"
              >
                <span className="size-1.5 rounded-full bg-zinc-700 transition-colors group-hover:bg-white" />
                {certificate.title}
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}