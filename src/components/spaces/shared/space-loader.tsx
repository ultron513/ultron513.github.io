"use client";

import dynamic from "next/dynamic";

import type { Experience, SpaceKey } from "@/content";

/*
 * Each job space is its own chunk (spec §8): a visitor downloads only the space they open.
 * Spaces still prerender at build time, so their HTML is complete without JavaScript.
 */
const SPACES: Record<SpaceKey, React.ComponentType<{ item: Experience }>> = {
  race: dynamic(() => import("../race/race-space")),
  lab: dynamic(() => import("../lab/lab-space")),
  bi: dynamic(() => import("../bi/bi-space")),
  search: dynamic(() => import("../search/search-space")),
  campus: dynamic(() => import("../campus/campus-space")),
  terminal: dynamic(() => import("../terminal/terminal-space")),
};

export function SpaceLoader({ item }: { item: Experience }) {
  const Space = SPACES[item.space];
  return <Space item={item} />;
}
