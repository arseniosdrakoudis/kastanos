"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone } from "lucide-react";
import { useLanguage } from "@/i18n";


interface ProductDetailProps {
  productId: string;
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const { t } = useLanguage();
  const product = products.find((p) => p.id === productId);

  // Get translated category label
  const getCategoryLabel = () => {
    return t.productCategories.jewellery;
  };

  if (!product) {
    return (
      <section className="min-h-screen pt-32 pb-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">
              {t.productPage.productNotFound}
            </h1>
            <p className="text-muted-foreground mb-8">
              {t.productPage.productNotFoundDescription}
            </p>
            <Link href="/jewellery">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                {t.productPage.backToCollection}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/jewellery"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.productPage.backToCollection}
          </Link>
        </motion.div>

        {/* Product Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg lg:sticky lg:top-32"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-8"
              priority
            />
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge
                variant="secondary"
                className="bg-champagne/10 text-champagne border-0 text-sm"
              >
                {getCategoryLabel()}
              </Badge>
              <Badge
                variant="outline"
                className="border-foreground/20 text-foreground text-sm"
              >
                {product.productType}
              </Badge>
              <Badge
                variant="outline"
                className="border-foreground/20 text-foreground text-sm"
              >
                {product.sex}
              </Badge>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4">
              {product.name}
            </h1>

            {product.price && (
              <p className="text-2xl md:text-3xl font-medium text-foreground mb-6">
                {product.price}
              </p>
            )}

            {product.description && (
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {product.description}
              </p>
            )}

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                asChild
                size="lg"
                className="bg-forest hover:bg-forest/90 text-white gap-2"
              >
                <Link href="/contact">
                  <Phone className="w-4 h-4" />
                  {t.productPage.inquire}
                </Link>
              </Button>
            </div>

            {/* Product Details Sections */}
            {product.details && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Specifications */}
                {product.details.specifications && product.details.specifications.length > 0 && (
                  <div className="border-t border-border/50 pt-8">
                    <h2 className="font-serif text-xl font-medium text-foreground mb-4">
                      {t.productPage.specifications}
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      {product.details.specifications.map((spec, index) => (
                        <div key={index} className="flex flex-col">
                          <span className="text-sm text-muted-foreground">{spec.label}</span>
                          <span className="text-foreground font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Materials */}
                {product.details.materials && product.details.materials.length > 0 && (
                  <div className="border-t border-border/50 pt-8">
                    <h2 className="font-serif text-xl font-medium text-foreground mb-4">
                      {t.productPage.materials}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {product.details.materials.map((material, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-foreground/20 text-foreground"
                        >
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                {product.details.features && product.details.features.length > 0 && (
                  <div className="border-t border-border/50 pt-8">
                    <h2 className="font-serif text-xl font-medium text-foreground mb-4">
                      {t.productPage.features}
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {product.details.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}

            {/* Trust Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 pt-8 border-t border-border/50"
            >
              <p className="text-sm text-muted-foreground">
                {t.trust.pillars.authenticity.description}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
