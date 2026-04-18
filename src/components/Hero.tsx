import { Search, MapPin, Wallet, Building2, Tag } from "lucide-react";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WILAYAS, PROPERTY_TYPES, TRANSACTIONS } from "@/data/listings";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { value: "15K+", label: "Annonces" },
  { value: "8K+", label: "Utilisateurs" },
  { value: "48", label: "Wilayas" },
  { value: "98%", label: "Satisfaction" },
];

const ANY = "all";

const BUDGETS = [
  { value: ANY, label: "Tous budgets" },
  { value: "0-5000000", label: "Jusqu'à 5M DA" },
  { value: "5000000-15000000", label: "5M – 15M DA" },
  { value: "15000000-40000000", label: "15M – 40M DA" },
  { value: "40000000-100000000", label: "40M+ DA" },
];

const Hero = () => {
  const navigate = useNavigate();
  const [wilaya, setWilaya] = useState(ANY);
  const [budget, setBudget] = useState(ANY);
  const [type, setType] = useState(ANY);
  const [transaction, setTransaction] = useState(ANY);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (wilaya !== ANY) params.set("wilaya", wilaya);
    if (type !== ANY) params.set("type", type);
    if (transaction !== ANY) params.set("transaction", transaction);
    if (budget !== ANY) {
      const [min, max] = budget.split("-");
      params.set("min", min);
      params.set("max", max);
    }
    navigate(`/annonces${params.toString() ? `?${params}` : ""}`);
  };

  const fields = [
    { icon: MapPin, value: wilaya, set: setWilaya, ph: "Localisation", options: [{ value: ANY, label: "Toutes les wilayas" }, ...WILAYAS.map((w) => ({ value: w, label: w }))] },
    { icon: Wallet, value: budget, set: setBudget, ph: "Budget", options: BUDGETS },
    { icon: Building2, value: type, set: setType, ph: "Type de bien", options: [{ value: ANY, label: "Tous types" }, ...PROPERTY_TYPES.map((t) => ({ value: t.value, label: t.label }))] },
    { icon: Tag, value: transaction, set: setTransaction, ph: "Achat / Location", options: [{ value: ANY, label: "Tous" }, ...TRANSACTIONS.map((t) => ({ value: t.value, label: t.label }))] },
  ];

  return (
    <section className="relative min-h-[100svh] flex items-center pt-20 pb-12 overflow-hidden">
      <img src={heroBg} alt="Immobilier de prestige en Algérie" width={1920} height={1280} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      <div className="relative container mx-auto px-4 text-center text-white">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-6">
          🇩🇿 N°1 de l'immobilier en Algérie
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.15] mb-6">
          Trouvez le bien idéal
          <br />
          <span className="inline-block pb-2 bg-gradient-to-r from-[hsl(175_85%_55%)] to-[hsl(210_95%_70%)] bg-clip-text text-transparent">
            en toute confiance
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-white/85 mb-10">
          Matching intelligent, annonces vérifiées et conseillers certifiés pour votre projet immobilier.
        </p>

        <form onSubmit={handleSearch} className="max-w-4xl mx-auto bg-white/95 backdrop-blur rounded-2xl p-3 text-foreground" style={{ boxShadow: "var(--shadow-elegant)" }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {fields.map(({ icon: Icon, value, set, ph, options }) => (
              <div key={ph} className="flex items-center gap-2 pl-3 rounded-xl bg-muted/60">
                <Icon className="w-4 h-4 text-primary shrink-0" />
                <Select value={value} onValueChange={set}>
                  <SelectTrigger className="border-0 bg-transparent focus:ring-0 shadow-none h-11 px-1 text-sm">
                    <SelectValue placeholder={ph} />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {options.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
          <Button type="submit" className="w-full mt-2 h-12 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90">
            <Search className="w-5 h-5 mr-2" /> Rechercher
          </Button>
        </form>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-12">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-bold">{s.value}</div>
              <div className="text-sm text-white/75 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
