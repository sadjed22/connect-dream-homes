import { useMemo, useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { LISTINGS, WILAYAS, PROPERTY_TYPES, TRANSACTIONS } from "@/data/listings";

const MAX_PRICE = 100_000_000;
const ANY = "all";

type Sort = "recent" | "price-asc" | "price-desc" | "area-desc";

const useFilters = () => {
  const [params, setParams] = useSearchParams();
  const get = (k: string, d = ANY) => params.get(k) || d;
  const set = (next: Record<string, string>) => {
    const merged = new URLSearchParams(params);
    Object.entries(next).forEach(([k, v]) => {
      if (!v || v === ANY) merged.delete(k);
      else merged.set(k, v);
    });
    setParams(merged, { replace: true });
  };
  return {
    q: get("q", ""),
    wilaya: get("wilaya"),
    type: get("type"),
    transaction: get("transaction"),
    minPrice: Number(get("min", "0")) || 0,
    maxPrice: Number(get("max", String(MAX_PRICE))) || MAX_PRICE,
    sort: (get("sort", "recent") as Sort),
    set,
    reset: () => setParams({}, { replace: true }),
  };
};

const Annonces = () => {
  const f = useFilters();
  const [priceRange, setPriceRange] = useState<[number, number]>([f.minPrice, f.maxPrice]);

  useEffect(() => {
    setPriceRange([f.minPrice, f.maxPrice]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const results = useMemo(() => {
    const q = f.q.toLowerCase().trim();
    let r = LISTINGS.filter((l) => {
      if (q && !`${l.title} ${l.city} ${l.wilaya}`.toLowerCase().includes(q)) return false;
      if (f.wilaya !== ANY && l.wilaya !== f.wilaya) return false;
      if (f.type !== ANY && l.type !== f.type) return false;
      if (f.transaction !== ANY && l.transaction !== f.transaction) return false;
      if (l.price < f.minPrice || l.price > f.maxPrice) return false;
      return true;
    });
    switch (f.sort) {
      case "price-asc": r = [...r].sort((a, b) => a.price - b.price); break;
      case "price-desc": r = [...r].sort((a, b) => b.price - a.price); break;
      case "area-desc": r = [...r].sort((a, b) => b.area - a.area); break;
    }
    return r;
  }, [f.q, f.wilaya, f.type, f.transaction, f.minPrice, f.maxPrice, f.sort]);

  const fmt = (n: number) => new Intl.NumberFormat("fr-FR").format(n);

  const Filters = (
    <div className="space-y-6">
      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recherche</Label>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={f.q} onChange={(e) => f.set({ q: e.target.value })} placeholder="Ville, titre…" className="pl-9" />
        </div>
      </div>

      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Transaction</Label>
        <Select value={f.transaction} onValueChange={(v) => f.set({ transaction: v })}>
          <SelectTrigger className="mt-2"><SelectValue placeholder="Toutes" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Toutes</SelectItem>
            {TRANSACTIONS.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Type de bien</Label>
        <Select value={f.type} onValueChange={(v) => f.set({ type: v })}>
          <SelectTrigger className="mt-2"><SelectValue placeholder="Tous" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Tous</SelectItem>
            {PROPERTY_TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Wilaya</Label>
        <Select value={f.wilaya} onValueChange={(v) => f.set({ wilaya: v })}>
          <SelectTrigger className="mt-2"><SelectValue placeholder="Toutes" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Toutes les wilayas</SelectItem>
            {WILAYAS.map((w) => <SelectItem key={w} value={w}>{w}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Budget (DA)</Label>
          <span className="text-xs text-muted-foreground">{fmt(priceRange[0])} – {fmt(priceRange[1])}</span>
        </div>
        <Slider
          className="mt-4"
          min={0}
          max={MAX_PRICE}
          step={500_000}
          value={priceRange}
          onValueChange={(v) => setPriceRange(v as [number, number])}
          onValueCommit={(v) => f.set({ min: String(v[0]), max: String(v[1]) })}
        />
      </div>

      <Button variant="outline" className="w-full" onClick={() => { f.reset(); setPriceRange([0, MAX_PRICE]); }}>
        <X className="w-4 h-4 mr-2" /> Réinitialiser
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-2 mb-8">
            <nav className="text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Accueil</Link> <span className="mx-1">/</span> Annonces
            </nav>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Toutes les annonces</h1>
                <p className="text-muted-foreground mt-1">{results.length} bien{results.length > 1 ? "s" : ""} trouvé{results.length > 1 ? "s" : ""}</p>
              </div>
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="w-4 h-4 mr-2" /> Filtres
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[320px] overflow-y-auto">
                    <SheetHeader><SheetTitle>Filtres</SheetTitle></SheetHeader>
                    <div className="mt-6">{Filters}</div>
                  </SheetContent>
                </Sheet>

                <Select value={f.sort} onValueChange={(v) => f.set({ sort: v })}>
                  <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Plus récents</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                    <SelectItem value="area-desc">Plus grands</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            <aside className="hidden lg:block">
              <div className="sticky top-24 p-6 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
                {Filters}
              </div>
            </aside>

            <section>
              {results.length === 0 ? (
                <div className="text-center py-20 rounded-2xl border border-dashed border-border bg-muted/30">
                  <h3 className="text-xl font-semibold mb-2">Aucun résultat</h3>
                  <p className="text-muted-foreground mb-6">Essayez d'élargir vos critères de recherche.</p>
                  <Button onClick={() => { f.reset(); setPriceRange([0, MAX_PRICE]); }}>Réinitialiser les filtres</Button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {results.map((l) => <ListingCard key={l.id} l={l} />)}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Annonces;
