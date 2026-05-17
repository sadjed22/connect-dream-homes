import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Building2, Briefcase, Scale, Home, Rocket, Gift, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Plan = {
  id: string;
  icon: typeof Building2;
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  booster?: { label: string; price: string; desc: string };
  promo?: string;
  cta: string;
  commitment: string;
  recommended?: boolean;
};

const pros: Plan[] = [
  {
    id: "promoteurs",
    icon: Building2,
    name: "Promoteurs immobiliers",
    price: "50 000 DZD",
    period: "/an",
    tagline: "Pour les acteurs majeurs du développement immobilier",
    features: [
      "Publication illimitée d'annonces",
      "Mise en avant des projets immobiliers",
      "Tableau de bord avancé",
      "Support prioritaire dédié",
    ],
    booster: { label: "BOOSTER 7 JOURS", price: "8 000 DZD", desc: "Boostez vos annonces pour plus de visibilité" },
    promo: "3 mois gratuits au lancement",
    cta: "Choisir Promoteurs",
    commitment: "Engagement minimum d'un an",
    recommended: true,
  },
  {
    id: "agences",
    icon: Briefcase,
    name: "Agences immobilières",
    price: "25 000 DZD",
    period: "/an",
    tagline: "Pour les agences qui veulent se développer",
    features: [
      "Gestion complète des annonces",
      "Profil agence personnalisé",
      "Statistiques de performance",
      "Support par e-mail et téléphone",
    ],
    booster: { label: "BOOSTER 7 JOURS", price: "5 000 DZD", desc: "Boostez vos annonces pour plus de visibilité" },
    promo: "3 mois gratuits au lancement",
    cta: "Choisir Agences",
    commitment: "Engagement minimum d'un an",
  },
  {
    id: "notaires",
    icon: Scale,
    name: "Notaires",
    price: "3 000 DZD",
    period: "/mois",
    tagline: "Intégrez vos services au sein d'ImmoMatch",
    features: [
      "Intégration des services notariaux",
      "Mise en relation avec les utilisateurs",
      "Profil professionnel vérifié",
      "Tableau de demandes clients",
    ],
    cta: "Choisir Notaires",
    commitment: "Engagement minimum d'un mois",
  },
];

const particuliers: Plan[] = [
  {
    id: "particuliers",
    icon: Home,
    name: "Particuliers",
    price: "Gratuit",
    period: "",
    tagline: "Publiez et partagez simplement vos annonces",
    features: [
      "Publication d'annonces immobilières",
      "Partage simple sur la plateforme",
      "Messagerie intégrée",
      "Aucun engagement",
    ],
    booster: { label: "BOOSTER 7 JOURS", price: "3 000 DZD", desc: "Boostez vos annonces pour plus de visibilité" },
    cta: "Commencer gratuitement",
    commitment: "Aucun engagement",
  },
];

const PlanCard = ({ plan }: { plan: Plan }) => {
  const Icon = plan.icon;
  const isFree = plan.price === "Gratuit";
  return (
    <div
      className={cn(
        "relative rounded-2xl bg-card border p-7 flex flex-col transition-all hover:-translate-y-1",
        plan.recommended ? "border-secondary ring-2 ring-secondary/40" : "border-border",
      )}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {plan.recommended && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-primary to-secondary">
          Recommandé
        </span>
      )}

      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg grid place-items-center bg-primary/10 text-primary">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-semibold">{plan.name}</h3>
      </div>

      <div className="mb-2">
        <span className={cn("text-3xl font-bold", isFree ? "text-secondary" : "text-primary")}>{plan.price}</span>
        {plan.period && <span className="text-muted-foreground text-sm ml-1">{plan.period}</span>}
      </div>
      <p className="text-sm text-muted-foreground mb-5">{plan.tagline}</p>

      <ul className="space-y-2.5 mb-5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {plan.booster && (
        <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-3 mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-1">
            <Rocket className="w-3.5 h-3.5" /> {plan.booster.label}
          </div>
          <div className="font-semibold text-sm">{plan.booster.price}</div>
          <div className="text-xs text-muted-foreground">{plan.booster.desc}</div>
        </div>
      )}

      {plan.promo && (
        <div className="rounded-lg bg-secondary/10 text-secondary text-xs font-medium px-3 py-2 mb-4 flex items-center gap-2">
          <Gift className="w-3.5 h-3.5" /> {plan.promo}
        </div>
      )}

      <div className="mt-auto">
        <Button
          asChild
          className={cn(
            "w-full rounded-xl h-11",
            plan.recommended
              ? "bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90"
              : "bg-card text-foreground border border-border hover:bg-muted",
          )}
        >
          <Link to="/signup">{plan.cta}</Link>
        </Button>
        <div className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
          <Info className="w-3 h-3" /> {plan.commitment}
        </div>
      </div>
    </div>
  );
};

const Pricing = () => {
  const [tab, setTab] = useState<"pros" | "particuliers">("pros");
  const plans = tab === "pros" ? pros : particuliers;

  return (
    <section id="tarifs" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">Des formules adaptées à vos besoins</h2>
          <p className="text-muted-foreground">Choisissez la formule qui vous convient le mieux, selon votre profil.</p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-full bg-muted">
            {(["pros", "particuliers"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all",
                  tab === t ? "bg-card text-foreground shadow" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t === "pros" ? "Pour les professionnels" : "Pour les particuliers"}
              </button>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "grid gap-6 max-w-6xl mx-auto",
            tab === "pros" ? "md:grid-cols-3" : "max-w-md",
          )}
        >
          {plans.map((p) => <PlanCard key={p.id} plan={p} />)}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
