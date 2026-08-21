"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navigation } from "@/data/navigation";
import { MobileMenu } from "./mobile-menu";

export function Navbar() {
  const pathname = usePathname();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4 lg:px-6">
      <div className="mx-auto max-w-7xl">
        <nav
          aria-label="Primary navigation"
          className={`relative flex min-h-14 items-center justify-between rounded-full border px-2.5 py-2 transition-all duration-500 sm:min-h-15 sm:px-3 ${
            hasScrolled
              ? "border-white/[0.14] bg-black/80 shadow-[0_12px_40px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
              : "border-white/[0.08] bg-black/45 backdrop-blur-xl"
          }`}
        >
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-2.5 rounded-full px-1.5 py-1.5 sm:gap-3"
            aria-label="Ashish Patra home"
          >
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] font-['Space_Grotesk'] text-[11px] font-medium tracking-tight text-white transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/[0.08] sm:size-9 sm:text-xs"
            >
              AP
            </span>

            <span className="hidden truncate text-sm font-medium tracking-[-0.01em] text-zinc-300 transition-colors duration-300 group-hover:text-white sm:block">
              Ashish Patra
            </span>
          </Link>

          <div className="absolute left-1/2 hidden -translate-x-1/2 md:flex">
            <div className="flex items-center rounded-full border border-white/[0.06] bg-white/[0.02] p-1">
              {navigation.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-[13px] transition-colors duration-300 lg:px-4 ${
                      isActive
                        ? "text-white"
                        : "text-zinc-500 hover:text-zinc-200"
                    }`}
                  >
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 -z-0 rounded-full border border-white/[0.08] bg-white/[0.06]"
                      />
                    ) : null}

                    <span className="relative z-10">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Link
              href="/contact"
              className="group hidden items-center gap-2 rounded-full border border-white/[0.08] bg-white px-3.5 py-2 text-[12px] font-medium text-black transition-all duration-300 hover:border-white hover:bg-zinc-200 sm:inline-flex lg:px-4 lg:text-[13px]"
            >
              Let&apos;s Connect

              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>

            <MobileMenu items={navigation} />
          </div>
        </nav>
      </div>
    </header>
  );
}