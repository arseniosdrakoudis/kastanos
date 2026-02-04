export interface Product {
  id: string;
  name: string;
  category: "Jewellery";
  sex: "Men" | "Women" | "Unisex";
  productType: "Ring" | "Bracelet" | "Necklace" | "Earrings" | "Watch";
  subCategory?: string;
  isBestSeller: boolean;
  price?: string;
  image: string;
  shortDescription: string;
  description: string;
  details: {
    specifications: { label: string; value: string }[];
    materials: string[];
    features: string[];
  };
}

export interface NavItem {
  label: string;
  href: string;
}

export interface TrustPillar {
  title: string;
  description: string;
  icon: string;
}
