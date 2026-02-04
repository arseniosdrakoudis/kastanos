"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n";

export function CategorySpotlight() {
  const { t } = useLanguage();

  const categories = [
    {
      id: "rings",
      title: t.categories.rings.title,
      description: t.categories.rings.description,
      image: "/products/category-rings.jpg",
      href: "/jewellery/rings",
    },
    {
      id: "necklaces",
      title: t.categories.necklaces.title,
      description: t.categories.necklaces.description,
      image: "/products/category-necklaces.jpg",
      href: "/jewellery/necklaces",
    },
    {
      id: "earrings",
      title: t.categories.earrings.title,
      description: t.categories.earrings.description,
      image: "/products/category-earrings.jpg",
      href: "/jewellery/earrings",
    },
    {
      id: "braceletswatches",
      title: t.categories.braceletswatches.title,
      description: t.categories.braceletswatches.description,
      image: "/products/category-bracelets.jpg",
      href: "/jewellery/bracelets",
    },
  ];

  return (
    <section id="collections" className="py-24 md:py-32 bg-background">
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
            {t.categories.sectionLabel}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mt-4">
            {t.categories.sectionTitle}
          </h2>
        </motion.div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={category.href} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/50 bg-muted card-hover-lift">
                  {/* Category Image */}
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    priority={index < 2}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-champagne/0 group-hover:bg-champagne/10 transition-colors duration-300" />
                  
                  {/* Border glow on hover */}
                  <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-champagne/30 transition-colors duration-300" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-background/70 via-background/20 to-transparent">
                    <h3 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-2">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base mb-4 max-w-sm">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-2 text-forest font-medium text-sm group-hover:gap-3 transition-all duration-200">
                      <span>{t.common.explore}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
