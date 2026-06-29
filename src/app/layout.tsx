import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "../shared/components/layout/Header";
import JoinButton from "../shared/components/layout/JoinButton";
import Footer from "../shared/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NMCN 대학캠퍼스",
  description: "5K운동 소개",
  keywords: [
    "체리동아리",
    "NMCN 대학캠퍼스",
    "체인저 리더십",
    "캠퍼스",
    "ncmn 대학캠퍼스",
  ],
  icons: {
    icon: "/logo.png",
  },
  metadataBase: new URL("https://cherryclub.kr"),
  openGraph: {
    title: "NMCN 대학캠퍼스",
    description: "5K운동 소개",
    url: "https://cherryclub.kr",
    siteName: "NMCN 대학캠퍼스",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NMCN 대학캠퍼스",
    description: "5K운동 소개",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://cherryclub.kr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-grow">{children}</main>
        {/* <JoinButton /> */}
        <Footer />

        <Analytics />
      </body>
    </html>
  );
}
