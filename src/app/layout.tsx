import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PWAInstall from "@/components/PWAInstall";
import PWAInit from "@/components/PWAInit";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ambetter Health - PWA Demo",
  description: "Progressive Web App showcasing dynamic content updates without marketplace redeployment",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ambetter Health",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ec4899" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Ambetter" />
        <link rel="apple-touch-icon" href="/ambetter-logo-192.png" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <PWAInit />
        <PWAInstall />
        {children}
      </body>
    </html>
  );
}
