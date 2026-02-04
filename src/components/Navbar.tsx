"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { businessInfo } from "@/data/products";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface NavbarProps {
  forceScrolled?: boolean;
}

export function Navbar({ forceScrolled = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(forceScrolled);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (forceScrolled) {
      setIsScrolled(true);
      return;
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [forceScrolled]);

  const navItems = [
    { label: t.nav.rings, href: "/jewellery/rings" },
    { label: t.nav.necklaces, href: "/jewellery/necklaces" },
    { label: t.nav.earrings, href: "/jewellery/earrings" },
    { label: t.nav.braceletswatches, href: "/jewellery/bracelets" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <Logo width={160} height={50} variant={isScrolled ? "normal" : "reversed"} />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 link-underline",
                  isScrolled
                    ? "text-foreground/80 hover:text-foreground"
                    : "text-white/90 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher isScrolled={isScrolled} />
          <Button
            variant="outline"
            size="sm"
            asChild
            className={cn(
              isScrolled
                ? "border-foreground/20 hover:border-foreground/40"
                : "border-white/50 hover:border-white/80"
            )}
          >
            <Link href="/contact">{t.common.bookVisit}</Link>
          </Button>
          <Button
            size="sm"
            asChild
            className="bg-forest hover:bg-forest/90 text-white magnetic-hover"
          >
            <a href={businessInfo.phoneLink} className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {t.common.callNow}
            </a>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className={cn(!isScrolled && "text-white hover:bg-white/10")}>
              <Menu className="w-6 h-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] max-w-[320px] p-0 border-l border-border/50 bg-background">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col h-full">
              {/* Header with logo */}
              <div className="px-6 pt-6 pb-4 border-b border-border/30 bg-gradient-to-r from-champagne/5 to-transparent">
                <Logo width={140} height={45} />
              </div>
              
              {/* Navigation Links */}
              <nav className="flex-1 px-6 py-6">
                <ul className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block py-3 text-lg font-medium text-foreground/80 hover:text-champagne transition-colors duration-200 border-b border-border/20 hover:border-champagne/30"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                
                {/* Mobile Language Switcher */}
                <div className="mt-6 pt-4 border-t border-border/30">
                  <p className="text-sm text-muted-foreground mb-3 font-medium">Language</p>
                  <LanguageSwitcher variant="mobile" />
                </div>
              </nav>

              {/* Footer CTAs */}
              <div className="px-6 py-6 border-t border-border/30 bg-gradient-to-t from-muted/40 to-transparent">
                <div className="flex flex-col gap-3">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    asChild 
                    className="w-full border-foreground/20 hover:border-champagne/50 hover:bg-champagne/5"
                  >
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      {t.common.bookVisit}
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    asChild
                    className="w-full bg-forest hover:bg-forest/90 text-white shadow-lg shadow-forest/20"
                  >
                    <a href={businessInfo.phoneLink} className="flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" />
                      {t.common.callNow} {businessInfo.phone}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
