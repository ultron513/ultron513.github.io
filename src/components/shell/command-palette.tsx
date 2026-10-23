"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { SearchCombobox, type SearchItem } from "@/components/cv-search/search-combobox";
import { experience, navigation, projects } from "@/content";
import { useTheme } from "@/lib/theme/theme-provider";

import { downloadCv } from "./download-cv";
import { OverlayDialog } from "./overlay-dialog";
import { useShell } from "./shell-context";

type PaletteItem = SearchItem & ({ href: string } | { action: "download-cv" | "toggle-theme" });

/** Ctrl/Cmd+K station palette: jump to any space, project or page (spec §3). */
export function CommandPalette() {
  const { panel, close } = useShell();
  const router = useRouter();
  const { theme, toggle } = useTheme();

  const items = useMemo<PaletteItem[]>(
    () => [
      ...experience.map((item) => ({
        id: `space-${item.slug}`,
        label: item.organization,
        hint: "Job space",
        keywords: `${item.role} ${item.space} ${item.location}`,
        href: `/experience/${item.slug}/`,
      })),
      {
        id: "action-cv",
        label: "Download CV",
        hint: "PDF",
        keywords: "resume curriculum vitae",
        action: "download-cv" as const,
      },
      ...navigation.map((item) => ({
        id: `page-${item.href}`,
        label: item.label,
        hint: "Page",
        href: item.href,
      })),
      { id: "page-cv", label: "CV console", hint: "Page", keywords: "resume", href: "/cv/" },
      ...projects.map((item) => ({
        id: `project-${item.slug}`,
        label: item.shortTitle,
        hint: "Project",
        keywords: `${item.title} ${item.category} ${item.technologies.join(" ")}`,
        href: `/projects/${item.slug}/`,
      })),
      {
        id: "action-theme",
        label: theme === "dark" ? "Switch to Daylight Orbit" : "Switch to Deep Space",
        hint: "Theme",
        keywords: "theme light dark mode",
        action: "toggle-theme" as const,
      },
    ],
    [theme],
  );

  function select(item: PaletteItem) {
    close();
    if ("href" in item) router.push(item.href);
    else if (item.action === "download-cv") downloadCv();
    else toggle();
  }

  return (
    <OverlayDialog
      open={panel === "palette"}
      onClose={close}
      label="Station search"
      className="mt-[12vh] mb-auto"
    >
      <div className="hud glass relative rounded-md shadow-depth">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute left-4 top-[1.15rem] size-4 text-faint"
        >
          <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <kbd className="pointer-events-none absolute right-4 top-4 hidden rounded-sm border border-line px-1.5 font-mono text-xs text-faint sm:block">
          Esc
        </kbd>
        <SearchCombobox
          items={items}
          label="Search the station"
          placeholders={[
            "Jump to a job space, project or page",
            "Try “mclaren”, “compiler” or “cv”",
          ]}
          onSelect={select}
          autoFocus
          showAllWhenEmpty
          inputClassName="border-b border-line py-4 pl-11 pr-16 text-base"
          listClassName="max-h-[min(55vh,28rem)] overflow-y-auto py-2"
        />
      </div>
    </OverlayDialog>
  );
}
