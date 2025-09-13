import Link from "next/link";
import { Container } from "./ui/Container";
import { siteContent } from "@/lib/siteContent";

export function OfferingCards() {
  const { offerings } = siteContent;

  return (
    <section className="py-20">
      <Container>
        <h2 className="text-center text-3xl font-bold tracking-tight">
          {offerings.title}
        </h2>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.cards.map((card, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <div
                className="mb-4 h-12 w-12 text-primary"
                dangerouslySetInnerHTML={{ __html: card.icon }}
                aria-hidden="true"
              />

              <h3 className="text-xl font-semibold">{card.title}</h3>
              
              <p className="mt-2 text-muted-foreground">
                {card.description}
              </p>

              <Link
                href={card.ctaLink}
                className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {card.ctaText}
                <svg
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}