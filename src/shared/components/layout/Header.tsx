"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-9 h-9 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/images/logo.png"
                alt="체리클럽 로고"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900">
              대학캠퍼스
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
