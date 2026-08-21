import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const rateLimitMap = new Map<string, number>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, machine, message, emergency } = body;

    if (!name || !company || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Server-side 30-minute rate limit per email
    const emailKey = email.toLowerCase().trim();
    const lastSubmitTime = rateLimitMap.get(emailKey);
    const THIRTY_MINUTES_MS = 30 * 60 * 1000;

    if (lastSubmitTime && Date.now() - lastSubmitTime < THIRTY_MINUTES_MS) {
      const minutesLeft = Math.ceil((THIRTY_MINUTES_MS - (Date.now() - lastSubmitTime)) / (60 * 1000));
      return NextResponse.json(
        { error: `Rate limit: Lütfen ${minutesLeft} dakika sonra tekrar deneyiniz.` },
        { status: 429 }
      );
    }

    rateLimitMap.set(emailKey, Date.now());

    const resendApiKey = process.env.RESEND_API_KEY;
    const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY;
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    // Option 1: Resend API (Recommended - Free & Fast)
    if (resendApiKey) {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "CH-ENAU Website <onboarding@resend.dev>",
          to: "support@ch-enau.com",
          reply_to: email,
          subject: `${emergency ? "[ACİL / EMERGENCY] " : ""}Technical Service Request - ${company}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
              <h2 style="color: #0066cc;">${emergency ? "🚨 ACİL SERVİS TALEBİ" : "📩 Teknik Servis Talebi"}</h2>
              <p><strong>Müşteri / Ad Soyad:</strong> ${name}</p>
              <p><strong>Şirket:</strong> ${company}</p>
              <p><strong>E-posta:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Telefon:</strong> ${phone || "Belirtilmedi"}</p>
              <p><strong>Makine Tipi:</strong> ${machine}</p>
              <p><strong>Acil Durum:</strong> ${emergency ? "EVET - ÜRETİM DURDU" : "Hayır"}</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <h3>Mesaj / Arıza Detayı:</h3>
              <p style="background: #f4f6f8; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${message}</p>
            </div>
          `,
        }),
      });

      const resendData = await resendResponse.json();
      if (!resendResponse.ok) {
        throw new Error(resendData.message || "Resend API Error");
      }

      return NextResponse.json({ success: true });
    }

    // Option 2: Web3Forms (Free - No Email Password Required)
    if (web3FormsKey) {
      const w3Response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          subject: `${emergency ? "[ACİL] " : ""}Servis Talebi - ${company}`,
          from_name: name,
          replyto: email,
          to_email: "support@ch-enau.com",
          name,
          company,
          email,
          phone: phone || "Belirtilmedi",
          machine,
          emergency: emergency ? "EVET" : "HAYIR",
          message,
        }),
      });

      const w3Data = await w3Response.json();
      if (!w3Data.success) {
        throw new Error(w3Data.message || "Web3Forms submission failed");
      }

      return NextResponse.json({ success: true });
    }

    // Option 3: Standard SMTP Transporter (if password exists)
    if (smtpHost && smtpUser && smtpPass) {
      const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: `"${name} via Website" <${smtpUser}>`,
        to: "support@ch-enau.com",
        replyTo: email,
        subject: `${emergency ? "[ACİL] " : ""}Servis Talebi: ${company}`,
        text: `Müşteri: ${name}\nŞirket: ${company}\nEposta: ${email}\nTelefon: ${phone}\nMakine: ${machine}\nMesaj:\n${message}`,
      });

      return NextResponse.json({ success: true });
    }

    console.warn("No active email service key (RESEND_API_KEY, WEB3FORMS_ACCESS_KEY, or SMTP_PASS) found.");
    return NextResponse.json(
      { error: "No email service configured." },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("Contact Form API Error:", error);
    return NextResponse.json(
      { error: error.message || "E-posta gönderilemedi." },
      { status: 500 }
    );
  }
}
