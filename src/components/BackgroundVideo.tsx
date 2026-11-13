"use client";

import { useEffect, useRef, useState } from "react";

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

// Looppaava taustavideo heron taakse. Posterikuva renderöidään erikseen next/imagella
// (preload), joten se on LCP-elementti; video ladataan vasta hetki load-tapahtuman jälkeen
// (load voi laueta ennen kuin posteri on piirretty), jotta se ei kilpaile kaistasta
// posterin ja muiden kriittisten tiedostojen kanssa. Ennen ensimmäistä ruutua video on
// läpinäkyvä ja posteri näkyy sen alta.
const START_DELAY_MS = 2000;

export function BackgroundVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [canLoadVideo, setCanLoadVideo] = useState(false);

  useEffect(() => {
    // 1) Jos käyttäjä haluaa vähemmän animaatiota → ei videota
    if (prefersReducedMotion()) return;

    // 2) Jos Data Saver / hidas yhteys → ei videota (poster jää)
    const conn = getConnection();
    const saveData = !!conn?.saveData;
    const effectiveType = conn?.effectiveType ?? "";
    const slow = effectiveType === "2g" || effectiveType === "slow-2g" || effectiveType === "3g";
    if (saveData || slow) return;

    // 3) Muuten ladataan hetki sen jälkeen, kun sivu on latautunut
    let timer: number | undefined;
    const start = () => {
      timer = window.setTimeout(() => setCanLoadVideo(true), START_DELAY_MS);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !canLoadVideo) return;

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
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    >
      {/* Ladataan source-URL vasta kun päätetään että yhteys riittää */}
      {canLoadVideo ? <source src={src} type="video/mp4" /> : null}
    </video>
  );
}
