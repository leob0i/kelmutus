

import { Resend } from "resend";
import { Buffer } from "buffer";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

function addSentParam(path: string) {
  const [base, hash] = path.split("#");
  const joiner = base.includes("?") ? "&" : "?";
  return `${base}${joiner}sent=1${hash ? `#${hash}` : ""}`;
}

export async function POST(request: Request) {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!to || !from) {
    return Response.json({ error: "Missing email env vars" }, { status: 500 });
  }

  const fd = await request.formData();

  // Honeypot (spam)
  if ((fd.get("website") ?? "").toString()) return new Response(null, { status: 204 });

  const name = (fd.get("name") ?? "").toString().trim();
  const company = (fd.get("company") ?? "").toString().trim();
  const email = (fd.get("email") ?? "").toString().trim();
  const phone = (fd.get("phone") ?? "").toString().trim();
  const message = (fd.get("message") ?? "").toString().trim();
  const source = (fd.get("source") ?? "").toString().trim();
  const redirect = (fd.get("redirect") ?? "/").toString().trim();
  const safeRedirect = redirect.startsWith("/") ? redirect : "/";

  // File (max 3MB because Vercel request limit 4.5MB)
  const attachment = fd.get("attachment");
  let attachments: Array<{ filename: string; content: Buffer }> | undefined;

  if (attachment && typeof attachment === "object" && "arrayBuffer" in attachment) {
    const file = attachment as File;
    const MAX = 3 * 1024 * 1024;
    if (file.size > MAX) {
      return Response.json({ error: "File too large (max 3MB)" }, { status: 413 });
    }
    if (file.size > 0) {
      attachments = [
        { filename: file.name || "attachment", content: Buffer.from(await file.arrayBuffer()) },
      ];
    }
  }

  const subject = `Kelmutus – yhteydenotto${source ? ` (${source})` : ""}`;

  const html = `
    <h2>Uusi yhteydenotto (Kelmutus)</h2>
    <p><b>Lähde:</b> ${source || "-"}</p>
    <p><b>Nimi:</b> ${name}</p>
    <p><b>Yritys:</b> ${company || "-"}</p>
    <p><b>Sähköposti:</b> ${email}</p>
    <p><b>Puhelin:</b> ${phone || "-"}</p>
    <hr/>
    <pre style="white-space:pre-wrap">${message}</pre>
  `;

  const { error } = await resend.emails.send({
    from,              // Kelmutus <tarjous@mail.kelmutus.com>
    to: [to],          // jari.ayho@gmail.com
    subject,
    html,
    replyTo: email,    // Reply nappi menee asiakkaalle
    attachments,
  });

  if (error) return Response.json({ error }, { status: 500 });

  const origin = new URL(request.url).origin;
return Response.redirect(new URL(addSentParam(safeRedirect), origin), 303);

}
