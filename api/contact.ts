import nodemailer from 'nodemailer';
import type { IncomingMessage, ServerResponse } from 'node:http';

export type ContactRequest = IncomingMessage & {
  body?: unknown;
};

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function respond(res: ServerResponse, statusCode: number, message: string) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify({ message }));
}

export default async function handler(req: ContactRequest, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    respond(res, 405, 'Method not allowed');
    return;
  }

  if (!isRecord(req.body)) {
    respond(res, 400, 'Please provide a valid contact message.');
    return;
  }

  const { name, email, message } = req.body;
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string'
  ) {
    respond(res, 400, 'Please provide a valid contact message.');
    return;
  }

  const contact: ContactForm = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  };

  if (
    contact.name.length < 2 ||
    contact.name.length > 100 ||
    contact.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email) ||
    contact.message.length < 10 ||
    contact.message.length > 5000
  ) {
    respond(res, 400, 'Please check the contact form fields and try again.');
    return;
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const recipient = process.env.CONTACT_EMAIL_TO;
  const smtpPort = Number(process.env.SMTP_PORT || 465);

  if (!smtpUser || !smtpPass || !recipient || !Number.isInteger(smtpPort)) {
    console.error('Contact email is not configured. Check the server environment variables.');
    respond(res, 500, 'Message delivery is temporarily unavailable.');
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: { name: 'Portfolio Contact Form', address: smtpUser },
      to: recipient,
      replyTo: contact.email,
      subject: 'New message from the portfolio contact form',
      text: [
        `Name: ${contact.name}`,
        `Email: ${contact.email}`,
        '',
        'Message:',
        contact.message,
      ].join('\n'),
    });

    respond(res, 200, 'Message sent successfully.');
  } catch (error) {
    console.error('Contact message delivery failed:', error);
    respond(res, 500, 'Message delivery is temporarily unavailable.');
  }
}
