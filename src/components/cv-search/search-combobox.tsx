"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type SearchItem = {
  id: string;
  label: string;
  /** Short context shown on the right, e.g. "Job space". */
  hint?: string;
  /** Extra words that should match, e.g. a company name. */
  keywords?: string;
};

export function filterItems<T extends SearchItem>(items: T[], query: string): T[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return items;
  return items.filter((item) => {
    const haystack = `${item.label} ${item.keywords ?? ""} ${item.hint ?? ""}`.toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}

/**
 * Accessible search box with a suggestion list (WAI-ARIA combobox pattern).
 * Shared by the CV console (spec §6) and the Ctrl/Cmd+K station palette (spec §3).
 */
export function SearchCombobox<T extends SearchItem>({
  items,
  label,
  placeholders,
  onSelect,
  onSubmit,
  autoFocus,
  showAllWhenEmpty = false,
  className,
  inputClassName,
  listClassName,
  name = "q",
}: {
  items: T[];
  label: string;
  placeholders: string[];
  onSelect: (item: T) => void;
  onSubmit?: (query: string) => void;
  autoFocus?: boolean;
  showAllWhenEmpty?: boolean;
  className?: string;
  inputClassName?: string;
  listClassName?: string;
  name?: string;
}) {
  const id = useId();
  const listId = `${id}-list`;
  const inputRef = useRef<HTMLInputElement>(null);
  const reduced = usePrefersReducedMotion();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(showAllWhenEmpty);
  const [active, setActive] = useState(0);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const results = useMemo(() => {
    if (!query.trim() && !showAllWhenEmpty) return [];
    return filterItems(items, query).slice(0, 8);
  }, [items, query, showAllWhenEmpty]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  // Idle placeholder cycles through example queries (spec §6, state 1).
  useEffect(() => {
    if (reduced || placeholders.length < 2) return;
    const timer = window.setInterval(
      () => setPlaceholderIndex((i) => (i + 1) % placeholders.length),
      2600,
    );
    return () => window.clearInterval(timer);
  }, [reduced, placeholders.length]);

  const expanded = open && results.length > 0;

  function choose(item: T) {
    onSelect(item);
    setOpen(showAllWhenEmpty);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (event.key === "Enter") {
      if (expanded && results[active]) {
        event.preventDefault();
        choose(results[active]);
      } else if (onSubmit) {
        event.preventDefault();
        onSubmit(query);
      }
    } else if (event.key === "Escape" && expanded && !showAllWhenEmpty) {
      event.stopPropagation();
      setOpen(false);
    }
  }

  return (
    <div className={cn("relative", className)}>
      <label htmlFor={`${id}-input`} className="sr-only">
        {label}
      </label>
      <input
        ref={inputRef}
        id={`${id}-input`}
        name={name}
        type="search"
        role="combobox"
        autoComplete="off"
        spellCheck={false}
        aria-autocomplete="list"
        aria-expanded={expanded}
        aria-controls={listId}
        aria-activedescendant={expanded ? `${id}-opt-${active}` : undefined}
        placeholder={placeholders[placeholderIndex]}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(showAllWhenEmpty), 120)}
        onKeyDown={onKeyDown}
        className={cn(
          "w-full bg-transparent font-mono text-ink placeholder:text-faint focus:outline-none [&::-webkit-search-cancel-button]:hidden",
          inputClassName,
        )}
      />
      <ul
        id={listId}
        role="listbox"
        aria-label={`${label} suggestions`}
        hidden={!expanded}
        className={cn("overflow-hidden", listClassName)}
      >
        {results.map((item, index) => (
          <li
            key={item.id}
            id={`${id}-opt-${index}`}
            role="option"
            aria-selected={index === active}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => choose(item)}
            onMouseMove={() => setActive(index)}
            className={cn(
              "flex cursor-pointer items-center justify-between gap-4 px-4 py-2.5 text-sm",
              index === active ? "bg-line text-ink" : "text-muted",
            )}
          >
            <span className="min-w-0 truncate">{item.label}</span>
            {item.hint ? (
              <span className="shrink-0 font-mono text-xs text-faint">{item.hint}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
