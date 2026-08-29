export type MobileFirst = {
  title: string;
  body: string;
};

export type TeacherBenefits = {
  title: string;
  bullets: string[];
};

export type Outcome = {
  title: string;
  body: string;
};

export type ValueStep = {
  title: string;
  desc: string;
};

export type MarketingCopy = {
  problem: string;
  approach: string;
  impact: string;
};

export type ResearchContent = {
  mobileFirst: MobileFirst;
  teacherBenefits: TeacherBenefits;
  outcomes: Outcome[];
  valueChain: {
    title: string;
    steps: ValueStep[];
  };
  marketingCopy: MarketingCopy;
};

export const researchContent: ResearchContent = {
  mobileFirst: {
    title: "Mobile-First, Nation-Wide.",
    body:
      "Nesta works on any phone. No laptop, no home Wi-Fi required.",
  },
  teacherBenefits: {
    title: "For teachers & administrators",
    bullets: [
      "Topic-aligned practice (BJC/BGCSE style) with instant feedback",
      "Dashboards for misconceptions and targeted intervention",
      "Flexible pacing that complements classroom instruction",
    ],
  },
  outcomes: [
    {
      title: "Student outcomes",
      body: "Close gaps in Math, English and Science, build confidence, and raise BJC/BGCSE performance.",
    },
    {
      title: "National impact",
      body: "Better preparation → higher tertiary success → stronger economic competitiveness.",
    },
  ],
  valueChain: {
    title: "How Nesta helps",
    steps: [
      { title: "AI-Powered Tutoring", desc: "Socratic, context-aware guidance tuned to Bahamian exams." },
      { title: "Practice Exams", desc: "Exam-style questions mirroring official papers with instant feedback." },
      { title: "Analytics", desc: "Continuous assessment to guide learners, educators, and policy." },
    ],
  },
  marketingCopy: {
    problem:
      "Every year, roughly 16,000 students sit BJC and BGCSE exams. Over the past decade the share earning a C or better in Math, English and a science has stayed between 7 and 12 percent. It fell sharply in 2020 and returned to where it had been. The bar hasn't moved in eleven years.",
    approach:
      "Give Bahamian students the kind of support that actually moves these numbers: grounded in the Bahamian curriculum, built on real BJC and BGCSE past papers.",
    impact:
      "Close gaps in Math, English and Science, build confident problem solvers, and unlock opportunities in higher education and tomorrow's economy.",
  },
} as const;
