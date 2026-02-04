"use client";

import { use } from "react";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/i18n";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { ProductCatalogContent } from "@/components/ProductCatalog";
import productsData from "@/data/products.json";
import { Product } from "@/types";

// Map URL slugs to product types
const categoryMap: Record<string, string> = {
  rings: "Ring",
  necklaces: "Necklace",
  earrings: "Earrings",
  bracelets: "Bracelet",
};

// Valid categories for validation
const validCategories = Object.keys(categoryMap);

function CategoryContent({ category }: { category: string }) {
  const products = productsData as Product[];
  const productType = categoryMap[category];

  // Get unique sex options
  const sexOptions = [...new Set(products.map((p) => p.sex))];

  // Filter products by the category type
  const relevantProducts = products.filter(p => p.productType === productType);

  // Get unique subcategory options from relevant products
  const subCategoryOptions = [...new Set(
    relevantProducts
      .map((p) => p.subCategory)
      .filter((sub): sub is string => !!sub)
  )];

  // Get unique material options from relevant products (extract primary materials)
  const primaryMaterials = ["18K Yellow Gold", "18K White Gold", "9K Yellow Gold", "Yellow Gold", "White Gold", "Diamonds", "Zircons", "Stainless Steel"];
  const materialOptions = primaryMaterials.filter(mat =>
    relevantProducts.some(p => p.details.materials.includes(mat))
  );

  return (
    <>
      <ScrollProgress />
      <Navbar forceScrolled />
      <ProductCatalogContent
        products={products}
        sexOptions={sexOptions}
        subCategoryOptions={subCategoryOptions}
        materialOptions={materialOptions}
        initialProductType={productType}
      />
      <Footer />
      <BackToTop />
    </>
  );
}

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  
  // Validate the category
  if (!validCategories.includes(category.toLowerCase())) {
    notFound();
  }

  return (
    <LanguageProvider>
      <main>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <CategoryContent category={category.toLowerCase()} />
        </Suspense>
      </main>
    </LanguageProvider>
  );
}
