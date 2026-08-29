"use client";

import Link from "next/link";
import { Container } from "./ui/Container";

export function MinimalFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm py-4">
      <Container>
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <span>© 2025 Nesta Technology</span>
          <Link
            href="/privacy"
            className="hover:text-foreground transition-colors"
            style={{ fontFamily: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-foreground transition-colors"
            style={{ fontFamily: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}
          >
            Terms & Conditions
          </Link>
        </div>
      </Container>
    </footer>
  );
}
