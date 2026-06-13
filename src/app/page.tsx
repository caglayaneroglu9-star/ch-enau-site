"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Wrench,
  Cpu,
  Activity,
  ArrowRight,
  Zap,
  CheckCircle,
} from "lucide-react";
import StatsSection from "@/components/StatsSection";
import TechGrid from "@/components/TechGrid";
import ProblemSolver from "@/components/ProblemSolver";
import TobaccoMachineryDomain from "@/components/TobaccoMachineryDomain";
import { useLanguage } from "@/config/LanguageContext";
import HeroVideoBackground from "@/components/HeroVideoBackground";

export default function Home() {
  const { t } = useLanguage();

  const translatedQuickServices = [
    {
      icon: Cpu,
      title: t("home.quickServices.plcTitle") || "PLC Programming",
      desc: t("home.quickServices.plcDesc") || "Beckhoff TwinCAT 2/3 (Structured Text, C# integration) & Siemens TIA Portal expertise.",
    },
    {
      icon: Wrench,
      title: t("home.quickServices.modTitle") || "Machine Modernization",
      desc: t("home.quickServices.modDesc") || "Retrofitting obsolete controllers with open, high-performance PLC architectures.",
    },
    {
      icon: Activity,
      title: t("home.quickServices.motionTitle") || "Motion Control Systems",
      desc: t("home.quickServices.motionDesc") || "Multi-axis servo tuning, electronic cam profile alignment, and EtherCAT diagnostics.",
    },
    {
      icon: Zap,
      title: t("home.quickServices.emergTitle") || "Emergency Support",
      desc: t("home.quickServices.emergDesc") || "24/7 technical hotline and on-site expert dispatch to troubleshoot critical failures.",
    },
  ];

  return (
    <div className="relative min-h-screen">

      {/* 1. Hero Section */}
      <section className="relative min-h-[100svh] sm:min-h-[120vh] flex flex-col justify-end overflow-hidden">
        {/* Hero Video Background — promo clips cycling */}
        <HeroVideoBackground />

        {/* Animated grid lines and glowing orbs */}
        <div className="absolute inset-0 circuit-grid opacity-15 pointer-events-none z-[1]" />
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-industrial-blue/10 rounded-full blur-[120px] pointer-events-none animate-float z-[1]" />
        <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] bg-neon-cyan/5 rounded-full blur-[150px] pointer-events-none z-[1]" />

        {/* Bottom gradient fade so text is readable — mobilde daha yoğun */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%] pointer-events-none z-[2]"
          style={{ background: "linear-gradient(to top, rgba(5,10,21,0.97) 0%, rgba(5,10,21,0.85) 30%, rgba(5,10,21,0.5) 60%, transparent 100%)" }} />
        {/* Mobilde ekstra karartma */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none z-[1] sm:hidden" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex justify-center pb-0 pt-20 sm:pt-0">
          <div className="flex flex-col items-center text-center max-w-4xl">
            <div className="flex flex-col items-center gap-2">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-sans font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15] text-center px-2"
              >
                {t("home.hero.title")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-industrial-blue glow-text">
                  {t("home.hero.subtitle")}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-body text-sm text-steel-gray leading-relaxed max-w-2xl text-center px-2 hidden sm:block"
              >
                {t("home.hero.desc")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mt-4 w-full sm:w-auto pb-8 sm:pb-6 px-4 sm:px-0"
              >
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-lg bg-industrial-blue hover:bg-industrial-blue/90 border border-neon-cyan/50 text-white font-sans font-bold text-sm tracking-wide text-center uppercase transition-all shadow-[0_0_20px_rgba(0,102,204,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.4)]"
                >
                  {t("home.hero.contactButton")}
                </Link>


                <Link
                  href="/contact?emergency=true"
                  className="px-8 py-4 rounded-lg bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 hover:border-red-500 text-red-400 hover:text-white font-sans font-bold text-sm tracking-wide text-center uppercase transition-all shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                >
                  {t("home.hero.emergencyButton")}
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Elite Expertise Declaration (5 Second Message Block) */}
      <section className="py-20 relative bg-secondary-navy/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h2 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug">
                {t("home.expertise.quote")}
              </h2>
            </div>
            <div className="lg:col-span-4 lg:pl-8 border-l border-white/5">
              <div className="flex flex-col gap-4">
                <div className="flex gap-3 items-center">
                  <CheckCircle className="w-5 h-5 text-neon-cyan shrink-0" />
                  <span className="font-body text-sm font-semibold text-white">{t("home.expertise.gd")}</span>
                </div>
                <div className="flex gap-3 items-center">
                  <CheckCircle className="w-5 h-5 text-neon-cyan shrink-0" />
                  <span className="font-body text-sm font-semibold text-white">{t("home.expertise.sasib")}</span>
                </div>
                <div className="flex gap-3 items-center">
                  <CheckCircle className="w-5 h-5 text-neon-cyan shrink-0" />
                  <span className="font-body text-sm font-semibold text-white">{t("home.expertise.twincat")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats Section */}
      <StatsSection />

      {/* 4. Specialized Cigarette & Packaging Machinery Domain */}
      <TobaccoMachineryDomain />

      {/* 5. Services Overview Grid */}
      <section className="py-24 relative overflow-hidden bg-secondary-navy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="font-body text-xs font-bold tracking-[0.2em] text-neon-cyan uppercase bg-neon-cyan/10 px-3.5 py-1.5 rounded-full inline-block">
                {t("home.services.tag")}
              </span>
              <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white mt-4 tracking-tight">
                {t("home.services.title")}
              </h2>
            </div>
            <Link
              href="/services"
              className="flex items-center gap-1.5 font-sans font-bold text-sm text-neon-cyan hover:text-white transition-colors group uppercase tracking-wider mt-4 md:mt-0"
            >
              {t("home.services.explore")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {translatedQuickServices.map((service) => (
              <div
                key={service.title}
                className="glassmorphic-card p-6 rounded-xl border border-white/5 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 bg-primary-navy border border-white/5 text-neon-cyan rounded-lg inline-block group-hover:border-neon-cyan/30 transition-colors mb-5">
                    <service.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-steel-gray leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5">
                  <Link
                    href="/services"
                    className="font-sans font-bold text-xs text-neon-cyan hover:text-white uppercase tracking-wider transition-colors inline-flex items-center gap-1 group-hover:gap-2 duration-300"
                  >
                    {t("home.services.details") || "Details"} &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Technology Logos & Platforms Grid */}
      <TechGrid />

      {/* 7. Chronic Problem Solver Selection */}
      <ProblemSolver />

      {/* 8. Emergency Dispatch Banner */}
      <section className="py-24 relative overflow-hidden bg-primary-navy border-t border-white/5">
        <div className="absolute inset-0 circuit-grid opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex p-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 mb-6 animate-pulse">
            <Zap className="w-8 h-8 fill-current" />
          </div>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-4">
            {t("home.emergency.title")}
          </h2>
          <p className="font-body text-base sm:text-lg text-steel-gray max-w-2xl mx-auto mb-8 leading-relaxed">
            {t("home.emergency.desc")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="tel:+491601221306"
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-sans font-bold text-sm tracking-wide uppercase transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)]"
            >
              {t("home.emergency.callButton")}
            </Link>
            <Link
              href="/contact?emergency=true"
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-secondary-navy border border-white/10 hover:border-white/20 text-white font-sans font-bold text-sm tracking-wide uppercase transition-all"
            >
              {t("home.emergency.dispatchButton")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
