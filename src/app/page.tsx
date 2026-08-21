import { About } from "@/components/sections/about";
import { Achievements } from "@/components/sections/achievements";
import { CertificationsPreview } from "@/components/sections/certifications-preview";
import { ContactPreview } from "@/components/sections/contact-preview";
import { Education } from "@/components/sections/education";
import { ExperiencePreview } from "@/components/sections/experience-preview";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { Skills } from "@/components/sections/skills";
import { Scene } from "@/components/three/scene";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-screen">
        <Scene
          className="absolute inset-0 opacity-70"
          showParticles
          showShapes
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background)]" />
      </div>

      <div className="relative z-10">
        <Hero />
        <About />
        <ExperiencePreview />
        <ProjectsPreview />
        <Skills />
        <Education />
        <CertificationsPreview />
        <Achievements />
        <ContactPreview />
        <FinalCta />
      </div>
    </main>
  );
}