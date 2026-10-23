import { CvConsole } from "@/components/cv-search/cv-console";
import { Achievements } from "@/components/sections/achievements";
import { Comms } from "@/components/sections/comms";
import { FlightTraining } from "@/components/sections/flight-training";
import { Hero } from "@/components/sections/hero";
import { MissionPatches } from "@/components/sections/mission-patches";
import { OrbitSection } from "@/components/sections/orbit-section";
import { Satellites } from "@/components/sections/satellites";
import { SystemsPanel } from "@/components/sections/systems-panel";
import { TelemetryStrip } from "@/components/sections/telemetry-strip";
import { BootSequence } from "@/components/shell/boot-sequence";
import { getCvMeta } from "@/lib/cv-meta";

/** Mission Control (spec §4): one continuous descent from deep orbit to ground. */
export default function HomePage() {
  return (
    <>
      <BootSequence />
      <Hero />
      <TelemetryStrip />
      <OrbitSection />
      <Satellites />
      <SystemsPanel />
      <FlightTraining />
      <MissionPatches />
      <Achievements />
      <Comms console={<CvConsole meta={getCvMeta()} compact />} />
    </>
  );
}
