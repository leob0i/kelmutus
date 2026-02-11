import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

// ✅ Tue sekä isot että pienet env-nimet (Vercel/Node on case-sensitive)
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? process.env.resend_api_key;

const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL ?? process.env.contact_to_email ?? "jari@kelmutus.fi";

const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? process.env.contact_form_email;

const resend = new Resend(RESEND_API_KEY);

const HP_FIELDS = ["company", "website", "confirm_email", "fax", "hp", "honeypot"];

function wantsHtml(req: Request) {
  const accept = req.headers.get("accept") ?? "";
  return accept.includes("text/html");
}

function redirectBack(req: Request, ok: boolean) {
  const ref = req.headers.get("referer") ?? "/";
  try {
    const url = new URL(ref);
    url.searchParams.set(ok ? "sent" : "error", "1");
    return NextResponse.redirect(url.toString(), { status: 303 });
  } catch {
    return NextResponse.redirect(ok ? "/?sent=1" : "/?error=1", { status: 303 });
  }
}

function formatFrom(fromEnv?: string) {
  if (!fromEnv) return "Kelmutus <noreply@kelmutus.fi>";
  return fromEnv.includes("<") ? fromEnv : `Kelmutus <${fromEnv}>`;
}

export async function POST(req: Request) {
  try {
    // ✅ Tarkista oikea avain (iso/pieni)
    if (!RESEND_API_KEY) {
      return NextResponse.json({ ok: false, error: "Missing RESEND_API_KEY" }, { status: 500 });
    }

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
          const ab = await value.arrayBuffer();
          const b64 = Buffer.from(ab).toString("base64");
          attachments.push({ filename: value.name || "attachment", content: b64 });
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
