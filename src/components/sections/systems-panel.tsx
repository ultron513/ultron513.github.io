import { skills } from "@/content";

import { Section } from "./section";

/** Skills as instrument clusters (spec §4 item 6). */
export function SystemsPanel() {
  return (
    <Section id="systems" title="Systems panel" intro="The toolkit, grouped the way it gets used.">
      <ul className="grid gap-5 md:grid-cols-2">
        {skills.map((group) => (
          <li key={group.category} className="hud glass rounded-md p-6 shadow-depth">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-lg text-ink">{group.category}</h3>
              <span className="font-mono text-xs text-faint">{group.skills.length} systems</span>
            </div>
            <p className="mt-1 text-sm text-muted">{group.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="group/chip flex items-center gap-2 rounded-sm border border-line px-2.5 py-1 text-sm text-muted transition-colors hover:border-accent hover:text-ink"
                >
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-line-strong transition-colors group-hover/chip:bg-accent"
                  />
                  {skill}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
