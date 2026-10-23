"use client";

import type { Experience } from "@/content";

export default function Space({ item }: { item: Experience }) {
  return (
    <section
      aria-label="Interior"
      className="mx-auto max-w-6xl px-5"
      data-placeholder={item.slug}
    />
  );
}
