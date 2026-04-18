import { Search, MapPin, Wallet, Building2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { value: "15K+", label: "Annonces" },
  { value: "8K+", label: "Utilisateurs" },
  { value: "48", label: "Wilayas" },
  { value: "98%", label: "Satisfaction" },
];

const Hero = () => {
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
          <span className="inline-block pb-2 bg-gradient-to-r from-secondary to-primary-glow bg-clip-text text-transparent">
            en toute confiance
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-white/85 mb-10">
          Matching intelligent, annonces vérifiées et conseillers certifiés pour votre projet immobilier.
        </p>

        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur rounded-2xl p-3 shadow-elegant" style={{ boxShadow: "var(--shadow-elegant)" }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {[
              { icon: MapPin, ph: "Localisation" },
              { icon: Wallet, ph: "Budget" },
              { icon: Building2, ph: "Type de bien" },
              { icon: Tag, ph: "Achat / Location" },
            ].map(({ icon: Icon, ph }) => (
              <div key={ph} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/60 text-foreground">
                <Icon className="w-4 h-4 text-primary shrink-0" />
                <input placeholder={ph} className="bg-transparent outline-none w-full text-sm placeholder:text-muted-foreground" />
              </div>
            ))}
          </div>
          <Button className="w-full mt-2 h-12 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90">
            <Search className="w-5 h-5 mr-2" /> Rechercher
          </Button>
        </div>

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
