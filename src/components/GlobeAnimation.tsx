"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/config/LanguageContext";

interface GlobeAnimationProps {
  onTriggerVideo: () => void;
}

export default function GlobeAnimation({ onTriggerVideo }: GlobeAnimationProps) {
  const { t, language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger video when progress finishes (5 seconds)
  useEffect(() => {
    if (isHovered) {
      hoverTimerRef.current = setTimeout(() => {
        onTriggerVideo();
      }, 5000);
    } else {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
    }

    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, [isHovered, onTriggerVideo]);

  // Telemetry Console Feed Simulator
  useEffect(() => {
    const isTr = language === "tr";
    const isDe = language === "de";

    const systemLogs = isTr
      ? [
          "[SYS] Aktif kanallar izleniyor...",
          "[HQ] İzmir: Nöbetçi mühendis HAZIR",
          "[SYS] Uzak VPN bağlantısı: GÜVENLİ",
          "[SYS] Telemetri tamponu: 250µs",
          "[DE] Lojistik: Parça tedariği AKTİF",
          "[SYS] Ağı arıza oranı: %0.00",
          "[SYS] Servolar senkronize edildi",
        ]
      : isDe
      ? [
          "[SYS] Überwachung der Kanäle...",
          "[HQ] Izmir: Ingenieur BEREIT",
          "[SYS] VPN-Verbindungen: SICHER",
          "[SYS] Telemetrie-Puffer: 250µs",
          "[DE] Logistik: Lieferkette AKTIV",
          "[SYS] Netzwerk-Fehlerrate: 0.00%",
          "[SYS] Servoantriebe synchronisiert",
        ]
      : [
          "[SYS] Monitoring channels...",
          "[HQ] Izmir: Standby engineer READY",
          "[SYS] VPN links: SECURE",
          "[SYS] Telemetry buffer: 250µs",
          "[DE] Logistics: Supply active",
          "[SYS] Network error rate: 0.00%",
          "[SYS] Servo drives synchronized",
        ];

    // Seed initial logs
    setLogs(systemLogs.slice(0, 3));

    const interval = setInterval(() => {
      const randomLine = systemLogs[Math.floor(Math.random() * systemLogs.length)];
      setLogs((prev) => {
        const next = [...prev.slice(1), randomLine];
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [language]);

  const isTr = language === "tr";
  const isDe = language === "de";

  const hqText = isTr ? "HQ İZMİR: AKTİF" : isDe ? "HQ IZMIR: AKTIV" : "HQ IZMIR: ACTIVE";
  const guidanceAction = isTr
    ? "Tıklayın veya 5sn bekleyin"
    : isDe
    ? "Klicken oder 5s verweilen"
    : "Click or hover 5s to watch";

  return (
    <div
      onClick={onTriggerVideo}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full h-full relative flex items-center justify-center bg-primary-navy/40 group overflow-hidden select-none"
    >
      {/* Inline styles for custom animations */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes radar-sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 0; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
        @keyframes dash-move {
          to { stroke-dashoffset: -20; }
        }
        @keyframes rotate-globe {
          0% { transform: translateX(0); }
          100% { transform: translateX(-360px); }
        }
        .animate-spin-slow {
          animation: spin-slow 35s linear infinite;
        }
        .animate-radar-sweep {
          animation: radar-sweep 9s linear infinite;
          transform-origin: 100px 60px;
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-dash-move {
          animation: dash-move 1.5s linear infinite;
        }
        .animate-globe-rotate {
          animation: rotate-globe 22s linear infinite;
        }
      `}</style>

      {/* 3D Rotating Globe and HUD SVG */}
      <svg viewBox="0 0 200 120" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,229,255,0.15)]">
        <defs>
          {/* Globe Spherical Gradient Shadowing */}
          <radialGradient id="globe-shading" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#0a192f" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#020c1b" stopOpacity="0.95" />
          </radialGradient>

          {/* Radar Scanner Radial Shadow */}
          <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="radar-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
          </linearGradient>

          {/* Mask for Globe Projection */}
          <clipPath id="globe-clip">
            <circle cx="100" cy="60" r="50" />
          </clipPath>
        </defs>

        {/* Outer Scale circle (HUD styling) */}
        <circle
          cx="100"
          cy="60"
          r="54"
          stroke="rgba(0, 229, 255, 0.15)"
          strokeWidth="0.75"
          fill="none"
          strokeDasharray="4,6,12,6"
          className="animate-spin-slow"
        />

        {/* 3D Globe masked group */}
        <g clipPath="url(#globe-clip)">
          {/* Oceanic base background */}
          <circle cx="100" cy="60" r="50" fill="rgba(10, 25, 47, 0.85)" />

          {/* Rotating Continents layer (duplicated side-by-side) */}
          <g className="animate-globe-rotate">
            {/* Continent Map Block 1 */}
            <g className="fill-neon-cyan/25 stroke-neon-cyan/40" strokeWidth="0.5">
              {/* Greenland */}
              <path d="M 70,20 Q 80,15 90,23 T 80,35 Z" />
              {/* North America */}
              <path d="M 15,35 Q 25,20 45,25 T 65,30 T 80,45 T 75,60 T 55,65 T 35,55 Z" />
              {/* South America */}
              <path d="M 55,65 Q 65,75 75,90 T 70,105 T 50,115 T 45,100 T 40,80 Z" />
              {/* Eurasia */}
              <path d="M 175,28 Q 195,18 215,22 T 245,18 T 285,22 T 325,32 T 345,50 T 315,68 T 275,63 T 245,78 T 215,63 T 185,58 Z" />
              {/* Africa */}
              <path d="M 185,68 Q 210,63 230,78 T 245,100 T 230,118 T 205,110 T 190,90 T 180,78 Z" />
              {/* Australia */}
              <path d="M 305,95 Q 325,90 335,100 T 325,118 T 305,112 Z" />
            </g>

            {/* Continent Map Block 2 (Offset by 360px) */}
            <g transform="translate(360, 0)" className="fill-neon-cyan/25 stroke-neon-cyan/40" strokeWidth="0.5">
              {/* Greenland */}
              <path d="M 70,20 Q 80,15 90,23 T 80,35 Z" />
              {/* North America */}
              <path d="M 15,35 Q 25,20 45,25 T 65,30 T 80,45 T 75,60 T 55,65 T 35,55 Z" />
              {/* South America */}
              <path d="M 55,65 Q 65,75 75,90 T 70,105 T 50,115 T 45,100 T 40,80 Z" />
              {/* Eurasia */}
              <path d="M 175,28 Q 195,18 215,22 T 245,18 T 285,22 T 325,32 T 345,50 T 315,68 T 275,63 T 245,78 T 215,63 T 185,58 Z" />
              {/* Africa */}
              <path d="M 185,68 Q 210,63 230,78 T 245,100 T 230,118 T 205,110 T 190,90 T 180,78 Z" />
              {/* Australia */}
              <path d="M 305,95 Q 325,90 335,100 T 325,118 T 305,112 Z" />
            </g>
          </g>

          {/* Grid Latitude / Longitude Overlay Lines */}
          <ellipse cx="100" cy="60" rx="50" ry="50" stroke="rgba(0, 229, 255, 0.08)" fill="none" />
          <ellipse cx="100" cy="60" rx="40" ry="50" stroke="rgba(0, 229, 255, 0.05)" fill="none" />
          <ellipse cx="100" cy="60" rx="25" ry="50" stroke="rgba(0, 229, 255, 0.05)" fill="none" />
          <ellipse cx="100" cy="60" rx="10" ry="50" stroke="rgba(0, 229, 255, 0.05)" fill="none" />
          
          <ellipse cx="100" cy="60" rx="50" ry="40" stroke="rgba(0, 229, 255, 0.05)" fill="none" />
          <ellipse cx="100" cy="60" rx="50" ry="25" stroke="rgba(0, 229, 255, 0.05)" fill="none" />
          <ellipse cx="100" cy="60" rx="50" ry="10" stroke="rgba(0, 229, 255, 0.05)" fill="none" />

          {/* Radar Sweep Effect inside sphere */}
          <circle cx="100" cy="60" r="50" fill="url(#radar-glow)" />
          <path d="M100 60 L100 10 A50 50 0 0 1 135.4 24.6 Z" fill="url(#radar-gradient)" className="animate-radar-sweep" />

          {/* Service Dispatch Curves (Arcs) */}
          {/* Izmir (108, 57) -> USA East (72, 54) */}
          <path d="M 108 57 Q 90 40 72 54" fill="none" stroke="#00E5FF" strokeWidth="0.75" strokeDasharray="3,3" className="animate-dash-move" opacity="0.8" />
          {/* Izmir (108, 57) -> Germany (100, 47) */}
          <path d="M 108 57 Q 104 52 100 47" fill="none" stroke="#00E5FF" strokeWidth="0.75" strokeDasharray="3,3" className="animate-dash-move" opacity="0.8" />
          {/* Izmir (108, 57) -> China (128, 57) */}
          <path d="M 108 57 Q 118 50 128 57" fill="none" stroke="#00E5FF" strokeWidth="0.75" strokeDasharray="3,3" className="animate-dash-move" opacity="0.8" />
          {/* Izmir (108, 57) -> Australia (136, 85) */}
          <path d="M 108 57 Q 122 71 136 85" fill="none" stroke="#00E5FF" strokeWidth="0.75" strokeDasharray="3,3" className="animate-dash-move" opacity="0.8" />

          {/* Dispatch Nodes (Cities) */}
          {/* Izmir HQ */}
          <circle cx="108" cy="57" r="3.5" fill="#00E5FF" className="animate-pulse-ring" />
          <circle cx="108" cy="57" r="2" fill="#00E5FF" />
          {/* Germany */}
          <circle cx="100" cy="47" r="2" fill="#00E5FF" className="animate-pulse" />
          {/* USA */}
          <circle cx="72" cy="54" r="2" fill="#00E5FF" className="animate-pulse" />
          {/* China */}
          <circle cx="128" cy="57" r="2" fill="#00E5FF" className="animate-pulse" />
          {/* Australia */}
          <circle cx="136" cy="85" r="2" fill="#00E5FF" className="animate-pulse" />

          {/* 3D Shading sphere overlay overlay (creates volume) */}
          <circle cx="100" cy="60" r="50" fill="url(#globe-shading)" pointerEvents="none" />
        </g>

        {/* Central HUD Play overlay */}
        <g>
          {/* Inner backing circle */}
          <circle
            cx="100"
            cy="60"
            r="16"
            fill="rgba(10, 25, 47, 0.9)"
            stroke="rgba(0, 229, 255, 0.25)"
            strokeWidth="1"
          />
          {/* Active countdown circle */}
          <circle
            cx="100"
            cy="60"
            r="16"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="1.5"
            strokeDasharray="100.5"
            strokeDashoffset={isHovered ? 0 : 100.5}
            style={{
              transition: isHovered ? "stroke-dashoffset 5s linear" : "stroke-dashoffset 0.4s ease-out",
              transform: "rotate(-90deg)",
              transformOrigin: "100px 60px",
            }}
            className="drop-shadow-[0_0_4px_#00E5FF]"
          />
          {/* Play triangle */}
          <polygon points="97,55 106,60 97,65" fill="#00E5FF" />
        </g>
      </svg>

      {/* HTML HUD overlays */}
      {/* Top Left: Active Status Indicator */}
      <div className="absolute top-4 left-4 font-mono text-[9px] text-neon-cyan tracking-wider flex items-center gap-1.5 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
        <span>{hqText}</span>
      </div>

      {/* Top Right: System Cycle Timer */}
      <div className="absolute top-4 right-4 font-mono text-[9px] text-steel-gray tracking-wider pointer-events-none">
        SYS_CYCLE: 250µs
      </div>

      {/* Bottom Left: Live Telemetry log feed */}
      <div className="absolute bottom-4 left-4 font-mono text-[8px] text-emerald-400/80 max-w-[200px] flex flex-col gap-0.5 pointer-events-none">
        {logs.slice(-2).map((log, idx) => (
          <div key={idx} className="truncate">{log}</div>
        ))}
      </div>

      {/* Bottom Right: Play Guidance text */}
      <div className="absolute bottom-4 right-4 font-mono text-right flex flex-col gap-0.5 pointer-events-none">
        <span className="font-sans font-bold text-neon-cyan text-[10px] tracking-wider uppercase">
          {isHovered ? "CONNECTING..." : "PROMO DEMO"}
        </span>
        <span className="text-[8px] text-white/50">{guidanceAction}</span>
      </div>
    </div>
  );
}
