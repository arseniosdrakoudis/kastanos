import { Product, NavItem, TrustPillar } from "@/types";
import productsData from "./products.json";

export const products: Product[] = productsData as Product[];

export const navItems: NavItem[] = [
  { label: "Jewellery", href: "#jewellery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const trustPillars: TrustPillar[] = [
  {
    title: "Authenticity & Quality",
    description: "Every piece verified and certified for genuine excellence",
    icon: "ShieldCheck",
  },
  {
    title: "Expert Guidance",
    description: "Personal consultation from our knowledgeable specialists",
    icon: "Users",
  },
  {
    title: "Premium Craftsmanship",
    description: "Curated selection from the world's finest maisons",
    icon: "Gem",
  },
  {
    title: "Gift-Ready Packaging",
    description: "Elegant presentation for every precious moment",
    icon: "Gift",
  },
];

export const businessInfo = {
  name: "Kastanos Jewellery",
  legalEntity: "Stavros G. Kastanos Ltd",
  founder: "Stavros G. Kastanos",
  tagline: "Fine Jewellery",
  region: "Kiti",
  locations: [
    {
      name: "Kiti",
      address: "Archiepiskopou Makariou III 55, Shop 2, 7550 Kiti, Larnaca, Cyprus",
      isPrimary: true,
    },
    {
      name: "Dromolaxia",
      address: "Eleftherias Str, Shop 8-9, Dromolaxia, 7020, Larnaca, Cyprus",
      isPrimary: false,
    },
  ],
  phone: "+357 24 424343",
  phoneLink: "tel:+35724424343",
  email: "kastanosjewellers@gmail.com",
  description: "Your trusted destination for exquisite jewellery in Kiti, Cyprus.",
};
