import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Magnetic } from "@/components/motion/magnetic";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-3xl" />

        <div className="absolute left-[10%] top-[20%] h-40 w-40 rounded-full border border-white/[0.05]" />

        <div className="absolute bottom-[15%] right-[10%] h-56 w-56 rounded-full border border-white/[0.04]" />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        <Stagger className="max-w-5xl">
          <StaggerItem>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500 sm:text-sm">
              {profile.roles.join(" • ")}
            </p>
          </StaggerItem>

          <StaggerItem>
            <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
              {profile.headline.split(" ").slice(0, 2).join(" ")}
              <br />
              <span className="text-zinc-500">
                {profile.headline.split(" ").slice(2).join(" ")}
              </span>
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="mt-8 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
              {profile.introduction}
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-10 flex flex-wrap gap-4">
              <Magnetic>
                <Link
                  href="/projects"
                  className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-80"
                >
                  Explore Projects
                </Link>
              </Magnetic>

              <Magnetic>
                <Link
                  href="/contact"
                  className="inline-flex rounded-full border border-white/10 px-6 py-3 text-sm text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
                >
                  Get in Touch
                </Link>
              </Magnetic>
            </div>
          </StaggerItem>
        </Stagger>

        <FadeIn className="mt-20" delay={0.15}>
          <div className="grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
            <div>
              <p className="text-2xl font-semibold tracking-tight">
                {profile.education.length}
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                Undergraduate degrees
              </p>
            </div>

            <div>
              <p className="text-2xl font-semibold tracking-tight">6</p>
              <p className="mt-1 text-sm text-zinc-500">
                Professional experiences
              </p>
            </div>

            <div>
              <p className="text-2xl font-semibold tracking-tight">6</p>
              <p className="mt-1 text-sm text-zinc-500">
                Featured projects
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}