import { MapPin, Maximize2, BadgeCheck, BedDouble } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Listing } from "@/data/listings";

const ListingCard = ({ l }: { l: Listing }) => (
  <article className="group bg-card rounded-2xl overflow-hidden border border-border hover:-translate-y-2 transition-all" style={{ boxShadow: "var(--shadow-card)" }}>
    <div className="relative aspect-[4/3] overflow-hidden">
      <img src={l.image} alt={l.title} loading="lazy" width={1024} height={768} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-3 left-3 flex gap-2">
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground capitalize">{l.transaction}</span>
        {l.verified && (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-success text-success-foreground inline-flex items-center gap-1">
            <BadgeCheck className="w-3 h-3" /> Vérifié
          </span>
        )}
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-2 line-clamp-1">{l.title}</h3>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-4">
        <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4" /> {l.city}, {l.wilaya}</span>
        <span className="inline-flex items-center gap-1"><Maximize2 className="w-4 h-4" /> {l.area} m²</span>
        {l.rooms && <span className="inline-flex items-center gap-1"><BedDouble className="w-4 h-4" /> {l.rooms} pièces</span>}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-xl font-bold text-primary">{l.priceLabel}</span>
        <Button size="sm" variant="outline" className="rounded-full">Voir</Button>
      </div>
    </div>
  </article>
);

export default ListingCard;
