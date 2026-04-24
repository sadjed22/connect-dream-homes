import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, MapPin, BadgeCheck, User, Phone, Mail, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CATEGORIES, EXPLORE_ITEMS, type ExploreCategory, type ExploreItem } from "@/data/explore";
import { cn } from "@/lib/utils";

const ALL = "all";

const Explore = () => {
  const [params, setParams] = useSearchParams();
  const active = (params.get("cat") || ALL) as ExploreCategory | "all";
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<ExploreItem | null>(null);

  const setCat = (cat: string) => {
    const merged = new URLSearchParams(params);
    if (cat === ALL) merged.delete("cat");
    else merged.set("cat", cat);
    setParams(merged, { replace: true });
  };

  const items = useMemo(() => {
    const search = q.toLowerCase().trim();
    return EXPLORE_ITEMS.filter((i) => {
      if (active !== ALL && i.category !== active) return false;
      if (search && !`${i.title} ${i.subtitle} ${i.location}`.toLowerCase().includes(search)) return false;
      return true;
    });
  }, [active, q]);

  const activeLabel = active === ALL ? "Toutes les offres" : CATEGORIES.find((c) => c.value === active)?.label;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-muted-foreground mb-2">
            <Link to="/" className="hover:text-foreground">Accueil</Link>
            <span className="mx-1">/</span> Explore
            {active !== ALL && <> <span className="mx-1">/</span> {activeLabel}</>}
          </nav>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{activeLabel}</h1>
              <p className="text-muted-foreground mt-1">
                {items.length} résultat{items.length > 1 ? "s" : ""}
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Rechercher…"
                className="pl-9"
              />
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-8 -mx-4 px-4 scrollbar-hide">
            <button
              onClick={() => setCat(ALL)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-colors",
                active === ALL
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:bg-muted"
              )}
            >
              Tout
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setCat(c.value)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-colors",
                  active === c.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:bg-muted"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20 rounded-2xl border border-dashed border-border bg-muted/30">
              <h3 className="text-xl font-semibold mb-2">Aucun résultat</h3>
              <p className="text-muted-foreground mb-6">Essayez une autre recherche ou catégorie.</p>
              <Button onClick={() => { setQ(""); setCat(ALL); }}>Réinitialiser</Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((i) => (
                <article
                  key={i.id}
                  className="group bg-card rounded-2xl overflow-hidden border border-border hover:-translate-y-1 transition-all"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={i.image}
                      alt={i.title}
                      loading="lazy"
                      width={768}
                      height={576}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground capitalize">
                      {CATEGORIES.find((c) => c.value === i.category)?.label}
                    </span>
                    {i.badge && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-success text-success-foreground inline-flex items-center gap-1">
                        <BadgeCheck className="w-3 h-3" /> {i.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{i.subtitle}</p>
                    <h3 className="text-lg font-semibold line-clamp-1">{i.title}</h3>
                    <div className="text-sm text-muted-foreground mt-2 space-y-1">
                      <div className="inline-flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {i.location}
                      </div>
                      {i.meta && <div>{i.meta}</div>}
                    </div>
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
                      {i.price ? (
                        <span className="text-base font-bold text-primary">{i.price}</span>
                      ) : (
                        <span />
                      )}
                      <Button size="sm" variant="outline" className="rounded-full" onClick={() => setSelected(i)}>
                        Voir
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
          {selected && (
            <>
              <div className="relative aspect-[16/9] bg-muted">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                  {CATEGORIES.find((c) => c.value === selected.category)?.label}
                </span>
                {selected.badge && (
                  <span className="absolute top-3 right-12 px-2.5 py-1 rounded-full text-xs font-semibold bg-success text-success-foreground inline-flex items-center gap-1">
                    <BadgeCheck className="w-3 h-3" /> {selected.badge}
                  </span>
                )}
              </div>

              <div className="p-6 space-y-5">
                <DialogHeader className="space-y-1 text-left">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{selected.subtitle}</p>
                  <DialogTitle className="text-2xl">{selected.title}</DialogTitle>
                  <DialogDescription className="inline-flex items-center gap-1 text-sm">
                    <MapPin className="w-4 h-4" /> {selected.location}
                  </DialogDescription>
                </DialogHeader>

                {selected.price && (
                  <div className="text-2xl font-bold text-primary">{selected.price}</div>
                )}

                <p className="text-sm text-foreground/80 leading-relaxed">{selected.description}</p>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Détails
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selected.details.map((d) => (
                      <div key={d.label} className="flex flex-col p-3 rounded-lg bg-muted/40 border border-border">
                        <span className="text-xs text-muted-foreground">{d.label}</span>
                        <span className="text-sm font-medium">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-border p-4 bg-muted/20">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Auteur de l'offre
                  </h4>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <User className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">{selected.author.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">{selected.author.role}</p>
                      <div className="space-y-1 text-sm">
                        <a href={`tel:${selected.author.phone}`} className="flex items-center gap-2 text-foreground/80 hover:text-primary">
                          <Phone className="w-4 h-4" /> {selected.author.phone}
                        </a>
                        <a href={`mailto:${selected.author.email}`} className="flex items-center gap-2 text-foreground/80 hover:text-primary break-all">
                          <Mail className="w-4 h-4" /> {selected.author.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="flex-1" onClick={() => setSelected(null)}>
                    <X className="w-4 h-4 mr-1" /> Fermer
                  </Button>
                  <Button className="flex-1" asChild>
                    <a href={`mailto:${selected.author.email}`}>
                      <Mail className="w-4 h-4 mr-1" /> Contacter
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Explore;
