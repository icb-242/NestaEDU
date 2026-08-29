import { Container } from "./ui/Container";
import { researchContent } from "@/lib/researchContent";
import { Check } from "lucide-react";

export function TeacherBenefits() {
  const { teacherBenefits } = researchContent;

  return (
    <section className="py-20">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight mb-8">
            {teacherBenefits.title}
          </h2>

          <ul className="space-y-4">
            {teacherBenefits.bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="h-5 w-5 mt-1 text-primary shrink-0" />
                <span className="text-muted-foreground">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
