import l1 from "@/assets/listing-1.jpg";
import l2 from "@/assets/listing-2.jpg";
import l3 from "@/assets/listing-3.jpg";

export type ExploreCategory =
  | "acheter"
  | "louer"
  | "projets"
  | "agences"
  | "promoteurs"
  | "emplois";

export interface ExploreItem {
  id: string;
  category: ExploreCategory;
  title: string;
  subtitle: string;
  location: string;
  meta?: string;
  price?: string;
  badge?: string;
  image: string;
}

export const CATEGORIES: { value: ExploreCategory; label: string; description: string }[] = [
  { value: "acheter", label: "Acheter", description: "Biens à la vente" },
  { value: "louer", label: "Louer", description: "Locations disponibles" },
  { value: "projets", label: "Projets en cours", description: "Constructions et chantiers" },
  { value: "agences", label: "Agences immobilières", description: "Trouver une agence" },
  { value: "promoteurs", label: "Promoteurs", description: "Promoteurs immobiliers" },
  { value: "emplois", label: "Emplois", description: "Offres dans l'immobilier" },
];

export const EXPLORE_ITEMS: ExploreItem[] = [
  // Acheter
  { id: "a1", category: "acheter", title: "Appartement F4 standing", subtitle: "Appartement", location: "Hydra, Alger", meta: "180 m² • 4 pièces", price: "18 500 000 DA", badge: "Vérifié", image: l1 },
  { id: "a2", category: "acheter", title: "Villa avec piscine", subtitle: "Villa", location: "Chéraga, Alger", meta: "350 m² • 6 pièces", price: "85 000 000 DA", badge: "Vérifié", image: l2 },
  { id: "a3", category: "acheter", title: "Maison familiale", subtitle: "Maison", location: "Annaba", meta: "220 m² • 5 pièces", price: "32 000 000 DA", image: l3 },
  { id: "a4", category: "acheter", title: "Terrain constructible", subtitle: "Terrain", location: "Sétif", meta: "500 m²", price: "8 500 000 DA", badge: "Vérifié", image: l1 },

  // Louer
  { id: "l1", category: "louer", title: "Studio meublé", subtitle: "Appartement", location: "Sidi Yahia, Alger", meta: "45 m² • 1 pièce", price: "55 000 DA/mois", badge: "Vérifié", image: l2 },
  { id: "l2", category: "louer", title: "Bureau open-space", subtitle: "Bureau", location: "Bab Ezzouar, Alger", meta: "200 m²", price: "120 000 DA/mois", image: l3 },
  { id: "l3", category: "louer", title: "Local commercial", subtitle: "Local", location: "Constantine", meta: "80 m²", price: "75 000 DA/mois", image: l1 },
  { id: "l4", category: "louer", title: "Appartement F3 meublé", subtitle: "Appartement", location: "Oran Centre", meta: "95 m² • 3 pièces", price: "70 000 DA/mois", badge: "Vérifié", image: l2 },

  // Projets en cours
  { id: "p1", category: "projets", title: "Résidence Les Oliviers", subtitle: "120 logements LSP", location: "Bouinan, Blida", meta: "Livraison 2026", badge: "En cours", image: l1 },
  { id: "p2", category: "projets", title: "Tour Business Bay", subtitle: "Complexe commercial", location: "Bab Ezzouar, Alger", meta: "20 étages • Livraison 2027", badge: "En cours", image: l3 },
  { id: "p3", category: "projets", title: "Eco-quartier El Bahia", subtitle: "Lotissement écologique", location: "Oran", meta: "85 villas • Livraison 2025", badge: "En cours", image: l2 },
  { id: "p4", category: "projets", title: "Résidence Marina View", subtitle: "Appartements front de mer", location: "Béjaïa", meta: "60 lots • Livraison 2026", image: l1 },

  // Agences immobilières
  { id: "ag1", category: "agences", title: "Algéria Immo", subtitle: "Agence immobilière", location: "Alger Centre", meta: "+250 annonces actives", badge: "Certifiée", image: l2 },
  { id: "ag2", category: "agences", title: "Oran Properties", subtitle: "Agence immobilière", location: "Oran", meta: "+180 annonces actives", badge: "Certifiée", image: l3 },
  { id: "ag3", category: "agences", title: "Constantine Habitat", subtitle: "Agence immobilière", location: "Constantine", meta: "+90 annonces", image: l1 },
  { id: "ag4", category: "agences", title: "Sahel Immobilier", subtitle: "Agence immobilière", location: "Tipaza", meta: "+120 annonces", badge: "Certifiée", image: l2 },

  // Promoteurs
  { id: "pr1", category: "promoteurs", title: "Groupe DAHLI", subtitle: "Promoteur immobilier", location: "Alger", meta: "15 projets livrés", badge: "Top promoteur", image: l3 },
  { id: "pr2", category: "promoteurs", title: "Promobat", subtitle: "Promoteur immobilier", location: "Oran", meta: "8 projets en cours", image: l1 },
  { id: "pr3", category: "promoteurs", title: "Cosider Promotion", subtitle: "Promoteur immobilier", location: "National", meta: "+30 projets livrés", badge: "Top promoteur", image: l2 },
  { id: "pr4", category: "promoteurs", title: "El Hadi Construction", subtitle: "Promoteur immobilier", location: "Constantine", meta: "5 projets en cours", image: l3 },

  // Emplois
  { id: "e1", category: "emplois", title: "Agent immobilier confirmé", subtitle: "CDI • Temps plein", location: "Alger", meta: "Algéria Immo", price: "60 000 - 90 000 DA", image: l1 },
  { id: "e2", category: "emplois", title: "Architecte junior", subtitle: "CDI • Temps plein", location: "Oran", meta: "Cabinet Bensalem", price: "70 000 - 100 000 DA", image: l2 },
  { id: "e3", category: "emplois", title: "Conducteur de travaux", subtitle: "CDI • Chantier", location: "Blida", meta: "Cosider Promotion", price: "80 000 - 120 000 DA", image: l3 },
  { id: "e4", category: "emplois", title: "Négociateur immobilier", subtitle: "Freelance / Commission", location: "Constantine", meta: "Constantine Habitat", image: l1 },
];
