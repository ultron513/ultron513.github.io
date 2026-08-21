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
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((current) => !current)}
        className="relative flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] md:hidden"
      >
        <span
          aria-hidden="true"
          className={`absolute h-px w-4 bg-white transition-transform duration-300 ${
            isOpen ? "rotate-45" : "-translate-y-1.5"
          }`}
        />

        <span
          aria-hidden="true"
          className={`absolute h-px w-4 bg-white transition-transform duration-300 ${
            isOpen ? "-rotate-45" : "translate-y-1.5"
          }`}
        />
      </button>

      {isOpen ? (
        <div
          id={panelId}
          className="fixed inset-0 top-[76px] bg-black/95 backdrop-blur-xl md:hidden"
        >
          <div className="flex min-h-[calc(100vh-76px)] flex-col px-6 pb-8 pt-12">
            <nav aria-label="Mobile navigation" className="flex flex-col">
              {items.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-between border-b border-white/10 py-6"
                >
                  <span className="text-3xl font-medium tracking-tight text-zinc-300 transition-colors group-hover:text-white">
                    {item.label}
                  </span>

                  <span
                    aria-hidden="true"
                    className="text-sm text-zinc-600"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-10">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
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