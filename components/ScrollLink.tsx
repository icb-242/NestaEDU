"use client";

import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

interface ScrollLinkProps extends ComponentPropsWithoutRef<"a"> {
  href: string;
}

export function ScrollLink({ href, className, children, ...props }: ScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        "transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}