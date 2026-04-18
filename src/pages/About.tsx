import { Link } from "react-router-dom";
import { Target, Heart, Users, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const values = [
  { icon: Target, title: "Mission", desc: "Rendre l'immobilier transparent, simple et accessible à tous les Algériens." },
  { icon: Heart, title: "Confiance", desc: "Chaque annonce et chaque utilisateur est vérifié pour garantir la sérénité." },
  { icon: Users, title: "Communauté", desc: "Plus de 8 000 utilisateurs actifs à travers les 48 wilayas." },
  { icon: Award, title: "Excellence", desc: "Des conseillers certifiés et un réseau notarial agréé." },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-24">
      <section className="container mx-auto px-4 py-16 text-center max-w-3xl">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-4">À propos</span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">Construire la confiance dans l'immobilier algérien</h1>
        <p className="text-muted-foreground text-lg">ImmoConnect est née d'une conviction : trouver ou vendre un bien ne devrait jamais être un parcours du combattant.</p>
      </section>

      <section className="container mx-auto px-4 pb-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="p-7 rounded-2xl bg-card border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="w-12 h-12 rounded-xl grid place-items-center mb-5 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </section>

      <section className="container mx-auto px-4 pb-24 text-center">
        <Button asChild size="lg" className="rounded-full">
          <Link to="/contact">Nous contacter</Link>
        </Button>
      </section>
    </main>
    <Footer />
  </div>
);

export default About;
