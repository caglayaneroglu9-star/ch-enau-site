"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Zap, Shield, Search, ArrowRight, Ban, Cpu } from "lucide-react";
import { useLanguage } from "@/config/LanguageContext";

export default function ProblemSolver() {
  const { t } = useLanguage();

  const iconsMap: Record<string, any> = {
    downtime: Ban,
    sync: Zap,
    bottlenecks: Cpu,
    fieldbus: Search,
    obsolescence: Shield,
  };

  const problemsData = (t("problemSolver.problemsData") as any[]) || [];
  
  const problems = problemsData.map((p) => ({
    ...p,
    icon: iconsMap[p.id] || Ban,
  }));

  const [activeTab, setActiveTab] = useState(problems[0]?.id || "downtime");
  const current = problems.find((p) => p.id === activeTab) || problems[0];

  if (problems.length === 0 || !current) {
    return null;
  }

  return (
    <section className="py-24 relative overflow-hidden bg-secondary-navy/20 border-y border-white/5">
      <div className="absolute inset-0 circuit-grid opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-body text-xs font-bold tracking-[0.2em] text-red-400 uppercase bg-red-400/10 px-3.5 py-1.5 rounded-full inline-block">
            {t("problemSolver.tag")}
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white mt-4 tracking-tight">
            {t("problemSolver.title")}
          </h2>
          <p className="font-body text-base text-steel-gray mt-4 leading-relaxed">
            {t("problemSolver.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Problem Selector Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {problems.map((problem) => {
              const isActive = problem.id === activeTab;
              return (
                <button
                  key={problem.id}
                  onClick={() => setActiveTab(problem.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 ${
                    isActive
                      ? "bg-secondary-navy border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.05)] text-white"
                      : "bg-primary-navy/40 border-white/5 text-steel-gray hover:text-white hover:border-white/10"
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-lg border shrink-0 transition-colors ${
                      isActive
                        ? "bg-red-500/10 border-red-500/20 text-red-400"
                        : "bg-secondary-navy border-white/5 text-steel-gray"
                    }`}
                  >
                    <problem.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm leading-snug">
                      {problem.title}
                    </h4>
                    <p className="font-body text-xs text-steel-gray mt-0.5 line-clamp-1">
                      {problem.short}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Solution detail display */}
          <div className="lg:col-span-7">
            <div className="glassmorphic-card p-8 rounded-xl border border-red-500/10 min-h-[420px] flex flex-col justify-between relative overflow-hidden">
              {/* Highlight background glow */}
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-red-600/5 rounded-full blur-[80px] pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  {/* Header */}
                  <div className="flex gap-4 items-start border-b border-white/5 pb-5">
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-body text-xs font-semibold tracking-wider text-red-400 uppercase">
                        {t("problemSolver.activeFailure")}
                      </span>
                      <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-white mt-1">
                        {current.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-sans font-bold text-xs text-white/50 uppercase tracking-widest mb-2">
                        {t("problemSolver.symptoms")}
                      </h5>
                      <ul className="flex flex-col gap-2">
                        {(current.symptoms || []).map((s: string, i: number) => (
                          <li key={i} className="flex gap-2 items-start font-body text-sm text-steel-gray">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div>
                        <h5 className="font-sans font-bold text-xs text-white/50 uppercase tracking-widest mb-1.5">
                          {t("problemSolver.diagnostics")}
                        </h5>
                        <p className="font-body text-sm text-steel-gray leading-relaxed">
                          {current.diagnosis}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Highlight Solution Box */}
                  <div className="p-5 rounded-lg bg-emerald-500/5 border border-emerald-500/15 flex gap-4 items-start mt-4">
                    <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-400 shrink-0 mt-0.5">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-sans font-bold text-sm text-emerald-400">
                        {t("problemSolver.resolution")}
                      </h5>
                      <p className="font-body text-sm text-steel-gray mt-1 leading-relaxed">
                        {current.solution}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action trigger footer */}
              <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-8">
                <span className="font-body text-xs text-steel-gray">
                  {t("problemSolver.question")}
                </span>
                <a
                  href="/contact"
                  className="flex items-center gap-1.5 font-sans font-bold text-xs text-red-400 hover:text-white transition-colors uppercase tracking-wider group"
                >
                  {t("problemSolver.requestBtn")}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
