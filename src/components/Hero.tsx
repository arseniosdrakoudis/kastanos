"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n";

// AVIF clips configuration - add more clips here as they become available
const HERO_CLIPS = ["/hero-1.avif", "/hero-2.avif", "/hero-3.avif", "/hero-4.avif"];

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [isClipLoaded, setIsClipLoaded] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const { t } = useLanguage();

  // Check for slow connection and reduced motion preference
  useEffect(() => {
    // Check network speed
    if (typeof navigator !== "undefined" && "connection" in navigator) {
      const connection = navigator.connection as { effectiveType?: string };
      if (
        connection?.effectiveType === "slow-2g" ||
        connection?.effectiveType === "2g"
      ) {
        setUseFallback(true);
      }
    }

    // Reduced motion preference
    if (prefersReducedMotion) {
      setUseFallback(true);
    }
  }, [prefersReducedMotion]);

  // Preload next clip when current one loads (for multi-clip support)
  useEffect(() => {
    if (!isClipLoaded || HERO_CLIPS.length <= 1) return;

    const nextIndex = (currentClipIndex + 1) % HERO_CLIPS.length;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.type = "image/avif";
    link.href = HERO_CLIPS[nextIndex];
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [isClipLoaded, currentClipIndex]);

  const handleClipLoad = () => {
    setIsClipLoaded(true);
  };

  // Determine if we should show animated AVIF or static fallback
  const showAnimatedClip = !useFallback && !prefersReducedMotion;

  // Auto-cycle clips with timer (animated AVIFs don't fire animation events)
  useEffect(() => {
    if (!showAnimatedClip || HERO_CLIPS.length <= 1) return;

    const clipDuration = 7500; // 7.5 seconds per clip
    const timer = setInterval(() => {
      setCurrentClipIndex((prev) => (prev + 1) % HERO_CLIPS.length);
    }, clipDuration);

    return () => clearInterval(timer);
  }, [showAnimatedClip]);

  return (
    <section className="hero relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* AVIF/Image Background */}
      {showAnimatedClip ? (
        <AnimatePresence mode="sync">
          <motion.img
            key={currentClipIndex}
            src={HERO_CLIPS[currentClipIndex]}
            alt=""
            onLoad={handleClipLoad}
            className="hero-avif"
            style={HERO_CLIPS[currentClipIndex] === "/hero-1.avif" ? { transform: "scale(1.25)" } : undefined}
            aria-hidden="true"
            fetchPriority="high"
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </AnimatePresence>
      ) : (
        /* Static poster fallback for reduced motion / slow connections */
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: "url('/hero-poster.jpg')" }}
          aria-hidden="true"
        />
      )}

      {/* Gradient Overlay */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-block text-sm tracking-[0.2em] uppercase text-champagne font-semibold mb-6 drop-shadow-lg bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-champagne/20"
          >
            {t.hero.badge}
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium text-white mb-6 leading-tight drop-shadow-lg"
          >
            {t.hero.headlinePart1}
            <br />
            <span className="text-champagne">{t.hero.headlinePart2}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md"
          >
            {t.hero.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              asChild
              className="bg-forest hover:bg-forest/90 text-white px-8 py-6 text-base magnetic-hover shadow-xl shadow-forest/20"
            >
              <Link href="#collections">{t.hero.exploreCollections}</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="bg-transparent border-white/50 hover:border-champagne text-white hover:text-champagne hover:bg-white/10 px-8 py-6 text-base backdrop-blur-md shadow-lg"
            >
              <Link href="#contact">{t.hero.visitBoutique}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - positioned relative to section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-white/60"
        >
          <span className="text-xs tracking-widest uppercase mb-2">
            {t.common.scroll}
          </span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
