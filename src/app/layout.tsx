import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "../components/Header";
import JoinButton from "../components/JoinButton";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NCMN 동아리",
  description: "NCMN 동아리 홍보 및 모집 홈페이지",
  keywords: ["NCMN", "동아리", "리더십", "캠퍼스", "사역"],
  icons: {
    icon: "/logo.png",
  },
  metadataBase: new URL("https://ncmn-club.com"),
  openGraph: {
    title: "NCMN 동아리",
    description: "NCMN 동아리 홍보 및 모집 홈페이지",
    url: "https://ncmn-club.com",
    siteName: "NCMN 동아리",
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
    title: "NCMN 동아리",
    description: "NCMN 동아리 홍보 및 모집 홈페이지",
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
    canonical: "https://ncmn-club.com",
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
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <JoinButton />
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
