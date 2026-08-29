import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Nesta Education - AI-Powered Learning for Bahamian Students",
  description:
    "Nesta Education blends AI-powered tutoring and BJC/BGCSE practice exams—built for students in The Bahamas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen bg-gradient">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}