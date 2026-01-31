import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Lync Foundation | Trustless TradFi-DeFi Infrastructure",
  description:
    "Lync Foundation builds open-source infrastructure for trustless fiat-crypto exchange. Making traditional finance verifiable on-chain.",
  keywords: [
    "crypto",
    "DeFi",
    "TradFi",
    "trustless",
    "P2P exchange",
    "Alipay",
    "CNY",
    "zero-knowledge proofs",
    "blockchain",
  ],
  authors: [{ name: "Lync Foundation" }],
  openGraph: {
    title: "Lync Foundation | Trustless TradFi-DeFi Infrastructure",
    description:
      "Building open-source infrastructure for trustless fiat-crypto exchange.",
    url: "https://lync-foundation.org",
    siteName: "Lync Foundation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lync Foundation",
    description:
      "Building trustless bridges between TradFi and DeFi.",
    creator: "@LyncFoundation",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
