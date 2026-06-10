"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface VideoInfo {
  id: string;
  filename: string;
  nameEn: string;
  nameTr: string;
  nameDe: string;
}

export const BACKGROUND_VIDEOS: VideoInfo[] = [
  {
    id: "network",
    filename: "159021-818026286_medium.mp4",
    nameEn: "Digital Connection Network",
    nameTr: "Dijital Bağlantı Ağı",
    nameDe: "Digitales Verbindungsnetzwerk"
  },
  {
    id: "hud",
    filename: "171185-844787983_medium.mp4",
    nameEn: "Cybernetic HUD Interface",
    nameTr: "Sibernetik HUD Arayüzü",
    nameDe: "Kybernetische HUD-Schnittstelle"
  },
  {
    id: "circuit",
    filename: "172156-846731269_medium.mp4",
    nameEn: "Quantum Circuit Integration",
    nameTr: "Kuantum Devre Entegrasyonu",
    nameDe: "Quantenkreisintegration"
  },
  {
    id: "data-sphere",
    filename: "210424_medium.mp4",
    nameEn: "Futuristic Core Sphere",
    nameTr: "Fütüristik Çekirdek Küre",
    nameDe: "Futuristische Kernsphäre"
  },
  {
    id: "industrial",
    filename: "215500_medium.mp4",
    nameEn: "High-Speed Automated Assembly",
    nameTr: "Yüksek Hızlı Otomatik Montaj",
    nameDe: "Automatische High-Speed-Montage"
  },
  {
    id: "robot-arm",
    filename: "345357_medium.mp4",
    nameEn: "Precision Robotic Control",
    nameTr: "Hassas Robotik Kontrol",
    nameDe: "Präzisions-Robotiksteuerung"
  },
  {
    id: "matrix-flow",
    filename: "4763-179741146_medium.mp4",
    nameEn: "Energy Stream Matrix",
    nameTr: "Enerji Akışı Matrisi",
    nameDe: "Energiestrom-Matrix"
  }
];

export type BlurLevel = "none" | "low" | "medium" | "high";

interface BackgroundContextProps {
  isVideoBgEnabled: boolean;
  setIsVideoBgEnabled: (val: boolean) => void;
  currentVideo: VideoInfo;
  setCurrentVideo: (video: VideoInfo) => void;
  opacity: number;
  setOpacity: (val: number) => void;
  blur: BlurLevel;
  setBlur: (val: BlurLevel) => void;
  mounted: boolean;
}

const BackgroundContext = createContext<BackgroundContextProps | undefined>(undefined);

export function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const [isVideoBgEnabled, setIsVideoBgEnabled] = useState(true);
  const [currentVideo, setCurrentVideo] = useState<VideoInfo>(BACKGROUND_VIDEOS[0]);
  const [opacity, setOpacity] = useState(0.12);
  const [blur, setBlur] = useState<BlurLevel>("low");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log("BackgroundProvider: useEffect running");
    try {
      // Load config from localStorage
      if (typeof window !== "undefined" && window.localStorage) {
        const savedEnabled = localStorage.getItem("bg_video_enabled");
        if (savedEnabled !== null) {
          setIsVideoBgEnabled(savedEnabled === "true");
        }

        const savedVideoId = localStorage.getItem("bg_video_id");
        if (savedVideoId) {
          const found = BACKGROUND_VIDEOS.find((v) => v.id === savedVideoId);
          if (found) setCurrentVideo(found);
        }

        const savedOpacity = localStorage.getItem("bg_video_opacity");
        if (savedOpacity !== null) {
          const parsed = parseFloat(savedOpacity);
          if (!isNaN(parsed)) setOpacity(parsed);
        }

        const savedBlur = localStorage.getItem("bg_video_blur") as BlurLevel;
        if (savedBlur && ["none", "low", "medium", "high"].includes(savedBlur)) {
          setBlur(savedBlur);
        }
      }
    } catch (e) {
      console.warn("Could not load background preferences from localStorage:", e);
    } finally {
      console.log("BackgroundProvider: setMounted(true)");
      setMounted(true);
    }
  }, []);

  const changeVideoBgEnabled = (val: boolean) => {
    setIsVideoBgEnabled(val);
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("bg_video_enabled", String(val));
      }
    } catch (e) {
      console.warn("Could not save preference:", e);
    }
  };

  const changeCurrentVideo = (video: VideoInfo) => {
    setCurrentVideo(video);
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("bg_video_id", video.id);
      }
    } catch (e) {
      console.warn("Could not save preference:", e);
    }
  };

  const changeOpacity = (val: number) => {
    setOpacity(val);
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("bg_video_opacity", String(val));
      }
    } catch (e) {
      console.warn("Could not save preference:", e);
    }
  };

  const changeBlur = (val: BlurLevel) => {
    setBlur(val);
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("bg_video_blur", val);
      }
    } catch (e) {
      console.warn("Could not save preference:", e);
    }
  };

  return (
    <BackgroundContext.Provider
      value={{
        isVideoBgEnabled,
        setIsVideoBgEnabled: changeVideoBgEnabled,
        currentVideo,
        setCurrentVideo: changeCurrentVideo,
        opacity,
        setOpacity: changeOpacity,
        blur,
        setBlur: changeBlur,
        mounted
      }}
    >
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return context;
}
