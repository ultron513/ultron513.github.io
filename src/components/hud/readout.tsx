import { cn } from "@/lib/utils";

/** A HUD label/value pair. Labels are sentence case in mono; values carry the weight. */
export function Readout({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <dt className="font-mono text-xs text-faint">{label}</dt>
      <dd className="text-sm text-ink">{value}</dd>
    </div>
  );
}
