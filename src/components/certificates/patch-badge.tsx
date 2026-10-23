import type { Certification } from "@/content";

/**
 * Original mission-patch badge per certificate category (spec §4 item 8). No issuer logos:
 * shape encodes the category, initials come from the certificate title.
 */
const SHAPES: Record<Certification["patch"], string> = {
  hex: "M60 6 106 33v54L60 114 14 87V33z",
  shield: "M60 6 104 20v38c0 28-19 46-44 56C35 104 16 86 16 58V20z",
  chevron: "M60 8 108 40 92 112H28L12 40z",
  circle: "M60 6a54 54 0 1 1 0 108A54 54 0 0 1 60 6z",
  diamond: "M60 4 116 60 60 116 4 60z",
};

function initials(title: string) {
  return title
    .replace(/&/g, "")
    .split(/\s+/)
    .filter((word) => /^[A-Z]/.test(word) && !["Google", "AWS"].includes(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

export function PatchBadge({
  certification,
  className,
}: {
  certification: Certification;
  className?: string;
}) {
  const path = SHAPES[certification.patch];
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={className}>
      <path d={path} fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="2.5" />
      <path
        d={path}
        fill="none"
        stroke="var(--border-strong)"
        strokeWidth="1"
        strokeDasharray="2 4"
        transform="translate(60 60) scale(0.82) translate(-60 -60)"
      />
      <circle
        cx="60"
        cy="60"
        r="26"
        fill="none"
        stroke="var(--accent-2)"
        strokeOpacity="0.6"
        strokeWidth="1.2"
      />
      <path
        d="M38 70c10-6 34-6 44 0"
        fill="none"
        stroke="var(--accent-2)"
        strokeOpacity="0.6"
        strokeWidth="1.2"
      />
      <text
        x="60"
        y="66"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="20"
        fontWeight="600"
        fill="var(--text)"
      >
        {initials(certification.title)}
      </text>
    </svg>
  );
}
