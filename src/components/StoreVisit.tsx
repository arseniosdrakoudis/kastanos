"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { businessInfo } from "@/data/products";
import { useLanguage } from "@/i18n";

export function StoreVisit() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[4/3] lg:aspect-[4/3] rounded-lg overflow-hidden"
          >
            <Image
              src="/boutique.jpg"
              alt={t.store.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm tracking-[0.2em] uppercase text-champagne font-medium">
              {t.store.sectionLabel}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mt-4 mb-6">
              {t.store.sectionTitle}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              {t.store.description}
            </p>

            {/* Contact Details */}
            <div className="space-y-4 mb-8">
              {/* Boutique Locations */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center text-champagne flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">{t.store.addresses}</p>
                  <div className="space-y-3">
                    {businessInfo.locations.map((location) => (
                      <div key={location.name}>
                        <p className="text-champagne text-sm font-medium">{location.name}</p>
                        <p className="text-muted-foreground text-sm">{location.address}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center text-champagne flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">{t.store.phone}</p>
                  <a
                    href={businessInfo.phoneLink}
                    className="text-champagne hover:text-champagne/80 transition-colors text-sm font-medium"
                  >
                    {businessInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center text-champagne flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">{t.store.hours}</p>
                  <p className="text-muted-foreground text-sm">{t.store.hoursValue}</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                asChild
                className="bg-forest hover:bg-forest/90 text-white magnetic-hover"
              >
                <a href={businessInfo.phoneLink} className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {t.common.callNow} {businessInfo.phone}
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-foreground/20 hover:border-foreground/40"
              >
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessInfo.locations[0].address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  {t.common.getDirections}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
