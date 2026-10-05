"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useTranslations } from "next-intl";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

// Web3Forms-avain on julkinen (kulkee selaimen pyynnössä), ei salaisuus
const WEB3FORMS_ACCESS_KEY = "ab67a1ca-1b3f-41da-9a61-a7c67a2922b8";

// Piilokentät: jos täytetty, lähettäjä on botti
const HP_FIELDS = ["website", "hp_company"];

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const t = useTranslations("contactForm");
  const [status, setStatus] = useState<Status>("idle");
  const sentRef = useRef<HTMLDivElement | null>(null);

  // lomake korvautuu lyhyemmällä kiitosviestillä -> pidetään se näkyvissä
  useEffect(() => {
    if (status === "sent") sentRef.current?.scrollIntoView({ block: "center" });
  }, [status]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const fd = new FormData(e.currentTarget);

    // Honeypot: jos täytetty, näytetään kiitos mutta ei lähetetä mitään
    if (HP_FIELDS.some((key) => String(fd.get(key) ?? "").trim().length > 0)) {
      setStatus("sent");
      return;
    }
    for (const key of HP_FIELDS) fd.delete(key);

    fd.set("access_key", WEB3FORMS_ACCESS_KEY);
    fd.set("subject", "Uusi yhteydenotto (Kelmutus.fi)");

    setStatus("sending");
    try {
      const res = await fetch(WEB3FORMS_URL, { method: "POST", body: fd });
      const data = await res.json();
      setStatus(data.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div ref={sentRef} role="status" className={className}>
        <p className="text-lg font-semibold text-white">{t("success")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-busy={status === "sending"}
      className={`${className ?? ""} aria-busy:pointer-events-none aria-busy:opacity-60`}
    >
      {children}
      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-red-300">
          {t("error")}
        </p>
      )}
    </form>
  );
}
