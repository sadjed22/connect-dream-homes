import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ListingCard from "@/components/ListingCard";
import { LISTINGS } from "@/data/listings";

const Listings = () => (
  <section id="annonces" className="py-24 bg-muted/40">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold tracking-wider uppercase mb-4">Annonces récentes</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Biens à découvrir</h2>
        </div>
        <Link to="/annonces" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
          Voir toutes les annonces <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {LISTINGS.slice(0, 3).map((l) => <ListingCard key={l.id} l={l} />)}
      </div>
    </div>
  </section>
);

export default Listings;
