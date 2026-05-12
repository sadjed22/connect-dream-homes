import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, MapPin, BadgeCheck, User, ShieldCheck, Lock, MessageSquare, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import ChatDialog from "@/components/ChatDialog";
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
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const PROFILE_TYPE_TO_CATEGORY: Record<string, ExploreCategory> = {
  agent: "agences",
  promoteur: "promoteurs",
  notaire: "notaires",
};

const ROLE_LABEL: Record<ExploreCategory, string> = {
  acheter: "Bien à vendre",
  louer: "Bien à louer",
  agences: "Agence immobilière",
  promoteurs: "Promoteur immobilier",
  notaires: "Notaire",
};

const PLACEHOLDER_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='%231e3a8a'/><stop offset='100%' stop-color='%233b82f6'/></linearGradient></defs><rect width='400' height='300' fill='url(%23g)'/><text x='50%' y='52%' font-family='system-ui,sans-serif' font-size='80' fill='white' text-anchor='middle' font-weight='700'>IM</text></svg>`
  );

const ALL = "all";

const Explore = () => {
  const [params, setParams] = useSearchParams();
  const active = (params.get("cat") || ALL) as ExploreCategory | "all";
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<ExploreItem | null>(null);
  const [dbItems, setDbItems] = useState<ExploreItem[]>([]);
  const [chatCtx, setChatCtx] = useState<{ listingId: string; listingTitle: string; recipientId: string } | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await (supabase as any)
        .from("public_directory")
        .select("id, first_name, last_name, location, profile_type, created_at")
        .order("created_at", { ascending: false });

      if (error || !data || cancelled) return;

      const mapped: ExploreItem[] = (data as Array<{ id: string; first_name: string | null; last_name: string | null; location: string | null; profile_type: string | null; created_at: string }>).map((p) => {
        const cat = PROFILE_TYPE_TO_CATEGORY[p.profile_type ?? ""] ?? "agences";
        const fullName = [p.first_name, p.last_name].filter(Boolean).join(" ") || "Membre vérifié";
        return {
          id: `db-${p.id}`,
          category: cat,
          title: fullName,
          subtitle: ROLE_LABEL[cat],
          location: p.location || "Algérie",
          meta: "Compte vérifié",
          badge: "Vérifié",
          image: PLACEHOLDER_IMG,
          description: `${fullName} est inscrit·e sur ImmoMatch en tant que ${ROLE_LABEL[cat].toLowerCase()}. Contactez via la messagerie sécurisée — les coordonnées personnelles restent privées.`,
          details: [
            { label: "Type de profil", value: ROLE_LABEL[cat] },
            { label: "Localisation", value: p.location || "—" },
            { label: "Membre depuis", value: new Date(p.created_at).toLocaleDateString("fr-FR", { month: "long", year: "numeric" }) },
            { label: "Statut", value: "Vérifié" },
          ],
          author: {
            name: fullName,
            role: ROLE_LABEL[cat],
            phone: "—",
            email: "—",
            userId: p.id,
          } as ExploreItem["author"] & { userId: string },
        };
      });

      setDbItems(mapped);
    })();

    // Fetch real listings (vendre/louer) so acheter/louer cards are messageable
    (async () => {
      const { data: listings } = await supabase
        .from("listings")
        .select("id,title,description,location,price,image_url,type,user_id,created_at")
        .in("type", ["vendre", "louer"])
        .order("created_at", { ascending: false });
      if (!listings || cancelled) return;

      const listingItems: ExploreItem[] = listings.map((l) => {
        const cat: ExploreCategory = l.type === "louer" ? "louer" : "acheter";
        return {
          id: `lst-${l.id}`,
          category: cat,
          title: l.title,
          subtitle: cat === "louer" ? "À louer" : "À vendre",
          location: l.location || "Algérie",
          meta: l.price || "Sur demande",
          price: l.price || undefined,
          badge: "Vérifié",
          image: l.image_url || PLACEHOLDER_IMG,
          description: l.description || `${l.title} — contactez l'annonceur via la messagerie sécurisée.`,
          details: [
            { label: "Type", value: cat === "louer" ? "Location" : "Vente" },
            { label: "Localisation", value: l.location || "—" },
            { label: "Prix", value: l.price || "Sur demande" },
            { label: "Publié", value: new Date(l.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" }) },
          ],
          author: {
            name: "Annonceur vérifié",
            role: cat === "louer" ? "Bailleur" : "Vendeur",
            phone: "—",
            email: "—",
            userId: l.user_id,
            listingId: l.id,
            listingTitle: l.title,
          } as ExploreItem["author"] & { userId: string; listingId: string; listingTitle: string },
        };
      });

      setDbItems((prev) => [...prev, ...listingItems]);
    })();

    return () => { cancelled = true; };
  }, []);

  const handleContact = async (item: ExploreItem) => {
    const author = item.author as { userId?: string; listingId?: string; listingTitle?: string };
    const recipientId = author.userId;
    if (!recipientId) return;
    if (!user) {
      toast({ title: "Connexion requise", description: "Connectez-vous pour envoyer un message." });
      navigate("/login?redirect=/explore");
      return;
    }
    if (user.id === recipientId) {
      toast({ title: "C'est votre annonce", description: "Vous ne pouvez pas vous contacter vous-même." });
      return;
    }
    // If the item is a listing itself, use it directly
    if (author.listingId && author.listingTitle) {
      setSelected(null);
      setChatCtx({ listingId: author.listingId, listingTitle: author.listingTitle, recipientId });
      return;
    }
    // Otherwise (directory profile) attach to one of the author's listings
    const { data } = await supabase
      .from("listings")
      .select("id,title")
      .eq("user_id", recipientId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!data) {
      toast({ title: "Aucune annonce active", description: "Cet annonceur n'a pas encore d'annonce. Réessayez plus tard." });
      return;
    }
    setSelected(null);
    setChatCtx({ listingId: data.id, listingTitle: data.title, recipientId });
  };

  const setCat = (cat: string) => {
    const merged = new URLSearchParams(params);
    if (cat === ALL) merged.delete("cat");
    else merged.set("cat", cat);
    setParams(merged, { replace: true });
  };

  const items = useMemo(() => {
    const search = q.toLowerCase().trim();
    // Real DB profiles take precedence for agences/promoteurs/notaires;
    // static items are kept for acheter/louer.
    const staticFiltered = EXPLORE_ITEMS.filter(
      (i) => i.category === "acheter" || i.category === "louer"
    );
    const all = [...dbItems, ...staticFiltered];
    return all.filter((i) => {
      if (active !== ALL && i.category !== active) return false;
      if (search && !`${i.title} ${i.subtitle} ${i.location}`.toLowerCase().includes(search)) return false;
      return true;
    });
  }, [active, q, dbItems]);

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
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-success" />
                    <span className="font-semibold text-sm">Coordonnées masquées</span>
                  </div>
                  <p className="text-sm text-muted-foreground inline-flex items-start gap-2">
                    <Lock className="w-4 h-4 mt-0.5 shrink-0" />
                    Pour votre sécurité, le nom complet, le numéro et l'email de l'annonceur restent privés. Échangez via la messagerie sécurisée.
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold">Annonceur vérifié</p>
                      <p className="text-xs text-muted-foreground">{selected.author.role}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="flex-1" onClick={() => setSelected(null)}>
                    <X className="w-4 h-4 mr-1" /> Fermer
                  </Button>
                  <Button className="flex-1 gap-2" onClick={() => handleContact(selected)}>
                    <MessageSquare className="w-4 h-4" /> Contacter
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {chatCtx && (
        <ChatDialog
          open={!!chatCtx}
          onOpenChange={(o) => !o && setChatCtx(null)}
          listingId={chatCtx.listingId}
          listingTitle={chatCtx.listingTitle}
          recipientId={chatCtx.recipientId}
        />
      )}
    </div>
  );
};

export default Explore;
