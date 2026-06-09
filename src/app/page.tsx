"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  Cpu,
  Activity,
  ArrowRight,
  Zap,
  CheckCircle,
  HelpCircle,
  Play,
  X,
} from "lucide-react";
import StatsSection from "@/components/StatsSection";
import TechGrid from "@/components/TechGrid";
import ProblemSolver from "@/components/ProblemSolver";
import TobaccoMachineryDomain from "@/components/TobaccoMachineryDomain";

const quickServices = [
  {
    icon: Cpu,
    title: "PLC Programming",
    desc: "Beckhoff TwinCAT 2/3 (Structured Text, C# integration) & Siemens TIA Portal expertise.",
  },
  {
    icon: Wrench,
    title: "Machine Modernization",
    desc: "Retrofitting obsolete controllers with open, high-performance PLC architectures.",
  },
  {
    icon: Activity,
    title: "Motion Control Systems",
    desc: "Multi-axis servo tuning, electronic cam profile alignment, and EtherCAT diagnostics.",
  },
  {
    icon: Zap,
    title: "Emergency Support",
    desc: "24/7 technical hotline and on-site expert dispatch to troubleshoot critical failures.",
  },
];

export default function Home() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
        {/* Animated grid lines and glowing orbs */}
        <div className="absolute inset-0 circuit-grid opacity-15 pointer-events-none" />
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-industrial-blue/10 rounded-full blur-[120px] pointer-events-none animate-float" />
        <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] bg-neon-cyan/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex justify-center">
          <div className="flex flex-col items-center text-center max-w-4xl">
            {/* Logo & Video Flex Container */}
            <motion.div
              layout
              className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 w-full mb-8 relative"
            >
              {/* Large Company Logo */}
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                onClick={() => {
                  if (!isVideoOpen) setIsVideoOpen(true);
                }}
                className={`relative rounded-3xl overflow-hidden border border-neon-cyan/30 bg-secondary-navy p-3 glow-effect shrink-0 transition-colors duration-300 ${
                  isVideoOpen
                    ? "w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64"
                    : "w-72 h-72 sm:w-96 sm:h-96 cursor-pointer group hover:border-neon-cyan"
                }`}
              >
                <img
                  src="/logo.jpg"
                  alt="CH Energie & Automation Logo"
                  className="object-cover w-full h-full rounded-2xl group-hover:scale-[1.02] transition-transform duration-300"
                />

                {/* Play Overlay if video is closed */}
                {!isVideoOpen && (
                  <div className="absolute inset-0 bg-primary-navy/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl">
                    <div className="w-16 h-16 rounded-full bg-industrial-blue/95 border border-neon-cyan/50 text-neon-cyan flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.4)] animate-pulse">
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Video Panel */}
              <AnimatePresence>
                {isVideoOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 50, scale: 0.95 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    className="relative w-full max-w-lg aspect-video rounded-3xl overflow-hidden border border-neon-cyan/30 bg-secondary-navy shadow-2xl glow-effect flex items-center justify-center group shrink-0"
                  >
                    <video
                      src="https://assets.mixkit.co/videos/preview/mixkit-robotic-arm-assembling-circuit-board-43188-large.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />

                    {/* Dark gradient shadow overlay for controls */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/40 via-transparent to-transparent pointer-events-none" />

                    {/* Close Button overlay */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsVideoOpen(false);
                      }}
                      className="absolute top-4 right-4 p-2 rounded-full bg-primary-navy/80 hover:bg-red-600/90 border border-white/10 hover:border-red-500 text-white transition-all shadow-[0_0_15px_rgba(0,0,0,0.4)] hover:scale-105 cursor-pointer"
                      aria-label="Videoyu Kapat"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Mini overlay label */}
                    <div className="absolute bottom-4 left-4 bg-primary-navy/80 border border-white/5 px-3 py-1 rounded-full text-[10px] font-bold text-steel-gray flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Tanıtım Videosu
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Heading Copy */}
            <div className="flex flex-col items-center">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] text-center"
              >
                Industrial Automation Experts for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-industrial-blue glow-text">
                  Tobacco & Packaging Machinery
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-body text-base sm:text-lg text-steel-gray mt-6 leading-relaxed max-w-2xl text-center"
              >
                Maintenance, Troubleshooting, Modernization and Advanced Automation Solutions. We resolve chronic failures, optimize cycle time, and build high-speed systems from the ground up.
              </motion.p>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mt-8 w-full sm:w-auto"
              >
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-lg bg-industrial-blue hover:bg-industrial-blue/90 border border-neon-cyan/50 text-white font-sans font-bold text-sm tracking-wide text-center uppercase transition-all shadow-[0_0_20px_rgba(0,102,204,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.4)]"
                >
                  Contact Our Engineers
                </Link>

                <Link
                  href="/contact?emergency=true"
                  className="px-8 py-4 rounded-lg bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 hover:border-red-500 text-red-400 hover:text-white font-sans font-bold text-sm tracking-wide text-center uppercase transition-all shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                >
                  Emergency Service Hotline
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
                "We are high-speed tobacco machinery experts. With decades of site experience, we solve complex motion control dropouts and build advanced automation systems from scratch."
              </h2>
            </div>
            <div className="lg:col-span-4 lg:pl-8 border-l border-white/5">
              <div className="flex flex-col gap-4">
                <div className="flex gap-3 items-center">
                  <CheckCircle className="w-5 h-5 text-neon-cyan shrink-0" />
                  <span className="font-body text-sm font-semibold text-white">G.D. Maker & Packer Specialists</span>
                </div>
                <div className="flex gap-3 items-center">
                  <CheckCircle className="w-5 h-5 text-neon-cyan shrink-0" />
                  <span className="font-body text-sm font-semibold text-white">Sasib Packer Modernization</span>
                </div>
                <div className="flex gap-3 items-center">
                  <CheckCircle className="w-5 h-5 text-neon-cyan shrink-0" />
                  <span className="font-body text-sm font-semibold text-white">TwinCAT 3 / TIA Portal Experts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats Section */}
      <StatsSection />

      {/* 4. Specialized Tobacco Machinery Domain */}
      <TobaccoMachineryDomain />

      {/* 5. Services Overview Grid */}
      <section className="py-24 relative overflow-hidden bg-secondary-navy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="font-body text-xs font-bold tracking-[0.2em] text-neon-cyan uppercase bg-neon-cyan/10 px-3.5 py-1.5 rounded-full inline-block">
                Core Capabilities
              </span>
              <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white mt-4 tracking-tight">
                Our Engineering Services
              </h2>
            </div>
            <Link
              href="/services"
              className="flex items-center gap-1.5 font-sans font-bold text-sm text-neon-cyan hover:text-white transition-colors group uppercase tracking-wider mt-4 md:mt-0"
            >
              Explore Full Capabilities
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickServices.map((service, index) => (
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
                    Details &rarr;
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
            Critical Failure? Production Line Offline?
          </h2>
          <p className="font-body text-base sm:text-lg text-steel-gray max-w-2xl mx-auto mb-8 leading-relaxed">
            We provide fast remote diagnostics over secure VPN or immediate on-site dispatch. Our engineers are certified to resolve complex machine controller faults globally.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="tel:+491601221306"
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-sans font-bold text-sm tracking-wide uppercase transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)]"
            >
              Call Technical Hotline
            </Link>
            <Link
              href="/contact?emergency=true"
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-secondary-navy border border-white/10 hover:border-white/20 text-white font-sans font-bold text-sm tracking-wide uppercase transition-all"
            >
              Submit Dispatch Request
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
