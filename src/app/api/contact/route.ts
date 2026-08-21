import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.warn("SMTP credentials not provided in environment variables.");
      return NextResponse.json(
        { error: "SMTP credentials missing on server" },
        { status: 500 }
      );
    }

    // Configure Nodemailer transporter with Domain Provider SMTP
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"${name} via Website" <${smtpUser}>`,
      to: "support@ch-enau.com",
      replyTo: email,
      subject: `${emergency ? "[ACİL / EMERGENCY] " : ""}Servis Talebi: ${company}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 20px; rounded: 8px;">
          <h2 style="color: #0066cc; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
            ${emergency ? "🚨 ACİL SERVİS TALEBİ" : "📩 Teknik Servis Talebi"}
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 35%;">Müşteri / Ad Soyad:</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Şirket / Firma:</td>
              <td style="padding: 8px;">${company}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">E-posta:</td>
              <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Telefon:</td>
              <td style="padding: 8px;">${phone || "Belirtilmedi"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Makine Tipi:</td>
              <td style="padding: 8px;">${machine}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Acil Durum:</td>
              <td style="padding: 8px; color: ${emergency ? "red" : "green"}; font-weight: bold;">
                ${emergency ? "EVET - ÜRETİM DURDU" : "Normal Talep"}
              </td>
            </tr>
          </table>
          
          <h3 style="margin-top: 20px; color: #333;">Arıza / Talep Detayı:</h3>
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #0066cc; white-space: pre-wrap;">
            ${message}
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("SMTP Direct Send Error:", error);
    return NextResponse.json(
      { error: error.message || "E-posta gönderimi başarısız oldu." },
      { status: 500 }
    );
  }
}
