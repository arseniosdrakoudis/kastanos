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

      {/* Content - Left-aligned Editorial Layout */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 flex items-center min-h-screen">
        <div className="flex items-stretch gap-8 md:gap-12 max-w-3xl">
          {/* Vertical Accent Line */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="hidden md:block w-px bg-gradient-to-b from-transparent via-champagne to-transparent origin-top"
            style={{ minHeight: "320px" }}
          />

          {/* Text Content */}
          <div className="flex flex-col justify-center text-left">
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xs md:text-sm tracking-[0.3em] uppercase text-champagne/90 font-medium mb-8"
            >
              {t.hero.badge}
            </motion.span>

            {/* Headline - Extra Large Editorial Style */}
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal text-white mb-4 leading-[0.95] tracking-tight"
            >
              {t.hero.headlinePart1}
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal text-champagne mb-10 leading-[0.95] tracking-tight italic"
            >
              {t.hero.headlinePart2}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-base md:text-lg text-white/70 max-w-md mb-12 leading-relaxed font-light"
            >
              {t.hero.subheadline}
            </motion.p>

            {/* CTAs - Stacked on Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-champagne hover:bg-champagne/90 text-dark-bg px-10 py-6 text-sm font-medium tracking-wide uppercase magnetic-hover shadow-xl cursor-pointer"
                onClick={() => {
                  const collectionsSection = document.getElementById('collections');
                  if (collectionsSection) {
                    collectionsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {t.hero.exploreCollections}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-white/80 hover:text-champagne hover:bg-transparent px-6 py-6 text-sm font-medium tracking-wide uppercase group cursor-pointer"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className="flex items-center gap-2">
                  {t.hero.visitBoutique}
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Button>
            </motion.div>
          </div>
        </div>
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
