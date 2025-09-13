import { Container } from "./ui/Container";
import { siteContent } from "@/lib/siteContent";

export function AboutStats() {
  const { about } = siteContent;

  return (
    <section id="about" className="py-20 scroll-mt-16">
      <Container>
        <h2 className="text-3xl font-bold tracking-tight">{about.title}</h2>

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          {/* Mission & Approach */}
          <div className="space-y-8">
            <p className="text-lg">{about.mission}</p>
            <p className="text-lg">{about.approach}</p>
          </div>

          {/* Stats */}
          <div className="grid gap-8 sm:grid-cols-2 lg:gap-12">
            {about.stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-2xl border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <div className="text-3xl font-bold tracking-tight text-primary">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </div>
                {stat.source && (
                  <a
                    href={stat.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-xs text-muted-foreground hover:text-primary"
                  >
                    Source: {stat.source.text}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}