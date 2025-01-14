import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Monofett } from "next/font/google";
import Header from "@/components/Layout/Header";
import "./globals.css";

const monofett = Monofett({
  variable: "--font-monofett",
  subsets: ["latin"],
  weight: "400",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Typing Game",
  description: "A typing game to improve your typing skills",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${monofett.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;