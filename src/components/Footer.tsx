import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const columns = [
  { title: "Plateforme", links: [
    { label: "Annonces", to: "/annonces" },
    { label: "Services", to: "/services" },
    { label: "Connexion", to: "/auth" },
    { label: "Inscription", to: "/auth" },
  ]},
  { title: "Entreprise", links: [
    { label: "À propos", to: "/about" },
    { label: "Contact", to: "/contact" },
  ]},
  { title: "Support", links: [
    { label: "Contact", to: "/contact" },
    { label: "Aide", to: "/contact" },
  ]},
];

const Footer = () => (
  <footer className="bg-foreground text-background/80 py-12">
    <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
      <div>
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-background mb-3">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary grid place-items-center">
            <Home className="w-5 h-5" />
          </span>
          ImmoConnect
        </Link>
        <p className="text-sm">La plateforme immobilière de confiance en Algérie.</p>
      </div>
      {columns.map((c) => (
        <div key={c.title}>
          <h4 className="text-background font-semibold mb-3">{c.title}</h4>
          <ul className="space-y-2 text-sm">
            {c.links.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="hover:text-background transition-colors">{l.label}</Link>
              </li>
            ))}
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
