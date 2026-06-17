"use client";

import React, { useState, useRef, useEffect } from "react";
import { useBackground, BACKGROUND_VIDEOS, BlurLevel } from "@/config/BackgroundContext";
import { useLanguage } from "@/config/LanguageContext";
import { Sliders, Video, VideoOff, Settings, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoBackgroundControls() {
  const {
    isVideoBgEnabled,
    setIsVideoBgEnabled,
    currentVideo,
    setCurrentVideo,
    opacity,
    setOpacity,
    blur,
    setBlur,
    mounted,
  } = useBackground();

  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Localized texts
  const t = {
    en: {
      title: "SYSTEM BG CONTROLS",
      videoBg: "Video Background",
      videoSelect: "Select Theme",
      opacity: "Brightness / Opacity",
      blur: "Atmospheric Blur",
      blurNone: "None",
      blurLow: "Low",
      blurMed: "Med",
      blurHigh: "High",
      stateActive: "HQ_BG: STABLE",
      stateDisabled: "HQ_BG: OFFLINE",
    },
    tr: {
      title: "SİSTEM ARKA PLAN AYARLARI",
      videoBg: "Video Arka Planı",
      videoSelect: "Tema Seçin",
      opacity: "Parlaklık / Opaklık",
      blur: "Atmosferik Bulanıklık",
      blurNone: "Yok",
      blurLow: "Düşük",
      blurMed: "Orta",
      blurHigh: "Yüksek",
      stateActive: "HQ_BG: AKTİF",
      stateDisabled: "HQ_BG: KAPALI",
    },
    de: {
      title: "SYSTEM HINTERGRUND",
      videoBg: "Video-Hintergrund",
      videoSelect: "Thema Wählen",
      opacity: "Helligkeit / Deckkraft",
      blur: "Atmosphärischer Weichzeichner",
      blurNone: "Keine",
      blurLow: "Niedrig",
      blurMed: "Mittel",
      blurHigh: "Hoch",
      stateActive: "HQ_BG: BEGRENZT",
      stateDisabled: "HQ_BG: OFFLINE",
    }
  }[language as "en" | "tr" | "de"] || {
    title: "SYSTEM BG CONTROLS",
    videoBg: "Video Background",
    videoSelect: "Select Theme",
    opacity: "Brightness / Opacity",
    blur: "Atmospheric Blur",
    blurNone: "None",
    blurLow: "Low",
    blurMed: "Med",
    blurHigh: "High",
    stateActive: "HQ_BG: STABLE",
    stateDisabled: "HQ_BG: OFFLINE",
  };

  // Close when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  console.log("VideoBackgroundControls rendering, mounted state:", mounted);
  if (!mounted) return null;

  const opacityPresets = [0.05, 0.12, 0.20, 0.30];
  const blurPresets: BlurLevel[] = ["none", "low", "medium", "high"];

  return (
    <div className="fixed bottom-6 left-6 sm:left-20 z-50 font-sans" ref={panelRef}>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.4)] cursor-pointer group ${
          isOpen
            ? "bg-industrial-blue border-neon-cyan text-white shadow-[0_0_20px_rgba(0,229,255,0.45)] scale-105"
            : "bg-[#030d1a]/95 border-neon-cyan/40 hover:border-neon-cyan text-neon-cyan hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:scale-105"
        }`}
        aria-label="System Settings"
      >
        <Settings className={`w-5 h-5 transition-transform duration-500 ${isOpen ? "rotate-90 text-white" : "group-hover:rotate-45"}`} />
      </button>

      {/* Control Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 left-0 w-[310px] sm:w-[360px] rounded-2xl border border-neon-cyan/35 bg-[#030d1a]/95 backdrop-blur-xl shadow-[0_10px_45px_rgba(0,229,255,0.15)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#050a15]/75">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-neon-cyan" />
                <span className="font-mono text-xs font-bold tracking-wider text-white">
                  [ {t.title} ]
                </span>
              </div>
              <div className={`font-mono text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full border border-white/5 ${
                isVideoBgEnabled ? "text-emerald-400 bg-emerald-500/10" : "text-steel-gray bg-white/5"
              }`}>
                {isVideoBgEnabled ? t.stateActive : t.stateDisabled}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 flex flex-col gap-4 overflow-y-auto max-h-[380px]">
              {/* Toggle Enable */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-white flex items-center gap-1.5">
                    {isVideoBgEnabled ? <Video className="w-4 h-4 text-neon-cyan" /> : <VideoOff className="w-4 h-4 text-steel-gray" />}
                    {t.videoBg}
                  </span>
                </div>
                <button
                  onClick={() => setIsVideoBgEnabled(!isVideoBgEnabled)}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${
                    isVideoBgEnabled ? "bg-industrial-blue" : "bg-white/10"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                      isVideoBgEnabled ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {isVideoBgEnabled && (
                <>
                  {/* Select Theme Video */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono font-bold text-steel-gray uppercase tracking-wider">
                      {t.videoSelect}
                    </span>
                    <div className="flex flex-col gap-1.5 max-h-[160px] overflow-y-auto pr-1">
                      {BACKGROUND_VIDEOS.map((video) => {
                        const isSelected = currentVideo.id === video.id;
                        const localName =
                          language === "tr"
                            ? video.nameTr
                            : language === "de"
                            ? video.nameDe
                            : video.nameEn;

                        return (
                          <button
                            key={video.id}
                            onClick={() => setCurrentVideo(video)}
                            className={`w-full text-left p-2 rounded-lg border text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                              isSelected
                                ? "bg-neon-cyan/10 border-neon-cyan text-white"
                                : "bg-white/5 border-white/5 text-steel-gray hover:text-white hover:border-white/10"
                            }`}
                          >
                            <span className="truncate pr-2">{localName}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-neon-cyan shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Opacity Presets */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                    <span className="text-xs font-mono font-bold text-steel-gray uppercase tracking-wider flex justify-between">
                      <span>{t.opacity}</span>
                      <span className="text-neon-cyan">{Math.round(opacity * 100)}%</span>
                    </span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {opacityPresets.map((preset) => (
                        <button
                          key={preset}
                          onClick={() => setOpacity(preset)}
                          className={`py-1.5 rounded-lg border text-xs font-mono font-bold transition-all cursor-pointer ${
                            opacity === preset
                              ? "bg-neon-cyan/10 border-neon-cyan text-white"
                              : "bg-white/5 border-white/5 text-steel-gray hover:text-white hover:border-white/10"
                          }`}
                        >
                          {preset * 100}%
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Blur Presets */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                    <span className="text-xs font-mono font-bold text-steel-gray uppercase tracking-wider flex justify-between">
                      <span>{t.blur}</span>
                      <span className="text-neon-cyan uppercase">{blur}</span>
                    </span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {blurPresets.map((preset) => {
                        const label =
                          preset === "none"
                            ? t.blurNone
                            : preset === "low"
                            ? t.blurLow
                            : preset === "medium"
                            ? t.blurMed
                            : t.blurHigh;
                        return (
                          <button
                            key={preset}
                            onClick={() => setBlur(preset)}
                            className={`py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                              blur === preset
                                ? "bg-neon-cyan/10 border-neon-cyan text-white"
                                : "bg-white/5 border-white/5 text-steel-gray hover:text-white hover:border-white/10"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
