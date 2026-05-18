import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import { getFarmCategories } from "@/lib/farmCategories";

export function ImageCard({
  to, params, image, title, meta, blurb,
}: {
  to: string; params?: Record<string, string>; image: string; title: string; meta?: string; blurb?: string;
}) {
  return (
    <Link to={to as never} params={params as never} className="card-soft group block">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
      </div>
      <div className="p-5">
        {meta && <div className="text-xs text-primary uppercase tracking-wider font-medium mb-2">{meta}</div>}
        <h3 className="font-display text-xl text-heading">{title}</h3>
        {blurb && <p className="text-sm text-body mt-2 leading-relaxed line-clamp-2">{blurb}</p>}
      </div>
    </Link>
  );
}

export function FarmCard({ farm }: { farm: { slug: string; name: string; region: string; category: string; image: string; location: string; blurb: string } }) {
  return (
    <Link to="/gardsforsaljare/$slug" params={{ slug: farm.slug }} className="card-soft group block">
      <div className="aspect-[5/3] overflow-hidden">
        <img src={farm.image} alt={farm.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary mb-2 font-medium">
          <span>{getFarmCategories(farm).join(" · ")}</span><span className="text-border">•</span><span>{farm.region}</span>
        </div>
        <h3 className="font-display text-xl text-heading mb-2">{farm.name}</h3>
        <p className="text-sm text-body leading-relaxed line-clamp-3">{farm.blurb}</p>
        <div className="flex items-center justify-between mt-5 pt-5 border-t border-border">
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {farm.location}
          </span>
          <span className="text-sm text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
            Läs mer <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
