export type Kpi = {
  label: string;
  value: string;
  sub?: string;
};

export type ChartDataPoint = {
  exam: "BGCSE" | "BJC";
  metric: "≥C in 5+" | "≥C in Math+Eng+Sci";
  percent: number;
};

export type ParticipationDataPoint = {
  name: string;
  participationGrowthPct: number;
  coreProficiencyPct: number;
};

export type Callout = {
  title: string;
  body: string;
};

export type InfoBand = {
  title: string;
  body: string;
};

export type ImpactStep = {
  label: string;
  desc: string;
};

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
  kpis: Kpi[];
  charts: {
    coreProficiencyBars: ChartDataPoint[];
    participationVsProficiency: ParticipationDataPoint[];
  };
  callouts: {
    polarization: Callout;
    gender: Callout;
  };
  infoBand: InfoBand;
  impactBlock: {
    title: string;
    steps: ImpactStep[];
    blurb: string;
  };
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
  kpis: [
    { label: "BGCSE 2024 candidates", value: "5,935", sub: "↑ 10.05% vs 2023" },
    { label: "BGCSE ≥C in 5+ subjects", value: "653", sub: "~11% of candidates" },
    { label: "BGCSE ≥C in Math+Eng+Sci", value: "431", sub: "~7% of candidates" },
    { label: "BJC 2024 candidates", value: "10,745", sub: "↓ 1.72% vs 2023" },
    { label: "BJC ≥C in 5+ subjects", value: "1,388", sub: "~13% of candidates" },
    { label: "BJC ≥C in Math+Eng+Sci", value: "1,298", sub: "~12% of candidates" },
  ],
  charts: {
    coreProficiencyBars: [
      { exam: "BGCSE", metric: "≥C in 5+", percent: 11 },
      { exam: "BGCSE", metric: "≥C in Math+Eng+Sci", percent: 7 },
      { exam: "BJC", metric: "≥C in 5+", percent: 13 },
      { exam: "BJC", metric: "≥C in Math+Eng+Sci", percent: 12 },
    ],
    participationVsProficiency: [
      { name: "BGCSE 2023→2024", participationGrowthPct: 10.05, coreProficiencyPct: 7.0 },
    ],
  },
  callouts: {
    polarization: {
      title: "Performance is polarizing",
      body: "A–C grades are improving while U (ungraded) rates also rise—some students surge ahead while others fall behind. Adaptive support can bridge this gap."
    },
    gender: {
      title: "Gender patterns matter",
      body: "Females lead overall, while males show improvement in B grades and fewer D/F. Personalized paths can help both groups differently."
    }
  },
  infoBand: {
    title: "Benchmarking Gap",
    body: "The Bahamas did not participate in PISA 2022 or TIMSS 2019, limiting global comparisons. Nesta's analytics can simulate benchmarks and track skill growth over time."
  },
  impactBlock: {
    title: "The Nesta Toolbox",
    description: "The tools Nesta offers are designed to supplement the teaching currently provided by educators. Every aspect of the platform can be leveraged as needed to optimize each student's experience.",
    steps: [
      { label: "AI Tutor", desc: "Students can converse with a personalized AI powered tutor that never gets tired." },
      { label: "BJC/BGCSE Practice Exams", desc: "AI-Generated practice exams that mirror official questions with instant feedback." },
      { label: "Intro to AI Course", desc: "A hands-on, beginner-friendly course that teaches the basics of Aritficial Intelligence." },
    ],
  },
  mobileFirst: {
    title: "Mobile-first, island-wide",
    body:
      "Laptop access is limited. Nesta works great on phones and supports lab desktops—so students across the archipelago can learn, anywhere."
  },
  teacherBenefits: {
    title: "For teachers & administrators",
    bullets: [
      "Topic-aligned practice (BJC/BGCSE style) with instant feedback",
      "Dashboards for misconceptions and targeted intervention",
      "Flexible pacing that complements classroom instruction"
    ]
  },
  outcomes: [
    {
      title: "Student outcomes",
      body: "Close core-subject gaps, build confidence, and raise BJC/BGCSE performance."
    },
    {
      title: "National impact",
      body: "Better preparation → higher tertiary success → stronger economic competitiveness."
    }
  ],
  valueChain: {
    title: "How Nesta helps",
    steps: [
      { title: "AI-Powered Tutoring", desc: "Socratic, context-aware guidance tuned to Bahamian exams." },
      { title: "Practice Exams", desc: "Exam-style questions mirroring official papers with instant feedback." },
      { title: "Intro to AI Course", desc: "Beginner-friendly path to build a simple AI app and modern skills." },
      { title: "Analytics", desc: "Continuous assessment to guide learners, educators, and policy." }
    ]
  },
  marketingCopy: {
    problem:
      "More Bahamian students sit national exams each year, yet too few reach proficiency in Math, English, and Science. The gap is widening between high achievers and those falling behind.",
    approach:
      "Nesta blends AI-powered tutoring, realistic practice, and an Intro to AI course—Socratic, adaptive, and tuned to Bahamian context.",
    impact:
      "Close core-subject gaps, build confident problem solvers, and unlock opportunities in higher education and tomorrow's economy."
  }
} as const;
