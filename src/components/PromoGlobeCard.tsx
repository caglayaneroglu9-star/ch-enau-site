"use client";

import React, { useRef, useEffect, useState } from "react";
import { Play } from "lucide-react";
import { useLanguage } from "@/config/LanguageContext";

interface PromoGlobeCardProps {
  onClick: () => void;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Segment3D {
  p1: Point3D;
  p2: Point3D;
}

export default function PromoGlobeCard({ onClick }: PromoGlobeCardProps) {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width;
    let height = canvas.height;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height, 340);
      canvas.width = size * window.devicePixelRatio;
      canvas.height = size * window.devicePixelRatio;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      width = canvas.width;
      height = canvas.height;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener("resize", resize);
    resize();

    // 3D Globe Parameters
    const latLinesCount = 9;  // Density matching high-tech grid look
    const lngLinesCount = 12; // Density matching high-tech grid look

    // Generate static normalized wireframe segments in local sphere space (radius = 1)
    const segments: Segment3D[] = [];

    // 1. Latitude rings
    for (let i = 1; i < latLinesCount; i++) {
      const lat = -Math.PI / 2 + (Math.PI * i) / latLinesCount;
      const r = Math.cos(lat);
      const y = Math.sin(lat);
      
      const ringPointsCount = 50;
      for (let j = 0; j < ringPointsCount; j++) {
        const lng1 = (j * 2 * Math.PI) / ringPointsCount;
        const lng2 = ((j + 1) * 2 * Math.PI) / ringPointsCount;
        
        segments.push({
          p1: { x: r * Math.sin(lng1), y, z: r * Math.cos(lng1) },
          p2: { x: r * Math.sin(lng2), y, z: r * Math.cos(lng2) }
        });
      }
    }

    // 2. Longitude arcs (from South Pole to North Pole)
    for (let i = 0; i < lngLinesCount; i++) {
      const lng = (i * 2 * Math.PI) / lngLinesCount;
      
      const arcPointsCount = 25;
      for (let j = 0; j < arcPointsCount; j++) {
        const lat1 = -Math.PI / 2 + (Math.PI * j) / arcPointsCount;
        const lat2 = -Math.PI / 2 + (Math.PI * (j + 1)) / arcPointsCount;

        segments.push({
          p1: {
            x: Math.cos(lat1) * Math.sin(lng),
            y: Math.sin(lat1),
            z: Math.cos(lat1) * Math.cos(lng)
          },
          p2: {
            x: Math.cos(lat2) * Math.sin(lng),
            y: Math.sin(lat2),
            z: Math.cos(lat2) * Math.cos(lng)
          }
        });
      }
    }

    // Continent lat/lng vertices approximation for high-tech HUD globe look
    interface LatLng {
      lat: number;
      lng: number;
    }

    interface Continent {
      name: string;
      points: LatLng[];
    }

    const continents: Continent[] = [
      {
        name: "Africa",
        points: [
          { lat: 37.3, lng: 9.8 }, // Tunisia
          { lat: 35.8, lng: 14.5 },
          { lat: 31.2, lng: 32.3 }, // Egypt
          { lat: 30.0, lng: 32.5 },
          { lat: 27.2, lng: 33.8 },
          { lat: 22.0, lng: 36.9 },
          { lat: 12.0, lng: 43.5 }, // Bab-el-Mandeb
          { lat: 11.8, lng: 51.2 }, // Horn of Africa
          { lat: 9.5, lng: 50.8 },
          { lat: 2.0, lng: 45.0 },
          { lat: -4.0, lng: 39.5 },
          { lat: -10.5, lng: 40.5 },
          { lat: -12.5, lng: 40.5 },
          { lat: -25.0, lng: 32.8 },
          { lat: -34.0, lng: 25.8 },
          { lat: -34.8, lng: 20.0 }, // Cape of Good Hope
          { lat: -33.9, lng: 18.4 },
          { lat: -22.5, lng: 14.5 },
          { lat: -12.0, lng: 13.5 },
          { lat: -5.8, lng: 12.2 },
          { lat: -1.0, lng: 9.2 },
          { lat: 4.0, lng: 9.0 },
          { lat: 6.3, lng: 2.5 },
          { lat: 5.0, lng: -7.5 },
          { lat: 7.5, lng: -12.5 },
          { lat: 14.8, lng: -17.5 }, // Dakar
          { lat: 21.0, lng: -17.0 },
          { lat: 26.0, lng: -14.5 },
          { lat: 32.0, lng: -9.5 },
          { lat: 35.8, lng: -5.6 }, // Morocco (Strait of Gibraltar)
          { lat: 35.2, lng: -2.0 },
          { lat: 36.8, lng: 3.0 },
          { lat: 36.9, lng: 7.8 }
        ]
      },
      {
        name: "SouthAmerica",
        points: [
          { lat: 12.4, lng: -71.7 }, // Colombia (North)
          { lat: 10.5, lng: -66.8 }, // Venezuela
          { lat: 10.7, lng: -61.5 },
          { lat: 6.0, lng: -58.5 },
          { lat: 5.0, lng: -52.5 },
          { lat: -2.0, lng: -44.0 }, // Brazil
          { lat: -5.5, lng: -35.0 }, // Natal (East tip)
          { lat: -13.0, lng: -38.5 },
          { lat: -23.0, lng: -42.0 }, // Rio de Janeiro
          { lat: -25.0, lng: -48.0 },
          { lat: -34.8, lng: -56.2 }, // Montevideo
          { lat: -38.0, lng: -57.5 },
          { lat: -43.0, lng: -64.0 },
          { lat: -52.5, lng: -68.3 },
          { lat: -55.0, lng: -67.0 }, // Cape Horn
          { lat: -53.5, lng: -73.0 },
          { lat: -47.0, lng: -74.0 },
          { lat: -37.0, lng: -73.5 },
          { lat: -30.0, lng: -71.5 },
          { lat: -18.0, lng: -70.3 }, // Peru
          { lat: -14.0, lng: -76.5 },
          { lat: -8.0, lng: -79.0 },
          { lat: -4.5, lng: -81.2 }, // Point Parinas (West tip)
          { lat: 1.0, lng: -79.0 },
          { lat: 7.2, lng: -77.8 }, // Panama border
          { lat: 9.0, lng: -76.0 }
        ]
      },
      {
        name: "NorthAmerica",
        points: [
          { lat: 70.0, lng: -140.0 }, // Alaska North
          { lat: 70.0, lng: -120.0 },
          { lat: 68.0, lng: -108.0 },
          { lat: 64.0, lng: -90.0 }, // Hudson Bay West
          { lat: 51.0, lng: -80.0 }, // Hudson Bay South
          { lat: 58.0, lng: -78.0 }, // Hudson Bay East
          { lat: 60.0, lng: -65.0 },
          { lat: 55.0, lng: -60.0 }, // Labrador
          { lat: 49.0, lng: -53.0 }, // Newfoundland
          { lat: 45.0, lng: -61.0 }, // Nova Scotia
          { lat: 41.0, lng: -71.0 }, // New York
          { lat: 35.0, lng: -75.5 }, // Cape Hatteras
          { lat: 30.0, lng: -81.0 },
          { lat: 25.0, lng: -80.0 }, // Miami
          { lat: 28.0, lng: -82.5 },
          { lat: 30.0, lng: -90.0 }, // New Orleans
          { lat: 26.0, lng: -97.0 }, // Texas
          { lat: 20.0, lng: -97.0 }, // Mexico
          { lat: 18.0, lng: -90.0 }, // Yucatan
          { lat: 21.0, lng: -87.0 },
          { lat: 15.0, lng: -90.0 },
          { lat: 8.0, lng: -80.0 }, // Panama
          { lat: 10.0, lng: -85.0 },
          { lat: 16.0, lng: -95.0 },
          { lat: 20.0, lng: -105.0 },
          { lat: 23.0, lng: -110.0 }, // Baja California
          { lat: 30.0, lng: -115.0 },
          { lat: 34.0, lng: -120.0 }, // California
          { lat: 45.0, lng: -124.0 }, // Oregon
          { lat: 54.0, lng: -130.0 }, // Canada West
          { lat: 58.0, lng: -137.0 },
          { lat: 60.0, lng: -145.0 }, // Alaska Gulf
          { lat: 55.0, lng: -160.0 },
          { lat: 60.0, lng: -168.0 }, // Bering Strait
          { lat: 65.0, lng: -168.0 }
        ]
      },
      {
        name: "Eurasia",
        points: [
          { lat: 36.0, lng: -5.6 }, // Gibraltar
          { lat: 37.0, lng: -9.0 }, // Portugal
          { lat: 43.0, lng: -9.5 },
          { lat: 43.5, lng: -1.8 }, // Bay of Biscay
          { lat: 48.0, lng: -4.5 }, // Brittany
          { lat: 51.0, lng: 1.5 }, // Calais
          { lat: 53.0, lng: 5.0 }, // Netherlands
          { lat: 54.0, lng: 9.0 },
          { lat: 57.0, lng: 8.0 }, // Denmark
          { lat: 55.0, lng: 12.0 },
          { lat: 54.0, lng: 19.0 }, // Poland
          { lat: 59.0, lng: 25.0 }, // Estonia
          { lat: 60.0, lng: 29.0 }, // St. Petersburg
          { lat: 65.0, lng: 25.0 }, // Finland
          { lat: 69.0, lng: 20.0 }, // Norway North
          { lat: 71.0, lng: 26.0 }, // North Cape
          { lat: 68.0, lng: 15.0 },
          { lat: 62.0, lng: 5.0 }, // Bergen
          { lat: 58.0, lng: 6.0 },
          { lat: 59.0, lng: 10.0 }, // Oslo
          { lat: 56.0, lng: 12.0 }, // Sweden
          { lat: 56.0, lng: 16.0 },
          { lat: 59.0, lng: 18.0 }, // Stockholm
          { lat: 63.0, lng: 20.0 },
          { lat: 68.0, lng: 40.0 }, // Kola Peninsula
          { lat: 67.0, lng: 45.0 }, // Russia
          { lat: 70.0, lng: 60.0 }, // Ural area
          { lat: 73.0, lng: 70.0 }, // Ob Gulf
          { lat: 76.0, lng: 95.0 }, // Siberia Taymyr
          { lat: 72.0, lng: 110.0 },
          { lat: 73.0, lng: 140.0 }, // Lena delta
          { lat: 70.0, lng: 160.0 },
          { lat: 66.0, lng: 170.0 }, // Chukotka (East tip)
          { lat: 60.0, lng: 170.0 },
          { lat: 56.0, lng: 163.0 }, // Kamchatka
          { lat: 51.0, lng: 156.0 },
          { lat: 43.0, lng: 132.0 }, // Vladivostok
          { lat: 40.0, lng: 120.0 }, // Beijing area
          { lat: 35.0, lng: 120.0 }, // Yellow sea
          { lat: 31.0, lng: 122.0 }, // Shanghai
          { lat: 22.0, lng: 114.0 }, // Hong Kong
          { lat: 20.0, lng: 108.0 }, // Hainan
          { lat: 10.0, lng: 104.0 }, // Cambodia
          { lat: 6.0, lng: 100.0 }, // Malaysia
          { lat: 1.3, lng: 103.8 }, // Singapore
          { lat: 8.0, lng: 98.0 }, // Thailand
          { lat: 16.0, lng: 96.0 }, // Myanmar
          { lat: 22.0, lng: 90.0 }, // Bangladesh
          { lat: 16.0, lng: 82.0 }, // India East
          { lat: 8.0, lng: 77.5 }, // Kanyakumari (India South)
          { lat: 13.0, lng: 74.8 }, // India West
          { lat: 19.0, lng: 72.8 }, // Mumbai
          { lat: 25.0, lng: 67.0 }, // Pakistan (Karachi)
          { lat: 25.0, lng: 61.0 },
          { lat: 27.0, lng: 50.0 }, // Persian Gulf
          { lat: 15.0, lng: 48.0 }, // Yemen
          { lat: 12.0, lng: 43.5 }, // Bab-el-Mandeb
          { lat: 20.0, lng: 40.0 }, // Red Sea
          { lat: 28.0, lng: 34.0 }, // Sinai
          { lat: 31.0, lng: 35.0 }, // Suez
          { lat: 31.5, lng: 30.0 }, // Nile delta
          { lat: 32.0, lng: 35.0 }, // Israel / Lebanon
          { lat: 36.0, lng: 36.0 }, // Turkey (Hatay)
          { lat: 36.0, lng: 30.0 }, // Antalya
          { lat: 38.3, lng: 27.2 }, // Izmir / Aegean (HQ IZMIR!)
          { lat: 41.0, lng: 29.0 }, // Istanbul / Bosphorus
          { lat: 41.5, lng: 26.0 }, // Greece
          { lat: 38.0, lng: 23.0 }, // Athens
          { lat: 40.0, lng: 20.0 },
          { lat: 41.0, lng: 14.0 }, // Italy
          { lat: 37.0, lng: 15.0 }, // Sicily
          { lat: 41.0, lng: 12.0 }, // Rome
          { lat: 44.0, lng: 8.0 }, // Genoa
          { lat: 43.5, lng: 4.0 }, // Marseille
          { lat: 41.0, lng: 2.0 }, // Barcelona
          { lat: 37.0, lng: -2.0 } // Malaga
        ]
      },
      {
        name: "Australia",
        points: [
          { lat: -22.0, lng: 114.0 }, // West tip
          { lat: -32.0, lng: 115.5 }, // Perth
          { lat: -35.0, lng: 118.0 },
          { lat: -33.0, lng: 125.0 }, // Great Australian Bight
          { lat: -32.0, lng: 133.0 },
          { lat: -36.0, lng: 138.0 }, // Adelaide
          { lat: -38.0, lng: 141.0 },
          { lat: -39.0, lng: 146.0 }, // Melbourne
          { lat: -37.0, lng: 150.0 },
          { lat: -34.0, lng: 151.0 }, // Sydney
          { lat: -27.0, lng: 153.0 }, // Brisbane
          { lat: -20.0, lng: 148.0 },
          { lat: -15.0, lng: 145.0 }, // Cairns
          { lat: -11.0, lng: 142.0 }, // Cape York (North tip)
          { lat: -13.0, lng: 136.0 }, // Gulf of Carpentaria
          { lat: -12.0, lng: 131.0 }, // Darwin
          { lat: -15.0, lng: 125.0 },
          { lat: -20.0, lng: 119.0 }
        ]
      },
      {
        name: "Greenland",
        points: [
          { lat: 60.0, lng: -44.0 }, // South tip
          { lat: 65.0, lng: -38.0 },
          { lat: 70.0, lng: -22.0 },
          { lat: 75.0, lng: -19.0 },
          { lat: 81.0, lng: -12.0 }, // Northeast tip
          { lat: 83.0, lng: -35.0 }, // North tip
          { lat: 78.0, lng: -70.0 }, // Northwest tip
          { lat: 73.0, lng: -56.0 },
          { lat: 69.0, lng: -54.0 },
          { lat: 64.0, lng: -52.0 }, // Nuuk
          { lat: 60.5, lng: -46.0 }
        ]
      },
      {
        name: "Japan",
        points: [
          { lat: 31.0, lng: 130.5 },
          { lat: 35.0, lng: 135.0 },
          { lat: 40.0, lng: 140.0 },
          { lat: 45.5, lng: 142.0 },
          { lat: 43.0, lng: 145.0 },
          { lat: 38.0, lng: 141.0 },
          { lat: 34.0, lng: 136.0 },
          { lat: 32.0, lng: 132.0 }
        ]
      },
      {
        name: "Madagascar",
        points: [
          { lat: -12.0, lng: 49.0 },
          { lat: -16.0, lng: 49.5 },
          { lat: -25.0, lng: 47.0 },
          { lat: -25.0, lng: 44.0 },
          { lat: -20.0, lng: 44.0 },
          { lat: -15.0, lng: 47.0 }
        ]
      },
      {
        name: "GreatBritain",
        points: [
          { lat: 50.0, lng: -5.5 },
          { lat: 51.0, lng: -1.5 },
          { lat: 56.0, lng: -1.0 },
          { lat: 58.5, lng: -3.0 },
          { lat: 57.5, lng: -6.0 },
          { lat: 55.0, lng: -5.0 },
          { lat: 51.0, lng: -4.5 }
        ]
      }
    ];

    // Ray casting point-in-polygon helper
    const isPointInPolygon = (lat: number, lng: number, polygon: LatLng[]) => {
      let isInside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].lng, yi = polygon[i].lat;
        const xj = polygon[j].lng, yj = polygon[j].lat;
        const intersect = ((yi > lat) !== (yj > lat))
            && (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi);
        if (intersect) isInside = !isInside;
      }
      return isInside;
    };

    // Pre-generate dot points representing high-tech city lights/texture inside the continents
    interface DotPoint {
      lat: number;
      lng: number;
      isHub: boolean;
    }
    const continentDots: { name: string; dots: DotPoint[] }[] = continents.map(cont => {
      const dots: DotPoint[] = [];
      let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
      cont.points.forEach(p => {
        if (p.lat < minLat) minLat = p.lat;
        if (p.lat > maxLat) maxLat = p.lat;
        if (p.lng < minLng) minLng = p.lng;
        if (p.lng > maxLng) maxLng = p.lng;
      });

      // Adaptive grid step depending on continent size to maintain visual balance
      const isLarge = (maxLat - minLat) * (maxLng - minLng) > 1000;
      const step = isLarge ? 4.5 : 3.5;

      let count = 0;
      for (let lat = minLat; lat <= maxLat; lat += step) {
        for (let lng = minLng; lng <= maxLng; lng += step) {
          if (isPointInPolygon(lat, lng, cont.points)) {
            count++;
            dots.push({
              lat: lat + (Math.random() - 0.5) * (step * 0.25),
              lng: lng + (Math.random() - 0.5) * (step * 0.25),
              isHub: count % 9 === 0 // 1 in 9 dots is a larger hub/city light
            });
          }
        }
      }
      return { name: cont.name, dots };
    });

    let rotY = 0;
    const tiltX = 0.38; // Tilt towards viewer (~22 degrees)

    const draw = () => {
      if (!canvas || !ctx) return;

      const scaleFactor = window.devicePixelRatio;
      const renderWidth = width / scaleFactor;
      const renderHeight = height / scaleFactor;
      const center = { x: renderWidth / 2, y: renderHeight / 2 };

      // Dynamic radius to fill container
      const currentRadius = Math.min(renderWidth, renderHeight) / 2 - 22;

      // Clear
      ctx.clearRect(0, 0, renderWidth, renderHeight);

      // 1. Bottom cyan floor/reflection glow (suggests floating/resting on a glowing surface)
      const reflectionGrad = ctx.createRadialGradient(
        center.x, center.y + currentRadius, 2,
        center.x, center.y + currentRadius, currentRadius * 0.9
      );
      reflectionGrad.addColorStop(0, "rgba(0, 229, 255, 0.35)");
      reflectionGrad.addColorStop(0.3, "rgba(0, 229, 255, 0.15)");
      reflectionGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      
      ctx.save();
      ctx.fillStyle = reflectionGrad;
      ctx.beginPath();
      ctx.ellipse(center.x, center.y + currentRadius * 1.05, currentRadius * 0.7, currentRadius * 0.18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Update rotation
      rotY += isHovered ? 0.0065 : 0.0028;

      // 2. Base sphere background body (very dark navy/black core)
      ctx.fillStyle = "#010712";
      ctx.beginPath();
      ctx.arc(center.x, center.y, currentRadius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Spherical 3D shading gradient (soft highlight in the upper center, dark shadow towards edges)
      const sphereShading = ctx.createRadialGradient(
        center.x - currentRadius * 0.15, center.y - currentRadius * 0.15, currentRadius * 0.1,
        center.x, center.y, currentRadius
      );
      sphereShading.addColorStop(0, "rgba(10, 35, 65, 0)");
      sphereShading.addColorStop(0.75, "rgba(2, 8, 18, 0.88)");
      sphereShading.addColorStop(1, "rgba(0, 229, 255, 0.25)"); // Edge rim glow light
      ctx.fillStyle = sphereShading;
      ctx.beginPath();
      ctx.arc(center.x, center.y, currentRadius, 0, Math.PI * 2);
      ctx.fill();

      // 4. Split grid segments into back and front based on projected depth (avgZ)
      const backSegments: { sx1: number; sy1: number; sx2: number; sy2: number }[] = [];
      const frontSegments: { sx1: number; sy1: number; sx2: number; sy2: number }[] = [];

      segments.forEach((seg) => {
        const px1 = seg.p1.x * currentRadius;
        const py1 = seg.p1.y * currentRadius;
        const pz1 = seg.p1.z * currentRadius;

        const px2 = seg.p2.x * currentRadius;
        const py2 = seg.p2.y * currentRadius;
        const pz2 = seg.p2.z * currentRadius;

        // Rotate Y-axis (spin)
        const x1_r = px1 * Math.cos(rotY) - pz1 * Math.sin(rotY);
        const z1_r = px1 * Math.sin(rotY) + pz1 * Math.cos(rotY);
        // Rotate X-axis (tilt)
        const x1_t = x1_r;
        const y1_t = py1 * Math.cos(tiltX) - z1_r * Math.sin(tiltX);
        const z1_t = py1 * Math.sin(tiltX) + z1_r * Math.cos(tiltX);

        // Rotate P2
        const x2_r = px2 * Math.cos(rotY) - pz2 * Math.sin(rotY);
        const z2_r = px2 * Math.sin(rotY) + pz2 * Math.cos(rotY);
        const x2_t = x2_r;
        const y2_t = py2 * Math.cos(tiltX) - z2_r * Math.sin(tiltX);
        const z2_t = py2 * Math.sin(tiltX) + z2_r * Math.cos(tiltX);

        // Orthographic projection with slight depth scaling
        const fov = 400;
        const scale1 = fov / (fov + z1_t);
        const scale2 = fov / (fov + z2_t);

        const sx1 = center.x + x1_t * scale1;
        const sy1 = center.y + y1_t * scale1;
        const sx2 = center.x + x2_t * scale2;
        const sy2 = center.y + y2_t * scale2;

        const avgZ = (z1_t + z2_t) / 2;

        if (avgZ > 10) {
          backSegments.push({ sx1, sy1, sx2, sy2 });
        } else {
          frontSegments.push({ sx1, sy1, sx2, sy2 });
        }
      });

      // 5. Draw Back Grid Lines (subtle and transparent)
      ctx.beginPath();
      backSegments.forEach((s) => {
        ctx.moveTo(s.sx1, s.sy1);
        ctx.lineTo(s.sx2, s.sy2);
      });
      ctx.strokeStyle = "rgba(0, 229, 255, 0.08)";
      ctx.lineWidth = 0.65;
      ctx.stroke();

      // 6. Draw Continents (Only Front-facing continents are drawn to match high contrast HUD style)
      continents.forEach((cont) => {
        const projectedPts = cont.points.map((pt) => {
          const latRad = (pt.lat * Math.PI) / 180;
          const lngRad = (pt.lng * Math.PI) / 180;
          
          const x = currentRadius * Math.cos(latRad) * Math.sin(lngRad);
          const y = currentRadius * Math.sin(latRad);
          const z = currentRadius * Math.cos(latRad) * Math.cos(lngRad);

          // Rotate Y-axis
          const x_r = x * Math.cos(rotY) - z * Math.sin(rotY);
          const z_r = x * Math.sin(rotY) + z * Math.cos(rotY);
          
          // Rotate X-axis (tilt)
          const x_t = x_r;
          const y_t = y * Math.cos(tiltX) - z_r * Math.sin(tiltX);
          const z_t = y * Math.sin(tiltX) + z_r * Math.cos(tiltX);

          // Project
          const fov = 400;
          const scale = fov / (fov + z_t);
          const sx = center.x + x_t * scale;
          const sy = center.y + y_t * scale;

          return { sx, sy, z_t };
        });

        const avgZ = projectedPts.reduce((acc, pt) => acc + pt.z_t, 0) / projectedPts.length;

        // Render only if on the front hemisphere to avoid clutter
        if (avgZ <= 10) {
          ctx.beginPath();
          projectedPts.forEach((pt, idx) => {
            if (idx === 0) ctx.moveTo(pt.sx, pt.sy);
            else ctx.lineTo(pt.sx, pt.sy);
          });
          ctx.closePath();

          // Continent fill (subtle tech overlay)
          ctx.fillStyle = "rgba(0, 102, 204, 0.04)";
          ctx.fill();

          // Glowing border effect
          // Layer 1: thick blurred stroke
          ctx.strokeStyle = "rgba(0, 229, 255, 0.22)";
          ctx.lineWidth = 3.0;
          ctx.stroke();
          
          // Layer 2: thin sharp core stroke
          ctx.strokeStyle = "rgba(180, 255, 255, 0.85)";
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
      });

      // 7. Draw Front Grid Lines (glowing cyan mesh)
      // Layer 1: thick blurred stroke
      ctx.beginPath();
      frontSegments.forEach((s) => {
        ctx.moveTo(s.sx1, s.sy1);
        ctx.lineTo(s.sx2, s.sy2);
      });
      ctx.strokeStyle = "rgba(0, 229, 255, 0.15)";
      ctx.lineWidth = 2.4;
      ctx.stroke();

      // Layer 2: thin sharp core stroke
      ctx.beginPath();
      frontSegments.forEach((s) => {
        ctx.moveTo(s.sx1, s.sy1);
        ctx.lineTo(s.sx2, s.sy2);
      });
      ctx.strokeStyle = "rgba(0, 255, 255, 0.7)";
      ctx.lineWidth = 0.85;
      ctx.stroke();

      // 8. Draw Continent Dot Grid (realistic city lights / dynamic cyan-to-orange transition)
      continentDots.forEach(contDotGroup => {
        contDotGroup.dots.forEach(pt => {
          const latRad = (pt.lat * Math.PI) / 180;
          const lngRad = (pt.lng * Math.PI) / 180;
          
          const x = currentRadius * Math.cos(latRad) * Math.sin(lngRad);
          const y = currentRadius * Math.sin(latRad);
          const z = currentRadius * Math.cos(latRad) * Math.cos(lngRad);

          // Rotate Y-axis
          const x_r = x * Math.cos(rotY) - z * Math.sin(rotY);
          const z_r = x * Math.sin(rotY) + z * Math.cos(rotY);
          
          // Rotate X-axis (tilt)
          const x_t = x_r;
          const y_t = y * Math.cos(tiltX) - z_r * Math.sin(tiltX);
          const z_t = y * Math.sin(tiltX) + z_r * Math.cos(tiltX);

          // Render only on the front side
          if (z_t <= 0) {
            // Project
            const fov = 400;
            const scale = fov / (fov + z_t);
            const sx = center.x + x_t * scale;
            const sy = center.y + y_t * scale;

            // Interpolate color from cyan (left side) to orange (right side / shadowed side)
            // Left is negative x_r, right is positive x_r
            const transitionStart = -currentRadius * 0.15;
            const transitionEnd = currentRadius * 0.45;
            let ratio = (x_r - transitionStart) / (transitionEnd - transitionStart);
            ratio = Math.max(0, Math.min(1, ratio)); // clamp to [0, 1]

            // Interpolate colors:
            // Left (cyan): rgba(0, 229, 255)
            // Right (orange/gold): rgba(255, 140, 10)
            const r = Math.round(0 * (1 - ratio) + 255 * ratio);
            const g = Math.round(229 * (1 - ratio) + 140 * ratio);
            const b = Math.round(255 * (1 - ratio) + 10 * ratio);

            const dotOpacity = 0.5 * (1 - ratio) + 0.85 * ratio;
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${dotOpacity})`;

            const dotSize = pt.isHub ? 1.7 : 1.05;

            ctx.beginPath();
            ctx.arc(sx, sy, dotSize, 0, Math.PI * 2);
            ctx.fill();

            // Hub glow
            if (pt.isHub && ratio > 0.4) {
              ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.25)`;
              ctx.beginPath();
              ctx.arc(sx, sy, dotSize * 2.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        });
      });

      // 9. Spherical overlay mask shadow to give perfect spherical 3D shading
      const shadowGrad = ctx.createRadialGradient(
        center.x - currentRadius * 0.35, center.y - currentRadius * 0.35, currentRadius * 0.3,
        center.x, center.y, currentRadius
      );
      shadowGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
      shadowGrad.addColorStop(0.7, "rgba(0, 0, 0, 0.25)");
      shadowGrad.addColorStop(1, "rgba(0, 0, 0, 0.72)");
      
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.arc(center.x, center.y, currentRadius, 0, Math.PI * 2);
      ctx.fill();

      // 10. Glowing atmosphere outer ring using canvas shadow properties (Fresnel/Atmospheric outline)
      ctx.save();
      ctx.shadowColor = "rgba(0, 229, 255, 0.75)";
      ctx.shadowBlur = 18;
      ctx.strokeStyle = "rgba(0, 229, 255, 0.35)";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(center.x, center.y, currentRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Animation frame request
      animationFrameId = requestAnimationFrame(draw);
    };

    // Start loop
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-2xl aspect-[2/1.1] rounded-3xl overflow-hidden border border-neon-cyan/35 bg-[#030d1a]/80 p-5 md:p-6 flex flex-col justify-between cursor-pointer group transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.05)] hover:shadow-[0_0_30px_rgba(0,229,255,0.18)] hover:border-neon-cyan/70 select-none select-none"
    >
      {/* Corner brackets/HUD lines for futuristic feel */}
      <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-neon-cyan/40 rounded-tl group-hover:border-neon-cyan/80 transition-colors" />
      <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-neon-cyan/40 rounded-tr group-hover:border-neon-cyan/80 transition-colors" />
      <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-neon-cyan/40 rounded-bl group-hover:border-neon-cyan/80 transition-colors" />
      <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-neon-cyan/40 rounded-br group-hover:border-neon-cyan/80 transition-colors" />

      {/* Top HUD Row */}
      <div className="flex items-center justify-between z-10 w-full">
        {/* HQ Status */}
        <div className="flex items-center gap-2 font-mono text-[9px] md:text-[11px] text-neon-cyan/90 tracking-widest font-semibold uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-ping shrink-0" />
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan absolute shrink-0" />
          <span>HQ IZMIR: ACTIVE</span>
        </div>
        
        {/* System Cycle Spec */}
        <div className="font-mono text-[9px] md:text-[11px] text-neon-cyan/70 tracking-widest font-semibold uppercase">
          SYS_CYCLE: 250μs
        </div>
      </div>

      {/* Canvas Wrapper - absolutely positioned so it doesn't push the HUD elements */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <canvas ref={canvasRef} className="opacity-90" />
      </div>

      {/* Bottom HUD Row */}
      <div className="flex items-end justify-between z-10 w-full font-mono text-[9px] md:text-[11px]">
        {/* System status messages */}
        <div className="flex flex-col gap-0.5 text-emerald-400 font-semibold text-left">
          <span>[HQ] Izmir: Standby engineer READY</span>
          <span className="text-emerald-400/90">[SYS] VPN links: SECURE</span>
        </div>

        {/* CTA and info */}
        <div className="flex items-center gap-3 text-right">
          <div className="flex flex-col items-end">
            <span className="font-sans font-black text-sm md:text-base text-neon-cyan tracking-wide uppercase">
              PROMO DEMO
            </span>
            <span className="text-steel-gray font-normal text-[8px] md:text-[9px] tracking-wide mt-0.5">
              {t("home.hero.promoHoverWatch") || "Click or hover 5s to watch"}
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#030d1a]/95 border border-neon-cyan/40 group-hover:border-neon-cyan text-neon-cyan flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.25)] group-hover:shadow-[0_0_25px_rgba(0,229,255,0.45)] group-hover:scale-105 transition-all duration-300 shrink-0">
            <Play className="w-4 h-4 fill-neon-cyan text-neon-cyan translate-x-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
