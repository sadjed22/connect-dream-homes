import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";
import { CATEGORIES } from "@/data/explore";

const links = [
  { label: "Accueil", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/40">
      <nav className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <img src={logo} alt="ImmoMatch logo" className="w-10 h-10 object-contain" />
          <span>Immo<span className="text-secondary">Match</span></span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          <li>
            <Link to="/" className="px-4 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors">
              Accueil
            </Link>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="px-4 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors inline-flex items-center gap-1 outline-none">
                Explore <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuItem asChild>
                  <Link to="/explore" className="cursor-pointer font-medium">
                    Toutes les offres
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {CATEGORIES.map((c) => (
                  <DropdownMenuItem key={c.value} asChild>
                    <Link to={`/explore?cat=${c.value}`} className="cursor-pointer flex flex-col items-start gap-0.5 py-2">
                      <span className="font-medium">{c.label}</span>
                      <span className="text-xs text-muted-foreground">{c.description}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          {links.slice(1).map((l) => (
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
            <li>
              <Link to="/" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-muted">Accueil</Link>
            </li>
            <li className="pt-2">
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Explore</p>
              <Link to="/explore" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-muted font-medium">
                Toutes les offres
              </Link>
              {CATEGORIES.map((c) => (
                <Link
                  key={c.value}
                  to={`/explore?cat=${c.value}`}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-muted text-sm"
                >
                  {c.label}
                </Link>
              ))}
            </li>
            {links.slice(1).map((l) => (
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
