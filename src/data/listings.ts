import l1 from "@/assets/listing-1.jpg";
import l2 from "@/assets/listing-2.jpg";
import l3 from "@/assets/listing-3.jpg";

export type Transaction = "vente" | "location";
export type PropertyType = "appartement" | "villa" | "maison" | "bureau" | "terrain" | "local";

export interface Listing {
  id: string;
  title: string;
  city: string;
  wilaya: string;
  area: number;
  rooms?: number;
  price: number;
  priceLabel: string;
  transaction: Transaction;
  type: PropertyType;
  verified: boolean;
  image: string;
}

export const WILAYAS = [
  "Alger", "Oran", "Constantine", "Annaba", "Blida", "Sétif", "Tizi Ouzou", "Béjaïa", "Tlemcen", "Batna",
];

export const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: "appartement", label: "Appartement" },
  { value: "villa", label: "Villa" },
  { value: "maison", label: "Maison" },
  { value: "bureau", label: "Bureau" },
  { value: "terrain", label: "Terrain" },
  { value: "local", label: "Local commercial" },
];

export const TRANSACTIONS: { value: Transaction; label: string }[] = [
  { value: "vente", label: "Vente" },
  { value: "location", label: "Location" },
];

const fmtDA = (n: number) => new Intl.NumberFormat("fr-FR").format(n) + " DA";

export const LISTINGS: Listing[] = [
  { id: "1", title: "Appartement F4 standing", city: "Hydra", wilaya: "Alger", area: 180, rooms: 4, price: 18500000, priceLabel: fmtDA(18500000), transaction: "vente", type: "appartement", verified: true, image: l1 },
  { id: "2", title: "Villa avec piscine", city: "Chéraga", wilaya: "Alger", area: 350, rooms: 6, price: 85000000, priceLabel: fmtDA(85000000), transaction: "vente", type: "villa", verified: true, image: l2 },
  { id: "3", title: "Bureau open-space", city: "Bab Ezzouar", wilaya: "Alger", area: 200, price: 120000, priceLabel: fmtDA(120000) + "/mois", transaction: "location", type: "bureau", verified: false, image: l3 },
  { id: "4", title: "Appartement F3 rénové", city: "Oran Centre", wilaya: "Oran", area: 95, rooms: 3, price: 12500000, priceLabel: fmtDA(12500000), transaction: "vente", type: "appartement", verified: true, image: l1 },
  { id: "5", title: "Villa moderne avec jardin", city: "Aïn El Turk", wilaya: "Oran", area: 280, rooms: 5, price: 65000000, priceLabel: fmtDA(65000000), transaction: "vente", type: "villa", verified: true, image: l2 },
  { id: "6", title: "Local commercial centre-ville", city: "Constantine", wilaya: "Constantine", area: 80, price: 75000, priceLabel: fmtDA(75000) + "/mois", transaction: "location", type: "local", verified: false, image: l3 },
  { id: "7", title: "Studio meublé", city: "Sidi Yahia", wilaya: "Alger", area: 45, rooms: 1, price: 55000, priceLabel: fmtDA(55000) + "/mois", transaction: "location", type: "appartement", verified: true, image: l1 },
  { id: "8", title: "Maison familiale", city: "Annaba Centre", wilaya: "Annaba", area: 220, rooms: 5, price: 32000000, priceLabel: fmtDA(32000000), transaction: "vente", type: "maison", verified: false, image: l2 },
  { id: "9", title: "Terrain constructible 500m²", city: "Sétif", wilaya: "Sétif", area: 500, price: 8500000, priceLabel: fmtDA(8500000), transaction: "vente", type: "terrain", verified: true, image: l3 },
  { id: "10", title: "Appartement F5 vue mer", city: "Béjaïa", wilaya: "Béjaïa", area: 160, rooms: 5, price: 28000000, priceLabel: fmtDA(28000000), transaction: "vente", type: "appartement", verified: true, image: l1 },
  { id: "11", title: "Villa avec piscine et garage", city: "Tlemcen", wilaya: "Tlemcen", area: 400, rooms: 7, price: 95000000, priceLabel: fmtDA(95000000), transaction: "vente", type: "villa", verified: true, image: l2 },
  { id: "12", title: "Bureau équipé", city: "Tizi Ouzou", wilaya: "Tizi Ouzou", area: 120, price: 90000, priceLabel: fmtDA(90000) + "/mois", transaction: "location", type: "bureau", verified: false, image: l3 },
];
