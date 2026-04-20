import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const links = [
  { label: "Accueil", to: "/" },
  { label: "Annonces", to: "/annonces" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/40">
      <nav className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <img src={logo} alt="ImmoConnect logo" className="w-10 h-10 object-contain" />
          <span>Immo<span className="text-secondary">Connect</span></span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.label}>
              <Link to={l.to} className="px-4 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild><Link to="/login">Se connecter</Link></Button>
          <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90" asChild>
            <Link to="/signup">S'inscrire</Link>
          </Button>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <ul className="container mx-auto px-4 py-4 space-y-1">
            {links.map((l) => (
              <li key={l.label}>
                <Link to={l.to} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-muted">{l.label}</Link>
              </li>
            ))}
            <li className="pt-2 flex gap-2">
              <Button variant="outline" className="flex-1" asChild><Link to="/login" onClick={() => setOpen(false)}>Se connecter</Link></Button>
              <Button className="flex-1" asChild><Link to="/signup" onClick={() => setOpen(false)}>S'inscrire</Link></Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
