import React from "react";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Engineering Services | CH Energie & Automation",
  description: "Explore our 8 core industrial automation services: PLC programming, machine modernization, high-speed motion control tuning, emergency support, and site diagnostics.",
  keywords: "PLC Programming, TwinCAT, TIA Portal, Machine Modernization, Servo Tuning, Electrical Troubleshooting",
};

const services = [
  {
    icon: Cpu,
    title: "PLC Programming & Systems Design",
    description:
      "We write highly structured, clean, and modular PLC code adhering to the IEC 61131-3 standard. We specialize in object-oriented Structured Text (ST) and Ladder Logic.",
    details: [
      "Beckhoff TwinCAT 2 & 3 (TcXaeShell, C# integration, ADS communications)",
      "Siemens TIA Portal & SIMATIC Manager (S7-300/400/1200/1500, Step 7)",
      "Bosch Rexroth IndraLogic & IndraWorks software platforms",
      "Custom function blocks for high-speed sequence processing",
    ],
    tech: ["TwinCAT 3", "TIA Portal", "Structured Text", "IEC 61131-3"],
  },
  {
    icon: RefreshCw,
    title: "Machine Modernization & Retrofits",
    description:
      "Avoid multi-million dollar capital expenditure. We breathe new life into legacy machinery by completely replacing outdated control cabinets and proprietary electronics with standard, open solutions.",
    details: [
      "Replacement of obsolete proprietary boards with off-the-shelf industrial PLCs",
      "Migration of legacy codebase (e.g. TwinCAT 2 to TwinCAT 3, Step 5 to Step 7/TIA Portal)",
      "Integration of modern safety architectures (Beckhoff TwinSAFE, Siemens F-CPU)",
      "Minimal mechanical modifications with optimized commission times to minimize downtime",
    ],
    tech: ["Hardware Upgrades", "Controller Migration", "TwinSAFE", "HMI Redesign"],
  },
  {
    icon: Search,
    title: "Electrical & Electronic Troubleshooting",
    description:
      "When standard factory electricians fail to locate the issue, our senior diagnostics team is dispatched. We use advanced scope analysis and signal tracking to locate physical and code failures.",
    details: [
      "Intermittent noise tracing in high-flex sensor cables and analog loops",
      "EPLAN schematic validation and cabinet wiring audits",
      "Safety circuit diagnosis (guard door sensors, light curtains, emergency stop relays)",
      "Custom electronics reverse engineering and PCB design/repair (Proteus)",
    ],
    tech: ["EPLAN Analysis", "Signal Diagnostics", "Proteus PCB", "Safety Auditing"],
  },
  {
    icon: Activity,
    title: "Motion Control & Servo Systems",
    description:
      "High-speed packaging demands nanosecond-level mechanical synchronization. We specialize in dynamic multi-axis motion control pathing, electronic gearing, and servo tuning.",
    details: [
      "Electronic cam (MC_CamIn) design, optimization, and on-the-fly transition rules",
      "Tuning of servo controller gain loops (Position, Velocity, and Current PID loops)",
      "Integration of Bosch Rexroth (IndraWorks), Beckhoff (AX5000/AX8000), and Lenze Drives",
      "EtherCAT network synchronization utilizing Distributed Clocks (DC) down to 250µs jitter",
    ],
    tech: ["EtherCAT DC", "IndraWorks DS", "AX5000 / AX8000", "Electronic Camming"],
  },
  {
    icon: Network,
    title: "HMI / SCADA & Network Integration",
    description:
      "We design intuitive, high-contrast user interfaces tailored to field operators and plant managers. We integrate SCADA systems for plant-wide data logging and ERP communications.",
    details: [
      "Modern HTML5-based HMI development (Beckhoff HMI, Siemens WinCC Unified)",
      "Industrial network configuration (EtherCAT, PROFINET, PROFIBUS, Ethernet/IP)",
      "OPC UA server setup for secure data telemetry to factory execution systems (MES)",
      "High-speed localized telemetry logging for traceability and audit compliance",
    ],
    tech: ["OPC UA", "WinCC Unified", "Beckhoff HMI", "MES Telemetry"],
  },
  {
    icon: Zap,
    title: "Emergency Technical Support (24/7)",
    description:
      "Production downtime can cost thousands of euros per minute. We offer a rapid response program to restore operations through secure remote connections or immediate site dispatch.",
    details: [
      "Secure industrial VPN remote access for real-time online diagnostics",
      "24/7 direct senior engineer hotline access (no call centers)",
      "Global emergency dispatch capability (Europe, Middle East, Americas)",
      "Hardware replacement components sourcing through our supply network",
    ],
    tech: ["Remote VPN Diagnostics", "On-site Dispatch", "24/7 Hotline", "Quick Sourcing"],
  },
  {
    icon: ShieldAlert,
    title: "Preventive & Corrective Maintenance",
    description:
      "Keep your systems running at optimal capacity. We carry out regular system inspections, backup validations, and sensor calibrations to prevent failures before they occur.",
    details: [
      "System software backups (image creation, configuration tracking)",
      "Vibration analysis on critical drive shafts and mechanical wear compensation",
      "Periodic calibration of high-precision weighing scales and sensors",
      "Source code quality and performance optimization audits",
    ],
    tech: ["System Backups", "Vibration Profiling", "Sensor Calibration", "Code Auditing"],
  },
  {
    icon: Settings2,
    title: "Process & Cycle-Time Optimization",
    description:
      "Speed is profit in high-speed tobacco production. We audit existing sequences to trim milliseconds off repetitive operations, achieving immediate throughput gains.",
    details: [
      "Optimization of pneumatics-electronics overlaps to minimize dead time",
      "Implementation of high-speed capture inputs (Latch inputs) for sensor accuracy",
      "Tuning glue-gun and foil-wrapping trigger timing relative to current encoder position",
      "Refining product reject mechanisms to prevent accidental high-speed machine jams",
    ],
    tech: ["Cycle Tuning", "Fast Latch Inputs", "Encoder Phase-matching", "OEE Optimization"],
  },
];

export default function ServicesPage() {
  return (
    <div className="py-12 sm:py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 circuit-grid opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-body text-xs font-bold tracking-[0.2em] text-neon-cyan uppercase bg-neon-cyan/10 px-3.5 py-1.5 rounded-full">
            Engineering Capabilities
          </span>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-white mt-5 tracking-tight">
            Comprehensive Automation Solutions
          </h1>
          <p className="font-body text-base sm:text-lg text-steel-gray mt-4 leading-relaxed">
            From emergency field troubleshooting to complete greenfield system design, we deliver elite automation solutions engineered for zero-compromise reliability.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {services.map((svc) => (
            <div
              key={svc.title}
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
                      {svc.tech.map((t) => (
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
                    Core Technical Actions
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    {svc.details.map((detail, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
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
                  Standards compliant engineering
                </span>
                <Link
                  href="/contact"
                  className="flex items-center gap-1 font-sans font-bold text-xs text-neon-cyan hover:text-white uppercase tracking-wider transition-all group"
                >
                  Consultation
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
              24/7 Immediate Response
            </span>
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-4">
              Need on-site support or immediate online diagnostics?
            </h2>
            <p className="font-body text-sm text-steel-gray mt-2 leading-relaxed">
              We connect to your secure site routers within minutes to diagnose PLC, drive, or safety system fault buffers. If a site visit is required, we dispatch immediately.
            </p>
          </div>
          <div className="relative z-10 shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="tel:+491601221306"
              className="px-6 py-3.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-sans font-bold text-sm tracking-wide text-center uppercase transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)]"
            >
              Call support
            </Link>
            <Link
              href="/contact?emergency=true"
              className="px-6 py-3.5 rounded-lg bg-secondary-navy border border-white/5 hover:border-white/10 text-white font-sans font-bold text-sm tracking-wide text-center uppercase transition-all"
            >
              Submit incident report
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
