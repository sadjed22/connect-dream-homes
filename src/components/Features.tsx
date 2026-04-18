import { ShieldCheck, Sparkles, BadgeCheck, FileCheck2, UserCheck, Brain } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "Vérification des utilisateurs", desc: "Identité et documents vérifiés pour chaque utilisateur de la plateforme." },
  { icon: Sparkles, title: "Matching intelligent", desc: "Notre algorithme connecte acheteurs et vendeurs selon leurs critères précis." },
  { icon: BadgeCheck, title: "Annonces vérifiées", desc: "Chaque annonce est contrôlée pour garantir authenticité et exactitude." },
  { icon: FileCheck2, title: "Vérification notariale", desc: "Documents légaux vérifiés par des notaires partenaires agréés." },
  { icon: UserCheck, title: "Conseillers certifiés", desc: "Des agents immobiliers qualifiés et certifiés à votre service." },
  { icon: Brain, title: "Recommandations IA", desc: "Suggestions personnalisées basées sur vos préférences et historique." },
];

const Features = () => (
  <section id="services" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-4">Fonctionnalités</span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Une plateforme de confiance</h2>
        <p className="text-muted-foreground text-lg">Des outils innovants pour sécuriser et simplifier vos transactions immobilières.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="group p-7 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all hover:-translate-y-1" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="w-12 h-12 rounded-xl grid place-items-center mb-5 bg-gradient-to-br from-primary to-secondary text-primary-foreground group-hover:scale-110 transition-transform">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
