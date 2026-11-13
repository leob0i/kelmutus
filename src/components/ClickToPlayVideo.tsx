"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Sivun alempana oleva video: posteri (next/image, oikean kokoinen mobiilissa) ja
// videotiedosto liitetään vasta kun soitin on lähellä näkymää. Itse video ladataan vasta,
// kun käyttäjä painaa toistoa (preload="none").
export function ClickToPlayVideo({
  src,
  poster,
  sizes,
  playLabel,
}: {
  src: string;
  poster: { src: string; width: number; height: number; alt: string };
  sizes: string;
  playLabel: string;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLVideoElement | null>(null);
  const [nearView, setNearView] = useState(false);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNearView(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const play = async () => {
    if (!ref.current) return;
    try {
      await ref.current.play();
      setPlaying(true);
    } catch {
      // jos selaimen policy estää, käyttäjä voi käyttää kontrolleja
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative overflow-hidden rounded-md border border-black/10 bg-black"
    >
      {/* Ennen toistoa video on piilossa posterin alla; toiston alettua se korvaa posterin */}
      <video
        ref={ref}
        className={started ? "h-auto w-full" : "absolute inset-0 h-full w-full opacity-0"}
        src={nearView ? src : undefined}
        preload="none"
        controls={playing}
        playsInline
        onPause={() => setPlaying(false)}
        onPlay={() => {
          setStarted(true);
          setPlaying(true);
        }}
      />

      {/* Posteri ladataan vasta lähellä näkymää; sitä ennen sen kokoinen tila varataan valmiiksi */}
      {!started &&
        (nearView ? (
          <Image
            src={poster.src}
            alt={poster.alt}
            width={poster.width}
            height={poster.height}
            sizes={sizes}
            className="h-auto w-full"
          />
        ) : (
          <div style={{ aspectRatio: `${poster.width} / ${poster.height}` }} />
        ))}

      {!playing && (
        <button
          type="button"
          onClick={play}
          className="absolute inset-0 grid place-items-center bg-black/10"
          aria-label={playLabel}
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-black/45 text-white shadow">
            ▶
          </span>
        </button>
      )}
    </div>
  );
}
