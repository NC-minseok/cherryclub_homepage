"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "홈", path: "/" },
    { name: "리더십 훈련", path: "/leadership" },
    { name: "캠퍼스 사역", path: "/campus" },
    { name: "전체/지역모임", path: "/gatherings" },
    { name: "대외사역", path: "/external" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/svg/logo.svg"
                alt="체리 로고"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-red-600 group-hover:to-pink-700">
                체리 전국 연합 동아리
              </span>
            </div>
          </Link>

          {/* Desktop Navigation
          <div className="hidden md:flex space-x-1 lg:space-x-3">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className={`px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:bg-red-100 hover:text-red-600 ${
                  scrolled ? "text-gray-700" : "text-gray-800"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div> */}

          {/* Mobile Menu Button
          <button
            className="md:hidden flex items-center text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button> */}
        </nav>

        {/* Mobile Navigation */}
        {/* {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-4 pb-4 bg-white rounded-lg shadow-lg p-3"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )} */}
      </div>
    </header>
  );
};

export default Header;
