type CertificateCardProps = {
  title: string;
  issuer: string;
  year?: string;
  credentialId?: string;
  image?: string;
  onClick?: () => void;
};

export function CertificateCard({
  title,
  issuer,
  year,
  credentialId,
  image,
  onClick,
}: CertificateCardProps) {
  const content = (
    <>
      <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
        {image ? (
          <img
            src={image}
            alt={`${title} certificate`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-white/[0.06] to-transparent px-6 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-700">
              Certificate
            </span>

            <span className="mt-3 max-w-xs text-sm text-zinc-600">
              Certificate image
            </span>
          </div>
        )}
      </div>

      <div className="mt-6">
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
          {issuer}
        </p>

        <h3 className="mt-3 text-xl font-medium tracking-tight text-zinc-200">
          {title}
        </h3>

        <div className="mt-3 flex flex-wrap gap-3 text-xs text-zinc-600">
          {year ? <span>{year}</span> : null}
          {credentialId ? <span>Credential: {credentialId}</span> : null}
        </div>
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="group w-full text-left"
      >
        {content}
      </button>
    );
  }

  return <article className="group">{content}</article>;
}