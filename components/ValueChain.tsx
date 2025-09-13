import { Container } from "./ui/Container";
import { researchContent } from "@/lib/researchContent";
import { ArrowRight } from "lucide-react";

export function ValueChain() {
  const { valueChain } = researchContent;

  return (
    <section className="py-20">
      <Container>
        <h2 className="text-2xl font-bold tracking-tight text-center mb-12">
          {valueChain.title}
        </h2>

        <div className="grid gap-8 md:grid-cols-4">
          {valueChain.steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="space-y-3">
                <h3 className="font-medium">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>

              {index < valueChain.steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
