// Types
export type CTA = {
  label: string;
  href: string;
};

export type KPI = {
  label: string;
  value: string;
  note: string;
};

export type Target = {
  label: string;
  from: string;
  to: string;
  note: string;
};

export type ChartDataPoint = {
  year: number;
  coreTrifectaPct: number;
};

export type ToolboxItem = {
  title: string;
  subtitle: string;
  features: string[];
  cta: CTA;
};

export type RoadmapItem = {
  title: string;
  body: string;
};

export type MasterPlanContent = {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    sub: string;
    ctas: CTA[];
  };
  toc: CTA[];
  purpose: {
    heading: string;
    body: string;
    bullets: string[];
  };
  present: {
    heading: string;
    intro: string;
    kpis: KPI[];
    bullets: string[];
    footnote: string;
  };
  possibility: {
    heading: string;
    narrative: string;
    targets: Target[];
    chart: {
      series: ChartDataPoint[];
      ariaTitle: string;
      ariaDesc: string;
    };
    disclaimer: string;
  };
  how: {
    heading: string;
    intro: string;
    items: ToolboxItem[];
    notes: string[];
  };
  furtherAhead: {
    heading: string;
    intro: string;
    roadmap: RoadmapItem[];
    closing: string;
  };
};

export const masterPlanContent = {
  seo: {
    title: "Nesta — Our Master Plan",
    description:
      "Nesta's plan to create opportunity: why it matters, what exists today, where we're going, and how we'll get there.",
  },
  hero: {
    eyebrow: "",
    title: "The Nesta Plan",
    sub:
      "Education + Technology = Opportunity. Nesta blends AI with Socratic teaching to help students think independently and practice with purpose—so results improve and doors open.",
    ctas: [],
  },
  toc: [
    { label: "Our Purpose", href: "#purpose" },
    { label: "The Present", href: "#present" },
    { label: "The Possibility", href: "#possibility" },
    { label: "How We Can Do It", href: "#how" },
    { label: "Further Ahead", href: "#further-ahead" },
  ],
  purpose: {
    heading: "Our Purpose — Creating Opportunity",
    body:
      "Nesta exists to turn learning into opportunity. By combining AI with guided reasoning and exam-style practice, we help students build confidence, achieve stronger results, and expand what's possible—for learners, teachers, and the nation at large.",
    bullets: [
      "Teach students how to think, not what to think.",
      "Make high-quality support accessible on mobile, anywhere.",
      "Align practice to what's actually tested.",
    ],
  },
  present: {
    heading: "The Present — The Problem and the Opportunity",
    intro:
      "Participation is rising, but core proficiency remains too low. The gap between high achievers and those falling behind persists—especially across Math, English, and Science.",
    kpis: [
      { label: "BGCSE 2024 candidates", value: "5,935", note: "↑ 10.05% vs 2023" },
      { label: "BGCSE ≥C in 5+ subjects", value: "653", note: "~11% of candidates" },
      { label: "BGCSE ≥C in Math+Eng+Sci", value: "431", note: "~7% of candidates" },
      { label: "BJC 2024 candidates", value: "10,745", note: "↓ 1.72% vs 2023" },
      { label: "BJC ≥C in 5+ subjects", value: "1,388", note: "~13% of candidates" },
      { label: "BJC ≥C in Math+Eng+Sci", value: "1,298", note: "~12% of candidates" },
    ],
    bullets: [
      "Persistent Achievement Gap — only ~10–13% earn ≥C in 5+ subjects.",
      "Core Proficiency Remains Low — typically <15% earn ≥C across Math, English, and Science.",
      "Marginal Gains — A–C improvements exist, yet overall performance is largely stagnant.",
    ],
    footnote:
      "Data from recent national exam snapshots; figures rounded for clarity.",
  },
  possibility: {
    heading: "The Possibility — From Here to Better Outcomes",
    narrative:
      "With focused support, we can move from low core proficiency to meaningful, measurable gains. Nesta's realistic targets emphasize steady progress over hype.",
    targets: [
      {
        label: "≥C in 5+ subjects",
        from: "11–13%",
        to: "25% in ~3 years; 35% in ~5 years",
        note: "Driven by aligned practice, feedback loops, and teacher insight.",
      },
      {
        label: "≥C in Math+Eng+Sci",
        from: "7–12%",
        to: "20% in ~3 years; 30% in ~5 years",
        note: "Guided reasoning + exam-style practice to build core mastery.",
      },
    ],
    chart: {
      series: [
        { year: 2024, coreTrifectaPct: 9 },
        { year: 2026, coreTrifectaPct: 18 },
        { year: 2029, coreTrifectaPct: 28 },
      ],
      ariaTitle: "Projected improvement in core subject proficiency over time",
      ariaDesc:
        "Illustrative projection of students earning grade C or higher in Math, English, and Science.",
    },
    disclaimer:
      "Projections are targets to guide effort and measurement; actual outcomes depend on implementation, adoption, and broader system factors.",
  },
  how: {
    heading: "How We Can Do It — The Nesta Toolbox",
    intro:
      "Three complementary tools work together to teach reasoning, reinforce knowledge, and build future-ready skills.",
    items: [
      {
        title: "AI-Powered Tutoring",
        subtitle: "Personalized step-by-step help, any time you need it.",
        features: [
          "Ask real questions from class or past papers and get clear, Socratic guidance rather than just the answer.",
          "Break down complex problems into manageable steps with explanations that make sense in plain language.",
          "Practice reasoning and problem-solving with adaptive prompts that adjust to your learning pace.",
          "Learn how to think through Math, English, and Science questions so you can apply the same logic on exam day."
        ],
        cta: { label: "Open Tutor", href: "/login" },
      },
      {
        title: "Practice Exams",
        subtitle: "Practice that feels like the real thing.",
        features: [
          "Access AI-generated exams that mirror the structure, timing, and difficulty of BJC and BGCSE papers.",
          "Get instant feedback with marked responses so you know exactly where you're strong and where you need more work.",
          "Track your performance across multiple attempts to see progress over time.",
          "Build exam-day confidence by practicing under realistic conditions before the real test."
        ],
        cta: { label: "Practice Now", href: "/login" },
      },
      {
        title: "Online Course Platform",
        subtitle: "A growing hub for modern, skills-based learning.",
        features: [
          "Think of it as a student-friendly version of platforms like Coursera—built for high school learners.",
          "Currently loaded with our Intro to AI course, where students learn what AI is, why it matters, and how to build a simple app with it.",
          "Beginner-friendly lessons that connect classroom subjects to practical, future-ready skills—no prior experience required.",
          "Designed to expand over time with additional courses in coding, data literacy, study skills, and other areas that prepare students for the future."
        ],
        cta: { label: "Start the Course", href: "/login" },
      },
    ],
    notes: [
      "Mobile-first by design for broad access across islands.",
      "Powered by advanced OpenAI models for natural guidance.",
      "Aligned to local coursework and past-paper patterns.",
    ],
  },
  furtherAhead: {
    heading: "Further Ahead — What's Next",
    intro:
      "Nesta is a platform designed to grow. We're building toward broader impact for students and teachers.",
    roadmap: [
      {
        title: "Teacher Portal & Insights",
        body:
          "Dashboards to track class progress, surface common misconceptions, and assign targeted practice sets.",
      },
      {
        title: "Expanded Course Library",
        body:
          "Beyond the Intro to AI: coding foundations, data literacy, study skills, and subject-specific boosters.",
      },
      {
        title: "School & Community Partnerships",
        body:
          "Pilots with schools, after-school programs, and community centers for multi-island reach.",
      },
      {
        title: "Offline & Low-Bandwidth Modes",
        body:
          "Resilient access for students with limited connectivity, ensuring continuity of learning.",
      },
    ],
    closing:
      "Our destination is simple: more students mastering core subjects and unlocking opportunity—at scale.",
  },
} as const satisfies MasterPlanContent;
