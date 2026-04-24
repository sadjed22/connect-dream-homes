import a1 from "@/assets/explore/a1.jpg";
import a2 from "@/assets/explore/a2.jpg";
import a3 from "@/assets/explore/a3.jpg";
import a4 from "@/assets/explore/a4.jpg";
import l1 from "@/assets/explore/l1.jpg";
import l2 from "@/assets/explore/l2.jpg";
import l3 from "@/assets/explore/l3.jpg";
import l4 from "@/assets/explore/l4.jpg";
import p1 from "@/assets/explore/p1.jpg";
import p2 from "@/assets/explore/p2.jpg";
import p3 from "@/assets/explore/p3.jpg";
import p4 from "@/assets/explore/p4.jpg";
import ag1 from "@/assets/explore/ag1.jpg";
import ag2 from "@/assets/explore/ag2.jpg";
import ag3 from "@/assets/explore/ag3.jpg";
import ag4 from "@/assets/explore/ag4.jpg";
import pr1 from "@/assets/explore/pr1.jpg";
import pr2 from "@/assets/explore/pr2.jpg";
import pr3 from "@/assets/explore/pr3.jpg";
import pr4 from "@/assets/explore/pr4.jpg";
import e1 from "@/assets/explore/e1.jpg";
import e2 from "@/assets/explore/e2.jpg";
import e3 from "@/assets/explore/e3.jpg";
import e4 from "@/assets/explore/e4.jpg";

export type ExploreCategory =
  | "acheter"
  | "louer"
  | "projets"
  | "agences"
  | "promoteurs"
  | "emplois";

export interface Author {
  name: string;
  role: string;
  phone: string;
  email: string;
}

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
  description: string;
  details: { label: string; value: string }[];
  author: Author;
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
  // ===== Acheter =====
  {
    id: "a1", category: "acheter", title: "Appartement F4 standing", subtitle: "Appartement",
    location: "Hydra, Alger", meta: "180 m² • 4 pièces", price: "18 500 000 DA", badge: "Vérifié", image: a1,
    description: "Splendide appartement F4 dans le quartier prisé d'Hydra, avec finitions haut de gamme, double vitrage, climatisation centrale et vue dégagée.",
    details: [
      { label: "Surface", value: "180 m²" },
      { label: "Pièces", value: "4" },
      { label: "Étage", value: "5e / 8" },
      { label: "Année", value: "2022" },
      { label: "État", value: "Neuf" },
    ],
    author: { name: "Karim Belkacem", role: "Propriétaire", phone: "+213 555 12 34 56", email: "k.belkacem@example.dz" },
  },
  {
    id: "a2", category: "acheter", title: "Villa avec piscine", subtitle: "Villa",
    location: "Chéraga, Alger", meta: "350 m² • 6 pièces", price: "85 000 000 DA", badge: "Vérifié", image: a2,
    description: "Magnifique villa avec piscine, jardin paysager, garage 3 voitures et terrasse panoramique. Idéal pour grande famille.",
    details: [
      { label: "Surface", value: "350 m²" },
      { label: "Terrain", value: "600 m²" },
      { label: "Pièces", value: "6" },
      { label: "Salles de bain", value: "4" },
      { label: "Année", value: "2020" },
    ],
    author: { name: "Algéria Immo", role: "Agence immobilière", phone: "+213 21 45 67 89", email: "contact@algeriaimmo.dz" },
  },
  {
    id: "a3", category: "acheter", title: "Maison familiale", subtitle: "Maison",
    location: "Annaba", meta: "220 m² • 5 pièces", price: "32 000 000 DA", image: a3,
    description: "Maison traditionnelle entièrement rénovée, proche du centre-ville et des commodités. Cour intérieure, garage et terrasse.",
    details: [
      { label: "Surface", value: "220 m²" },
      { label: "Pièces", value: "5" },
      { label: "Cour", value: "Oui" },
      { label: "Année", value: "2018 (rénovée)" },
    ],
    author: { name: "Sofiane Meziane", role: "Propriétaire", phone: "+213 661 22 11 00", email: "sofiane.m@example.dz" },
  },
  {
    id: "a4", category: "acheter", title: "Terrain constructible", subtitle: "Terrain",
    location: "Sétif", meta: "500 m²", price: "8 500 000 DA", badge: "Vérifié", image: a4,
    description: "Terrain plat et constructible, situé dans une zone résidentielle calme, avec acte notarié et viabilisé.",
    details: [
      { label: "Surface", value: "500 m²" },
      { label: "Type", value: "Constructible" },
      { label: "Acte", value: "Notarié" },
      { label: "Viabilisation", value: "Eau, électricité, gaz" },
    ],
    author: { name: "Sahel Immobilier", role: "Agence immobilière", phone: "+213 36 88 99 11", email: "info@sahelimmo.dz" },
  },

  // ===== Louer =====
  {
    id: "l1", category: "louer", title: "Studio meublé", subtitle: "Appartement",
    location: "Sidi Yahia, Alger", meta: "45 m² • 1 pièce", price: "55 000 DA/mois", badge: "Vérifié", image: l1,
    description: "Studio entièrement meublé et équipé, idéal pour étudiant ou jeune professionnel. Internet fibre inclus.",
    details: [
      { label: "Surface", value: "45 m²" },
      { label: "Meublé", value: "Oui" },
      { label: "Charges", value: "Comprises" },
      { label: "Caution", value: "2 mois" },
    ],
    author: { name: "Yasmine Cherif", role: "Propriétaire", phone: "+213 770 33 44 55", email: "y.cherif@example.dz" },
  },
  {
    id: "l2", category: "louer", title: "Bureau open-space", subtitle: "Bureau",
    location: "Bab Ezzouar, Alger", meta: "200 m²", price: "120 000 DA/mois", image: l2,
    description: "Plateau de bureaux lumineux dans tour moderne, climatisé, fibre, parking, salle de réunion partagée.",
    details: [
      { label: "Surface", value: "200 m²" },
      { label: "Postes", value: "20" },
      { label: "Parking", value: "5 places" },
      { label: "Disponibilité", value: "Immédiate" },
    ],
    author: { name: "Business Tower SARL", role: "Gestionnaire", phone: "+213 21 99 00 11", email: "rent@businesstower.dz" },
  },
  {
    id: "l3", category: "louer", title: "Local commercial", subtitle: "Local",
    location: "Constantine", meta: "80 m²", price: "75 000 DA/mois", image: l3,
    description: "Local commercial avec vitrine sur rue passante du centre-ville. Idéal pour boutique ou agence.",
    details: [
      { label: "Surface", value: "80 m²" },
      { label: "Vitrine", value: "Oui" },
      { label: "Réserve", value: "15 m²" },
      { label: "Bail", value: "3-6-9" },
    ],
    author: { name: "Constantine Habitat", role: "Agence immobilière", phone: "+213 31 55 22 33", email: "info@constantinehabitat.dz" },
  },
  {
    id: "l4", category: "louer", title: "Appartement F3 meublé", subtitle: "Appartement",
    location: "Oran Centre", meta: "95 m² • 3 pièces", price: "70 000 DA/mois", badge: "Vérifié", image: l4,
    description: "F3 meublé avec goût, balcon, cuisine équipée, à proximité des transports et commerces.",
    details: [
      { label: "Surface", value: "95 m²" },
      { label: "Pièces", value: "3" },
      { label: "Meublé", value: "Oui" },
      { label: "Étage", value: "3e" },
    ],
    author: { name: "Oran Properties", role: "Agence immobilière", phone: "+213 41 22 33 44", email: "contact@oranprop.dz" },
  },

  // ===== Projets =====
  {
    id: "p1", category: "projets", title: "Résidence Les Oliviers", subtitle: "120 logements LSP",
    location: "Bouinan, Blida", meta: "Livraison 2026", badge: "En cours", image: p1,
    description: "Programme de 120 logements LSP avec espaces verts, aires de jeux, parkings et commerces de proximité.",
    details: [
      { label: "Logements", value: "120" },
      { label: "Type", value: "LSP" },
      { label: "Avancement", value: "55%" },
      { label: "Livraison", value: "Q2 2026" },
    ],
    author: { name: "Promobat", role: "Promoteur immobilier", phone: "+213 25 11 22 33", email: "projets@promobat.dz" },
  },
  {
    id: "p2", category: "projets", title: "Tour Business Bay", subtitle: "Complexe commercial",
    location: "Bab Ezzouar, Alger", meta: "20 étages • Livraison 2027", badge: "En cours", image: p2,
    description: "Tour de 20 étages mixant bureaux, espaces commerciaux et restaurants au cœur du nouveau pôle d'affaires.",
    details: [
      { label: "Étages", value: "20" },
      { label: "Surface", value: "45 000 m²" },
      { label: "Avancement", value: "30%" },
      { label: "Livraison", value: "Q4 2027" },
    ],
    author: { name: "Groupe DAHLI", role: "Promoteur immobilier", phone: "+213 21 77 88 99", email: "info@dahli.dz" },
  },
  {
    id: "p3", category: "projets", title: "Eco-quartier El Bahia", subtitle: "Lotissement écologique",
    location: "Oran", meta: "85 villas • Livraison 2025", badge: "En cours", image: p3,
    description: "Quartier écologique avec villas équipées de panneaux solaires, récupération d'eau, et espaces verts partagés.",
    details: [
      { label: "Villas", value: "85" },
      { label: "Surface lots", value: "300-500 m²" },
      { label: "Avancement", value: "75%" },
      { label: "Livraison", value: "Q4 2025" },
    ],
    author: { name: "Cosider Promotion", role: "Promoteur immobilier", phone: "+213 21 23 45 67", email: "contact@cosider.dz" },
  },
  {
    id: "p4", category: "projets", title: "Résidence Marina View", subtitle: "Appartements front de mer",
    location: "Béjaïa", meta: "60 lots • Livraison 2026", image: p4,
    description: "Résidence de standing en bord de mer avec piscine, salle de sport et accès direct à la marina.",
    details: [
      { label: "Logements", value: "60" },
      { label: "Vue", value: "Mer" },
      { label: "Avancement", value: "40%" },
      { label: "Livraison", value: "Q3 2026" },
    ],
    author: { name: "El Hadi Construction", role: "Promoteur immobilier", phone: "+213 34 55 66 77", email: "elhadi@construction.dz" },
  },

  // ===== Agences =====
  {
    id: "ag1", category: "agences", title: "Algéria Immo", subtitle: "Agence immobilière",
    location: "Alger Centre", meta: "+250 annonces actives", badge: "Certifiée", image: ag1,
    description: "Agence leader à Alger, spécialisée dans la vente et la location de biens haut de gamme depuis 2010.",
    details: [
      { label: "Fondée en", value: "2010" },
      { label: "Annonces", value: "250+" },
      { label: "Agents", value: "12" },
      { label: "Note", value: "4.8 / 5" },
    ],
    author: { name: "Algéria Immo", role: "Agence immobilière", phone: "+213 21 45 67 89", email: "contact@algeriaimmo.dz" },
  },
  {
    id: "ag2", category: "agences", title: "Oran Properties", subtitle: "Agence immobilière",
    location: "Oran", meta: "+180 annonces actives", badge: "Certifiée", image: ag2,
    description: "Spécialiste de l'immobilier résidentiel et commercial dans la wilaya d'Oran et l'Ouest algérien.",
    details: [
      { label: "Fondée en", value: "2014" },
      { label: "Annonces", value: "180+" },
      { label: "Agents", value: "8" },
      { label: "Note", value: "4.6 / 5" },
    ],
    author: { name: "Oran Properties", role: "Agence immobilière", phone: "+213 41 22 33 44", email: "contact@oranprop.dz" },
  },
  {
    id: "ag3", category: "agences", title: "Constantine Habitat", subtitle: "Agence immobilière",
    location: "Constantine", meta: "+90 annonces", image: ag3,
    description: "Agence de proximité au cœur de Constantine, avec une expertise reconnue de l'Est algérien.",
    details: [
      { label: "Fondée en", value: "2017" },
      { label: "Annonces", value: "90+" },
      { label: "Agents", value: "5" },
      { label: "Note", value: "4.4 / 5" },
    ],
    author: { name: "Constantine Habitat", role: "Agence immobilière", phone: "+213 31 55 22 33", email: "info@constantinehabitat.dz" },
  },
  {
    id: "ag4", category: "agences", title: "Sahel Immobilier", subtitle: "Agence immobilière",
    location: "Tipaza", meta: "+120 annonces", badge: "Certifiée", image: ag4,
    description: "Agence spécialisée dans les biens côtiers et résidences secondaires sur la côte algéroise.",
    details: [
      { label: "Fondée en", value: "2012" },
      { label: "Annonces", value: "120+" },
      { label: "Agents", value: "7" },
      { label: "Note", value: "4.7 / 5" },
    ],
    author: { name: "Sahel Immobilier", role: "Agence immobilière", phone: "+213 24 88 99 11", email: "info@sahelimmo.dz" },
  },

  // ===== Promoteurs =====
  {
    id: "pr1", category: "promoteurs", title: "Groupe DAHLI", subtitle: "Promoteur immobilier",
    location: "Alger", meta: "15 projets livrés", badge: "Top promoteur", image: pr1,
    description: "Acteur majeur de la promotion immobilière en Algérie, avec un portefeuille de projets résidentiels et commerciaux.",
    details: [
      { label: "Fondé en", value: "1998" },
      { label: "Projets livrés", value: "15" },
      { label: "En cours", value: "4" },
      { label: "Logements livrés", value: "3 200+" },
    ],
    author: { name: "Groupe DAHLI", role: "Promoteur immobilier", phone: "+213 21 77 88 99", email: "info@dahli.dz" },
  },
  {
    id: "pr2", category: "promoteurs", title: "Promobat", subtitle: "Promoteur immobilier",
    location: "Oran", meta: "8 projets en cours", image: pr2,
    description: "Promoteur de l'Ouest algérien, spécialisé dans les programmes LSP, LPP et logements promotionnels.",
    details: [
      { label: "Fondé en", value: "2005" },
      { label: "Projets livrés", value: "10" },
      { label: "En cours", value: "8" },
      { label: "Logements livrés", value: "1 800+" },
    ],
    author: { name: "Promobat", role: "Promoteur immobilier", phone: "+213 41 11 22 33", email: "projets@promobat.dz" },
  },
  {
    id: "pr3", category: "promoteurs", title: "Cosider Promotion", subtitle: "Promoteur immobilier",
    location: "National", meta: "+30 projets livrés", badge: "Top promoteur", image: pr3,
    description: "Filiale du groupe Cosider, présente dans plusieurs wilayas avec des programmes d'envergure nationale.",
    details: [
      { label: "Fondée en", value: "1996" },
      { label: "Projets livrés", value: "30+" },
      { label: "En cours", value: "12" },
      { label: "Logements livrés", value: "8 500+" },
    ],
    author: { name: "Cosider Promotion", role: "Promoteur immobilier", phone: "+213 21 23 45 67", email: "contact@cosider.dz" },
  },
  {
    id: "pr4", category: "promoteurs", title: "El Hadi Construction", subtitle: "Promoteur immobilier",
    location: "Constantine", meta: "5 projets en cours", image: pr4,
    description: "Promoteur spécialisé dans les résidences de standing et complexes touristiques dans l'Est du pays.",
    details: [
      { label: "Fondé en", value: "2010" },
      { label: "Projets livrés", value: "6" },
      { label: "En cours", value: "5" },
      { label: "Logements livrés", value: "1 100+" },
    ],
    author: { name: "El Hadi Construction", role: "Promoteur immobilier", phone: "+213 34 55 66 77", email: "elhadi@construction.dz" },
  },

  // ===== Emplois =====
  {
    id: "e1", category: "emplois", title: "Agent immobilier confirmé", subtitle: "CDI • Temps plein",
    location: "Alger", meta: "Algéria Immo", price: "60 000 - 90 000 DA", image: e1,
    description: "Recherche agent immobilier confirmé avec portefeuille clients, pour rejoindre notre équipe d'Alger Centre.",
    details: [
      { label: "Contrat", value: "CDI" },
      { label: "Expérience", value: "3 ans minimum" },
      { label: "Permis", value: "B requis" },
      { label: "Commissions", value: "Attractives" },
    ],
    author: { name: "Algéria Immo", role: "Recruteur", phone: "+213 21 45 67 89", email: "rh@algeriaimmo.dz" },
  },
  {
    id: "e2", category: "emplois", title: "Architecte junior", subtitle: "CDI • Temps plein",
    location: "Oran", meta: "Cabinet Bensalem", price: "70 000 - 100 000 DA", image: e2,
    description: "Cabinet d'architecture recherche un(e) architecte junior maîtrisant AutoCAD, Revit et SketchUp.",
    details: [
      { label: "Contrat", value: "CDI" },
      { label: "Expérience", value: "0-2 ans" },
      { label: "Diplôme", value: "Architecte DPLG" },
      { label: "Logiciels", value: "AutoCAD, Revit" },
    ],
    author: { name: "Cabinet Bensalem", role: "Recruteur", phone: "+213 41 33 44 55", email: "rh@bensalem-archi.dz" },
  },
  {
    id: "e3", category: "emplois", title: "Conducteur de travaux", subtitle: "CDI • Chantier",
    location: "Blida", meta: "Cosider Promotion", price: "80 000 - 120 000 DA", image: e3,
    description: "Conducteur de travaux pour piloter un chantier de 120 logements à Bouinan. Encadrement d'équipes.",
    details: [
      { label: "Contrat", value: "CDI" },
      { label: "Expérience", value: "5 ans minimum" },
      { label: "Diplôme", value: "Ingénieur génie civil" },
      { label: "Voiture", value: "Fournie" },
    ],
    author: { name: "Cosider Promotion", role: "Recruteur", phone: "+213 25 11 22 33", email: "rh@cosider.dz" },
  },
  {
    id: "e4", category: "emplois", title: "Négociateur immobilier", subtitle: "Freelance / Commission",
    location: "Constantine", meta: "Constantine Habitat", image: e4,
    description: "Négociateur indépendant rémunéré à la commission. Liberté d'organisation, formation assurée.",
    details: [
      { label: "Statut", value: "Indépendant" },
      { label: "Expérience", value: "Débutant accepté" },
      { label: "Formation", value: "Fournie" },
      { label: "Commission", value: "Jusqu'à 50%" },
    ],
    author: { name: "Constantine Habitat", role: "Recruteur", phone: "+213 31 55 22 33", email: "rh@constantinehabitat.dz" },
  },
];
