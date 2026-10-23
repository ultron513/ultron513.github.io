import { OrbitMap } from "@/components/orbit/orbit-map";

import { Section } from "./section";

export function OrbitSection() {
  return (
    <Section
      id="orbit"
      title="Orbit map"
      intro="Six modules, one per workplace. The inner ring holds the most recent. Hover or focus a station to read it, and select it to dock."
    >
      <OrbitMap headingId="orbit-title" />
    </Section>
  );
}
