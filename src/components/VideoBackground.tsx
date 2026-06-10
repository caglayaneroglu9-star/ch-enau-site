"use client";

import React from "react";
import { useBackground } from "@/config/BackgroundContext";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoBackground() {
  const { isVideoBgEnabled, currentVideo, opacity, blur, mounted } = useBackground();

  if (!mounted || !isVideoBgEnabled) return null;

  // Map blur values to Tailwind backdrop-blur or CSS filter values
  const blurClasses = {
    none: "blur-none",
    low: "blur-[3px]",
    medium: "blur-[6px]",
    high: "blur-[12px]",
  };

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentVideo.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: opacity }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          <video
            src={`/video_arka_plan/${currentVideo.filename}`}
            autoPlay
            muted
            loop
            playsInline
            className={`w-full h-full object-cover transition-all duration-700 ${blurClasses[blur]}`}
          />
        </motion.div>
      </AnimatePresence>
      {/* Semi-transparent dark overlay to protect text readability */}
      <div className="absolute inset-0 bg-[#050a15]/75 pointer-events-none" />
    </div>
  );
}
