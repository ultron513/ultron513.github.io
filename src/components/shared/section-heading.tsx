type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "mx-auto text-center"
      : "text-left";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-6 text-base leading-7 text-zinc-400 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}