import { Container } from "./ui/Container";
import { researchContent } from "@/lib/researchContent";

export function InfoBand() {
  const { infoBand } = researchContent;

  return (
    <section className="py-12 bg-muted/50">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-xl font-semibold">{infoBand.title}</h2>
          <p className="text-muted-foreground">{infoBand.body}</p>
        </div>
      </Container>
    </section>
  );
}
