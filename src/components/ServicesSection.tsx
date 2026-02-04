"use client";

import { motion } from "framer-motion";
import { Factory, Pencil, Wrench, RulerIcon, CircleDot, Repeat } from "lucide-react";
import { useLanguage } from "@/i18n";

const iconMap: Record<string, React.ReactNode> = {
  Factory: <Factory className="w-7 h-7" />,
  Pencil: <Pencil className="w-7 h-7" />,
  Wrench: <Wrench className="w-7 h-7" />,
  RulerIcon: <RulerIcon className="w-7 h-7" />,
  CircleDot: <CircleDot className="w-7 h-7" />,
  Repeat: <Repeat className="w-7 h-7" />,
};

export function ServicesSection() {
  const { t } = useLanguage();

  const services = [
    {
      title: t.services.manufacturing.title,
      description: t.services.manufacturing.description,
      icon: "Factory",
    },
    {
      title: t.services.customDesign.title,
      description: t.services.customDesign.description,
      icon: "Pencil",
    },
    {
      title: t.services.repairs.title,
      description: t.services.repairs.description,
      icon: "Wrench",
    },
    {
      title: t.services.resizing.title,
      description: t.services.resizing.description,
      icon: "RulerIcon",
    },
    {
      title: t.services.stoneSetting.title,
      description: t.services.stoneSetting.description,
      icon: "CircleDot",
    },
    {
      title: t.services.redesign.title,
      description: t.services.redesign.description,
      icon: "Repeat",
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-champagne/5">
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
            {t.services.sectionLabel}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mt-4">
            {t.services.sectionTitle}
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            {t.services.sectionDescription}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-background rounded-xl p-6 md:p-8 text-center shadow-sm border border-champagne/10 hover:border-champagne/30 transition-colors duration-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-champagne/10 text-champagne mb-5">
                {iconMap[service.icon]}
              </div>
              <h3 className="font-medium text-foreground text-base md:text-lg mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
