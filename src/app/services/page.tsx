"use client";

import React from "react";
import {
  Cpu,
  RefreshCw,
  Search,
  Activity,
  Network,
  Zap,
  ShieldAlert,
  Settings2,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/config/LanguageContext";

export default function ServicesPage() {
  const { t, mounted } = useLanguage();

  const icons = [Cpu, RefreshCw, Search, Activity, Network, Zap, ShieldAlert, Settings2];
  
  const translatedServicesData = (t("servicesPage.servicesData") as any[]) || [];
  
  const services = translatedServicesData.map((svc, idx) => ({
    ...svc,
    icon: icons[idx] || Cpu,
  }));

  if (!mounted) {
    return <div className="min-h-screen bg-primary-navy" />;
  }

  return (
    <div className="py-12 sm:py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 circuit-grid opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-body text-xs font-bold tracking-[0.2em] text-neon-cyan uppercase bg-neon-cyan/10 px-3.5 py-1.5 rounded-full">
            {t("servicesPage.tag")}
          </span>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-white mt-5 tracking-tight">
            {t("servicesPage.title")}
          </h1>
          <p className="font-body text-base sm:text-lg text-steel-gray mt-4 leading-relaxed">
            {t("servicesPage.desc")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {services.map((svc, idx) => (
            <div
              key={svc.title || idx}
              className="glassmorphic-card p-8 rounded-2xl border border-white/5 relative group flex flex-col justify-between"
            >
              {/* Card visual accent */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-industrial-blue/30 to-transparent" />

              <div>
                <div className="flex gap-4 items-start border-b border-white/5 pb-5 mb-5">
                  <div className="p-3 bg-secondary-navy border border-white/5 text-neon-cyan rounded-xl group-hover:border-neon-cyan/30 transition-all shrink-0">
                    <svc.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-lg sm:text-xl text-white">
                      {svc.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {(svc.tech || []).map((t: string) => (
                        <span
                          key={t}
                          className="font-body text-[10px] font-semibold text-neon-cyan/80 bg-neon-cyan/5 px-2 py-0.5 rounded border border-neon-cyan/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="font-body text-sm text-steel-gray leading-relaxed mb-6">
                  {svc.description}
                </p>

                <div className="flex flex-col gap-3">
                  <h4 className="font-sans font-bold text-xs text-white/50 uppercase tracking-wider">
                    {t("machinery.customEng")}
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    {(svc.details || []).map((detail: string, idx2: number) => (
                      <li key={idx2} className="flex gap-3 items-start">
                        <CheckCircle className="w-4.5 h-4.5 text-neon-cyan shrink-0 mt-0.5" />
                        <span className="font-body text-sm text-steel-gray leading-relaxed">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action trigger card footer */}
              <div className="border-t border-white/5 pt-6 mt-8 flex items-center justify-between">
                <span className="font-body text-xs text-white/40">
                  {t("servicesPage.cardFooter")}
                </span>
                <Link
                  href="/contact"
                  className="flex items-center gap-1 font-sans font-bold text-xs text-neon-cyan hover:text-white uppercase tracking-wider transition-all group"
                >
                  {t("servicesPage.consultation")}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Support callout banner */}
        <div className="glassmorphic-card p-8 sm:p-12 rounded-2xl border border-red-500/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <span className="font-body text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
              {t("servicesPage.bannerTag")}
            </span>
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-4">
              {t("servicesPage.bannerTitle")}
            </h2>
            <p className="font-body text-sm text-steel-gray mt-2 leading-relaxed">
              {t("servicesPage.bannerDesc")}
            </p>
          </div>
          <div className="relative z-10 shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="tel:+491601221306"
              className="px-6 py-3.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-sans font-bold text-sm tracking-wide text-center uppercase transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)]"
            >
              {t("servicesPage.bannerCall")}
            </Link>
            <Link
              href="/contact?emergency=true"
              className="px-6 py-3.5 rounded-lg bg-secondary-navy border border-white/5 hover:border-white/10 text-white font-sans font-bold text-sm tracking-wide text-center uppercase transition-all"
            >
              {t("servicesPage.bannerReport")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
