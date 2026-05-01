import { Star } from "lucide-react";

const items = [
  { name: "Karim B.", role: "Acquéreur", quote: "J'ai trouvé mon appartement en 2 semaines grâce au matching intelligent. Service impeccable !" },
  { name: "Amina S.", role: "Propriétaire", quote: "La vérification des documents m'a rassurée. Transaction rapide et sécurisée." },
  { name: "Yacine M.", role: "Agent immobilier", quote: "ImmoMatch m'a permis de connecter avec des clients qualifiés. Très professionnel." },
];

const Testimonials = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-4">Confiance & Sécurité</span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ce qu'en disent nos utilisateurs</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((t) => (
          <div key={t.name} className="p-7 rounded-2xl bg-card border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex gap-1 mb-4 text-secondary">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-foreground/90 leading-relaxed mb-6">"{t.quote}"</p>
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-secondary grid place-items-center text-primary-foreground font-semibold">
                {t.name[0]}
              </div>
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
