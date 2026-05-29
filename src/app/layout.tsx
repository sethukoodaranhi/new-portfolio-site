import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sethulakshmi.dev"),
  title: "Sethulakshmi | Full Stack Developer",
  description:
    "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Building elegant solutions to complex problems.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Sethulakshmi" }],
  creator: "Sethulakshmi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sethulakshmi.dev",
    title: "Sethulakshmi | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
    siteName: "Sethulakshmi Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sethulakshmi - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sethulakshmi | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
    images: ["/og-image.png"],
    creator: "@sethukoodaranhi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-dark-bg text-slate-200`}
      >
        {children}
      </body>
    </html>
  );
}
