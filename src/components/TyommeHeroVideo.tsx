"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Conn = {
  saveData?: boolean;
  effectiveType?: string; // "slow-2g" | "2g" | "3g" | "4g"
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function getConnection(): Conn | null {
  if (typeof navigator === "undefined") return null;
  // @ts-expect-error - experimental API (Chrome/Android mostly)
  return navigator.connection || navigator.mozConnection || navigator.webkitConnection || null;
}

export default function TyommeHeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [canLoadVideo, setCanLoadVideo] = useState(false);

  const sources = useMemo(
  () => ({
    poster: "/videos/axopar28.png",
    mp4: "/videos/axopar28.mp4",
  }),
  []
);


  useEffect(() => {
    // 1) Jos käyttäjä haluaa vähemmän animaatiota → ei videota
    if (prefersReducedMotion()) {
      setCanLoadVideo(false);
      return;
    }

    // 2) Jos Data Saver / hidas yhteys → ei videota (poster jää)
    const conn = getConnection();
    const saveData = !!conn?.saveData;
    const effectiveType = conn?.effectiveType ?? "";
    const slow = effectiveType === "2g" || effectiveType === "slow-2g" || effectiveType === "3g";

    if (saveData || slow) {
      setCanLoadVideo(false);
      return;
    }

    // 3) Muuten annetaan ladata
    setCanLoadVideo(true);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Pysäytä kun ei ole näkyvissä → ei CPU-nykimistä skrollatessa
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.2 }
    );

    io.observe(v);
    return () => io.disconnect();
  }, [canLoadVideo]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster={sources.poster}
      aria-hidden="true"
    >
      {/* Ladataan source-URL:t vasta kun päätetään että yhteys riittää */}
      {canLoadVideo ? <source src={sources.mp4} type="video/mp4" /> : null}

    </video>
  );
}
