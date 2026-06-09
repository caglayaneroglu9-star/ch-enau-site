"use client";

import React, { useState } from "react";
import { Factory, Award, ShieldAlert, Cpu, Gauge, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const gdClasses = [
  {
    shortName: "Cigarette Makers",
    name: "Sigara Üretim Makineleri (Cigarette Makers)",
    models: [
      { name: "GD 121", desc: "Çift çubuklu sigara üretim makinesi (10.000 ppm)" },
      { name: "GD 121A", desc: "Çift çubuklu sigara üretim makinesi (12.000 ppm)" },
      { name: "GD 121H", desc: "Çift çubuklu sigara üretim makinesi (12.000 - 16.000 ppm). HNB (Heat-not-burn) çubuk üretimi için de uygundur." },
      { name: "GD 121HE", desc: "Dijital ve tamamen elektronik çift çubuklu sigara üretim makinesi. HNB çubuk üretimi için de uygundur." }
    ]
  },
  {
    shortName: "Packers & Wrappers",
    name: "Paketleme Hatları ve Makineleri (Packers & Wrapping Lines)",
    models: [
      { name: "GD C600 Pack", desc: "Sarma, kartonlama ve dış ambalajlama hattı (500 ppm)" },
      { name: "GD C800 BV", desc: "Sarma, kartonlama ve dış ambalajlama hattı (800 ppm)" },
      { name: "GD W600 BV", desc: "Sarma, kartonlama ve dış ambalajlama hattı (600 ppm)" },
      { name: "GD WX-BX", desc: "Sarma, kartonlama ve dış ambalajlama hattı" },
      { name: "GD H600", desc: "Sürekli akışlı, tek hatlı sert paket (hinge-lid) sigara paketleme makinesi (600 ppm)" },
      { name: "GD X2", desc: "Kesintili (intermittent), tek hatlı sert paket paketleme makinesi (420 ppm)" },
      { name: "GD X3", desc: "Kesintili, tek hatlı sert paket sigara paketleme makinesi (500 ppm)" },
      { name: "GD X6", desc: "Kesintili, tek hatlı sert paket sigara paketleme makinesi (600 ppm)" },
      { name: "GD X500", desc: "Kesintili, tek hatlı yumuşak paket (soft) sigara paketleme makinesi (500 ppm)" },
      { name: "GD X6S", desc: "Kesintili, tek hatlı yumuşak paket sigara paketleme makinesi (600 ppm)" },
      { name: "GD X6P", desc: "Kesintili, tek hatlı sızdırmaz paketleme makinesi (360 ppm)" },
      { name: "GD XM", desc: "Tamamen elektronik paketleme makinesi" },
      { name: "GD FP-X6", desc: "Tekrar kapatılabilir iç ambalajlar için sert paket paketleme makinesi (450 ppm)" },
      { name: "GD IS800", desc: "Purolar için tek hatlı sarma makinesi (800 cpm)" },
      { name: "GD SP2T G.D", desc: "Nargile tütünü (molasses) için yatay paketleme makinesi (flow wrapper) (250 ppm)" },
      { name: "GD H1000-W1000-BV", desc: "Yüksek hızlı sarma, kartonlama ve dış ambalajlama hattı (1000 ppm)" }
    ]
  },
  {
    shortName: "Combiners",
    name: "Kombine Ediciler ve Filtre Birleştiriciler (Combiners)",
    models: [
      { name: "GD FC8", desc: "Çok segmentli filtreler için birleştirici/kombiner (8.000 rpm)" },
      { name: "GD MC", desc: "Yeni nesil ürünler (Next Generation Products) için birleştirici/kombiner (10.000 ppm)" }
    ]
  },
  {
    shortName: "E-Cig & Next Gen",
    name: "Yeni Nesil Ürün Dolum ve Montaj Makineleri (E-Cig & Next Gen)",
    models: [
      { name: "GD E-CA", desc: "Yeni nesil ürünler için kartuş montaj makinesi (300 cpm)" },
      { name: "GD E-CAF", desc: "Yeni nesil ürünler için kartuş montaj ve dolum makinesi (300 cpm)" },
      { name: "GD PWF", desc: "Yeni nesil ve kenevir (hemp) türevi ürünler için toz dolum ve kapsül mühürleme makinesi (2.500 ppm)" },
      { name: "GD SM", desc: "Snus (dumansız tütün) üretim makinesi (1.000 ppm)" }
    ]
  },
  {
    shortName: "Applicators",
    name: "Damga, Pul ve Kupon Uygulama Makineleri (Stamp & Coupon Applicators)",
    models: [
      { name: "GD AN", desc: "Damga/pul uygulama makinesi" },
      { name: "GD CN", desc: "Damga/pul uygulama makinesi" },
      { name: "GD CS", desc: "Damga/pul uygulama makinesi" },
      { name: "GD KN", desc: "Damga/pul uygulama makinesi" },
      { name: "GD NX", desc: "Damga/pul uygulama makinesi" },
      { name: "GD CI", desc: "Kupon yerleştirme makinesi (Coupon inserter)" },
      { name: "GD DI", desc: "Kupon yerleştirme makinesi" }
    ]
  },
  {
    shortName: "Flow & Buffering",
    name: "Hat Otomasyonu, Besleme ve Tamponlama Sistemleri (Flow Automation & Buffering)",
    models: [
      { name: "GD B21", desc: "Üretici (maker) ve paketleyici arasında FIFO tamponlama ünitesi (290.000 sigara kapasitesine kadar)" },
      { name: "GD SFB", desc: "FIFO silindirik tamponlama ünitesi (105.000 ürüne kadar kapasiteli)" },
      { name: "GD AM14", desc: "Sigara tepsisi boşaltma sistemi (4 ppm)" },
      { name: "GD FTU", desc: "Filtre çubukları için tepsi boşaltıcı (4 ppm)" },
      { name: "GD T10", desc: "Sigara veya filtreler için tepsi doldurma sistemi (4 ppm)" },
      { name: "GD CPT", desc: "Yandan yüklemeli koli paketleme makinesi (Case packer) (6 ppm)" }
    ]
  }
];

const domains = [
  {
    id: "gd-maker-packer",
    brand: "G.D. Maker & Packer",
    subtitle: "High-Speed Maker & Packer Integration",
    description: "Operating at speeds that push the physical limits of packaging, G.D. makers and packers demand nanosecond-level processing cycle times. We offer setup, installation, troubleshooting, and code optimizations to keep the machinery in sync.",
    capabilities: [
      "Expert Installation & Setup services",
      "Routine Maintenance & logic checks",
      "Electrical Repair and sensor calibration",
      "Modernization (TwinCAT 2 / TwinCAT 3 / TIA Portal migration)",
      "Solving chronic speed mismatches and reject failures",
      "R&D support for custom mechanical modifications"
    ],
    efficiency: "+12% OEE Boost",
    models: [] // Uses gdClasses subcategories
  },
  {
    id: "sasib-maker-packer",
    brand: "SASIB Maker & Packer",
    subtitle: "Legacy Electrical Modernization",
    description: "SASIB machines are built with durable mechanical parts but legacy electrical panels are prone to communication drops and lack active alerts. We modernization controls with modern standard industrial controllers.",
    capabilities: [
      "Standard and custom line Installation",
      "Periodic Maintenance and backup validation",
      "Precision electrical diagnostics and Repair",
      "Software Modification & HMI upgrades",
      "Resolving chronic stops and safety loop faults",
      "Integrating custom R&D packing configurations"
    ],
    oee: "80% Failure Reduction",
    models: [
      "SASIB 3000 Packer",
      "SASIB 6000 Packer",
      "SASIB Packer Wrappers",
      "SASIB KDF2 Filter Maker"
    ]
  },
  {
    id: "gd-filter",
    brand: "G.D. Filtermaschinen",
    subtitle: "High-Speed Filter Assembly Systems",
    description: "Specialized filter manufacturing units require precise blower air flow, vacuum cutters, and product segment alignment. We write high-frequency cycle logic to handle timing parameters.",
    capabilities: [
      "On-site assembly line Installation & wiring",
      "Cyclical Maintenance & sensor calibration",
      "Fault Repair on vacuum/drum mechanisms",
      "Signal modification and logic optimization",
      "Solving chronic transfer and reject issues",
      "Collaborating on R&D design implementations"
    ],
    oee: "Zero filter damage",
    models: [
      "GD DF6",
      "GD DF10",
      "GD DFC",
      "GD DFPT",
      "GD DFSM",
      "GD DFH"
    ]
  },
  {
    id: "molins-filter",
    brand: "MOLINS Filtermaschinen",
    subtitle: "Production and Filter Assembly",
    description: "Bringing modern controller platforms to classic Molins makers. We replace legacy proprietary boards with open-architecture PLCs to reduce grey-market hardware dependency.",
    capabilities: [
      "Cabinet rewiring & PLC cabinet Installation",
      "Routine Maintenance & verification testing",
      "EPLAN analysis & electronic Repair services",
      "Cabinet Modification & drive upgrades",
      "Resolving chronic weight control drift errors",
      "R&D ideas implementation for speed boost"
    ],
    oee: "Zero Obsolete Parts Risk",
    models: [
      "Molins Mark 8",
      "Molins Mark 9",
      "Molins Mark 10",
      "Molins HLP Packer"
    ]
  },
  {
    id: "mts-tube",
    brand: "MTS Tubemaschinen",
    subtitle: "High-Speed Tube Handling and Logistics",
    description: "Logistics control systems for filter tubes and high-speed conveyor transfers. We write synchronized speed matching logic to avoid product jamming.",
    capabilities: [
      "Logistics line integration & Installation",
      "Periodic Maintenance and software safety audits",
      "Conveyor drive diagnostics & mechanical-electrical Repair",
      "Logistics speed Modification & software gearing",
      "Resolving chronic tracking and transfer failures",
      "Implementing custom R&D design revisions"
    ],
    oee: "Optimized Flow Rates",
    models: [
      "MTS Tube Makers",
      "Logistics Conveyors",
      "Tray Fillers"
    ]
  },
];

export default function ExpertisePage() {
  const [activeGdClass, setActiveGdClass] = useState(0);

  return (
    <div className="py-12 sm:py-20 relative">
      <div className="absolute inset-0 circuit-grid opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-body text-xs font-bold tracking-[0.2em] text-neon-cyan uppercase bg-neon-cyan/10 px-3.5 py-1.5 rounded-full">
            Specialized Domain Authority
          </span>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-white mt-5 tracking-tight">
            Tobacco & Cigarette Packaging Systems
          </h1>
          <p className="font-body text-base sm:text-lg text-steel-gray mt-4 leading-relaxed">
            High-speed production demands elite engineering. We are one of the few automation companies globally with deep on-site experience modernizing and troubleshooting G.D., SASIB, and Molins machines.
          </p>
        </div>

        {/* Technical Challenge Declaration */}
        <div className="glassmorphic-card p-8 sm:p-10 rounded-2xl border border-white/5 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-industrial-blue/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert className="w-5 h-5 text-neon-cyan" />
                <span className="font-body text-xs font-bold tracking-wider text-neon-cyan uppercase">
                  The High-Speed Challenge
                </span>
              </div>
              <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                Why Cigarette Machinery Requires Specialized Engineers
              </h2>
              <p className="font-body text-sm sm:text-base text-steel-gray mt-4 leading-relaxed">
                A modern packer processes up to 10 packets per second. At these speeds, physical limits are reached. A standard PLC program with 10ms scan times will miss sensory triggers, leading to adhesive misapplications, wrapper tears, and instant line shutdown. 
                <br /><br />
                We write custom real-time code optimized for tasks executing at **250 microseconds**, leveraging Beckhoff EtherCAT distributed clocks for sub-microsecond servo sync.
              </p>
            </div>
            <div className="lg:col-span-4 bg-primary-navy/80 border border-white/5 p-6 rounded-xl flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Gauge className="w-6 h-6 text-neon-cyan" />
                <div>
                  <h4 className="font-sans font-bold text-sm text-white">20,000 cpm</h4>
                  <p className="font-body text-xs text-steel-gray">Maker operating speed limits</p>
                </div>
              </div>
              <hr className="border-white/5" />
              <div className="flex items-center gap-3">
                <Cpu className="w-6 h-6 text-neon-cyan" />
                <div>
                  <h4 className="font-sans font-bold text-sm text-white">250 µs Tasks</h4>
                  <p className="font-body text-xs text-steel-gray">Real-time code cycle times</p>
                </div>
              </div>
              <hr className="border-white/5" />
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-neon-cyan" />
                <div>
                  <h4 className="font-sans font-bold text-sm text-white">OEE Boost</h4>
                  <p className="font-body text-xs text-steel-gray">Proven productivity results</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand details map */}
        <div className="flex flex-col gap-12 mb-20">
          {domains.map((domain, idx) => (
            <div
              key={domain.brand}
              className="glassmorphic-card p-8 sm:p-10 rounded-2xl border border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative group"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Left col */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div>
                  <span className="font-body text-xs font-bold text-neon-cyan/80 bg-neon-cyan/5 px-3 py-1 rounded-full border border-neon-cyan/10">
                    {domain.subtitle}
                  </span>
                  <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-3">
                    {domain.brand}
                  </h2>
                </div>
                <p className="font-body text-sm sm:text-base text-steel-gray leading-relaxed">
                  {domain.description}
                </p>

                <div className="p-4 rounded-xl bg-secondary-navy border border-white/5 flex items-center justify-between mt-2">
                  <span className="font-body text-xs text-steel-gray">Projected Result</span>
                  <span className="font-mono text-xs text-emerald-400 font-bold bg-emerald-400/10 border border-emerald-400/25 px-3 py-1 rounded">
                    {domain.oee}
                  </span>
                </div>
              </div>

              {/* Right col */}
              <div className="lg:col-span-7 bg-secondary-navy/40 border border-white/5 p-6 sm:p-8 rounded-xl flex flex-col gap-6">
                <div>
                  <h4 className="font-sans font-bold text-sm text-white uppercase tracking-wider mb-4">
                    Our Specialized Interventions:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {domain.capabilities.map((cap, i) => (
                      <li key={i} className="flex gap-2.5 items-start">
                        <CheckCircle2 className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
                        <span className="font-body text-sm text-steel-gray leading-relaxed">
                          {cap}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <hr className="border-white/5" />

                <div>
                  <h4 className="font-sans font-bold text-xs text-white/50 uppercase tracking-widest mb-3">
                    Supported Systems & Cabinets:
                  </h4>

                  {domain.id === "gd-maker-packer" ? (
                    <div className="flex flex-col gap-4 mt-2 text-left">
                      {/* Sub-tabs for G.D. Classes */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {gdClasses.map((cls, idx) => (
                          <button
                            key={cls.shortName}
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
                      <div className="p-4 rounded-xl bg-secondary-navy/80 border border-white/5 flex flex-col gap-3.5 max-h-[260px] overflow-y-auto">
                        <h6 className="font-sans font-bold text-xs text-neon-cyan border-b border-white/5 pb-1">
                          {gdClasses[activeGdClass].name}
                        </h6>
                        {gdClasses[activeGdClass].models.map((mod) => (
                          <div key={mod.name} className="flex flex-col gap-1 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                            <span className="font-mono text-xs font-bold text-white">
                              {mod.name}
                            </span>
                            <span className="font-body text-xs text-steel-gray">
                              {mod.desc}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 text-left">
                      <h6 className="font-sans font-bold text-xs text-neon-cyan border-b border-white/5 pb-1">
                        Supported Equipment List
                      </h6>
                      <div className="flex flex-wrap gap-2.5 mt-1">
                        {domain.models.map((mod) => (
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
            </div>
          ))}
        </div>

        {/* Call-to-action details */}
        <div className="text-center max-w-2xl mx-auto py-8">
          <h3 className="font-sans font-extrabold text-2xl text-white mb-4">
            Request an On-Site Machinery Audit
          </h3>
          <p className="font-body text-sm text-steel-gray mb-6 leading-relaxed">
            Our engineers will inspect your line, trace signal delays, analyze existing safety loops, and propose a detailed path to achieve modern speed targets.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-industrial-blue hover:bg-industrial-blue/90 border border-neon-cyan/50 text-white font-sans font-bold text-sm tracking-wide uppercase transition-all shadow-[0_0_20px_rgba(0,102,204,0.3)]"
          >
            Schedule On-Site Audit
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
