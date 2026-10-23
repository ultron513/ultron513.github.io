"use client";

import { OverlayDialog } from "@/components/shell/overlay-dialog";
import { useShell } from "@/components/shell/shell-context";
import type { CvMeta } from "@/lib/cv-meta";

import { CvConsole } from "./cv-console";

/** The CV console as an overlay, opened from the nav's CV button (spec §6). */
export function CvOverlay({ meta }: { meta: CvMeta }) {
  const { panel, close } = useShell();
  return (
    <OverlayDialog
      open={panel === "cv"}
      onClose={close}
      label="CV console"
      className="w-[min(720px,calc(100vw-2rem))]"
    >
      <div className="relative">
        <button
          type="button"
          onClick={close}
          className="absolute right-4 top-4 z-10 rounded-full border border-line px-3 py-1 text-sm text-muted hover:text-ink"
        >
          Close
        </button>
        <CvConsole meta={meta} autoFocus />
      </div>
    </OverlayDialog>
  );
}
