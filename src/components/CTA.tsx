import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTA = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <div className="relative overflow-hidden rounded-3xl p-12 md:p-20 text-center text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Prêt à trouver votre bien idéal ?</h2>
          <p className="max-w-xl mx-auto text-white/85 text-lg mb-8">
            Rejoignez des milliers d'utilisateurs qui font confiance à ImmoConnect pour leurs projets immobiliers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 font-semibold">
              <Link to="/signup">Créer un compte</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white">
              <Link to="/annonces">Parcourir les annonces</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTA;
