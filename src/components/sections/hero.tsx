import Link from "next/link";

import { UtcClock } from "@/components/hud/utc-clock";
import { CvButton } from "@/components/shell/cv-button";
import { HeroCanvas } from "@/components/three/hero-canvas";
import { profile } from "@/content";

import { RoleTicker } from "./role-ticker";

function coordinate(value: number, positive: string, negative: string) {
  return `${Math.abs(value).toFixed(2)}° ${value >= 0 ? positive : negative}`;
}

/** Launch hero (spec §4): 3D scene, HUD overlay, headline, intro and the three primary actions. */
export function Hero() {
  const { lat, lon, city } = profile.location;
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      <HeroCanvas className="absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-bg"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pb-14 pt-28 sm:pt-32">
        <dl className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs text-faint">
          <div className="flex gap-2">
            <dt>Mission</dt>
            <dd className="text-muted">{profile.shortName}</dd>
          </div>
          <div className="flex gap-2">
            <dt>Ground station</dt>
            <dd className="text-muted">
              {city}, {coordinate(lat, "N", "S")}, {coordinate(lon, "E", "W")}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt>Clock</dt>
            <dd className="text-muted">
              <UtcClock />
            </dd>
          </div>
        </dl>

        <div className="mt-auto max-w-[42rem] pt-16">
          <RoleTicker roles={profile.roles} />
          <h1
            id="hero-title"
            className="mt-6 font-display text-[clamp(2.5rem,1.4rem+4vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.035em] text-ink"
          >
            {profile.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{profile.introduction}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/projects/"
              className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-on-accent transition-[filter] hover:brightness-110"
            >
              Explore projects
            </Link>
            <Link
              href="#orbit"
              className="rounded-full border border-line-strong px-5 py-3 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Enter the orbit map
            </Link>
            <CvButton className="px-3 py-3 text-sm text-muted underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-current">
              Get the CV
            </CvButton>
          </div>
        </div>
      </div>
    </section>
  );
}
