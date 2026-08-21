type GalleryItem = {
  src: string;
  alt: string;
};

type ProjectGalleryProps = {
  items: GalleryItem[];
};

export function ProjectGallery({ items }: ProjectGalleryProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-white/10 pt-10">
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
        Gallery
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <figure
            key={item.src}
            className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="aspect-video h-full w-full object-cover"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}