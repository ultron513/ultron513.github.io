"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/data/navigation";
import { MobileMenu } from "./mobile-menu";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto px-4 pt-4 sm:px-6">
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/70 px-4 py-3 backdrop-blur-xl sm:px-5"
        >
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Ashish Patra home"
          >
            <span
              aria-hidden="true"
              className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-sm font-semibold"
            >
              AP
            </span>

            <span className="hidden text-sm font-medium tracking-tight sm:block">
              Ashish Patra
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
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
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {item.label}

                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-4 -bottom-0.5 h-px bg-white/70"
                    />
                  ) : null}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-80 sm:inline-flex"
            >
              Let&apos;s Connect
            </Link>

            <MobileMenu items={navigation} />
          </div>
        </nav>
      </div>
    </header>
  );
}