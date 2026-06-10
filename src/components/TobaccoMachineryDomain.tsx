"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, CheckCircle, ShieldCheck, Factory, Gauge, RefreshCw } from "lucide-react";
import { useLanguage } from "@/config/LanguageContext";

export default function TobaccoMachineryDomain() {
  const { t } = useLanguage();

  const gdClasses = (t("machinery.categoriesData") as any[]) || [];
  const machines = (t("machinery.machinesData") as any[]) || [];

  const [selected, setSelected] = useState(machines[0]?.id || "gd-maker-packer");
  const [activeGdClass, setActiveGdClass] = useState(0);
  const active = machines.find((m) => m.id === selected) || machines[0];

  if (machines.length === 0 || !active) {
    return null;
  }

  return (
    <section className="py-24 relative overflow-hidden bg-primary-navy">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-industrial-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-body text-xs font-bold tracking-[0.2em] text-neon-cyan uppercase bg-neon-cyan/10 px-3.5 py-1.5 rounded-full inline-block">
            {t("machinery.tag")}
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white mt-4 tracking-tight">
            {t("machinery.title")}
          </h2>
          <p className="font-body text-base text-steel-gray mt-4 leading-relaxed">
            {t("machinery.desc")}
          </p>
        </div>

        {/* Brand tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {machines.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelected(m.id)}
              className={`px-6 py-3 rounded-lg font-sans font-bold text-sm border transition-all duration-300 ${
                selected === m.id
                  ? "bg-industrial-blue border-neon-cyan text-white shadow-[0_0_15px_rgba(0,102,204,0.3)]"
                  : "bg-secondary-navy border-white/5 text-steel-gray hover:text-white hover:border-white/10"
              }`}
            >
              {m.brand}
            </button>
          ))}
        </div>

        {/* Content Showcase */}
        <div className="glassmorphic-card p-8 sm:p-10 rounded-2xl border border-white/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left Column: Description */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Factory className="w-5 h-5 text-neon-cyan" />
                    <span className="font-body text-xs font-bold tracking-wider text-neon-cyan uppercase">
                      {active.type}
                    </span>
                  </div>
                  <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight mb-4">
                    {active.brand} {t("machinery.specialists") || "Specialists"}
                  </h3>
                  <p className="font-body text-base text-steel-gray leading-relaxed mb-6">
                    {active.desc}
                  </p>

                  <div className="flex flex-col gap-3 mb-6">
                    <h5 className="font-sans font-bold text-xs text-white/50 uppercase tracking-wider">
                      {t("machinery.supportedModels")}
                    </h5>

                    {active.id === "gd-maker-packer" && gdClasses.length > 0 ? (
                      <div className="flex flex-col gap-4">
                        {/* Sub-tabs for G.D. Classes */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {gdClasses.map((cls, idx) => (
                            <button
                              key={cls.shortName || idx}
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
                        {gdClasses[activeGdClass] && (
                          <div className="p-4 rounded-xl bg-secondary-navy/80 border border-white/5 flex flex-col gap-3.5 max-h-[260px] overflow-y-auto">
                            <h6 className="font-sans font-bold text-xs text-neon-cyan border-b border-white/5 pb-1">
                              {gdClasses[activeGdClass].name}
                            </h6>
                            {(gdClasses[activeGdClass].models || []).map((mod: any, modIdx: number) => (
                              <div key={mod.name || modIdx} className="flex flex-col gap-1 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                <span className="font-mono text-xs font-bold text-white">
                                  {mod.name}
                                </span>
                                <span className="font-body text-xs text-steel-gray">
                                  {mod.desc}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <h6 className="font-sans font-bold text-xs text-neon-cyan border-b border-white/5 pb-1">
                          {t("machinery.supportedEquip")}
                        </h6>
                        <div className="flex flex-wrap gap-2.5 mt-1">
                          {(active.models || []).map((mod: string) => (
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

                {/* Performance improvement highlight */}
                <div className="p-4 rounded-xl bg-neon-cyan/5 border border-neon-cyan/10 flex items-center gap-3.5">
                  <Gauge className="w-6 h-6 text-neon-cyan shrink-0 animate-pulse" />
                  <div>
                    <h6 className="font-sans font-bold text-xs text-neon-cyan uppercase tracking-wider">
                      {t("machinery.targetPerf")}
                    </h6>
                    <p className="font-body text-sm text-white font-medium mt-0.5">
                      {active.efficiency}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Solutions */}
              <div className="lg:col-span-6 bg-secondary-navy/60 border border-white/5 p-6 sm:p-8 rounded-xl flex flex-col justify-between">
                <div>
                  <h4 className="font-sans font-bold text-base text-white mb-5 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-neon-cyan" />
                    {t("machinery.customEng")}
                  </h4>
                  <ul className="flex flex-col gap-4">
                    {(active.features || []).map((feat: string, index: number) => (
                      <li key={index} className="flex gap-3 items-start">
                        <CheckCircle className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
                        <div>
                          <p className="font-body text-sm text-steel-gray leading-relaxed">
                            {feat}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <span className="font-body text-xs text-steel-gray flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    {t("machinery.standards")}
                  </span>
                  <a
                    href="/contact"
                    className="font-sans font-bold text-xs text-neon-cyan hover:text-white uppercase tracking-wider transition-colors inline-block"
                  >
                    {t("machinery.retrofitBtn")} &rarr;
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
