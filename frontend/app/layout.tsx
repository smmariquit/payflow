import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-sans",
  weight: ["300","400","500","600","700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PayFlow - Home Credit",
  description: "Access your earned wages anytime, anywhere",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PayFlow",
  },
  icons: {
    icon: "/payflow_logo.png",
    shortcut: "/payflow_logo.png",
    apple: "/payflow_logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#B82329",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon-192x192.svg" />
        <meta name="theme-color" content="#B82329" />
        <link rel="apple-touch-icon" href="/icon-192x192.svg" />
      </head>
      <body
        className={`${lexend.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
