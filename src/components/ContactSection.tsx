"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Send, Instagram, Facebook, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { businessInfo } from "@/data/products";
import { useLanguage } from "@/i18n";

export function ContactSection() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", phone: "", email: "", message: "" });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.2em] uppercase text-champagne font-medium">
            {t.contactPage.sectionLabel}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mt-4 mb-6">
            {t.contactPage.title}
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto text-lg">
            {t.contactPage.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-stretch">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-full"
          >
            <div className="bg-card border border-border/50 rounded-2xl p-8 md:p-10 shadow-lg shadow-black/5 h-full flex flex-col">
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-2">
                {t.contactPage.formTitle}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t.contactPage.formSubtitle}
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-medium text-foreground mb-2">
                    {t.contactPage.successTitle}
                  </h3>
                  <p className="text-muted-foreground">
                    {t.contactPage.successMessage}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {t.contactPage.nameLabel}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      placeholder={t.contactPage.namePlaceholder}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-champagne/50 focus:border-champagne transition-all duration-200 text-foreground placeholder:text-muted-foreground/60"
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {t.contactPage.phoneLabel}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        required
                        placeholder={t.contactPage.phonePlaceholder}
                        className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-champagne/50 focus:border-champagne transition-all duration-200 text-foreground placeholder:text-muted-foreground/60"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {t.contactPage.emailLabel}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        placeholder={t.contactPage.emailPlaceholder}
                        className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-champagne/50 focus:border-champagne transition-all duration-200 text-foreground placeholder:text-muted-foreground/60"
                      />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {t.contactPage.messageLabel}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      placeholder={t.contactPage.messagePlaceholder}
                      className="w-full flex-1 min-h-[150px] px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-champagne/50 focus:border-champagne transition-all duration-200 text-foreground placeholder:text-muted-foreground/60 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-forest hover:bg-forest/90 text-white magnetic-hover group"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t.contactPage.sending}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        {t.contactPage.sendButton}
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-8 h-full"
          >
            {/* Contact Details Card */}
            <div className="bg-card border border-border/50 rounded-2xl p-8 md:p-10 shadow-lg shadow-black/5">
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-8">
                {t.contactPage.infoTitle}
              </h2>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center text-champagne flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">{t.store.phone}</p>
                    <a
                      href={businessInfo.phoneLink}
                      className="text-champagne hover:text-champagne/80 transition-colors font-medium"
                    >
                      {businessInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center text-champagne flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">{t.store.address}</p>
                    <p className="text-muted-foreground">{businessInfo.address}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessInfo.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-champagne hover:text-champagne/80 transition-colors text-sm font-medium inline-block mt-1"
                    >
                      {t.common.getDirections} →
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center text-champagne flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">{t.store.hours}</p>
                    <p className="text-muted-foreground">{t.store.hoursValue}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-lg shadow-black/5 flex-1 min-h-[250px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.5!2d33.5818773!3d34.8538513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14e09ba274acd8b1%3A0x53caefce40160635!2sKastanos%20Jewellery!5e0!3m2!1sen!2scy!4v1707069729000!5m2!1sen!2scy"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '250px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t.contactPage.mapTitle}
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
