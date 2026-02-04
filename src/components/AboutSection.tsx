"use client";

import { motion, Variants } from "framer-motion";
import { Clock, Award, Users, Heart, Diamond, Shield } from "lucide-react";
import { useLanguage } from "@/i18n";
import Image from "next/image";

export function AboutSection() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Award,
      title: t.aboutPage.values.authenticity,
      description: t.aboutPage.values.authenticityDesc,
    },
    {
      icon: Users,
      title: t.aboutPage.values.family,
      description: t.aboutPage.values.familyDesc,
    },
    {
      icon: Heart,
      title: t.aboutPage.values.passion,
      description: t.aboutPage.values.passionDesc,
    },
    {
      icon: Diamond,
      title: t.aboutPage.values.quality,
      description: t.aboutPage.values.qualityDesc,
    },
    {
      icon: Shield,
      title: t.aboutPage.values.trust,
      description: t.aboutPage.values.trustDesc,
    },
    {
      icon: Clock,
      title: t.aboutPage.values.legacy,
      description: t.aboutPage.values.legacyDesc,
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.2em] uppercase text-champagne font-medium">
            {t.aboutPage.sectionLabel}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mt-4 mb-6">
            {t.aboutPage.title}
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto text-lg">
            {t.aboutPage.description}
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-12 items-center mb-24"
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg shadow-black/5">
            <Image
              src="/boutique.jpg"
              alt={t.aboutPage.storeImageAlt}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
          <div className="space-y-6">
            <span className="text-sm tracking-[0.2em] uppercase text-champagne font-medium">
              {t.aboutPage.storyLabel}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight">
              {t.aboutPage.storyTitle}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t.aboutPage.storyParagraph1}</p>
              <p>{t.aboutPage.storyParagraph2}</p>
              <p>{t.aboutPage.storyParagraph3}</p>
            </div>
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-card border border-border/50 rounded-3xl p-8 md:p-12 mb-24 shadow-lg shadow-black/5"
        >
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm tracking-[0.2em] uppercase text-champagne font-medium mb-4 block">
              {t.aboutPage.missionLabel}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6 tracking-tight">
              {t.aboutPage.missionTitle}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t.aboutPage.missionDescription}
            </p>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <span className="text-sm tracking-[0.2em] uppercase text-champagne font-medium mb-4 block">
              {t.aboutPage.valuesLabel}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight">
              {t.aboutPage.valuesTitle}
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-card border border-border/50 rounded-2xl p-6 shadow-lg shadow-black/5 hover:border-champagne/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-champagne/10 flex items-center justify-center mb-4 group-hover:bg-champagne/20 transition-colors duration-300">
                  <value.icon className="w-6 h-6 text-champagne" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="text-sm tracking-[0.2em] uppercase text-champagne font-medium mb-4 block">
            {t.aboutPage.teamLabel}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6 tracking-tight">
            {t.aboutPage.teamTitle}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            {t.aboutPage.teamDescription}
          </p>
          <div className="inline-flex items-center gap-3 text-champagne text-sm">
            <span className="w-8 h-px bg-champagne/50" />
            <span className="uppercase tracking-[0.15em]">
              {t.aboutPage.teamTagline}
            </span>
            <span className="w-8 h-px bg-champagne/50" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
