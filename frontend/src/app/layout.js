"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProfileDropdown from "@/components/ProfileDropdown";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
        <nav className="w-full p-4 bg-black text-white flex justify-between items-center">
          <h1 className="font-bold flex">Skill Swap</h1>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">Dashboard</Link>
            {isLoggedIn ? (
              <ProfileDropdown />
            ) : (
              <Link
                href="/auth/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
              >
                Register
              </Link>
            )}
          </div>
        </nav>
        <main className="p-6 flex-grow">{children}</main>
        <footer className="w-full p-4 bg-black text-white text-center">
          <p>&copy; 2025 Skill Swap</p>
        </footer>
      </body>
    </html>
  );
}