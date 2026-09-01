import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scriptly Pro - AI-Powered Audio Storytelling",
  description: "Create podcast scripts, audiobooks, and audio dramas with AI assistance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
