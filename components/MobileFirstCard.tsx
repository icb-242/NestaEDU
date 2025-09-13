import { Container } from "./ui/Container";
import { researchContent } from "@/lib/researchContent";
import { Smartphone, Monitor } from "lucide-react";

export function MobileFirstCard() {
  const { mobileFirst } = researchContent;

  return (
    <section className="py-20">
      <Container>
        <div className="rounded-lg border bg-card p-8">
          <div className="flex items-start gap-6">
            <div className="flex shrink-0 gap-2">
              <Smartphone className="h-6 w-6 text-primary" />
              <Monitor className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{mobileFirst.title}</h2>
              <p className="mt-2 text-muted-foreground">{mobileFirst.body}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
