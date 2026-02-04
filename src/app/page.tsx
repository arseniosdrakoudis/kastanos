"use client";

import { LanguageProvider } from "@/i18n";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CategorySpotlight } from "@/components/CategorySpotlight";
import { FeaturedGrid } from "@/components/FeaturedGrid";
import { TrustPillars } from "@/components/TrustPillars";
import { ServicesSection } from "@/components/ServicesSection";
import { StoreVisit } from "@/components/StoreVisit";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";

export default function Home() {
  return (
    <LanguageProvider>
      <main>
        <ScrollProgress />
        <Navbar />
        <Hero />
        <CategorySpotlight />
        <FeaturedGrid />
        <TrustPillars />
        <ServicesSection />
        <StoreVisit />
        <FinalCTA />
        <Footer />
        <BackToTop />
      </main>
    </LanguageProvider>
  );
}
