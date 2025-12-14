import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Shell } from "@/components/shell";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Focus Flow",
  description: "Precision time-tracking for high performers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <Shell>
          {children}
        </Shell>
      </body>
    </html>
  );
}
