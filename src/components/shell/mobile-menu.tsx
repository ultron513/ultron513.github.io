"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navigation } from "@/content";
import { cn } from "@/lib/utils";

import { OverlayDialog } from "./overlay-dialog";
import { isActive } from "./nav-utils";

export function MobileMenu({ onSearch }: { onSearch: () => void }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-haspopup="dialog"
        className="grid size-9 place-items-center rounded-full border border-line text-muted md:hidden"
      >
        <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4">
          <path d="M3 7h14M3 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      <OverlayDialog
        open={open}
        onClose={() => setOpen(false)}
        label="Menu"
        className="mt-4 mb-auto"
      >
        <div className="hud glass rounded-md p-3 shadow-depth">
          <div className="flex items-center justify-between px-2 pb-2">
            <span className="font-mono text-xs text-faint">Navigation</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full px-3 py-1 text-sm text-muted hover:text-ink"
            >
              Close
            </button>
          </div>
          <ul className="flex flex-col">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-sm px-3 py-3 font-display text-xl",
                    isActive(pathname, item.href)
                      ? "bg-line text-ink"
                      : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onSearch();
            }}
            className="mt-2 w-full rounded-sm border border-line px-3 py-3 text-left text-sm text-muted"
          >
            Search the station
          </button>
        </div>
      </OverlayDialog>
    </>
  );
}
