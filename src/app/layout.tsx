import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar as SidebarBase } from "@/components/sidebar";
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
        className={`${inter.variable} min-h-screen bg-background font-sans antialiased flex`}
      >
        <SidebarBase />
        <main className="flex-1 pl-64 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
