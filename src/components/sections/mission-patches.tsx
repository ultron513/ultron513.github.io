import { PatchGallery } from "@/components/certificates/patch-gallery";
import { certifications } from "@/content";

import { Section } from "./section";

export function MissionPatches() {
  return (
    <Section
      id="patches"
      title="Mission patches"
      intro="Certifications earned along the way. Select a patch to see the certificate."
    >
      <PatchGallery certifications={certifications} />
    </Section>
  );
}
