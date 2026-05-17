import { Link } from "react-router-dom";
import { ShieldCheck, Sparkles, BadgeCheck, FileCheck2, UserCheck, Brain, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const services = [
  { icon: ShieldCheck, title: "Vérification des utilisateurs", desc: "Identité et documents vérifiés pour chaque utilisateur de la plateforme afin de garantir des échanges sécurisés." },
  { icon: Sparkles, title: "Matching intelligent", desc: "Notre algorithme connecte acheteurs et vendeurs selon leurs critères précis : budget, localisation, type de bien." },
  { icon: BadgeCheck, title: "Annonces vérifiées", desc: "Chaque annonce est contrôlée manuellement pour garantir authenticité, exactitude et qualité des informations." },
  { icon: FileCheck2, title: "Vérification notariale", desc: "Documents légaux vérifiés par des notaires partenaires agréés pour sécuriser vos transactions." },
  { icon: UserCheck, title: "Conseillers certifiés", desc: "Des agents immobiliers qualifiés et certifiés vous accompagnent à chaque étape de votre projet." },
  { icon: Brain, title: "Recommandations IA", desc: "Suggestions personnalisées basées sur vos préférences, votre historique et les tendances du marché." },
];

const Services = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-24">
      <section className="container mx-auto px-4 py-16 text-center max-w-3xl">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-4">Nos services</span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">Tout ce qu'il faut pour réussir votre projet immobilier</h1>
        <p className="text-muted-foreground text-lg">De la recherche au passage chez le notaire, ImmoMatch vous accompagne avec des outils modernes et un réseau de confiance.</p>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-7 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all hover:-translate-y-1" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="w-12 h-12 rounded-xl grid place-items-center mb-5 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg" className="rounded-full">
            <Link to="/contact">Discuter avec un conseiller <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Services;
