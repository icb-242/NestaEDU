export type OfferingCard = {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  icon: string; // SVG string
};

export type StatBlock = {
  value: string;
  label: string;
  source?: {
    text: string;
    url: string;
  };
};

export type SiteContent = {
  hero: {
    title: string;
    subtitle: string;
    primaryCta: {
      text: string;
      link: string;
    };
    secondaryCta: {
      text: string;
      link: string;
    };
  };
  offerings: {
    title: string;
    description: string;
    cards: OfferingCard[];
  };
};

const tutorIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
</svg>`;

const examIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V19.5a2.25 2.25 0 0 0 2.25 2.25h.75m0-3H12m-.75 3h.008v.008h-.008v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>`;

const courseIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
</svg>`;

export const siteContent: SiteContent = {
  hero: {
    title: "Education + Technology = Opportunity.",
    subtitle: "Nesta is a comprehensive set of tools that blends artificial intelligence with Socratic teaching methods. The platform encourages independent reasoning and deliberate practice, creating opportunities for students, teachers, and the nation at large.",
    primaryCta: {
      text: "Start Learning",
      link: "/login"
    },
    secondaryCta: {
      text: "Learn more",
      link: "#about"
    }
  },
  offerings: {
    title: "The Nesta Toolbox",
    description: "The tools Nesta offers are designed to supplement the teaching currently provided by educators. Every aspect of the platform can be leveraged as needed to optimize each student's experience.",
    cards: [
      {
        title: "AI-Powered Tutoring",
        description: "Students can converse with a personalized, AI powered tutor that is trained in the Socratic methood of teaching.",
        ctaText: "Open Tutor",
        ctaLink: "/login",
        icon: tutorIcon
      },
      {
        title: "BJC/BGCSE Practice Exams",
        description: "AI-Generated practice exams that mirror official questions with instant feedback.",
        ctaText: "Practice Now",
        ctaLink: "/login",
        icon: examIcon
      },
      {
        title: "Intro to AI Course",
        description: "A hands-on, beginner-friendly course that teaches the basics of Aritficial Intelligence.",
        ctaText: "Start the Course",
        ctaLink: "/login",
        icon: courseIcon
      }
    ]
  }
};