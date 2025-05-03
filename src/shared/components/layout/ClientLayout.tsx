"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import JoinButton from "./JoinButton";
import Footer from "./Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      {!isHomePage && <Header />}
      <main className="flex-grow">{children}</main>
      <JoinButton />
      <Footer />
    </div>
  );
}
