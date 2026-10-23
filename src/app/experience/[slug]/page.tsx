import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SpaceLoader } from "@/components/spaces/shared/space-loader";
import { SpaceShell } from "@/components/spaces/shared/space-shell";
import { experience, getExperience } from "@/content";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return experience.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getExperience(slug);
  if (!item) return {};
  return pageMetadata({
    title: `${item.organization}: ${item.role}`,
    description: item.cvBullets[0],
    path: `/experience/${item.slug}`,
    og: `experience-${item.slug}`,
  });
}

export default async function SpacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getExperience(slug);
  if (!item) notFound();
  const aside =
    item.image && item.space === "race" ? (
      <figure>
        <img
          src={item.image}
          alt="Ashish in front of the championship wall at McLaren Racing"
          width={800}
          height={850}
          loading="lazy"
          className="w-full rounded-md border border-line object-cover"
        />
        <figcaption className="mt-2 font-mono text-xs text-faint">At McLaren Racing</figcaption>
      </figure>
    ) : null;
  return (
    <SpaceShell item={item} aside={aside}>
      <SpaceLoader item={item} />
    </SpaceShell>
  );
}
