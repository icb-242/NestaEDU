"use client";

import Link from "next/link";
import Image from "next/image";
import { ScrollLink } from "./ScrollLink";
import { Container } from "./ui/Container";
import { ThemeToggleButton } from "./theme-toggle-button";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <Container>
        <nav className="flex h-24 items-center justify-center gap-8">
          <div className="flex items-center gap-6">
            <Link
              href="/master-plan"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              style={{ fontFamily: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}
            >
              Our Approach
            </Link>
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