import { Home } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background/80 py-12">
    <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center gap-2 font-bold text-lg text-background mb-3">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary grid place-items-center">
            <Home className="w-5 h-5" />
          </span>
          ImmoConnect
        </div>
        <p className="text-sm">La plateforme immobilière de confiance en Algérie.</p>
      </div>
      {[
        { title: "Plateforme", links: ["Annonces", "Wilayas", "Agents", "Notaires"] },
        { title: "Entreprise", links: ["À propos", "Blog", "Carrières", "Presse"] },
        { title: "Support", links: ["Contact", "Aide", "Conditions", "Confidentialité"] },
      ].map((c) => (
        <div key={c.title}>
          <h4 className="text-background font-semibold mb-3">{c.title}</h4>
          <ul className="space-y-2 text-sm">
            {c.links.map((l) => <li key={l}><a href="#" className="hover:text-background transition-colors">{l}</a></li>)}
          </ul>
        </div>
      ))}
    </div>
    <div className="container mx-auto px-4 mt-10 pt-6 border-t border-background/10 text-sm text-center">
      © {new Date().getFullYear()} ImmoConnect. Tous droits réservés.
    </div>
  </footer>
);

export default Footer;
