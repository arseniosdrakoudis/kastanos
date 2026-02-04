"use client";

import Link from "next/link";
import Image from "next/image";
import { businessInfo } from "@/data/products";
import { Separator } from "@/components/ui/separator";
import { Phone, MapPin, Instagram, Facebook, Mail } from "lucide-react";
import { useLanguage } from "@/i18n";

export function Footer() {
  const { t } = useLanguage();

  const navItems = [
    { label: t.nav.rings, href: "/jewellery/rings" },
    { label: t.nav.necklaces, href: "/jewellery/necklaces" },
    { label: t.nav.earrings, href: "/jewellery/earrings" },
    { label: t.nav.braceletswatches, href: "/jewellery/bracelets" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Section - Content Columns */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {/* Brand Column */}
            <div>
              <div className="mb-4">
                              <Image
                  src="/kastanos-logo-reversed.png"
                  alt="Kastanos Jewellery"
                  width={160}
                  height={60}
                  className="h-auto"
                />
              </div>
              <p className="text-background/70 text-sm leading-relaxed max-w-sm mb-6">
                {t.business.description}
              </p>
              {/* Social Icons */}
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/kastanosjewellery/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/kastanosjewellery/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Navigation Column */}
            <div>
              <h4 className="font-medium text-background mb-4">{t.footer.navigation}</h4>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-background/70 hover:text-background text-sm transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="font-medium text-background mb-4">{t.footer.contact}</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={businessInfo.phoneLink}
                    className="flex items-center gap-2 text-background/70 hover:text-background text-sm transition-colors duration-200"
                  >
                    <Phone className="w-4 h-4" />
                    {businessInfo.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${businessInfo.email}`}
                    className="flex items-center gap-2 text-background/70 hover:text-background text-sm transition-colors duration-200"
                  >
                    <Mail className="w-4 h-4" />
                    {businessInfo.email}
                  </a>
                </li>
              </ul>
              
              {/* Locations */}
              <div className="mt-4">
                <p className="text-background/50 text-xs uppercase tracking-wider mb-3">{businessInfo.region}</p>
                <ul className="space-y-3">
                  {businessInfo.locations.map((location) => (
                    <li key={location.name} className="flex items-start gap-2 text-background/70 text-sm">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{location.address}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Section - Map */}
          <div className="lg:w-[400px] flex-shrink-0">
            <h4 className="font-medium text-background mb-4">{t.footer.findUs}</h4>
            <div className="rounded-lg overflow-hidden h-[200px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.5!2d33.5818773!3d34.8538513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14e09ba274acd8b1%3A0x53caefce40160635!2sKastanos%20Jewellery!5e0!3m2!1sen!2scy!4v1707069729000!5m2!1sen!2scy"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kastanos Jewellery Location"
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-background/20" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60">
          <p>© {new Date().getFullYear()} {businessInfo.name}. {t.footer.copyright}</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-background transition-colors duration-200">
              {t.footer.privacy}
            </Link>
            <Link href="#" className="hover:text-background transition-colors duration-200">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
