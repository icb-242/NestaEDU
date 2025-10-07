import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { MinimalFooter } from "@/components/MinimalFooter";
import { TextDecode } from "@/components/TextDecode";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="relative w-[48px] h-[48px]">
              <Image
                src="/images/brand/nesta-logo-transparent.png"
                alt="Nesta Logo"
                fill
                className="object-contain"
                sizes="48px"
              />
            </div>
            <h1 className="text-2xl font-bold tracking-tighter">nestaEDU</h1>
          </div>
          <p className="text-sm text-muted-foreground">
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