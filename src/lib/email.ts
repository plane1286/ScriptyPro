import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = process.env.EMAIL_FROM || "noreply@scriptlypro.com";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function sendVerificationEmail(email: string, token: string) {
  if (!resend) {
    console.log("[Email] Resend not configured. Verification URL:", `${APP_URL}/verify?token=${token}`);
    return;
  }

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Verify your Scriptly Pro account",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e293b;">Welcome to Scriptly Pro!</h1>
        <p style="color: #475569; line-height: 1.6;">
          Thanks for signing up. Please verify your email address to get started.
        </p>
        <a href="${APP_URL}/verify?token=${token}"
           style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 16px 0;">
          Verify Email
        </a>
        <p style="color: #94a3b8; font-size: 14px;">
          This link expires in 24 hours. If you didn't create an account, ignore this email.
        </p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  if (!resend) {
    console.log("[Email] Resend not configured. Reset URL:", `${APP_URL}/reset-password?token=${token}`);
    return;
  }

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Reset your Scriptly Pro password",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e293b;">Password Reset</h1>
        <p style="color: #475569; line-height: 1.6;">
          Click the button below to reset your password.
        </p>
        <a href="${APP_URL}/reset-password?token=${token}"
           style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 16px 0;">
          Reset Password
        </a>
        <p style="color: #94a3b8; font-size: 14px;">
          This link expires in 1 hour. If you didn't request this, ignore this email.
        </p>
      </div>
    `,
  });
}

export async function sendWelcomeEmail(email: string, name: string) {
  if (!resend) {
    console.log("[Email] Resend not configured. Welcome email skipped for:", email);
    return;
  }

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Welcome to Scriptly Pro!",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e293b;">Welcome, ${name}! 🎙️</h1>
        <p style="color: #475569; line-height: 1.6;">
          You're all set to start writing your next great audio story.
          Here's how to get started:
        </p>
        <ol style="color: #475569; line-height: 1.8;">
          <li>Create your first project (podcast, audiobook, or audio drama)</li>
          <li>Add episodes and start writing</li>
          <li>Build out your characters and their relationships</li>
          <li>Use AI suggestions to polish your script</li>
        </ol>
        <a href="${APP_URL}/dashboard"
           style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 16px 0;">
          Go to Dashboard
        </a>
        <p style="color: #94a3b8; font-size: 14px;">
          Questions? Reply to this email — we read every message.
        </p>
      </div>
    `,
  });
}
