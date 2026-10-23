"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navigation } from "@/content";
import { cn } from "@/lib/utils";

import { MobileMenu } from "./mobile-menu";
import { isActive } from "./nav-utils";
import { useShell } from "./shell-context";
import { ThemeDial } from "./theme-dial";
import { Wordmark } from "./wordmark";

/** Floating glass command bar (spec §3). */
export function SiteHeader() {
  const pathname = usePathname();
  const { openPalette, openCv } = useShell();
  const [scrolled, setScrolled] = useState(false);
  const [mac, setMac] = useState(false);

  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform));
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full border px-3 pl-4 transition-[background-color,border-color,box-shadow] duration-300",
          scrolled ? "glass border-line-strong shadow-depth" : "border-transparent",
        )}
      >
        <Wordmark className="rounded-full" />

        <ul className="hidden items-center gap-1 md:flex">
          {navigation.slice(1).map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm transition-colors",
                    active ? "bg-line text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            aria-label="Search the station"
            aria-keyshortcuts="Control+K Meta+K"
            className="hidden h-9 items-center gap-2 rounded-full border border-line px-3 text-sm text-muted transition-colors hover:border-line-strong hover:text-ink sm:flex"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="size-3.5">
              <circle
                cx="8.5"
                cy="8.5"
                r="5.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <kbd className="font-mono text-xs" suppressHydrationWarning>
              {mac ? "⌘K" : "Ctrl K"}
            </kbd>
          </button>
          <button
            type="button"
            onClick={openCv}
            data-cv-target
            className="h-9 rounded-full bg-accent px-4 text-sm font-medium text-on-accent transition-[filter] hover:brightness-110"
          >
            CV
          </button>
          <ThemeDial />
          <MobileMenu onSearch={openPalette} />
        </div>
      </nav>
    </header>
  );
}
