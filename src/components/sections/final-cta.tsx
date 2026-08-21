import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Magnetic } from "@/components/motion/magnetic";
import { profile } from "@/data/profile";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.08] px-6 py-32 sm:py-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[28rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_65%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
      />

      <FadeIn>
        <div className="relative mx-auto max-w-6xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-zinc-700">
            {profile.shortName}
          </p>

          <h2 className="mx-auto mt-7 max-w-5xl text-5xl font-medium leading-[0.96] tracking-[-0.055em] text-white sm:text-7xl lg:text-8xl">
            Let&apos;s build something
            <br />
            <span className="text-zinc-600">
              worth shipping.
            </span>
          </h2>

          <div className="mt-11 flex justify-center">
            <Magnetic>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full border border-white/[0.1] bg-white px-7 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:px-8 hover:bg-zinc-200"
              >
                Get in touch

                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Magnetic>
          </div>

          <p className="mt-8 text-xs text-zinc-800">
            {profile.location}
          </p>
        </div>
      </FadeIn>
    </section>
  );
}