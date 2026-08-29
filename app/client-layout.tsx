"use client";

import { ExamProvider } from "@/contexts/exam-context";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ExamProvider>
      <div className="relative min-h-screen bg-gradient">
        {children}
      </div>
    </ExamProvider>
  );
}
