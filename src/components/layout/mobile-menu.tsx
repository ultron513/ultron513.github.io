"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";

type NavigationItem = {
  label: string;
  href: string;
};

type MobileMenuProps = {
  items: readonly NavigationItem[];
};

export function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label={
          isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((current) => !current)}
        className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] md:hidden sm:size-10"
      >
        <span
          aria-hidden="true"
          className={`absolute h-px w-3.5 bg-white transition-transform duration-300 sm:w-4 ${
            isOpen
              ? "rotate-45"
              : "-translate-y-1.5"
          }`}
        />

        <span
          aria-hidden="true"
          className={`absolute h-px w-3.5 bg-white transition-transform duration-300 sm:w-4 ${
            isOpen
              ? "-rotate-45"
              : "translate-y-1.5"
          }`}
        />
      </button>

      {isOpen ? (
        <div
          id={panelId}
          className="fixed inset-x-0 bottom-0 top-[64px] overflow-y-auto bg-black/96 backdrop-blur-2xl sm:top-[72px] md:hidden"
        >
          <div className="min-h-full px-5 pb-8 pt-8 sm:px-6 sm:pt-12">
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col"
            >
              {items.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-between gap-5 border-b border-white/10 py-5 sm:py-6"
                >
                  <span className="text-[clamp(1.75rem,8vw,3rem)] font-medium leading-none tracking-[-0.035em] text-zinc-300 transition-colors group-hover:text-white">
                    {item.label}
                  </span>

                  <span
                    aria-hidden="true"
                    className="shrink-0 text-[10px] tracking-[0.25em] text-zinc-700"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="pt-8">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="inline-flex min-h-12 items-center rounded-full bg-white px-6 text-sm font-medium text-black"
              >
                Let&apos;s Connect
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}