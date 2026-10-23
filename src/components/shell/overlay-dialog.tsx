"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Native <dialog> driven by React state: focus trapping, Escape and the top layer come from the browser.
 * Clicking the backdrop closes it.
 */
export function OverlayDialog({
  open,
  onClose,
  label,
  className,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={cn(
        "m-auto w-[min(640px,calc(100vw-2rem))] max-w-none overflow-visible bg-transparent p-0 text-ink backdrop:bg-transparent",
        className,
      )}
    >
      {open ? children : null}
    </dialog>
  );
}
