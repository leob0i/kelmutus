import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

// ✅ Tue sekä isot että pienet env-nimet (Vercel/Node on case-sensitive)
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? process.env.resend_api_key;

const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL ?? process.env.contact_to_email ?? "jari@kelmutus.fi";

const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? process.env.contact_form_email;

const HP_FIELDS = ["company", "website", "confirm_email", "fax", "hp", "honeypot"];

// ✅ P0: Liitteiden server-side rajat + tyyppivalidointi
const MAX_FILE_BYTES = 2 * 1024 * 1024; // 2MB
const MAX_ATTACHMENTS = 2;

const ALLOWED_MIME = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const ALLOWED_EXT = new Set([".pdf", ".jpg", ".jpeg", ".png", ".webp"]);

function getExt(name: string) {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i).toLowerCase() : "";
}

// ✅ P0: kevyt rate limit (in-memory)
const RL_WINDOW_MS = 10 * 60 * 1000; // 10 min
const RL_MAX = 10; // max requests per window
const RL_BUCKET = new Map<string, number[]>();

function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const xrip = req.headers.get("x-real-ip");
  if (xrip) return xrip.trim();
  return "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const cutoff = now - RL_WINDOW_MS;

  const arr = RL_BUCKET.get(ip) ?? [];
  const fresh = arr.filter((t) => t > cutoff);

  if (fresh.length >= RL_MAX) {
    RL_BUCKET.set(ip, fresh);
    return true;
  }

  fresh.push(now);
  RL_BUCKET.set(ip, fresh);
  return false;
}

function wantsHtml(req: Request) {
  const accept = req.headers.get("accept") ?? "";
  return accept.includes("text/html");
}

// ✅ P0: estä open-redirect (salli vain oma origin)
function redirectBack(req: Request, ok: boolean) {
  const base = new URL(req.url);
  const ref = req.headers.get("referer") ?? "/";

  let url: URL;
  try {
    url = new URL(ref, base); // sallii myös relative polut
  } catch {
    url = new URL("/", base);
  }

  if (url.origin !== base.origin) {
    url = new URL("/", base);
  }

  url.searchParams.set(ok ? "sent" : "error", "1");
  return NextResponse.redirect(url.toString(), { status: 303 });
}

function formatFrom(fromEnv?: string) {
  if (!fromEnv) return "Kelmutus <noreply@kelmutus.fi>";
  return fromEnv.includes("<") ? fromEnv : `Kelmutus <${fromEnv}>`;
}

export async function POST(req: Request) {
  try {
    // ✅ Rate limit ennen mitään raskasta
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return wantsHtml(req)
        ? redirectBack(req, false)
        : NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
    }

    // ✅ Tarkista oikea avain (iso/pieni)
    if (!RESEND_API_KEY) {
      return NextResponse.json({ ok: false, error: "Missing RESEND_API_KEY" }, { status: 500 });
    }

    const resend = new Resend(RESEND_API_KEY); // uusi

    const fd = await req.formData();

    // Honeypot: jos täytetty, palautetaan "ok" mutta ei lähetetä mitään
    for (const key of HP_FIELDS) {
      const v = fd.get(key);
      if (typeof v === "string" && v.trim().length > 0) {
        return wantsHtml(req) ? redirectBack(req, true) : NextResponse.json({ ok: true });
      }
    }

    // Kerää string-kentät + mahdollinen liite (File)
    const fields: Record<string, string> = {};
    const attachments: { filename: string; content: string }[] = [];

    for (const [key, value] of fd.entries()) {
      if (typeof value === "string") {
        if (!HP_FIELDS.includes(key)) fields[key] = value;
      } else {
        if (value.size > 0) {
          // max määrä
          if (attachments.length >= MAX_ATTACHMENTS) {
            return wantsHtml(req)
              ? redirectBack(req, false)
              : NextResponse.json({ ok: false, error: "Too many attachments" }, { status: 400 });
          }

          // koko
          if (value.size > MAX_FILE_BYTES) {
            return wantsHtml(req)
              ? redirectBack(req, false)
              : NextResponse.json(
                  { ok: false, error: `Attachment too large (max ${MAX_FILE_BYTES} bytes)` },
                  { status: 413 }
                );
          }

          // MIME + pääte
          const filename = value.name || "attachment";
          const ext = getExt(filename);
          const mime = value.type || "";

          if (!ALLOWED_MIME.has(mime) || !ALLOWED_EXT.has(ext)) {
            return wantsHtml(req)
              ? redirectBack(req, false)
              : NextResponse.json(
                  { ok: false, error: "Unsupported attachment type" },
                  { status: 400 }
                );
          }

          const ab = await value.arrayBuffer();
          const b64 = Buffer.from(ab).toString("base64");
          attachments.push({ filename, content: b64 });
        }
      }
    }

    // ✅ Vastaanottaja + lähettäjä sun env-nimillä
    const to = CONTACT_TO_EMAIL;
    const from = formatFrom(CONTACT_FROM_EMAIL);

    // jos lomakkeessa on email-kenttä (eri nimillä), käytetään reply-to:na
    const replyTo =
      fields.email ||
      fields.Email ||
      fields.sahkoposti ||
      fields["sähköposti"] ||
      fields["e-mail"] ||
      "";

    const subject = fields.subject || fields.aihe || "Uusi yhteydenotto (Kelmutus.fi)";

    const text = [
      "UUSI YHTEYDENOTTO",
      "",
      ...Object.entries(fields).map(([k, v]) => `${k}: ${v}`),
      "",
      `Lähetysaika: ${new Date().toISOString()}`,
    ].join("\n");

    await resend.emails.send({
      to,
      from,
      subject,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
      ...(attachments.length ? { attachments } : {}),
    });

    return wantsHtml(req) ? redirectBack(req, true) : NextResponse.json({ ok: true });
  } catch {
    return wantsHtml(req) ? redirectBack(req, false) : NextResponse.json({ ok: false }, { status: 500 });
  }
}
