"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Layers, HardDrive, Network, Settings, Compass } from "lucide-react";

const techPartners = [
  {
    name: "Beckhoff Automation",
    techs: ["TwinCAT 2", "TwinCAT 3 (Visual Studio)", "TcXaeShell", "Drive Manager"],
    icon: Cpu,
    color: "border-red-500/20 hover:border-red-500/50 text-red-400",
    bg: "rgba(239, 68, 68, 0.02)",
  },
  {
    name: "Siemens Automation",
    techs: ["SIMATIC Manager", "TIA Portal", "Step 7", "WinCC SCADA"],
    icon: HardDrive,
    color: "border-teal-500/20 hover:border-teal-500/50 text-teal-400",
    bg: "rgba(20, 184, 166, 0.02)",
  },
  {
    name: "Bosch Rexroth",
    techs: ["IndraWorks DS", "IndraLogic & Visual Motion", "Servo Systems"],
    icon: Layers,
    color: "border-blue-500/20 hover:border-blue-500/50 text-blue-400",
    bg: "rgba(59, 130, 246, 0.02)",
  },
  {
    name: "Lenze Solutions",
    techs: ["Drive PLC", "Engineer Suite", "Servo Inverters & Drives"],
    icon: Settings,
    color: "border-amber-500/20 hover:border-amber-500/50 text-amber-400",
    bg: "rgba(245, 158, 11, 0.02)",
  },
  {
    name: "Engineering Tools & Software",
    techs: ["Microsoft Office", "Visual Studio Code", "CODESYS", "GDL (GD Box Programming)"],
    icon: Compass,
    color: "border-purple-500/20 hover:border-purple-500/50 text-purple-400",
    bg: "rgba(168, 85, 247, 0.02)",
  },
  {
    name: "Industrial Communications",
    techs: ["EtherCAT Network", "PROFINET Protocol", "PROFIBUS", "EtherNet/IP"],
    icon: Network,
    color: "border-neon-cyan/20 hover:border-neon-cyan/50 text-neon-cyan",
    bg: "rgba(0, 229, 255, 0.02)",
  },
];

export default function TechGrid() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-xs font-bold tracking-[0.2em] text-neon-cyan uppercase bg-neon-cyan/10 px-3.5 py-1.5 rounded-full"
          >
            Engineering Ecosystem
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans font-extrabold text-3xl sm:text-4xl text-white mt-4 tracking-tight"
          >
            Supported Hardware & Software Platforms
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-base text-steel-gray mt-4 leading-relaxed"
          >
            We deploy direct manufacturer-level software toolsets to ensure seamless, high-performance integration and diagnostics.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techPartners.map((partner, idx) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={`glassmorphic-card p-6 rounded-xl border ${partner.color} transition-all duration-300 relative group overflow-hidden`}
              style={{ backgroundColor: partner.bg }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary-navy border border-white/5 text-inherit">
                  <partner.icon className="w-5 h-5" />
                </div>
                <h3 className="font-sans font-bold text-lg text-white">
                  {partner.name}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {partner.techs.map((tech) => (
                  <span
                    key={tech}
                    className="font-body text-xs px-3 py-1 rounded bg-primary-navy/80 border border-white/5 text-steel-gray hover:text-white hover:border-white/20 transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
