"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, X } from "lucide-react";

const CLIPS = [
  { src: "/video_arka_plan/159021-818026286_medium.mp4",        label: "Engineering Excellence" },
  { src: "/video_arka_plan/172156-846731269_medium.mp4",        label: "Advanced Automation" },
  { src: "/video_arka_plan/215500_medium.mp4",                  label: "Smart Technologies" },
  { src: "/video_arka_plan/345357_medium.mp4",                  label: "Reliable Systems" },
  { src: "/video_arka_plan/4763-179741146_medium.mp4",          label: "Future Driven" },
  { src: "/video_arka_plan/CH enerji transformer kartal.mp4",   label: "CH Energy & Automation", isClimax: true },
];

const CLIP_DURATION = 8000;

interface Props {
  /** Dışarıdan kontrol: true ise modal açılır */
  isOpen: boolean;
  /** Kapatma callback'i */
  onClose: () => void;
}

export default function PromoVideoModal({ isOpen, onClose }: Props) {
  const [current,     setCurrent]     = useState(0);
  const [isPlaying,   setIsPlaying]   = useState(true);
  const [isMuted,     setIsMuted]     = useState(true);
  const [showControls,setShowControls]= useState(true);
  const [progress,    setProgress]    = useState(0);
  const [showFinal,   setShowFinal]   = useState(false);

  const videoRefs      = useRef<(HTMLVideoElement | null)[]>([]);
  const timerRef       = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progRef        = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef       = useRef<number>(0);
  const controlHideRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── helpers ───────────────────────────────────────────────────────────────
  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progRef.current)  clearInterval(progRef.current);
  }, []);

  const startProgress = useCallback((dur: number) => {
    clearTimers();
    startRef.current = Date.now();
    setProgress(0);
    progRef.current = setInterval(() => {
      setProgress(Math.min(((Date.now() - startRef.current) / dur) * 100, 100));
    }, 80);
  }, [clearTimers]);

  const playClip = useCallback((idx: number) => {
    if (idx >= CLIPS.length) {
      setShowFinal(true);
      setIsPlaying(false);
      clearTimers();
      return;
    }
    setCurrent(idx);
    setShowFinal(false);
    const dur = CLIPS[idx].isClimax ? 14000 : CLIP_DURATION;
    startProgress(dur);
    timerRef.current = setTimeout(() => playClip(idx + 1), dur);
  }, [clearTimers, startProgress]);

  // ── reset & start when opened ─────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    setCurrent(0);
    setShowFinal(false);
    setIsPlaying(true);
    setProgress(0);
    playClip(0);
    return () => clearTimers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // ── restart (replay button) ───────────────────────────────────────────────
  const restart = useCallback(() => {
    clearTimers();
    setCurrent(0);
    setShowFinal(false);
    setIsPlaying(true);
    setProgress(0);
    playClip(0);
  }, [clearTimers, playClip]);

  // ── sync video elements ───────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === current) {
        v.currentTime = 0;
        v.muted       = isMuted;
        v.loop        = !CLIPS[i].isClimax;
        if (isPlaying) v.play().catch(() => {});
        else           v.pause();
      } else {
        v.pause();
      }
    });
  }, [current, isOpen, isPlaying, isMuted]);

  useEffect(() => {
    videoRefs.current.forEach(v => { if (v) v.muted = isMuted; });
  }, [isMuted]);

  // ── controls auto-hide ────────────────────────────────────────────────────
  const revealControls = () => {
    setShowControls(true);
    if (controlHideRef.current) clearTimeout(controlHideRef.current);
    controlHideRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  // ── play / pause toggle ───────────────────────────────────────────────────
  const togglePlay = () => {
    const v = videoRefs.current[current];
    if (isPlaying) {
      v?.pause();
      clearTimers();
    } else {
      v?.play().catch(() => {});
      const dur       = CLIPS[current].isClimax ? 14000 : CLIP_DURATION;
      const remaining = dur - (progress / 100) * dur;
      startRef.current = Date.now() - (progress / 100) * dur;
      progRef.current  = setInterval(() => {
        setProgress(Math.min(((Date.now() - startRef.current) / dur) * 100, 100));
      }, 80);
      timerRef.current = setTimeout(() => playClip(current + 1), remaining);
    }
    setIsPlaying(p => !p);
  };

  // ── close ────────────────────────────────────────────────────────────────
  const closeModal = () => {
    clearTimers();
    videoRefs.current.forEach(v => v?.pause());
    setShowFinal(false);
    setCurrent(0);
    setProgress(0);
    setIsPlaying(true);
    onClose();
  };

  // ── keyboard ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") closeModal();
      if (e.key === " ")      { e.preventDefault(); togglePlay(); }
      if (e.key === "m" || e.key === "M") setIsMuted(m => !m);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isPlaying, current, progress]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="promo-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-[999] bg-black"
          onMouseMove={revealControls}
        >
          {/* ── VIDEO CLIPS ── */}
          {CLIPS.map((clip, i) => (
            <video
              key={clip.src}
              ref={el => { videoRefs.current[i] = el; }}
              src={clip.src}
              muted={isMuted}
              playsInline
              loop={!clip.isClimax}
              preload="metadata"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1400ms] ${
                i === current && !showFinal ? "opacity-100" : "opacity-0"
              }`}
              style={{ filter: "saturate(1.12) contrast(1.06) brightness(0.78)" }}
            />
          ))}

          {/* ── OVERLAY LAYERS ── */}
          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none z-10"
            style={{ background: "radial-gradient(ellipse at center,transparent 38%,rgba(0,0,0,.7) 100%)" }} />
          {/* Grade */}
          <div className="absolute inset-0 pointer-events-none z-10"
            style={{ background: "linear-gradient(135deg,rgba(0,180,200,.05) 0%,transparent 60%,rgba(255,140,0,.03) 100%)" }} />
          {/* Film grain */}
          <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.035]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
          {/* Scan lines */}
          <div className="absolute inset-0 pointer-events-none z-10"
            style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.05) 2px,rgba(0,0,0,.05) 4px)" }} />

          {/* ── HUD CORNERS ── */}
          {(["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"] as const).map((pos, i) => (
            <svg key={i} viewBox="0 0 60 60" fill="none"
              className={`absolute ${pos} w-12 h-12 z-20 opacity-45 pointer-events-none`}>
              {i === 0 && <><path d="M2 30 L2 2 L30 2" stroke="rgba(0,200,230,.7)" strokeWidth="1.5"/><circle cx="2" cy="2" r="2" fill="rgba(0,200,230,.7)"/></>}
              {i === 1 && <><path d="M58 30 L58 2 L30 2" stroke="rgba(0,200,230,.7)" strokeWidth="1.5"/><circle cx="58" cy="2" r="2" fill="rgba(0,200,230,.7)"/></>}
              {i === 2 && <><path d="M2 30 L2 58 L30 58" stroke="rgba(0,200,230,.7)" strokeWidth="1.5"/><circle cx="2" cy="58" r="2" fill="rgba(0,200,230,.7)"/></>}
              {i === 3 && <><path d="M58 30 L58 58 L30 58" stroke="rgba(0,200,230,.7)" strokeWidth="1.5"/><circle cx="58" cy="58" r="2" fill="rgba(0,200,230,.7)"/></>}
            </svg>
          ))}

          {/* ── CLIP LABEL ── */}
          <AnimatePresence mode="wait">
            {!showFinal && (
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.7 }}
                className="absolute top-6 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none"
              >
                <div className="text-[10px] tracking-[0.55em] uppercase font-bold"
                  style={{ color: "rgba(0,220,255,.65)", fontFamily: "var(--font-sans)" }}>
                  {CLIPS[current].label}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── CHAPTER DOTS ── */}
          {!showFinal && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
              {CLIPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { clearTimers(); setCurrent(i); setShowFinal(false); playClip(i); setIsPlaying(true); }}
                  className={`h-[3px] rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-neon-cyan shadow-[0_0_8px_rgba(0,229,255,.8)]"
                      : "w-5 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}

          {/* ── PROGRESS BAR ── */}
          {!showFinal && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px] z-30 bg-white/[0.07]">
              <div
                className="h-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg,#00a8c8,#00dce8,#00a8c8)",
                  boxShadow: "0 0 10px rgba(0,200,230,.9)",
                  transition: "none",
                }}
              />
            </div>
          )}

          {/* ── PLAYBACK CONTROLS ── */}
          <AnimatePresence>
            {showControls && !showFinal && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3"
              >
                <button onClick={togglePlay}
                  className="w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:border-neon-cyan/60 hover:bg-neon-cyan/10 transition-all">
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <button onClick={() => setIsMuted(m => !m)}
                  className="w-10 h-10 rounded-full border border-white/15 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:border-neon-cyan/50 transition-all">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── CLOSE BUTTON ── */}
          <AnimatePresence>
            {showControls && (
              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={closeModal}
                className="absolute top-5 right-5 z-40 w-10 h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:border-white/50 hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* ── FINAL FRAME ── */}
          <AnimatePresence>
            {showFinal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.2, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center text-center px-6"
              >
                {/* glow orb */}
                <div className="absolute w-72 h-72 rounded-full pointer-events-none" style={{
                  background: "radial-gradient(ellipse at center,rgba(0,180,230,.12) 0%,transparent 70%)",
                  boxShadow: "0 0 90px rgba(0,200,255,.16),0 0 180px rgba(0,160,220,.08)",
                }} />

                {/* top line */}
                <motion.div initial={{ width: 0 }} animate={{ width: "min(60vw,480px)" }}
                  transition={{ duration: 1.8, delay: 0.8 }}
                  className="h-px mb-10"
                  style={{ background: "linear-gradient(90deg,transparent,rgba(0,220,255,.9),transparent)", boxShadow: "0 0 8px rgba(0,200,255,.8)" }} />

                {/* CH mark */}
                <div className="text-6xl sm:text-8xl font-black mb-1" style={{
                  fontFamily: "var(--font-sans,sans-serif)",
                  background: "linear-gradient(180deg,#e8f4ff 0%,#a8d8ff 40%,#60b8f0 70%,#c8e8ff 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 28px rgba(0,180,255,.5))",
                }}>CH</div>
                <div className="text-xs tracking-[0.7em] uppercase mb-8"
                  style={{ color: "rgba(0,200,240,.5)", fontFamily: "var(--font-sans)" }}>
                  Energy &amp; Automation
                </div>

                {/* company */}
                <div className="text-2xl sm:text-4xl font-extrabold tracking-widest uppercase mb-2" style={{
                  fontFamily: "var(--font-sans,sans-serif)",
                  background: "linear-gradient(180deg,#fff 0%,#b8e4ff 50%,#78c8f0 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 22px rgba(0,180,255,.35))",
                }}>
                  CH Energy &amp; Automation
                </div>

                {/* divider */}
                <motion.div initial={{ width: 0 }} animate={{ width: "min(50vw,400px)" }}
                  transition={{ duration: 1.6, delay: 1.2 }}
                  className="h-px my-4"
                  style={{ background: "linear-gradient(90deg,transparent,rgba(0,200,230,.7),transparent)", boxShadow: "0 0 6px rgba(0,200,230,.5)" }} />

                <div className="text-xs tracking-[0.65em] uppercase mb-1"
                  style={{ color: "rgba(0,210,240,.6)", fontFamily: "var(--font-sans)" }}>
                  Engineering the Future
                </div>
                <div className="text-[10px] tracking-[0.4em]"
                  style={{ color: "rgba(180,220,255,.28)", fontFamily: "monospace" }}>
                  INDUSTRY 4.0 · SMART AUTOMATION · ENGINEERING EXCELLENCE
                </div>

                {/* bottom line */}
                <motion.div initial={{ width: 0 }} animate={{ width: "min(60vw,480px)" }}
                  transition={{ duration: 1.8, delay: 1 }}
                  className="h-px mt-10"
                  style={{ background: "linear-gradient(90deg,transparent,rgba(0,220,255,.9),transparent)", boxShadow: "0 0 8px rgba(0,200,255,.8)" }} />

                {/* replay */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5 }}
                  onClick={restart}
                  className="mt-10 px-6 py-2.5 rounded-full border border-neon-cyan/30 text-neon-cyan/70 text-xs tracking-[0.3em] uppercase hover:border-neon-cyan hover:text-neon-cyan transition-all"
                >
                  Yeniden Oynat
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
