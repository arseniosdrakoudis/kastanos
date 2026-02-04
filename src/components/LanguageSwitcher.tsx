"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage, localeNames, localeFlags, Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { ChevronDown, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LanguageSwitcherProps {
  isScrolled?: boolean;
  variant?: "desktop" | "mobile";
}

const locales: Locale[] = ["en", "el", "ru"];

export function LanguageSwitcher({
  isScrolled = true,
  variant = "desktop",
}: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  if (variant === "mobile") {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-foreground/60 mb-1">Language</p>
        <div className="flex gap-2">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => handleLocaleChange(l)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                locale === l
                  ? "bg-champagne text-white"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              )}
            >
              <span>{localeFlags[l]}</span>
              <span>{localeNames[l]}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
          isScrolled
            ? "text-foreground/80 hover:text-foreground hover:bg-muted"
            : "text-white/90 hover:text-white hover:bg-white/10"
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Current language: ${t.languages[locale]}. Click to change language.`}
      >
        <Globe className="w-4 h-4" />
        <span>{localeNames[locale]}</span>
        <ChevronDown
          className={cn(
            "w-3 h-3 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 bg-background border border-border/50 rounded-lg shadow-xl overflow-hidden z-50 min-w-[140px]"
            role="listbox"
          >
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => handleLocaleChange(l)}
                className={cn(
                  "flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors duration-150",
                  locale === l
                    ? "bg-champagne/10 text-champagne font-medium"
                    : "text-foreground hover:bg-muted"
                )}
                role="option"
                aria-selected={locale === l}
              >
                <span className="text-base">{localeFlags[l]}</span>
                <span>{t.languages[l]}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
