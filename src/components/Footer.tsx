"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Zap, MessageSquare } from "lucide-react";
import { useLanguage } from "@/config/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary-navy border-t border-white/5 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative cyber grid accent */}
      <div className="absolute inset-0 circuit-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-industrial-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand block */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border border-neon-cyan/20 flex items-center justify-center bg-secondary-navy">
                <img
                  src="/logo.jpg"
                  alt="CH Energie & Automation Logo"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-xl md:text-2xl leading-none text-white">
                  CH ENERGIE
                </span>
                <span className="font-sans font-semibold text-xs md:text-sm tracking-[0.15em] text-steel-gray mt-2">
                  & AUTOMATION
                </span>
              </div>
            </Link>
            <p className="font-body text-sm text-steel-gray leading-relaxed mt-2">
              {t("footer.about")}
            </p>
            <div className="flex items-center gap-2.5 mt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-body text-xs font-semibold text-emerald-400">
                {t("footer.readyLabel") || "Engineers Ready for Global Dispatch"}
              </span>
            </div>
          </div>

          {/* Quick Sitemap */}
          <div>
            <h3 className="font-sans font-semibold text-sm text-white uppercase tracking-wider mb-5">
              {t("footer.quickLinks") || "Quick Navigation"}
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/services"
                  className="font-body text-sm text-steel-gray hover:text-neon-cyan transition-colors"
                >
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link
                  href="/expertise"
                  className="font-body text-sm text-steel-gray hover:text-neon-cyan transition-colors"
                >
                  {t("nav.machinery")}
                </Link>
              </li>
              <li>
                <Link
                  href="/troubleshooting"
                  className="font-body text-sm text-steel-gray hover:text-neon-cyan transition-colors"
                >
                  {t("nav.solutions")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-body text-sm text-steel-gray hover:text-neon-cyan transition-colors"
                >
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Supported Technologies */}
          <div>
            <h3 className="font-sans font-semibold text-sm text-white uppercase tracking-wider mb-5">
              {t("footer.coreStack") || "Core Stack Expertise"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Beckhoff TwinCAT 3",
                "Siemens TIA Portal",
                "Bosch Rexroth Motion",
                "Lenze Drives",
                "EtherCAT Network",
                "Structured Text (ST)",
                "High-Speed Servos",
                "PCB Design",
              ].map((tech) => (
                <span
                  key={tech}
                  className="font-body text-xs px-2.5 py-1 rounded bg-secondary-navy border border-white/5 text-steel-gray"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Contact details */}
          <div>
            <h3 className="font-sans font-semibold text-sm text-white uppercase tracking-wider mb-5">
              {t("footer.hqTitle") || "Technical Headquarters"}
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
                <span className="font-body text-sm text-steel-gray leading-relaxed">
                  {t("footer.address") || "Folkart Towers B Kule, Bayraklı / İzmir"} <br />
                  <span className="text-xs text-white/40">({t("footer.worldwideNotice") || "On-site operations worldwide"})</span>
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <Phone className="w-5 h-5 text-neon-cyan shrink-0 mt-1" />
                <div className="flex flex-col text-sm text-steel-gray gap-3">
                  <div>
                    <span className="text-xs font-bold text-white/50 block uppercase tracking-wider">Çağlayan EROĞLU</span>
                    <a href="tel:+491601221306" className="hover:text-white transition-colors font-semibold block">
                      +49 (0) 160 122 13 06
                    </a>
                    <a href="tel:+905337063813" className="hover:text-white transition-colors block">
                      +90 (533) 706 38 13
                    </a>
                  </div>
                </div>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-neon-cyan shrink-0" />
                <a
                  href="mailto:support@ch-energie.de"
                  className="font-body text-sm text-steel-gray hover:text-white transition-colors"
                >
                  support@ch-energie.de
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/491601221306"
                  target="_blank"
                  rel="noreferrer"
                  className="font-body text-sm text-emerald-400 hover:text-white transition-colors font-medium"
                >
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-white/5 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40">
            &copy; {new Date().getFullYear()} CH Energie & Automation. {t("footer.rights")}
          </p>
          <div className="flex gap-6">
            <span className="font-body text-xs text-white/40 hover:text-white cursor-pointer transition-colors">
              {t("footer.privacy") || "Privacy Policy"}
            </span>
            <span className="font-body text-xs text-white/40 hover:text-white cursor-pointer transition-colors">
              {t("footer.impressum") || "Impressum"}
            </span>
            <span className="font-body text-xs text-white/40 hover:text-white cursor-pointer transition-colors">
              {t("footer.terms") || "Terms of Service"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
