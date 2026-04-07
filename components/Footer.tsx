"use client";

import Link from "next/link";
import { Container } from "./ui/Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-8">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm text-muted-foreground">
            © {currentYear} Nesta Technology
          </div>

          <nav className="flex gap-6">
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-accent"
            >
              Start Learning
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-accent"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-accent"
            >
              Terms
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}