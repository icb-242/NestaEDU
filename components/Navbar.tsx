"use client";

import Link from "next/link";
import { ScrollLink } from "./ScrollLink";
import { Container } from "./ui/Container";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tighter hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            nesta education
          </Link>

          <div className="flex items-center gap-6">
            <ScrollLink 
              href="#about" 
              className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </ScrollLink>
            <Link
              href="/login"
              className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Start Learning
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}