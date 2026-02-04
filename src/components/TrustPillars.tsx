"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Users, Gem, Gift } from "lucide-react";
import { useLanguage } from "@/i18n";

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
  Gem: <Gem className="w-8 h-8" />,
  Gift: <Gift className="w-8 h-8" />,
};

export function TrustPillars() {
  const { t } = useLanguage();

  const trustPillars = [
    {
      title: t.trust.pillars.authenticity.title,
      description: t.trust.pillars.authenticity.description,
      icon: "ShieldCheck",
    },
    {
      title: t.trust.pillars.expertise.title,
      description: t.trust.pillars.expertise.description,
      icon: "Users",
    },
    {
      title: t.trust.pillars.craftsmanship.title,
      description: t.trust.pillars.craftsmanship.description,
      icon: "Gem",
    },
    {
      title: t.trust.pillars.packaging.title,
      description: t.trust.pillars.packaging.description,
      icon: "Gift",
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-background">
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
            {t.trust.sectionLabel}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mt-4">
            {t.trust.sectionTitle}
          </h2>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trustPillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-champagne/10 text-champagne mb-6 icon-interactive cursor-default">
                {iconMap[pillar.icon]}
              </div>
              <h3 className="font-medium text-foreground text-lg mb-3">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
