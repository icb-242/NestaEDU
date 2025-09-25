"use client";

import Link from "next/link";
import Image from "next/image";
import { ScrollLink } from "./ScrollLink";
import { Container } from "./ui/Container";
import { ThemeToggleButton } from "./theme-toggle-button";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <Container>
        <nav className="flex h-24 items-center justify-start gap-8 -ml-8">
          <Link
            href="/"
            className="flex items-center gap-5 text-4xl font-bold tracking-tighter hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <div className="relative w-[72px] h-[72px]">
              <Image
                src="/images/brand/nesta-logo-transparent.png"
                alt="Nesta Education Logo"
                fill
                className="object-contain"
                sizes="72px"
              />
            </div>
            nesta education
          </Link>

          <div className="flex items-center gap-6 ml-auto">
            <ScrollLink 
              href="#about" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              style={{ fontFamily: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}
            >
              About
            </ScrollLink>
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              style={{ fontFamily: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}
            >
              Start Learning
            </Link>
            <ThemeToggleButton />
          </div>
        </nav>
      </Container>
    </header>
  );
}