"use client";

import React from "react";
import { Settings, Shield, AlertOctagon, HelpCircle, HardDrive, Cpu, Terminal } from "lucide-react";
import ProblemSolver from "@/components/ProblemSolver";
import { useLanguage } from "@/config/LanguageContext";

const icons = [Terminal, Cpu, Settings, HardDrive];

export default function TroubleshootingPage() {
  const { t } = useLanguage();
  const stepsData = t("troubleshootingPage.diagnosticSteps") || [];

  return (
    <div className="py-12 sm:py-20 relative">
      <div className="absolute inset-0 circuit-grid opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-body text-xs font-bold tracking-[0.2em] text-neon-cyan uppercase bg-neon-cyan/10 px-3.5 py-1.5 rounded-full">
            {t("troubleshootingPage.tag")}
          </span>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-white mt-5 tracking-tight">
            {t("troubleshootingPage.title")}
          </h1>
          <p className="font-body text-base sm:text-lg text-steel-gray mt-4 leading-relaxed">
            {t("troubleshootingPage.desc")}
          </p>
        </div>

        {/* Embedded Interactive Problem Solver */}
        <ProblemSolver />

        {/* Diagnostic Methodology Section */}
        <section className="py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="font-body text-xs font-bold tracking-[0.2em] text-neon-cyan uppercase bg-neon-cyan/10 px-3.5 py-1.5 rounded-full self-start">
                {t("troubleshootingPage.tag")}
              </span>
              <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                {t("troubleshootingPage.introTitle")}
              </h2>
              <p className="font-body text-sm sm:text-base text-steel-gray leading-relaxed">
                {t("troubleshootingPage.introDesc")}
              </p>
              <div className="p-4 rounded-xl bg-secondary-navy border border-white/5 flex gap-3.5">
                <Shield className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
                <span className="font-body text-xs text-steel-gray leading-relaxed">
                  {t("troubleshootingPage.notice")}
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {stepsData.map((step: any, index: number) => {
                const IconComponent = icons[index % icons.length] || Terminal;
                return (
                  <div
                    key={step.title}
                    className="glassmorphic-card p-6 rounded-xl border border-white/5 relative group"
                  >
                    <div className="p-3 bg-primary-navy border border-white/5 text-neon-cyan rounded-lg inline-block group-hover:border-neon-cyan/30 transition-colors mb-4">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-sans font-bold text-base text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-steel-gray leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* High-fidelity warning layout */}
        <div className="glassmorphic-card p-8 sm:p-10 rounded-2xl border border-yellow-500/10 relative overflow-hidden bg-yellow-500/5 flex items-start gap-4 sm:gap-6">
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-400 shrink-0">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-sans font-bold text-lg text-white">
              {t("troubleshootingPage.recommendationsTitle")}
            </h4>
            <p className="font-body text-sm text-steel-gray mt-2 leading-relaxed">
              {t("troubleshootingPage.recommendationsDesc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
