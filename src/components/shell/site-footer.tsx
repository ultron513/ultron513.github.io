import Link from "next/link";

import { navigation, profile } from "@/content";

import { Wordmark } from "./wordmark";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Wordmark className="inline-block rounded-sm" />
          <p className="mt-3 max-w-xs text-sm text-muted">
            Ground station for {profile.name}. Tracking from {profile.location.city},{" "}
            {profile.location.country}.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="font-mono text-xs text-faint">Navigate</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {[...navigation, { label: "CV", href: "/cv" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-mono text-xs text-faint">Channels</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={`mailto:${profile.contact.email}`} className="text-muted hover:text-ink">
                Email
              </a>
            </li>
            <li>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-muted hover:text-ink"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noreferrer"
                className="text-muted hover:text-ink"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 border-t border-line px-5 py-5 font-mono text-xs text-faint">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Static build, served from GitHub Pages</span>
      </div>
    </footer>
  );
}
