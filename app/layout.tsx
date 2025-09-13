import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Nesta Education - AI-Powered Learning for Bahamian Students",
  description:
    "Nesta Education blends AI-powered tutoring, BJC/BGCSE practice exams, and a beginner-friendly Intro to AI course—built for students in The Bahamas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} scroll-smooth`}>
      <body className="font-sans antialiased">
        <div className="relative min-h-screen bg-gradient">
          {children}
        </div>
      </body>
    </html>
  );
}