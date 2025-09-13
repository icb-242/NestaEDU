import { Course } from "./types";

export const introToAICourse: Course = {
  id: "intro-to-ai",
  title: "Beginner to Builder 🤖",
  description: "A comprehensive introduction to Artificial Intelligence, from basic concepts to practical applications. Learn how AI works and build your own AI-powered applications.",
  modules: [],
};

// Add Module 1 data
introToAICourse.modules.push({
  module: 1,
  title: "What Is AI?",
  goal: "Build an intuitive, visual understanding of AI, ML, and LLMs—and spot AI in everyday life.",
  duration: "~60–75 minutes",
  lessons: [
    {
      lesson: 1,
      title: "AI, Everywhere",
      slides: [
        {
          type: "hero",
          heading: "Welcome to AI",
          content: "From recommendations to routes to smart replies—AI is quietly helping you all day.",
          asset: { kind: "svg", src: "/assets/data-to-decision.svg", alt: "High-level AI pipeline" },
          uiHints: { motion: "parallax", cta: "Start" }
        },
        {
          type: "carousel",
          heading: "Where do you see AI?",
          items: [
            { label: "Recommendations", caption: "'Because you watched…' or Discover Weekly" },
            { label: "Maps & Navigation", caption: "Predicts traffic & fastest routes" },
            { label: "Chat Assist", caption: "Drafts emails and replies" },
            { label: "Camera", caption: "Detects faces & blurs backgrounds" }
          ],
          uiHints: { motion: "slide", progress: true },
          requiresCompletion: true
        },
        {
          type: "hotspot",
          heading: "Tap to reveal: AI around a phone",
          asset: { kind: "svg", src: "/assets/phone-hotspots.svg" },
          hotspots: [
            { id: "cam",  x: 0.72, y: 0.18, title: "Camera",   body: "Edge detection and face recognition." },
            { id: "kb",   x: 0.48, y: 0.82, title: "Keyboard", body: "Next-word prediction and autocorrect." },
            { id: "maps", x: 0.25, y: 0.55, title: "Maps",     body: "Traffic forecasting from historical patterns." }
          ],
          requireAllViewed: true,
          requiresCompletion: true
        },
        {
          type: "reflection",
          heading: "Your AI moment today",
          prompt: "Describe one time you unknowingly used AI today.",
          saveKey: "m1_l1_reflection",
          requiresCompletion: true
        }
      ]
    },
    {
      lesson: 2,
      title: "Core Ideas: AI, ML, LLM",
      slides: [
        {
          type: "flipcard",
          heading: "Key terms (flip to learn)",
          cards: [
            { front: "Artificial Intelligence (AI)", back: "Making machines perform tasks that typically require human intelligence." },
            { front: "Machine Learning (ML)",        back: "Models learn from examples (data) to make predictions." },
            { front: "Deep Learning",                back: "ML using multi-layer neural networks to learn complex patterns." },
            { front: "Large Language Model (LLM)",   back: "A deep model trained on vast text to understand and generate language." }
          ],
          uiHints: { layout: "grid-2x2" },
          requiresCompletion: true
        },
        {
          type: "diagram",
          heading: "From Data to Decisions",
          content: "Data → Model learns patterns → Makes predictions",
          asset: { kind: "svg", src: "/assets/data-to-decision.svg" },
          steps: [
            { id: "data",    label: "Data",    desc: "Examples (text, images, numbers)" },
            { id: "train",   label: "Train",   desc: "Adjusts parameters to reduce errors" },
            { id: "predict", label: "Predict", desc: "Applies what it learned to new inputs" }
          ],
          uiHints: { motion: "stepper" },
          requiresCompletion: true
        },
        {
          type: "chart-playground",
          heading: "Why more data often helps",
          content: "Move the slider to see how accuracy can change with more labeled examples.",
          controls: [{ type: "slider", id: "n_samples", min: 10, max: 10000, start: 200 }],
          chartModel: "learningCurve",
          explain: "Generally, more quality data improves performance—up to a point.",
          initialData: { accuracy: 0.8, samples: 200 },
          requiresCompletion: true
        }
      ]
    },
    {
      lesson: 3,
      title: "How ChatGPT Works (Intuition, not math)",
      slides: [
        {
          type: "timeline",
          heading: "Milestones that led to modern LLMs",
          content: "A few key advances brought us to today's general-purpose models.",
          events: [
            { id: "turing",       year: "1950",      description: "'Can machines think?' sparks AI inquiry." },
            { id: "transformers", year: "2017",      description: "Self-attention architecture supercharges language models." },
            { id: "llm",          year: "2020–2025", description: "Powerful general-purpose models become widely available." }
          ],
          uiHints: { orientation: "horizontal" },
          requiresCompletion: true
        },
        {
          type: "diagram",
          heading: "Predict the next token",
          content: "Given a sequence of tokens, an LLM predicts the most likely next token.",
          asset: { kind: "svg", src: "/assets/next-token.svg" },
          steps: [
            { id: "tokens",  label: "Tokens",       desc: "Text is split into small pieces" },
            { id: "context", label: "Context",      desc: "Model considers nearby tokens (attention)" },
            { id: "prob",    label: "Probabilities", desc: "Scores each possible next token" }
          ],
          uiHints: { motion: "pulse" },
          requiresCompletion: true
        },
        {
          type: "prompt-workbench",
          heading: "Try prompting (mini workbench)",
          instructions: "Write a prompt for a study helper that explains homework in 3 bullet points and gives one practice question.",
          inputLabel: "Your prompt",
          improvementHints: [
            "Add role or style: 'You are a helpful study coach…'",
            "Add constraints: '3 bullet points, <100 words'",
            "Add context: audience, goal, examples"
          ],
          aiEnabled: true,
          saveKey: "m1_l3_prompt1",
          requiresCompletion: true
        }
      ]
    },
    {
      lesson: 4,
      title: "AI in the Real World (Hands-on)",
      slides: [
        {
          type: "drag-drop",
          heading: "Match the tool to the AI area",
          content: "Drag each app to the category that fits best.",
          items: [
            { id: "translate", label: "Google Translate",     correctTarget: "nlp" },
            { id: "spotify",   label: "Spotify Mixes",        correctTarget: "rec" },
            { id: "faceid",    label: "Phone Unlock (FaceID)",correctTarget: "cv" },
            { id: "chatgpt",   label: "ChatGPT",              correctTarget: "llm" }
          ],
          targets: [
            { id: "nlp", label: "Language (NLP)" },
            { id: "rec", label: "Recommendations" },
            { id: "cv",  label: "Computer Vision" },
            { id: "llm", label: "Large Language Models" }
          ],
          uiHints: { snap: true, celebrateOnComplete: true },
          requiresCompletion: true
        },
        {
          type: "scenario",
          heading: "Branching: Choose your helper",
          scenario: "You're late for school and need to plan a route that avoids traffic and finds a coffee stop. Which tool do you open first?",
          choices: [
            { id: "maps",    text: "Maps" },
            { id: "search",  text: "Search" },
            { id: "chatbot", text: "Chatbot" }
          ],
          correctChoice: "maps",
          feedback: {
            "maps": "Correct: it gives real-time traffic and ETA.",
            "search": "Search can help, but it's slower than live routing.",
            "chatbot": "A chatbot can help, but apps with live data are better here."
          },
          requiresCompletion: true
        },
        {
          type: "interactive-input",
          heading: "Design an AI helper",
          content: "Describe a simple daily problem. How might AI solve it?",
          placeholder: "Keep it small & specific. Define inputs/outputs. Who benefits?",
          requiresCompletion: true
        }
      ]
    },
    {
      lesson: 5,
      title: "Responsible & Realistic AI",
      slides: [
        {
          type: "flipcard",
          heading: "Myths vs. Reality",
          cards: [
            { front: "AI is always right",           back: "False. Models can be biased or hallucinate." },
            { front: "AI understands like humans",   back: "Not quite. It recognizes patterns, not meaning." },
            { front: "Data quality doesn't matter",  back: "Garbage in, garbage out. Data quality is critical." }
          ],
          requiresCompletion: true
        },
        {
          type: "hotspot",
          heading: "Where bias can sneak in",
          asset: { kind: "svg", src: "/assets/phone-hotspots.svg" },
          hotspots: [
            { id: "data",  x: 0.18, y: 0.42, title: "Training data", body: "Skewed datasets → skewed outputs" },
            { id: "prompt",x: 0.52, y: 0.30, title: "Prompting",     body: "Leading instructions bias results" },
            { id: "eval",  x: 0.78, y: 0.62, title: "Evaluation",    body: "Who judges 'good' can bias outcomes" }
          ],
          requireAllViewed: true,
          requiresCompletion: true
        },
        {
          type: "reflection",
          heading: "Responsible use",
          prompt: "Name one way you can use AI more responsibly this week.",
          saveKey: "m1_l5_reflection",
          requiresCompletion: true
        }
      ]
    },
    {
      lesson: 6,
      title: "Mini-Lab: Get Ready to Build",
      slides: [
        {
          type: "prompt-workbench",
          heading: "Craft a helpful prompt (you'll reuse this later)",
          instructions: "Write a prompt for a study helper that explains homework in 3 bullet points and gives one practice question.",
          inputLabel: "Your prompt",
          improvementHints: [
            "Role: 'You are a friendly study coach for grade 9.'",
            "Constraints: '3 bullet points, 1 practice question, <120 words'",
            "Context: 'Topic: Photosynthesis' (or any topic you choose)"
          ],
          aiEnabled: true,
          saveKey: "m1_l6_prompt_final",
          requiresCompletion: true
        },
        {
          type: "checklist",
          heading: "Readiness checklist",
          items: [
            "I can explain AI, ML, and LLM in plain words",
            "I've written at least one solid prompt",
            "I understand basic tradeoffs (cost, speed, accuracy)"
          ],
          requireAllChecked: true,
          requiresCompletion: true
        },
        {
          type: "quiz",
          heading: "Module 1 Knowledge Check",
          questions: [
            { id: "q1", q: "Which statement best describes Machine Learning?", options: ["Hard-coded rules only", "Learning patterns from data", "A social media app"], answer: "Learning patterns from data",  explain: "ML improves by seeing many examples and minimizing errors." },
            { id: "q2", q: "LLMs like ChatGPT primarily predict…", options: ["The next token in text", "An image label", "GPS route times"], answer: "The next token in text" },
            { id: "q3", q: "More (high-quality) labeled data usually helps by…", options: ["Making it slower only", "Improving generalization/accuracy", "Increasing bias"], answer: "Improving generalization/accuracy" },
            { id: "q4", q: "Select the best example of AI in daily life:", options: ["Static calculator", "Netflix recommendations", "A paper map"], answer: "Netflix recommendations" },
            { id: "q5", q: "'Garbage in, garbage out' refers to…", options: ["Poor input data leads to poor outputs", "Throwing away computers", "AI is always wrong"], answer: "Poor input data leads to poor outputs" },
            { id: "q6", q: "Why add constraints to prompts (e.g., word limits, bullet points)?", options: ["To reduce clarity", "To steer structure and usefulness", "To make AI fail"], answer: "To steer structure and usefulness" }
          ],
          passScore: 5,
          requiresCompletion: true
        }
      ]
    }
  ],
  moduleExit: {
    type: "badge",
    title: "AI Explorer",
    criteria: [
      "Viewed all hotspots",
      "Completed drag–drop",
      "Submitted mini-lab prompt",
      "Passed knowledge check"
    ],
    unlocks: "Module 2: Computing Fundamentals"
  }
});

export function getCourseById(id: string): Course | null {
  switch (id) {
    case "intro-to-ai":
      return introToAICourse;
    default:
      return null;
  }
}

export function listModules(courseId: string): Course["modules"] {
  const course = getCourseById(courseId);
  return course?.modules ?? [];
}