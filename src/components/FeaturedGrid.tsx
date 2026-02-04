"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { useLanguage } from "@/i18n";

interface ProductCardProps {
  product: Product;
  index: number;
  translations: {
    viewProduct: string;
    categoryLabel: string;
  };
}

function ProductCard({ product, index, translations }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/product/${product.id}`} className="block">
        <Card className="group overflow-hidden border-border/50 hover:border-champagne/30 transition-all duration-300 bg-card card-hover-lift">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-white">
            {/* Product Image */}
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* View Product Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/60 backdrop-blur-sm">
              <span className="flex items-center gap-2 text-foreground font-medium text-sm bg-background/90 px-4 py-2 rounded-full border border-border/50">
                <Eye className="w-4 h-4" />
                {translations.viewProduct}
              </span>
            </div>
          </div>

          {/* Content */}
          <CardContent className="p-4">
            <Badge
              variant="secondary"
              className="mb-2 text-xs font-normal bg-champagne/10 text-champagne border-0"
            >
              {translations.categoryLabel}
            </Badge>
            <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-1">
              {product.name}
            </h3>
            {product.price && (
              <p className="text-muted-foreground text-sm">{product.price}</p>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

export function FeaturedGrid() {
  const { t } = useLanguage();

  // Get translated category label
  const getCategoryLabel = () => {
    return t.productCategories.jewellery;
  };

  return (
    <section id="featured" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.2em] uppercase text-champagne font-medium">
            {t.featured.sectionLabel}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mt-4">
            {t.featured.sectionTitle}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t.featured.sectionDescription}
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="product-grid">
          {products.filter(p => p.isBestSeller).map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              translations={{
                viewProduct: t.featured.viewDetails,
                categoryLabel: getCategoryLabel(),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
