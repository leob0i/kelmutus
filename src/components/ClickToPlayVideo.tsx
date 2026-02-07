"use client";

import { useRef, useState } from "react";

export function ClickToPlayVideo({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

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
    <div className="relative overflow-hidden rounded-md border border-black/10 bg-black">
      <video
        ref={ref}
        className="h-auto w-full"
        src={src}
        poster={poster}
        controls={playing}
        playsInline
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />

      {!playing && (
        <button
          type="button"
          onClick={play}
          className="absolute inset-0 grid place-items-center bg-black/10"
          aria-label="Toista video"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-black/45 text-white shadow">
            ▶
          </span>
        </button>
      )}
    </div>
  );
}
