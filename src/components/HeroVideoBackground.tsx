"use client";

import React, { useRef, useEffect } from "react";

export default function HeroVideoBackground() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const mountedRef = useRef(false); // ilk render'da tetikleme

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!mountedRef.current) {
          // İlk kez görünür oldu — sayfalama sayılmaz, sadece işaretle
          if (entry.isIntersecting) mountedRef.current = true;
          return;
        }
        // Sonraki her geri dönüşte restart
        if (entry.isIntersecting) {
          iframe.contentWindow?.postMessage("restart", "*");
        }
      },
      { threshold: 0.25 } // %25'i görününce tetikle
    );

    observer.observe(iframe);
    return () => observer.disconnect();
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src="/promo_embed.html"
      className="absolute inset-0 w-full h-full border-0 pointer-events-none z-0"
      allow="autoplay"
      title="CH Energy & Automation Promo"
    />
  );
}
