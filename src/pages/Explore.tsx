import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, MapPin, BadgeCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CATEGORIES, EXPLORE_ITEMS, type ExploreCategory } from "@/data/explore";
import { cn } from "@/lib/utils";

const ALL = "all";

const Explore = () => {
  const [params, setParams] = useSearchParams();
  const active = (params.get("cat") || ALL) as ExploreCategory | "all";
  const [q, setQ] = useState("");

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
                      <Button size="sm" variant="outline" className="rounded-full">Voir</Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
