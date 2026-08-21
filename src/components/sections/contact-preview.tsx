import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Magnetic } from "@/components/motion/magnetic";
import { profile } from "@/data/profile";

export function ContactPreview() {
  return (
    <section className="relative border-t border-white/[0.08] px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[#080808] p-8 sm:p-12 lg:p-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/[0.025] blur-[100px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 h-px w-2/3 bg-gradient-to-r from-white/20 via-white/[0.05] to-transparent"
            />

            <div className="relative grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-4xl">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-white/30"
                  />

                  <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-zinc-600">
                    08 / Contact
                  </p>
                </div>

                <h2 className="mt-6 text-4xl font-medium leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl">
                  Have an interesting
                  <span className="text-zinc-600">
                    {" "}
                    problem to solve?
                  </span>
                </h2>

                <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-500 sm:text-lg">
                  {profile.availability}
                </p>
              </div>

              <Magnetic>
                <Link
                  href="/contact"
                  className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:px-7 hover:bg-zinc-200"
                >
                  Start a conversation

                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </Magnetic>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}