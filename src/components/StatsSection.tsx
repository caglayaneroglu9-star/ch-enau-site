"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Calendar, Zap, Globe } from "lucide-react";
import { useLanguage } from "@/config/LanguageContext";

export default function StatsSection() {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Calendar,
      value: t("stats.experience.value") || "15+",
      suffix: t("stats.experience.suffix") || "Years Experience",
      label: t("stats.experience.label") || "Field & Machine Experience",
      desc: t("stats.experience.desc") || "Long-standing expertise in high-speed, high-precision industrial production lines.",
    },
    {
      icon: ShieldCheck,
      value: t("stats.projects.value") || "100+",
      suffix: t("stats.projects.suffix") || "Completed Projects",
      label: t("stats.projects.label") || "Successfully Commissioned",
      desc: t("stats.projects.desc") || "From full legacy PLC retrofits to chronic motion control troubleshooting cases.",
    },
    {
      icon: Zap,
      value: t("stats.support.value") || "24/7",
      suffix: t("stats.support.suffix") || "Technical Support",
      label: t("stats.support.label") || "Continuous Emergency Response",
      desc: t("stats.support.desc") || "Immediate online diagnostics and fast on-site dispatch to prevent factory downtime.",
    },
    {
      icon: Globe,
      value: t("stats.reach.value") || "Global",
      suffix: t("stats.reach.suffix") || "Service Reach",
      label: t("stats.reach.label") || "International Capabilities",
      desc: t("stats.reach.desc") || "Serving manufacturing plants across Germany, Europe, and worldwide.",
    },
  ];

  return (
    <section className="py-20 relative bg-secondary-navy/40 border-y border-white/5 overflow-hidden">
      {/* Decorative radial background grid */}
      <div className="absolute inset-0 circuit-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.suffix}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glassmorphic-card p-6 rounded-xl relative flex flex-col gap-4 group"
            >
              {/* Highlight accent on top border of card */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-lg bg-primary-navy border border-white/5 text-neon-cyan group-hover:border-neon-cyan/30 transition-colors">
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-none">
                  {stat.value}
                </span>
              </div>
              <div>
                <h4 className="font-sans font-bold text-lg text-white mb-1">
                  {stat.suffix}
                </h4>
                <p className="font-body text-xs text-neon-cyan/70 font-semibold tracking-wider uppercase mb-2">
                  {stat.label}
                </p>
                <p className="font-body text-sm text-steel-gray leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
