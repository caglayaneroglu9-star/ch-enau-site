"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { en } from "./translations/en";
import { tr } from "./translations/tr";
import { de } from "./translations/de";

type Language = "en" | "tr" | "de";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => any;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const dictionaries = { en, tr, de };

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const saved = localStorage.getItem("preferred_language") as Language;
        if (saved && ["en", "tr", "de"].includes(saved)) {
          setLanguage(saved);
        } else {
          const browserLang = navigator.language.slice(0, 2) as Language;
          if (["en", "tr", "de"].includes(browserLang)) {
            setLanguage(browserLang);
          }
        }
      }
    } catch (e) {
      console.warn("Could not read language from localStorage:", e);
    } finally {
      setMounted(true);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("preferred_language", lang);
      }
    } catch (e) {
      console.warn("Could not save language preference:", e);
    }
  };

  const t = (path: string) => {
    const keys = path.split(".");
    let current: any = dictionaries[language];
    for (const key of keys) {
      if (current && typeof current === "object") {
        current = current[key];
      } else {
        // Fallback to English dictionary
        let enFallback: any = dictionaries["en"];
        for (const fKey of keys) {
          if (enFallback && typeof enFallback === "object") {
            enFallback = enFallback[fKey];
          } else {
            return path;
          }
        }
        return enFallback !== undefined ? enFallback : path;
      }
    }
    return current !== undefined ? current : path;
  };

  // Update browser document title dynamically based on active language
  useEffect(() => {
    if (!mounted) return;
    
    const pageTitles: Record<Language, string> = {
      en: "CH Energie & Automation | Industrial Automation Experts",
      tr: "CH Energie & Automation | Endüstriyel Otomasyon Uzmanları",
      de: "CH Energie & Automation | Experten für Automatisierungstechnik"
    };
    
    document.title = pageTitles[language];
  }, [language, mounted]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
