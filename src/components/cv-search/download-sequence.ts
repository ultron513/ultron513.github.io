"use client";

import { animate } from "framer-motion";

import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";

/*
 * Cosmetic "transmission" played after the real download has already started (spec §6, step 4):
 *  1. particles assemble into a page silhouette above the button,
 *  2. the page folds into a small capsule,
 *  3. the capsule launches along an arc to the nav's CV button.
 * Total ≤ 1.6 s. Everything is drawn in a throwaway fixed layer that removes itself.
 */

const PAGE = { w: 66, h: 86 };
const GRID = { cols: 5, rows: 7 };

function el(tag: string, style: Partial<CSSStyleDeclaration>): HTMLElement {
  const node = document.createElement(tag);
  Object.assign(node.style, style);
  return node;
}

export async function playTransmission(origin: DOMRect, host: Element): Promise<void> {
  const layer = el("div", { position: "fixed", inset: "0", pointerEvents: "none", zIndex: "90" });
  layer.setAttribute("aria-hidden", "true");
  host.append(layer);

  const pageX = origin.left + origin.width / 2 - PAGE.w / 2;
  const pageY = origin.top - PAGE.h - 18;

  // 1. Particles assemble into the page (0 → 520 ms).
  const particles: Promise<unknown>[] = [];
  for (let r = 0; r < GRID.rows; r++) {
    for (let c = 0; c < GRID.cols; c++) {
      const i = r * GRID.cols + c;
      const dot = el("span", {
        position: "absolute",
        left: "0",
        top: "0",
        width: "8px",
        height: "8px",
        borderRadius: "2px",
        background: "var(--accent)",
      });
      layer.append(dot);
      const angle = (i * 137.5 * Math.PI) / 180;
      const spread = 90 + (i % 7) * 18;
      const startX = origin.left + origin.width / 2 + Math.cos(angle) * spread;
      const startY = origin.top + origin.height / 2 + Math.sin(angle) * spread * 0.6;
      const endX = pageX + 4 + c * ((PAGE.w - 14) / (GRID.cols - 1));
      const endY = pageY + 6 + r * ((PAGE.h - 18) / (GRID.rows - 1));
      particles.push(
        animate(
          dot,
          { x: [startX, endX], y: [startY, endY], opacity: [0, 1], scale: [0.4, 1] },
          { duration: 0.42, delay: (i % 9) * 0.012, ease: EASE_OUT },
        ).finished,
      );
    }
  }
  await Promise.all(particles);

  // 2. Page silhouette replaces the particles, then folds into a capsule (520 → 900 ms).
  const page = el("div", {
    position: "absolute",
    left: `${pageX}px`,
    top: `${pageY}px`,
    width: `${PAGE.w}px`,
    height: `${PAGE.h}px`,
    borderRadius: "6px",
    background: "var(--accent)",
    boxShadow: "0 0 24px var(--glow)",
    clipPath: "polygon(0 0, 72% 0, 100% 22%, 100% 100%, 0 100%)",
  });
  layer.replaceChildren(page);
  await animate(
    page,
    {
      width: [PAGE.w, 30],
      height: [PAGE.h, 14],
      borderRadius: ["6px", "999px"],
      x: [0, (PAGE.w - 30) / 2],
      y: [0, (PAGE.h - 14) / 2],
      clipPath: [
        "polygon(0 0, 72% 0, 100% 22%, 100% 100%, 0 100%)",
        "polygon(0 0, 100% 0, 100% 0%, 100% 100%, 0 100%)",
      ],
    },
    { duration: 0.34, ease: EASE_IN_OUT },
  ).finished;

  // 3. Launch along an arc to the nav CV button (900 → 1500 ms).
  const target = document.querySelector("[data-cv-target]")?.getBoundingClientRect();
  if (target) {
    const fromX = pageX + (PAGE.w - 30) / 2;
    const fromY = pageY + (PAGE.h - 14) / 2;
    const toX = target.left + target.width / 2 - 15;
    const toY = target.top + target.height / 2 - 7;
    const peakY = Math.min(fromY, toY) - 120;
    await animate(
      page,
      {
        left: [`${fromX}px`, `${(fromX + toX) / 2}px`, `${toX}px`],
        top: [`${fromY}px`, `${peakY}px`, `${toY}px`],
        x: 0,
        y: 0,
        scale: [1, 0.85, 0.35],
        opacity: [1, 1, 0],
      },
      { duration: 0.6, ease: EASE_IN_OUT, times: [0, 0.5, 1] },
    ).finished;
    const button = document.querySelector<HTMLElement>("[data-cv-target]");
    button?.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.12)" }, { transform: "scale(1)" }],
      { duration: 260, easing: "ease-out" },
    );
  } else {
    await animate(page, { opacity: 0, y: -40 }, { duration: 0.3 }).finished;
  }
  layer.remove();
}
