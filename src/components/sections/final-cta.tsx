import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Magnetic } from "@/components/motion/magnetic";
import { profile } from "@/data/profile";

export function FinalCta() {
  return (
    <section className="border-t border-white/10 px-6 py-24 sm:py-32">
      <FadeIn>
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            {profile.shortName}
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.03em] sm:text-7xl">
            Let&apos;s build something worth shipping.
          </h2>

          <div className="mt-10 flex justify-center">
            <Magnetic>
              <Link
                href="/contact"
                className="inline-flex rounded-full border border-white/10 bg-white px-7 py-3.5 text-sm font-medium text-black transition-opacity hover:opacity-80"
              >
                Get in touch
              </Link>
            </Magnetic>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}