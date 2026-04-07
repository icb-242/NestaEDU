import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { MinimalFooter } from "@/components/MinimalFooter";
import { TextDecode } from "@/components/TextDecode";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center -mt-12">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <div className="relative w-[432px] h-[432px]">
              {/* Light mode logo */}
              <Image
                src="/images/brand/nesta education 3.png"
                alt="Nesta Logo"
                fill
                className="object-contain dark:opacity-0 dark:scale-0 transition-all duration-300"
                sizes="432px"
              />
              {/* Dark mode logo */}
              <Image
                src="/images/brand/nesta education 3(white).png"
                alt="Nesta Logo"
                fill
                className="object-contain opacity-0 scale-0 dark:opacity-100 dark:scale-100 transition-all duration-300"
                sizes="432px"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground -mt-16">
            <TextDecode 
              text="education + technology = opportunity" 
              delay={500}
              duration={1000}
            />
          </p>
        </div>
      </main>
      <MinimalFooter />
    </>
  );
}