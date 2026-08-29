export type CTA = {
  label: string;
  href: string;
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
  how: {
    heading: string;
    intro: string;
    items: ToolboxItem[];
  };
  furtherAhead: {
    heading: string;
    intro: string;
    roadmap: RoadmapItem[];
  };
};

export const masterPlanContent = {
  how: {
    heading: "Our Plan",
    intro:
      "Give Bahamian students the kind of support that actually moves these numbers: grounded in the Bahamian curriculum, built on real BJC and BGCSE past papers.",
    items: [
      {
        title: "AI-Powered Tutoring",
        subtitle: "Personalized step-by-step help, any time you need it.",
        features: [
          "Ask questions from class or past papers and get guided toward the answer, not handed it.",
          "Work through problems in plain language, at your own pace, as many times as you need.",
        ],
        cta: { label: "Open Tutor →", href: "/login" },
      },
      {
        title: "Practice Exams",
        subtitle: "Practice that feels like the real paper.",
        features: [
          "Sit exams built from real BJC and BGCSE past papers — same structure, same style, same difficulty.",
          "Submit and get every answer marked, with worked solutions showing exactly where you went wrong.",
        ],
        cta: { label: "Start Practicing →", href: "/login" },
      },
    ],
  },
  furtherAhead: {
    heading: "What's Next",
    intro: "Nesta is in pilot. Here's what comes after.",
    roadmap: [
      {
        title: "More Subjects",
        body:
          "English and expanded BGCSE coverage, built the same way — on real past papers, with the Bahamian curriculum as the spine.",
      },
      {
        title: "Teacher Portal & Insights",
        body:
          "Dashboards to track progress, surface misconceptions, and assign targeted practice sets.",
      },
      {
        title: "Offline & Low-Bandwidth Modes",
        body:
          "Resilient access for students with limited connectivity — learning anywhere across the archipelago.",
      },
    ],
  },
} as const satisfies MasterPlanContent;
