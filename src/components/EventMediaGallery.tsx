import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { MediaItem } from "@/lib/event-media";

interface EventMediaGalleryProps {
  title: string;
  subtitle?: string;
  items: MediaItem[];
}

export default function EventMediaGallery({
  title,
  subtitle,
  items,
}: EventMediaGalleryProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="section">
      <div className="section-inner">
        <div className="text-center stack-lg mb-10">
          <div className="stack">
            <p className="eyebrow">Gallery</p>
            <h2 className="section-title">{title}</h2>
          </div>
          {subtitle && <p className="section-lead max-w-3xl mx-auto">{subtitle}</p>}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.pathname}
              className="group overflow-hidden rounded-[var(--radius)] border border-border/40 bg-card shadow-sm"
            >
              <div className="relative aspect-[4/3] bg-muted">
                {item.type === "image" ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                ) : (
                  <>
                    <video
                      className="h-full w-full object-cover"
                      controls
                      preload="metadata"
                      poster={item.poster}
                    >
                      <source src={item.src} />
                    </video>
                    <Badge className="absolute left-3 top-3 bg-background/90 text-foreground border border-border/40">
                      Video
                    </Badge>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
