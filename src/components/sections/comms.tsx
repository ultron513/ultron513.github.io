import { CvButton } from "@/components/shell/cv-button";
import { profile } from "@/content";

import { Section } from "./section";

const CHANNELS = [
  { label: "Email", value: profile.contact.email, href: `mailto:${profile.contact.email}` },
  { label: "LinkedIn", value: "ashish-patra-513akp", href: profile.contact.linkedin },
  { label: "GitHub", value: "ultron513", href: profile.contact.github },
];

/** CV console and comms (spec §4 item 10). */
export function Comms({ console: consoleSlot }: { console?: React.ReactNode }) {
  return (
    <Section
      id="comms"
      title="Open a channel"
      intro={profile.availability}
      className="pb-28 sm:pb-36"
    >
      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <div>
          {consoleSlot ?? (
            <CvButton className="inline-flex rounded-full bg-accent px-5 py-3 text-sm font-medium text-on-accent">
              Get the CV
            </CvButton>
          )}
        </div>
        <ul className="grid gap-3">
          {CHANNELS.map((channel) => (
            <li key={channel.label}>
              <a
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                className="hud glass group flex items-center justify-between gap-4 rounded-md px-5 py-4 transition-colors hover:border-line-strong"
              >
                <span>
                  <span className="block font-mono text-xs text-faint">{channel.label}</span>
                  <span className="mt-1 block break-all text-ink">{channel.value}</span>
                </span>
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="size-4 shrink-0 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                >
                  <path
                    d="M5 11 11 5M6 5h5v5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
