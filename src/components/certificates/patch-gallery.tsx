"use client";

import { useState } from "react";

import { OverlayDialog } from "@/components/shell/overlay-dialog";
import type { Certification } from "@/content";

import { PatchBadge } from "./patch-badge";

/** Patches that open the certificate image in a dialog. */
export function PatchGallery({ certifications }: { certifications: Certification[] }) {
  const [open, setOpen] = useState<Certification | null>(null);
  return (
    <>
      <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {certifications.map((item) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => setOpen(item)}
              className="group flex h-full w-full flex-col items-center rounded-md p-4 text-center transition-colors hover:bg-line"
            >
              <PatchBadge
                certification={item}
                className="size-24 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-4deg]"
              />
              <span className="mt-4 font-display text-sm text-ink">{item.title}</span>
              <span className="mt-1 text-xs text-muted">{item.issuer}</span>
              <span className="sr-only">, view certificate</span>
            </button>
          </li>
        ))}
      </ul>
      <OverlayDialog
        open={open !== null}
        onClose={() => setOpen(null)}
        label={open ? `${open.title} certificate` : "Certificate"}
        className="w-[min(960px,calc(100vw-2rem))]"
      >
        {open ? (
          <figure className="hud glass rounded-md p-3 shadow-depth">
            <img
              src={open.image}
              alt={`${open.title} certificate issued by ${open.issuer}`}
              width={1287}
              height={994}
              className="w-full rounded-sm"
            />
            <figcaption className="flex items-center justify-between gap-4 px-2 pb-1 pt-3 text-sm">
              <span>
                <span className="text-ink">{open.title}</span>{" "}
                <span className="text-muted">· {open.issuer}</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="rounded-full border border-line px-3 py-1 text-muted hover:text-ink"
              >
                Close
              </button>
            </figcaption>
          </figure>
        ) : null}
      </OverlayDialog>
    </>
  );
}
