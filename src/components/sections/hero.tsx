import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Magnetic } from "@/components/motion/magnetic";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden px-5 pb-8 pt-28 sm:px-6 sm:pb-10 sm:pt-32 lg:pb-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-[34%] h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-[100px] sm:h-[34rem] sm:w-[34rem] sm:blur-[120px]" />

        <div className="absolute left-[5%] top-[27%] h-16 w-16 rounded-full border border-white/[0.055] sm:left-[8%] sm:h-24 sm:w-24" />

        <div className="absolute right-[4%] top-[17%] h-24 w-24 rounded-full border border-white/[0.035] sm:right-[9%] sm:h-40 sm:w-40" />

        <div className="absolute bottom-[14%] left-[20%] h-px w-[60%] bg-gradient-to-r from-transparent via-white/[0.09] to-transparent sm:left-[34%] sm:w-[32%]" />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        <div className="grid min-h-[calc(100svh-7.5rem)] grid-rows-[1fr_auto] sm:min-h-[calc(100svh-9rem)]">
          <div className="flex items-end">
            <Stagger className="max-w-6xl pb-7 sm:pb-12 lg:pb-16">
              <StaggerItem>
                <div className="flex items-center gap-3 sm:gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-7 bg-white/30 sm:w-14"
                  />

                  <p className="max-w-[80vw] text-[9px] font-medium uppercase tracking-[0.28em] text-zinc-500 sm:text-xs sm:tracking-[0.35em]">
                    {profile.roles.join(" • ")}
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <h1 className="mt-6 max-w-6xl text-[clamp(3rem,13vw,8.6rem)] font-medium leading-[0.9] tracking-[-0.06em] text-white sm:mt-7">
                  Building
                  <br />
                  <span className="text-zinc-500">
                    intelligent systems.
                  </span>
                </h1>
              </StaggerItem>

              <StaggerItem>
                <div className="mt-7 max-w-2xl sm:mt-8">
                  <p className="text-[15px] leading-7 text-zinc-400 sm:text-lg sm:leading-8">
                    {profile.introduction}
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="mt-8 flex flex-wrap items-center gap-2.5 sm:mt-9 sm:gap-3">
                  <Magnetic>
                    <Link
                      href="/projects"
                      className="group inline-flex min-h-11 items-center gap-3 rounded-full bg-white px-5 text-sm font-medium text-black transition-all duration-300 hover:px-6 sm:min-h-12 sm:px-6"
                    >
                      Explore Projects

                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </Magnetic>

                  <Magnetic>
                    <Link
                      href="/contact"
                      className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-white/10 bg-white/[0.025] px-5 text-sm text-zinc-300 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white sm:min-h-12 sm:px-6"
                    >
                      Get in Touch

                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        ↗
                      </span>
                    </Link>
                  </Magnetic>

                  <Link
                    href="/documents/Ashish_Patra_CV.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="px-2 py-3 text-sm text-zinc-600 transition-colors hover:text-zinc-300 sm:py-3.5"
                  >
                    View CV
                  </Link>
                </div>
              </StaggerItem>
            </Stagger>
          </div>

          <FadeIn delay={0.2}>
            <div className="border-t border-white/[0.08] pt-4 sm:pt-5">
              <div className="grid grid-cols-3 gap-3 sm:gap-6">
                <div>
                  <p className="font-['Space_Grotesk'] text-2xl font-medium tracking-[-0.04em] text-white sm:text-4xl">
                    2
                  </p>

                  <p className="mt-1 max-w-[8rem] text-[9px] uppercase leading-4 tracking-[0.16em] text-zinc-600 sm:max-w-none sm:text-xs sm:tracking-[0.2em]">
                    Undergraduate degrees
                  </p>
                </div>

                <div>
                  <p className="font-['Space_Grotesk'] text-2xl font-medium tracking-[-0.04em] text-white sm:text-4xl">
                    6
                  </p>

                  <p className="mt-1 max-w-[8rem] text-[9px] uppercase leading-4 tracking-[0.16em] text-zinc-600 sm:max-w-none sm:text-xs sm:tracking-[0.2em]">
                    Professional experiences
                  </p>
                </div>

                <div>
                  <p className="font-['Space_Grotesk'] text-2xl font-medium tracking-[-0.04em] text-white sm:text-4xl">
                    6
                  </p>

                  <p className="mt-1 max-w-[8rem] text-[9px] uppercase leading-4 tracking-[0.16em] text-zinc-600 sm:max-w-none sm:text-xs sm:tracking-[0.2em]">
                    Featured projects
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-7 right-6 hidden items-center gap-3 xl:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-700">
          Scroll
        </span>

        <span className="h-px w-10 bg-white/10" />
      </div>
    </section>
  );
}