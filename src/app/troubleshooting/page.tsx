import React from "react";
import type { Metadata } from "next";
import { Settings, Shield, AlertOctagon, HelpCircle, HardDrive, Cpu, Terminal } from "lucide-react";
import ProblemSolver from "@/components/ProblemSolver";

export const metadata: Metadata = {
  title: "Chronic Problem Solving & Diagnostics | CH Energie & Automation",
  description: "Solving complex, repeating breakdowns and synchronization errors. Real-time EtherCAT frame tracking, PID tuning, and PLC diagnostics.",
  keywords: "Troubleshooting, Diagnostics, EtherCAT errors, Servo drift, PLC debugging, Industrial Noise, Machine Overheating",
};

const diagnosticSteps = [
  {
    icon: Terminal,
    title: "1. Real-Time Telemetry Logging",
    desc: "We hook into the TwinCAT or TIA Portal runtime system directly to monitor cycle execution buffers. We trace transient drops, signal timing, and I/O scan drops down to microsecond resolutions.",
  },
  {
    icon: Cpu,
    title: "2. Electrical Signal Integrity Audits",
    desc: "Using high-bandwidth oscilloscopes and spectrum analyzers, we measure voltage harmonics, electromagnetic interference (EMI), shield loop currents, and network line impedance.",
  },
  {
    icon: Settings,
    title: "3. Motion Cam & PID Profiling",
    desc: "We extract active positioning data to profile acceleration jerks, friction anomalies, and mechanical backlash to feed into advanced motion compensation filters.",
  },
  {
    icon: HardDrive,
    title: "4. Code-Logic Integrity Analysis",
    desc: "We scan the entire program layout to check for race conditions, non-blocking code hazards, pointer mismatches, or legacy loop bottlenecks that decrease cycle speeds.",
  },
];

export default function TroubleshootingPage() {
  return (
    <div className="py-12 sm:py-20 relative">
      <div className="absolute inset-0 circuit-grid opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-body text-xs font-bold tracking-[0.2em] text-neon-cyan uppercase bg-neon-cyan/10 px-3.5 py-1.5 rounded-full">
            Engineering Diagnostics
          </span>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-white mt-5 tracking-tight">
            Resolving Chronic System Failures
          </h1>
          <p className="font-body text-base sm:text-lg text-steel-gray mt-4 leading-relaxed">
            When standard diagnostics fail to find the root cause, we leverage laboratory-grade instrumentation and advanced code profiling to deliver permanent resolutions.
          </p>
        </div>

        {/* Embedded Interactive Problem Solver */}
        <ProblemSolver />

        {/* Diagnostic Methodology Section */}
        <section className="py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="font-body text-xs font-bold tracking-[0.2em] text-neon-cyan uppercase bg-neon-cyan/10 px-3.5 py-1.5 rounded-full self-start">
                Diagnostic Protocol
              </span>
              <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                How We Locate Hidden Mechanical & Control Faults
              </h2>
              <p className="font-body text-sm sm:text-base text-steel-gray leading-relaxed">
                Intermittent machine dropouts are rarely simple sensor failures. They are usually the result of dynamic interaction between mechanical wear, electrical noise, and high-speed logic bottlenecks. 
                <br /><br />
                Our structured diagnostic process isolates variables methodically until the exact physical root cause is pinpointed and verified.
              </p>
              <div className="p-4 rounded-xl bg-secondary-navy border border-white/5 flex gap-3.5">
                <Shield className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
                <span className="font-body text-xs text-steel-gray leading-relaxed">
                  All diagnostics are non-destructive and carried out with minimal interference to ongoing production runs where possible.
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {diagnosticSteps.map((step) => (
                <div
                  key={step.title}
                  className="glassmorphic-card p-6 rounded-xl border border-white/5 relative group"
                >
                  <div className="p-3 bg-primary-navy border border-white/5 text-neon-cyan rounded-lg inline-block group-hover:border-neon-cyan/30 transition-colors mb-4">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans font-bold text-base text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-steel-gray leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
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
              Preventive Diagnostic Recommendations
            </h4>
            <p className="font-body text-sm text-steel-gray mt-2 leading-relaxed">
              If your automation system is older than 10 years, the likelihood of terminal capacitor failure or communication chip failure increases by 14% annually. 
              Do not wait for a full line crash. Our engineers perform preventive evaluations to flag components nearing end-of-life cycles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
