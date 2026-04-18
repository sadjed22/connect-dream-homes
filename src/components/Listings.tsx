import { MapPin, Maximize2, BadgeCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import l1 from "@/assets/listing-1.jpg";
import l2 from "@/assets/listing-2.jpg";
import l3 from "@/assets/listing-3.jpg";

const listings = [
  { img: l1, title: "Appartement F4 standing", city: "Hydra, Alger", area: "180 m²", price: "18 500 000 DA", tag: "Vente", verified: true },
  { img: l2, title: "Villa avec piscine", city: "Chéraga, Alger", area: "350 m²", price: "85 000 000 DA", tag: "Vente", verified: true },
  { img: l3, title: "Bureau open-space", city: "Bab Ezzouar, Alger", area: "200 m²", price: "120 000 DA/mois", tag: "Location", verified: false },
];

const Listings = () => (
  <section id="annonces" className="py-24 bg-muted/40">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold tracking-wider uppercase mb-4">Annonces récentes</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Biens à découvrir</h2>
        </div>
        <a href="#" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
          Voir toutes les annonces <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {listings.map((l) => (
          <article key={l.title} className="group bg-card rounded-2xl overflow-hidden border border-border hover:-translate-y-2 transition-all" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={l.img} alt={l.title} loading="lazy" width={1024} height={768} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">{l.tag}</span>
                {l.verified && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-success text-success-foreground inline-flex items-center gap-1">
                    <BadgeCheck className="w-3 h-3" /> Vérifié
                  </span>
                )}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">{l.title}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4" /> {l.city}</span>
                <span className="inline-flex items-center gap-1"><Maximize2 className="w-4 h-4" /> {l.area}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xl font-bold text-primary">{l.price}</span>
                <Button size="sm" variant="outline" className="rounded-full">Voir</Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Listings;
