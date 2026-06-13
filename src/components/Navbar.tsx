"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, PhoneCall, Zap, Globe } from "lucide-react";
import { useLanguage } from "@/config/LanguageContext";

export default function Navbar() {
  const { language, setLanguage, t, mounted } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const translatedNavLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.services"), href: "/services" },
    { name: t("nav.machinery"), href: "/expertise" },
    { name: t("nav.solutions"), href: "/troubleshooting" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary-navy/80 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Company Name */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-12 h-12 md:w-20 md:h-20 rounded-xl overflow-hidden border border-neon-cyan/30 flex items-center justify-center bg-secondary-navy">
              <img
                src="/logo.jpg"
                alt="CH Energie & Automation Logo"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-base md:text-2xl leading-none tracking-wide text-white group-hover:text-neon-cyan transition-colors">
                CH ENERGIE
              </span>
              <span className="font-sans font-semibold text-[10px] md:text-sm tracking-[0.15em] text-steel-gray mt-1">
                & AUTOMATION
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {translatedNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-body text-sm font-medium transition-colors hover:text-neon-cyan relative py-1 ${
                    isActive ? "text-neon-cyan" : "text-steel-gray"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neon-cyan rounded-full glow-text" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Call / Emergency Button, Language Selector & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact?emergency=true"
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 hover:border-red-500 text-red-400 hover:text-white font-sans text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              {t("nav.emergency")}
            </Link>

            {/* Desktop Language Selector */}
            {mounted && (
              <div className="hidden md:flex items-center gap-2.5 border-l border-white/10 pl-4 h-6 text-xs">
                <Globe className="w-3.5 h-3.5 text-steel-gray" />
                {(["en", "tr", "de"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`font-sans font-bold hover:text-neon-cyan transition-colors uppercase cursor-pointer ${
                      language === lang ? "text-neon-cyan" : "text-steel-gray"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-steel-gray hover:text-white hover:bg-white/5 transition-colors md:hidden"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-secondary-navy/95 backdrop-blur-lg border-b border-white/5 shadow-2xl py-6 px-4 flex flex-col gap-4">
          <nav className="flex flex-col gap-4">
            {translatedNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-body text-base font-semibold transition-colors py-2 px-3 rounded-lg ${
                    isActive
                      ? "text-neon-cyan bg-white/5"
                      : "text-steel-gray hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <hr className="border-white/5" />
          
          {/* Mobile Language Selector */}
          {mounted && (
            <div className="flex justify-center gap-5 py-2">
              {(["en", "tr", "de"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setIsOpen(false);
                  }}
                  className={`font-sans font-bold hover:text-neon-cyan text-sm transition-colors uppercase cursor-pointer ${
                    language === lang ? "text-neon-cyan" : "text-steel-gray"
                  }`}
                >
                  {lang === "en" ? "English" : lang === "tr" ? "Türkçe" : "Deutsch"}
                </button>
              ))}
            </div>
          )}

          <Link
            href="/contact?emergency=true"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 py-3 rounded-lg bg-red-600/10 border border-red-500/30 text-red-400 font-sans text-sm font-bold tracking-wide uppercase transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            {t("nav.emergency")}
          </Link>
        </div>
      )}
    </header>
  );
}
