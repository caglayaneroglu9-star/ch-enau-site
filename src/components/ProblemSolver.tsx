"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Zap, Shield, Search, ArrowRight, Ban, Cpu } from "lucide-react";

const problems = [
  {
    id: "downtime",
    title: "Repetitive Downtime & Intermittent Faults",
    short: "Unexplained stops that standard maintenance teams fail to replicate.",
    symptoms: [
      "Machine stops with generic error reports",
      "Tripping circuit breakers or random drive resets",
      "Errors occur only at high throughput rates",
    ],
    diagnosis: "Power quality harmonics check, electrical noise (EMI) insulation audit, and real-time TwinCAT/TIA Portal buffer logging to capture transient drops.",
    solution: "Filter/choke installations, physical cable shielding isolation, PLC code refactoring with robust error traps, and automated sensor debouncing.",
    icon: Ban,
  },
  {
    id: "sync",
    title: "Multi-Axis Synchronization Drift",
    short: "Misalignment between rotary cutters, product feeds, and wrapper lines.",
    symptoms: [
      "Product overlap or structural packaging tears",
      "High waste counts during acceleration phases",
      "Position errors on high-speed servo drives",
    ],
    diagnosis: "EtherCAT jitter analysis, electronic cam profile verification, and encoder feedback resolution validation.",
    solution: "Virtual master tuning, high-speed task cycle configuration down to 250µs, cam-profile smoothing, and encoder alignment calibration.",
    icon: Zap,
  },
  {
    id: "bottlenecks",
    title: "High-Speed Bottlenecks & Speed Limits",
    short: "Makers or Packers running below rated speed due to control lag.",
    symptoms: [
      "Product jams at higher speeds",
      "Sensors miss triggers",
      "Mechanical vibration from erratic motion control",
    ],
    diagnosis: "Cycle time profiling, motion trajectory tracing, and pneumatic-electric synchronization tracking.",
    solution: "Upgrading PLC hardware, writing optimized non-blocking logic, optimizing acceleration ramps (S-curves), and tuning controller gains (PID).",
    icon: Cpu,
  },
  {
    id: "fieldbus",
    title: "Fieldbus & Communication Dropouts",
    short: "Loss of connection in remote I/O blocks or servo drives (EtherCAT, PROFINET).",
    symptoms: [
      "Immediate full-line emergency stops",
      "Sporadic packet loss indicators",
      "Broken link messages in PLC diagnosis logs",
    ],
    diagnosis: "Checking EtherCAT Frame Loss Counters, connector corrosion inspection, and shielding ground loop test.",
    solution: "Deploying ring-topology redundancy, replacing standard cables with high-flex industrial drag-chain rated wiring, and segment separation.",
    icon: Search,
  },
  {
    id: "obsolescence",
    title: "Obsolete Controller & Hardware Risks",
    short: "Legacy electronics without manufacturer support or replacement parts.",
    symptoms: [
      "Inability to back up PLC code",
      "Long lead times for legacy cards on gray market",
      "System failure leads to weeks of factory downtime",
    ],
    diagnosis: "Full control cabinet modernization audit and mapping existing physical I/O allocations.",
    solution: "Full retrofit of legacy PLC (e.g. TwinCAT 3 migration, TIA Portal conversion), wiring updates, and HMI/SCADA redesign for modern operators.",
    icon: Shield,
  },
];

export default function ProblemSolver() {
  const [activeTab, setActiveTab] = useState(problems[0].id);
  const current = problems.find((p) => p.id === activeTab) || problems[0];

  return (
    <section className="py-24 relative overflow-hidden bg-secondary-navy/20 border-y border-white/5">
      <div className="absolute inset-0 circuit-grid opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-body text-xs font-bold tracking-[0.2em] text-red-400 uppercase bg-red-400/10 px-3.5 py-1.5 rounded-full inline-block">
            Chronic Problem Solver
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white mt-4 tracking-tight">
            Complex Problems Need Experienced Engineers
          </h2>
          <p className="font-body text-base text-steel-gray mt-4 leading-relaxed">
            When standard on-site technicians cannot find the root cause, our senior engineers deploy advanced telemetry to identify and fix it permanently.
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
                        Active Failure Mode
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
                        Common Symptoms
                      </h5>
                      <ul className="flex flex-col gap-2">
                        {current.symptoms.map((s, i) => (
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
                          Advanced Diagnostics
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
                        Permanent Resolution
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
                  Experiencing these symptoms in your line?
                </span>
                <a
                  href="/contact"
                  className="flex items-center gap-1.5 font-sans font-bold text-xs text-red-400 hover:text-white transition-colors uppercase tracking-wider group"
                >
                  Request Engineering Diagnostics
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
