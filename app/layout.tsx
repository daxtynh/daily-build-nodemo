import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoDemo - SaaS Tools with Transparent Pricing",
  description: "Find SaaS tools that show their prices upfront. No 'Request Demo'. No 'Contact Sales'. Just transparent pricing.",
  keywords: "SaaS, pricing, transparent, no demo, software tools, indie hackers",
  openGraph: {
    title: "NoDemo - SaaS Tools with Transparent Pricing",
    description: "Find SaaS tools that show their prices upfront. No 'Request Demo'. No 'Contact Sales'. Just transparent pricing.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoDemo - SaaS Tools with Transparent Pricing",
    description: "Find SaaS tools that show their prices upfront. No demos. No sales calls. Just prices.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
