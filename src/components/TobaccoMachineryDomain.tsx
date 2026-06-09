"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, CheckCircle, ShieldCheck, Factory, Gauge, RefreshCw } from "lucide-react";

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
      { name: "GD AM14", desc: "Sigara tepsisi boşaltma sistema (4 ppm)" },
      { name: "GD FTU", desc: "Filtre çubukları için tepsi boşaltıcı (4 ppm)" },
      { name: "GD T10", desc: "Sigara veya filtreler için tepsi doldurma sistemi (4 ppm)" },
      { name: "GD CPT", desc: "Yandan yüklemeli koli paketleme makinesi (Case packer) (6 ppm)" }
    ]
  }
];

const machines = [
  {
    id: "gd-maker-packer",
    brand: "G.D. Maker & Packer",
    type: "High-Speed Production & Wrapping Systems",
    desc: "Comprehensive solutions for G.D. makers and packing machinery. Operating at speeds up to 20,000 cigarettes or 1,000 packs per minute, we provide expert control adjustments to maintain synchronization.",
    features: [
      "Expert Installation, Setup and Commissioning",
      "Routine Maintenance & Performance Overhauls",
      "Electrical Repair and Logic Optimization",
      "Modernization (TwinCAT 2 / TwinCAT 3 / TIA Portal controller conversion)",
      "Resolution of chronic speed and reject failures",
      "R&D support to implement custom automation ideas"
    ],
    efficiency: "+12% Target OEE Increase",
    models: [] // Uses gdClasses subcategories
  },
  {
    id: "sasib-maker-packer",
    brand: "SASIB Maker & Packer",
    type: "Classic Makers and Packaging Units",
    desc: "Robust mechanical systems modernized with advanced open PLCs. We integrate modern motion paths and high-speed sensors to keep legacy SASIB hardware highly competitive.",
    features: [
      "On-site mechanical and electrical Installation",
      "Systematic Maintenance & diagnostic calibration",
      "Precision electrical Fault Diagnosis & Repair",
      "Control systems Modification and HMI updates",
      "Solving chronic hardware dropouts & safety loops",
      "R&D ideas integration for custom packing options"
    ],
    efficiency: "80% Reduction in electrical downtime",
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
    type: "High-Speed Filter Assembly Systems",
    desc: "Precise vacuum blowers, cutting drums, and synchronization mechanics. We configure real-time controller signals to handle high-speed filter tip assembly without delays.",
    features: [
      "Complete assembly line Installation & wiring",
      "Cyclical Maintenance & sensor calibration",
      "Quick response Repair for vacuum blower stops",
      "Control modification (latch inputs and cam phase locks)",
      "Solving chronic synchronization and rejection errors",
      "R&D prototype integration for new filter structures"
    ],
    efficiency: "Zero filter transfer damage",
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
    type: "Filter Assembly & Production Lines",
    desc: "Modern controls retrofits for legacy Molins filter assembly hardware. We replace obsolete boards and cards with standardized PLCs and modern drives.",
    features: [
      "Control cabinet Installation and custom wiring",
      "Preventive Maintenance & software backup audits",
      "EPLAN drawing check & PCB/electronic Repair",
      "Legacy controller Modification & modernizing inverters",
      "Resolving chronic weight control loops and drift issues",
      "Collaboration on R&D ideas for custom process speeds"
    ],
    efficiency: "Zero obsolete parts risk",
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
    type: "Tube Logistics & Assembly Systems",
    desc: "High-speed conveyor logistics and tube handling automation. We design precise speed-matching algorithms to synchronize logistics with makers and packers.",
    features: [
      "System integration and line Installation",
      "Routine Maintenance & logic safety audits",
      "Fast diagnostics and drive Repair services",
      "Logistics speed Modification and software gearing",
      "Resolving chronic tracking and transfer failures",
      "Implementing custom R&D design revisions"
    ],
    efficiency: "Optimized product flow without blockages",
    models: [
      "MTS Tube Makers",
      "Logistics Conveyors",
      "Tray Fillers"
    ]
  },
];

export default function TobaccoMachineryDomain() {
  const [selected, setSelected] = useState(machines[0].id);
  const [activeGdClass, setActiveGdClass] = useState(0);
  const active = machines.find((m) => m.id === selected) || machines[0];

  return (
    <section className="py-24 relative overflow-hidden bg-primary-navy">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-industrial-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-body text-xs font-bold tracking-[0.2em] text-neon-cyan uppercase bg-neon-cyan/10 px-3.5 py-1.5 rounded-full inline-block">
            Specialized Domain Authority
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white mt-4 tracking-tight">
            Tobacco & Cigarette Packaging Systems
          </h2>
          <p className="font-body text-base text-steel-gray mt-4 leading-relaxed">
            High-speed production demands expert-level automation. We specialize in troubleshooting, revamping, and modernizing the industry's most complex machinery.
          </p>
        </div>

        {/* Brand tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {machines.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelected(m.id)}
              className={`px-6 py-3 rounded-lg font-sans font-bold text-sm border transition-all duration-300 ${
                selected === m.id
                  ? "bg-industrial-blue border-neon-cyan text-white shadow-[0_0_15px_rgba(0,102,204,0.3)]"
                  : "bg-secondary-navy border-white/5 text-steel-gray hover:text-white hover:border-white/10"
              }`}
            >
              {m.brand}
            </button>
          ))}
        </div>

        {/* Content Showcase */}
        <div className="glassmorphic-card p-8 sm:p-10 rounded-2xl border border-white/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left Column: Description */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Factory className="w-5 h-5 text-neon-cyan" />
                    <span className="font-body text-xs font-bold tracking-wider text-neon-cyan uppercase">
                      {active.type}
                    </span>
                  </div>
                  <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight mb-4">
                    {active.brand} Specialists
                  </h3>
                  <p className="font-body text-base text-steel-gray leading-relaxed mb-6">
                    {active.desc}
                  </p>

                  <div className="flex flex-col gap-3 mb-6">
                    <h5 className="font-sans font-bold text-xs text-white/50 uppercase tracking-wider">
                      Supported Models & Subsystems:
                    </h5>

                    {active.id === "gd-maker-packer" ? (
                      <div className="flex flex-col gap-4">
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
                      <div className="flex flex-col gap-3">
                        <h6 className="font-sans font-bold text-xs text-neon-cyan border-b border-white/5 pb-1">
                          Supported Equipment List
                        </h6>
                        <div className="flex flex-wrap gap-2.5 mt-1">
                          {active.models.map((mod) => (
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

                {/* Performance improvement highlight */}
                <div className="p-4 rounded-xl bg-neon-cyan/5 border border-neon-cyan/10 flex items-center gap-3.5">
                  <Gauge className="w-6 h-6 text-neon-cyan shrink-0 animate-pulse" />
                  <div>
                    <h6 className="font-sans font-bold text-xs text-neon-cyan uppercase tracking-wider">
                      Target Performance
                    </h6>
                    <p className="font-body text-sm text-white font-medium mt-0.5">
                      {active.efficiency}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Solutions */}
              <div className="lg:col-span-6 bg-secondary-navy/60 border border-white/5 p-6 sm:p-8 rounded-xl flex flex-col justify-between">
                <div>
                  <h4 className="font-sans font-bold text-base text-white mb-5 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-neon-cyan" />
                    Custom Engineering Interventions
                  </h4>
                  <ul className="flex flex-col gap-4">
                    {active.features.map((feat, index) => (
                      <li key={index} className="flex gap-3 items-start">
                        <CheckCircle className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
                        <div>
                          <p className="font-body text-sm text-steel-gray leading-relaxed">
                            {feat}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <span className="font-body text-xs text-steel-gray flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    ISO 9001 & CE Compliant Design Standards
                  </span>
                  <a
                    href="/contact"
                    className="font-sans font-bold text-xs text-neon-cyan hover:text-white uppercase tracking-wider transition-colors inline-block"
                  >
                    Request Cabinet Retrofit &rarr;
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
