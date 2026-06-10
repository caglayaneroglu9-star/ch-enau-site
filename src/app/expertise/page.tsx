"use client";

import React, { useState } from "react";
import { Factory, Award, ShieldAlert, Cpu, Gauge, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/config/LanguageContext";

export default function ExpertisePage() {
  const { t } = useLanguage();
  const [activeGdClass, setActiveGdClass] = useState(0);

  const gdClasses = t("machinery.categoriesData") || [];
  const domains = t("machinery.machinesData") || [];

  const activeClass = gdClasses[activeGdClass] || { name: "", models: [] };

  return (
    <div className="py-12 sm:py-20 relative">
      <div className="absolute inset-0 circuit-grid opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-body text-xs font-bold tracking-[0.2em] text-neon-cyan uppercase bg-neon-cyan/10 px-3.5 py-1.5 rounded-full">
            {t("machinery.tag")}
          </span>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-white mt-5 tracking-tight">
            {t("machinery.title")}
          </h1>
          <p className="font-body text-base sm:text-lg text-steel-gray mt-4 leading-relaxed">
            {t("expertisePage.mainDesc")}
          </p>
        </div>

        {/* Technical Challenge Declaration */}
        <div className="glassmorphic-card p-8 sm:p-10 rounded-2xl border border-white/5 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-industrial-blue/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert className="w-5 h-5 text-neon-cyan" />
                <span className="font-body text-xs font-bold tracking-wider text-neon-cyan uppercase">
                  {t("expertisePage.challenge.tag")}
                </span>
              </div>
              <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                {t("expertisePage.challenge.title")}
              </h2>
              <p className="font-body text-sm sm:text-base text-steel-gray mt-4 leading-relaxed whitespace-pre-line">
                {t("expertisePage.challenge.desc")}
              </p>
            </div>
            <div className="lg:col-span-4 bg-primary-navy/80 border border-white/5 p-6 rounded-xl flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Gauge className="w-6 h-6 text-neon-cyan" />
                <div>
                  <h4 className="font-sans font-bold text-sm text-white">
                    {t("expertisePage.challenge.makerLimitVal")}
                  </h4>
                  <p className="font-body text-xs text-steel-gray">
                    {t("expertisePage.challenge.makerLimitLabel")}
                  </p>
                </div>
              </div>
              <hr className="border-white/5" />
              <div className="flex items-center gap-3">
                <Cpu className="w-6 h-6 text-neon-cyan" />
                <div>
                  <h4 className="font-sans font-bold text-sm text-white">
                    {t("expertisePage.challenge.cycleTimeVal")}
                  </h4>
                  <p className="font-body text-xs text-steel-gray">
                    {t("expertisePage.challenge.cycleTimeLabel")}
                  </p>
                </div>
              </div>
              <hr className="border-white/5" />
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-neon-cyan" />
                <div>
                  <h4 className="font-sans font-bold text-sm text-white">
                    {t("expertisePage.challenge.oeeBoostVal")}
                  </h4>
                  <p className="font-body text-xs text-steel-gray">
                    {t("expertisePage.challenge.oeeBoostLabel")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand details map */}
        <div className="flex flex-col gap-12 mb-20">
          {domains.map((domain: any) => (
            <div
              key={domain.brand}
              className="glassmorphic-card p-8 sm:p-10 rounded-2xl border border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative group"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Left col */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div>
                  <span className="font-body text-xs font-bold text-neon-cyan/80 bg-neon-cyan/5 px-3 py-1 rounded-full border border-neon-cyan/10">
                    {domain.type || domain.subtitle}
                  </span>
                  <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-3">
                    {domain.brand}
                  </h2>
                </div>
                <p className="font-body text-sm sm:text-base text-steel-gray leading-relaxed">
                  {domain.desc || domain.description}
                </p>

                <div className="p-4 rounded-xl bg-secondary-navy border border-white/5 flex items-center justify-between mt-2">
                  <span className="font-body text-xs text-steel-gray">
                    {t("expertisePage.projectedResult")}
                  </span>
                  <span className="font-mono text-xs text-emerald-400 font-bold bg-emerald-400/10 border border-emerald-400/25 px-3 py-1 rounded">
                    {domain.efficiency || domain.oee}
                  </span>
                </div>
              </div>

              {/* Right col */}
              <div className="lg:col-span-7 bg-secondary-navy/40 border border-white/5 p-6 sm:p-8 rounded-xl flex flex-col gap-6">
                <div>
                  <h4 className="font-sans font-bold text-sm text-white uppercase tracking-wider mb-4">
                    {t("machinery.customEng")}:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(domain.features || domain.capabilities || []).map((cap: string, i: number) => (
                      <li key={i} className="flex gap-2.5 items-start">
                        <CheckCircle2 className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
                        <span className="font-body text-sm text-steel-gray leading-relaxed">
                          {cap}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <hr className="border-white/5" />

                <div>
                  <h4 className="font-sans font-bold text-xs text-white/50 uppercase tracking-widest mb-3">
                    {t("machinery.supportedModels")}
                  </h4>

                  {domain.id === "gd-maker-packer" ? (
                    <div className="flex flex-col gap-4 mt-2 text-left">
                      {/* Sub-tabs for G.D. Classes */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {gdClasses.map((cls: any, idx: number) => (
                          <button
                            key={cls.shortName}
                            type="button"
                            onClick={() => setActiveGdClass(idx)}
                            className={`px-2.5 py-1.5 rounded-lg text-left border text-[10px] font-sans font-bold transition-all ${
                              activeGdClass === idx
                                ? "bg-neon-cyan/10 border-neon-cyan text-white shadow-[0_0_10px_rgba(0,229,255,0.1)]"
                                : "bg-secondary-navy/40 border-white/5 text-steel-gray hover:text-white hover:border-white/10"
                            }`}
                          >
                            {cls.shortName}
                          </button>
                        ))}
                      </div>
                      
                      {/* Models in active class */}
                      <div className="p-4 rounded-xl bg-secondary-navy/80 border border-white/5 flex flex-col gap-3.5 max-h-[260px] overflow-y-auto">
                        <h6 className="font-sans font-bold text-xs text-neon-cyan border-b border-white/5 pb-1">
                          {activeClass.name}
                        </h6>
                        {(activeClass.models || []).map((mod: any) => (
                          <div key={mod.name} className="flex flex-col gap-1 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                            <span className="font-mono text-xs font-bold text-white">
                              {mod.name}
                            </span>
                            <span className="font-body text-xs text-steel-gray">
                              {mod.desc}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 text-left">
                      <h6 className="font-sans font-bold text-xs text-neon-cyan border-b border-white/5 pb-1">
                        {t("machinery.supportedEquip")}
                      </h6>
                      <div className="flex flex-wrap gap-2.5 mt-1">
                        {(domain.models || []).map((mod: string) => (
                          <span
                            key={mod}
                            className="font-mono text-xs font-bold text-white bg-secondary-navy/80 border border-white/5 px-3.5 py-2 rounded-lg hover:border-neon-cyan/30 transition-colors"
                          >
                            {mod}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-action details */}
        <div className="text-center max-w-2xl mx-auto py-8">
          <h3 className="font-sans font-extrabold text-2xl text-white mb-4">
            {t("expertisePage.cta.title")}
          </h3>
          <p className="font-body text-sm text-steel-gray mb-6 leading-relaxed">
            {t("expertisePage.cta.desc")}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-industrial-blue hover:bg-industrial-blue/90 border border-neon-cyan/50 text-white font-sans font-bold text-sm tracking-wide uppercase transition-all shadow-[0_0_20px_rgba(0,102,204,0.3)]"
          >
            {t("expertisePage.cta.button")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
