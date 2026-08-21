import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Magnetic } from "@/components/motion/magnetic";
import { profile } from "@/data/profile";

export function ContactPreview() {
  return (
    <section className="border-t border-white/10 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 sm:p-12 lg:p-16">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Contact
            </p>

            <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
              Have an interesting problem to solve?
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
              {profile.availability}
            </p>

            <div className="mt-8">
              <Magnetic>
                <Link
                  href="/contact"
                  className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-80"
                >
                  Start a conversation
                </Link>
              </Magnetic>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}