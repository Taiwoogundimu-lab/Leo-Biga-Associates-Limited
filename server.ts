import 'dotenv/config';
import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import nodemailer from 'nodemailer';

const PORT = 3000;
const PRIMARY_RECIPIENT = process.env.CONTACT_PRIMARY_RECIPIENT || 'leobiga@yahoo.com';
const SECONDARY_RECIPIENT = process.env.CONTACT_SECONDARY_RECIPIENT || 'lbagh@yahoo.com';

interface ContactPayload {
  fullName?: string;
  email?: string;
  phone?: string;
  company?: string;
  subject?: string;
  service?: string;
  location?: string;
  message?: string;
  consent?: boolean;
  website_url?: string; // honeypot
}

// Simple in-memory duplicate-submission guard (60s window)
const recentSubmissions = new Map<string, number>();

function isEmailValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function isSmtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

async function recordEnquiryToDisk(entry: Record<string, unknown>) {
  const dataDir = path.resolve(process.cwd(), 'data');
  const filePath = path.join(dataDir, 'enquiries.json');
  await fs.mkdir(dataDir, { recursive: true });
  let existing: Record<string, unknown>[] = [];
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      existing = parsed;
    }
  } catch {
    existing = [];
  }
  existing.unshift(entry);
  await fs.writeFile(filePath, JSON.stringify(existing.slice(0, 500), null, 2), 'utf8');
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      emailDeliveryConfigured: isSmtpConfigured() || isResendConfigured(),
      provider: isSmtpConfigured() ? 'smtp' : isResendConfigured() ? 'resend' : 'local-archive',
    });
  });

  app.post('/api/contact', async (req, res) => {
    const body = (req.body || {}) as ContactPayload;

    // Honeypot spam trap
    if (body.website_url && body.website_url.trim().length > 0) {
      return res.status(200).json({
        ok: true,
        mode: 'filtered',
        referenceId: 'LBA-SPAM-FILTERED',
        message: 'Thank you. Your enquiry has been received.',
      });
    }

    const fullName = (body.fullName || '').trim();
    const email = (body.email || '').trim();
    const phone = (body.phone || '').trim();
    const company = (body.company || '').trim();
    const subject = (body.subject || '').trim();
    const service = (body.service || '').trim();
    const location = (body.location || '').trim();
    const message = (body.message || '').trim();
    const consent = Boolean(body.consent);

    const fieldErrors: Record<string, string> = {};
    if (!fullName || fullName.length < 2) fieldErrors.fullName = 'Please provide your full name.';
    if (!email || !isEmailValid(email)) fieldErrors.email = 'Please provide a valid email address.';
    if (!phone || phone.length < 6) fieldErrors.phone = 'Please provide a valid telephone or mobile number.';
    if (!subject || subject.length < 3) fieldErrors.subject = 'Please enter a subject for your enquiry.';
    if (!service) fieldErrors.service = 'Please select a service of interest.';
    if (!message || message.length < 10) fieldErrors.message = 'Please enter a message (at least 10 characters).';
    if (!consent) fieldErrors.consent = 'Please confirm privacy consent before submitting.';

    if (Object.keys(fieldErrors).length > 0) {
      return res.status(400).json({
        ok: false,
        error: 'Please review the highlighted fields and try again.',
        fieldErrors,
      });
    }

    // Prevent accidental duplicate submissions within 60 seconds
    const signature = crypto
      .createHash('sha256')
      .update(`${email.toLowerCase()}|${subject.toLowerCase()}|${message.toLowerCase()}`)
      .digest('hex');
    const now = Date.now();
    const lastSeen = recentSubmissions.get(signature);
    if (lastSeen && now - lastSeen < 60_000) {
      return res.status(429).json({
        ok: false,
        error: 'This enquiry was just submitted. Please wait a moment before sending again.',
      });
    }
    recentSubmissions.set(signature, now);

    // Prune stale signatures
    for (const [key, timestamp] of recentSubmissions.entries()) {
      if (now - timestamp > 120_000) recentSubmissions.delete(key);
    }

    const referenceId = `LBA-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
    const submittedAt = new Date().toISOString();

    const plainText = [
      `NEW CLIENT ENQUIRY – LEO BIGA ASSOCIATES LIMITED`,
      `Reference: ${referenceId}`,
      `Submitted: ${submittedAt}`,
      ``,
      `Full Name: ${fullName}`,
      `Email Address: ${email}`,
      `Phone Number: ${phone}`,
      `Company / Organisation: ${company || 'Not provided'}`,
      `Service of Interest: ${service}`,
      `Project Location: ${location || 'Not provided'}`,
      `Subject: ${subject}`,
      ``,
      `Message:`,
      message,
    ].join('\n');

    const htmlBody = `
      <div style="font-family: Georgia, serif; max-width: 640px; margin: 0 auto; border: 1px solid #d6d0c4; background: #ffffff;">
        <div style="background: #123D35; color: #F5F2EA; padding: 24px 28px;">
          <div style="font-size: 11px; letter-spacing: 2px; color: #C5A46D; text-transform: uppercase;">Leo Biga Associates Limited</div>
          <h1 style="margin: 6px 0 0; font-size: 20px; font-weight: 600;">New Consultation Enquiry (${escapeHtml(referenceId)})</h1>
        </div>
        <div style="padding: 24px 28px; font-family: Arial, sans-serif; color: #202522; font-size: 14px; line-height: 1.6;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 18px;">
            <tr><td style="padding: 6px 0; font-weight: bold; width: 180px;">Full Name:</td><td style="padding: 6px 0;">${escapeHtml(fullName)}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Email Address:</td><td style="padding: 6px 0;">${escapeHtml(email)}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Phone Number:</td><td style="padding: 6px 0;">${escapeHtml(phone)}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Company / Org:</td><td style="padding: 6px 0;">${escapeHtml(company || 'Not provided')}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Service of Interest:</td><td style="padding: 6px 0;">${escapeHtml(service)}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Project Location:</td><td style="padding: 6px 0;">${escapeHtml(location || 'Not provided')}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Subject:</td><td style="padding: 6px 0;">${escapeHtml(subject)}</td></tr>
          </table>
          <div style="border-top: 1px solid #e5e0d5; padding-top: 16px;">
            <div style="font-weight: bold; margin-bottom: 6px;">Message:</div>
            <div style="white-space: pre-wrap;">${escapeHtml(message)}</div>
          </div>
        </div>
      </div>
    `;

    let deliveryMode: 'smtp' | 'resend' | 'recorded' = 'recorded';

    try {
      if (isSmtpConfigured()) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || '465'),
          secure: process.env.SMTP_SECURE !== 'false',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: PRIMARY_RECIPIENT,
          cc: SECONDARY_RECIPIENT,
          replyTo: email,
          subject: `[LBA Enquiry] ${subject} — ${fullName}`,
          text: plainText,
          html: htmlBody,
        });
        deliveryMode = 'smtp';
      } else if (isResendConfigured()) {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || 'LBA Website <onboarding@resend.dev>',
            to: [PRIMARY_RECIPIENT],
            cc: [SECONDARY_RECIPIENT],
            reply_to: email,
            subject: `[LBA Enquiry] ${subject} — ${fullName}`,
            text: plainText,
            html: htmlBody,
          }),
        });

        if (!resendRes.ok) {
          const errText = await resendRes.text();
          throw new Error(`Resend API error: ${errText}`);
        }
        deliveryMode = 'resend';
      }

      await recordEnquiryToDisk({
        referenceId,
        submittedAt,
        deliveryMode,
        recipient: PRIMARY_RECIPIENT,
        fullName,
        email,
        phone,
        company,
        subject,
        service,
        location,
        message,
      });

      return res.status(200).json({
        ok: true,
        mode: deliveryMode,
        emailConfigured: deliveryMode !== 'recorded',
        referenceId,
        recipient: PRIMARY_RECIPIENT,
        message:
          deliveryMode === 'recorded'
            ? `Your enquiry (${referenceId}) has been securely validated and logged on the server for ${PRIMARY_RECIPIENT}. To enable automatic inbox dispatch, configure SMTP or RESEND_API_KEY in your server environment.`
            : `Thank you. Your enquiry (${referenceId}) has been delivered to the Managing Partner at ${PRIMARY_RECIPIENT}.`,
      });
    } catch (err) {
      console.error('Contact form delivery error:', err);
      return res.status(500).json({
        ok: false,
        error:
          'We encountered an issue dispatching your enquiry via email. Please try again shortly or reach the Managing Partner directly via WhatsApp (+234 8026043299) or email (leobiga@yahoo.com).',
      });
    }
  });

  app.use('/assets', express.static(path.resolve(process.cwd(), 'public', 'assets')));

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Leo Biga Associates server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
