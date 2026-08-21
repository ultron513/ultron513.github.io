type CertificateCardProps = {
  title: string;
  issuer: string;
  category: string;
  year?: string;
  credentialId?: string;
  image?: string;
  onClick?: () => void;
};

export function CertificateCard({
  title,
  issuer,
  category,
  year,
  credentialId,
  image,
  onClick,
}: CertificateCardProps) {
  const content = (
    <>
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-black">
        {image ? (
          <>
            <img
              src={image}
              alt={`${title} certificate`}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
            />
          </>
        ) : (
          <div className="flex aspect-[16/10] items-center justify-center bg-white/[0.015]">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-700">
                Credential
              </p>

              <p className="mt-3 text-sm text-zinc-600">
                Image not available
              </p>
            </div>
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full border border-white/[0.1] bg-black/40 px-3 py-1.5 text-[9px] uppercase tracking-[0.25em] text-white/60 backdrop-blur-md">
          {category}
        </span>
      </div>

      <div className="mt-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-700">
          {issuer}
        </p>

        <h3 className="mt-3 text-xl font-medium leading-tight tracking-[-0.02em] text-zinc-200">
          {title}
        </h3>

        <div className="mt-4 flex flex-wrap gap-3 text-xs text-zinc-700">
          {year ? <span>{year}</span> : null}
          {credentialId ? (
            <span className="break-all">
              Credential: {credentialId}
            </span>
          ) : null}
        </div>
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="group block w-full text-left"
      >
        {content}
      </button>
    );
  }

  return <article className="group">{content}</article>;
}