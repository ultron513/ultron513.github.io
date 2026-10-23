/** Top-of-page header for inner pages: small context line, h1 and a lead paragraph. */
export function PageHeader({
  context,
  title,
  lead,
  id,
}: {
  context: string;
  title: string;
  lead?: string;
  id?: string;
}) {
  return (
    <header className="max-w-2xl">
      <p className="font-mono text-xs text-faint">{context}</p>
      <h1 id={id} className="mt-3 font-display text-3xl text-ink">
        {title}
      </h1>
      {lead ? <p className="mt-4 text-lg text-muted">{lead}</p> : null}
    </header>
  );
}
