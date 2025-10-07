export type Kpi = {
  label: string;
  value: string;
  sub?: string;
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
    { label: "BGCSE # of Candidates", value: "5,935", sub: "↑ 10.05% vs 2023" },
    { label: "BGCSE ≥C in Math+Eng+Sci", value: "431", sub: "~7% of candidates" },
    { label: "BGCSE ≥C in 5+ subjects", value: "653", sub: "~11% of candidates" },
    { label: "BJC # of Candidates", value: "10,745", sub: "↓ 1.72% vs 2023" },
    { label: "BJC ≥C in Math+Eng+Sci", value: "1,298", sub: "~12% of candidates" },
    { label: "BJC ≥C in 5+ subjects", value: "1,388", sub: "~13% of candidates" },
  ],
  mobileFirst: {
    title: "Mobile-First, Nation-Wide.",
    body:
      "Nesta is optimized for both desktop and mobile experiences, ensuring students can learn wherever they are. Even in areas where laptops or Wi-Fi are limited, Nesta remains accessible through mobile devices and data plans."
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
      "Despite tens of thousands of exam entries each year, fewer than 15% of Bahamian students consistently achieve a grade C or higher in core subjects (Math, English, and Science). For more than a decade, participation has been stagnant while overall proficiency remains low, leaving many students unprepared for future opportunities. ",
    approach:
      "Our plan is simple: give Bahamian students access to the kind of support that leads to tangible results. Nesta is a suite of tools designed to do just that.\n\n• First, students gain access to a personalized AI tutor that guides them step-by-step, teaching them 'how' to think rather than 'what' to think.\n\n• Next, they get access to a practice exam portal that generates questions that feels like the real test, with instant feedback to build confidence where it matters most.\n\n• To round it out, students can leverage an online learning platform currently loaded with an Intro to AI course that moves students from consuming technology to building with it.\n\n\nThe guiding principle is integrating these three components with Bahamian context and curriculum providing students with a tailored experience. By focusing on both current gaps and future skills, Nesta provides a pathway from today's reality to tomorrow's opportunity.",
    impact:
      "Close core-subject gaps, build confident problem solvers, and unlock opportunities in higher education and tomorrow's economy."
  }
} as const;
