import { Course } from "./types";

export const introToAICourse: Course = {
  id: "intro-to-ai",
  title: "Beginner to Builder 🤖",
  description: "A comprehensive introduction to Artificial Intelligence, from basic concepts to practical applications. Learn the inner workings of AI with the end goal of building your own AI-powered application.",
  modules: [],
};

// Module 1: What Is AI?
introToAICourse.modules.push({
  module: 1,
  title: "What Is AI?",
  goal: "Build an intuitive, visual understanding of Artificial Intelligence, Machine Learning, and Large Language Models — and recognize how these systems already shape daily life.",
  duration: "~70 minutes",
  lessons: [
    {
      lesson: 1,
      title: "What Exactly Is AI?",
      slides: [
        {
          type: "content",
          heading: "Defining Artificial Intelligence",
          content: "Artificial Intelligence (AI) is the science of making machines that can learn from data and make decisions like humans — without being explicitly told what to do. Traditional computer programs follow fixed instructions ('If this, then that'). AI systems, on the other hand, learn patterns from examples. This section introduces that distinction — what 'learning' means for a computer and why it's a big deal.",
          requiresCompletion: true
        },
        {
          type: "hero",
          heading: "AI In Your Everyday Life",
          content: "AI is when machines mimic thinking — using data to make decisions without being explicitly told how.",
          uiHints: { motion: "parallax", cta: "See how it learns" },
          requiresCompletion: true
        },
        {
          type: "content",
          heading: "Understanding the Vocabulary of AI",
          content: "AI is a big umbrella term that includes many subfields. The most common are Machine Learning, Deep Learning, and Large Language Models (LLMs). Each one builds upon the last, forming the stack of 'modern AI.'",
          requiresCompletion: true
        },
        {
          type: "flipcard",
          heading: "Key Terms You'll Hear Everywhere",
          cards: [
            { front: "Artificial Intelligence (AI)", back: "Artificial Intelligence is the field of computer science focused on building systems that can perform tasks that normally require human intelligence, such as reasoning, learning, perception, and decision-making." },
            { front: "Machine Learning (ML)", back: "Machine Learning is a subset of AI that enables computers to learn from data and improve their performance on a task over time without being explicitly programmed." },
            { front: "Deep Learning (DL)", back: "Deep Learning is a specialized form of machine learning that uses multi-layered neural networks to automatically learn complex patterns and representations from large amounts of data." },
            { front: "Large Language Model (LLM)", back: "A Large Language Model is a type of deep learning model trained on vast amounts of text data to understand and generate human-like language, enabling tasks like translation, summarization, and conversation." }
          ],
          uiHints: { layout: "grid-2x2" },
          requiresCompletion: true
        },
        {
          type: "hotspot",
          heading: "AI On Your Cell Phone",
          content: "Building on the examples you just saw, this phone illustrates where AI quietly runs on-device every day. Each feature uses the same cycle you'll learn throughout this course—collect data, learn a pattern, make a prediction, and improve with feedback.",
          asset: { kind: "svg", src: "/assets/phone-hotspots.svg", alt: "Phone with AI feature hotspots" },
          hotspots: [
            {
              id: "camera",
              x: 0.15,
              y: 0.15,
              title: "Camera (Computer Vision)",
              body: "Your camera uses AI models (like convolutional neural networks) trained on millions of images to detect faces, estimate landmarks (eyes, nose, mouth), and segment the background for portrait blur. This isn't a hand-written rule like 'if 3 circles, it's a face'—it's a learned pattern of pixel features. When you tap portrait mode or it auto-focuses on a face, that's the model making a prediction from patterns it learned."
            },
            {
              id: "gallery",
              x: 0.35,
              y: 0.15,
              title: "Photos/Gallery (On-Device Recognition)",
              body: "Your gallery can group photos by people, places, and scenes using on-device classifiers and embeddings—vector representations learned from images. Instead of rules like 'if lots of blue, it's sky,' it uses learned features to cluster similar photos and power search like 'beach' or 'dog.' Your edits and selections become feedback that improve future groupings."
            },
            {
              id: "maps",
              x: 0.55,
              y: 0.15,
              title: "Maps (Traffic Forecasting & Routing)",
              body: "Maps aggregates anonymous, real-time GPS signals plus historical data to forecast traffic and ETAs. ML models predict speeds on each road segment and how conditions will change. A search over possible routes then ranks options by predicted arrival time and reliability. When you follow or ignore a suggested route, that outcome becomes feedback to help future predictions."
            },
            {
              id: "keyboard",
              x: 0.6,
              y: 0.88,
              title: "Keyboard (Next-Word Prediction)",
              body: "The keyboard's suggestions come from a small language model trained on text to predict the next likely word from your context. Autocorrect chooses the most probable intended word based on character patterns and nearby words—again, probabilities learned from lots of examples. As you accept or reject suggestions, your device personalizes the model's preferences for your writing style."
            }
          ],
          requireAllViewed: true,
          requiresCompletion: true,
          uiHints: { motion: "stepper" }
        },
        {
          type: "content",
          heading: "Rule-Based vs Learning Systems",
          content: "Before AI, most software used rules written by humans. A calculator 'knows' math because humans encoded it. AI programs don't memorize—they detect patterns. For example, they 'notice' that certain shapes mean a face or that words like 'rainy' often follow 'cloudy.'",
          requiresCompletion: true
        },
        {
          type: "drag-drop",
          heading: "Rules or Learning?",
          content: "Sort these examples into the correct category:",
          items: [
            { id: "calculator", label: "Calculator", correctTarget: "rules" },
            { id: "chatgpt", label: "ChatGPT", correctTarget: "learning" },
            { id: "alarm", label: "Alarm Clock", correctTarget: "rules" },
            { id: "netflix", label: "Netflix", correctTarget: "learning" },
            { id: "camera", label: "Phone Camera (Face Unlock)", correctTarget: "learning" }
          ],
          targets: [
            { id: "rules", label: "Rule-Based" },
            { id: "learning", label: "Learning Systems" }
          ],
          uiHints: { snap: true, celebrateOnComplete: true },
          requiresCompletion: true
        },
        {
          type: "diagram",
          heading: "How Netflix's AI Feedback Loop Works",
          content: "Every AI learns through a loop: it collects data, finds patterns, makes predictions, and then learns from what happens next. Here's how that process unfolds every time you use Netflix — and how your actions complete the loop.",
          asset: { kind: "svg", src: "/assets/data-to-decision.svg", alt: "Netflix AI feedback loop diagram" },
          steps: [
            {
              id: "data",
              label: "Data – Collecting Information",
              desc: "Netflix begins by gathering detailed viewing data — what you watch, when, how long, when you pause, and what you skip. It also combines this with information from millions of other users. Each of these actions becomes a signal that tells the AI what kinds of content different people enjoy."
            },
            {
              id: "pattern",
              label: "Pattern – Finding Relationships",
              desc: "Using machine-learning models like collaborative filtering, Netflix looks for statistical patterns: 'Viewers who liked Stranger Things often liked Wednesday.' or 'People who watch comedies at night finish them more often than dramas.' It doesn't understand stories; it recognizes behavior patterns that predict preference."
            },
            {
              id: "prediction",
              label: "Prediction – Making Recommendations",
              desc: "When you open Netflix, its AI predicts what you are most likely to enjoy based on those patterns. The thumbnails on your homepage are ranked by probability — how confident the model is that you'll click or finish each show. Even the artwork can change to highlight elements you tend to respond to, such as a favorite actor."
            },
            {
              id: "feedback",
              label: "Feedback – Learning from Your Response",
              desc: "When you watch, skip, or quit a recommendation, Netflix records that as feedback. Watching the full episode reinforces the model's confidence; skipping it lowers it. Your behavior literally trains the system — each action updates what Netflix shows you next, completing the learning loop."
            }
          ],
          uiHints: { motion: "stepper" },
          requiresCompletion: true
        },
        {
          type: "reflection",
          heading: "Your Understanding",
          prompt: "In your own words, how is AI different from a normal computer program?",
          saveKey: "m1_l1_reflection",
          requiresCompletion: true
        }
      ]
    },
    {
      lesson: 2,
      title: "How AI Thinks (Without Thinking)",
      slides: [
        {
          type: "content",
          heading: "The Evolution of AI",
          content: "AI has been around for decades. From early chess-playing machines to self-driving cars, each step pushed computers closer to learning from experience rather than following instructions.",
          requiresCompletion: true
        },
        {
          type: "timeline",
          heading: "A Short History of Thinking Machines",
          content: "Key milestones in AI development:",
          events: [
            { id: "turing", year: "1950", description: "Alan Turing's question: 'Can machines think?'" },
            { id: "deepblue", year: "1997", description: "IBM's Deep Blue beats chess champion Garry Kasparov" },
            { id: "transformers", year: "2017", description: "Transformers enable true natural language understanding" },
            { id: "generative", year: "2023", description: "Generative AI reshapes creativity, productivity, and learning" }
          ],
          uiHints: { orientation: "horizontal" },
          requiresCompletion: true
        },
        {
          type: "content",
          heading: "How ChatGPT Actually Works",
          content: "ChatGPT doesn't 'understand' like humans — it predicts text based on patterns it learned from billions of examples. This section demonstrates how LLMs guess the next word in a sequence.",
          requiresCompletion: true
        },
        {
          type: "diagram",
          heading: "Predict the Next Token",
          content: "How language models work:",
          asset: { kind: "svg", src: "/assets/next-token.svg", alt: "Next token prediction" },
          steps: [
            { id: "tokens", label: "Tokens", desc: "Text is split into chunks" },
            { id: "context", label: "Context", desc: "The model analyzes nearby words" },
            { id: "probabilities", label: "Probabilities", desc: "Assigns scores to possible next tokens" },
            { id: "output", label: "Output", desc: "The highest-probability token is chosen and added" }
          ],
          uiHints: { motion: "pulse" },
          requiresCompletion: true
        },
        {
          type: "content",
          heading: "Game: 'Guess Like a Model'",
          content: "Let's see how it feels to 'think like AI.' When you fill in a missing word, you're doing the same thing — predicting the most likely continuation based on context.",
          requiresCompletion: true
        },
        {
          type: "interactive-input",
          heading: "Fill-in Game",
          content: "Complete the sentence: 'The sky is ___'",
          placeholder: "Type your guess and see how AI predicts the next word",
          saveKey: "m1_l2_pattern_game",
          requiresCompletion: true
        },
        {
          type: "content",
          heading: "Prompt Practice",
          content: "Prompts are how we 'talk' to AI. A good prompt gives role, context, and constraints. Let's write one that could guide a study-helper bot.",
          requiresCompletion: true
        },
        {
          type: "prompt-workbench",
          heading: "Prompt Workbench",
          instructions: "Write a prompt for a study helper that explains homework in 3 bullet points and gives one practice question.",
          inputLabel: "Your prompt",
          improvementHints: [
            "Add a role: 'You are a friendly study coach'",
            "Add a format: '3 bullet points'",
            "Add a topic: 'for grade 9 students'"
          ],
          aiEnabled: true,
          saveKey: "m1_l2_prompt1",
          requiresCompletion: true
        }
      ]
    },
    {
      lesson: 3,
      title: "Responsible & Realistic AI",
      slides: [
        {
          type: "content",
          heading: "The Myths and the Truths",
          content: "AI is powerful, but not magic. It doesn't 'think,' and it can make mistakes. This section clears up popular myths so students build a realistic understanding.",
          requiresCompletion: true
        },
        {
          type: "flipcard",
          heading: "Myths vs Reality",
          cards: [
            { front: "AI is always right", back: "False: AI depends on data quality." },
            { front: "AI understands like humans", back: "False: It recognizes patterns, not meaning." },
            { front: "AI will replace everyone", back: "False: It assists humans, not replaces them." },
            { front: "AI needs no supervision", back: "False: Humans guide, correct, and verify outputs." }
          ],
          requiresCompletion: true
        },
        {
          type: "content",
          heading: "Where Bias Hides",
          content: "AI reflects the data it's trained on. If the data is biased, the model's predictions will be too. Below are stages where bias can enter an AI system.",
          requiresCompletion: true
        },
        {
          type: "hotspot",
          heading: "Bias in the Pipeline",
          asset: { kind: "svg", src: "/assets/phone-hotspots.svg", alt: "Bias hotspots diagram" },
          hotspots: [
            { id: "data", x: 0.18, y: 0.42, title: "Data Collection", body: "If examples aren't diverse, predictions will be skewed." },
            { id: "model", x: 0.52, y: 0.30, title: "Model Training", body: "If labels are inconsistent, model learns errors." },
            { id: "evaluation", x: 0.78, y: 0.62, title: "Evaluation", body: "If testers share one perspective, model fails others." }
          ],
          requireAllViewed: true,
          requiresCompletion: true
        },
        {
          type: "reflection",
          heading: "Responsible Use",
          prompt: "What's one way you can use AI responsibly this week?",
          saveKey: "m1_l3_reflection",
          requiresCompletion: true
        }
      ]
    },
    {
      lesson: 4,
      title: "Mini-Lab & Knowledge Check",
      slides: [
        {
          type: "content",
          heading: "Final Prompt Challenge",
          content: "Now that you understand AI's structure and purpose, you'll design your own prompt to help someone learn — using everything you've discovered about data, predictions, and responsibility.",
          requiresCompletion: true
        },
        {
          type: "prompt-workbench",
          heading: "Prompt Workbench (Final)",
          instructions: "Improve your study-helper prompt using what you've learned.",
          inputLabel: "Your improved prompt",
          improvementHints: [
            "Role: 'You are a friendly study coach for grade 9.'",
            "Constraints: '3 bullet points, 1 practice question, <120 words'",
            "Context: 'Topic: Photosynthesis' (or any topic you choose)"
          ],
          aiEnabled: true,
          saveKey: "m1_l4_prompt_final",
          requiresCompletion: true
        },
        {
          type: "content",
          heading: "Checklist",
          content: "Before you move on, confirm you understand the core principles of AI.",
          requiresCompletion: true
        },
        {
          type: "checklist",
          heading: "Readiness Checklist",
          items: [
            "I can define AI in my own words",
            "I can describe how Netflix, Maps, and Chatbots use AI",
            "I understand that AI learns from data, not rules"
          ],
          requireAllChecked: true,
          requiresCompletion: true
        },
        {
          type: "quiz",
          heading: "Knowledge Check (5 Questions)",
          questions: [
            { id: "q1", q: "Which statement best describes Machine Learning?", options: ["Hard-coded rules only", "Learning patterns from data", "A social media app"], answer: "Learning patterns from data", explain: "ML improves by seeing many examples and minimizing errors." },
            { id: "q2", q: "LLMs like ChatGPT primarily predict…", options: ["The next token in text", "An image label", "GPS route times"], answer: "The next token in text" },
            { id: "q3", q: "More (high-quality) labeled data usually helps by…", options: ["Making it slower only", "Improving generalization/accuracy", "Increasing bias"], answer: "Improving generalization/accuracy" },
            { id: "q4", q: "Select the best example of AI in daily life:", options: ["Static calculator", "Netflix recommendations", "A paper map"], answer: "Netflix recommendations" },
            { id: "q5", q: "'Garbage in, garbage out' refers to…", options: ["Poor input data leads to poor outputs", "Throwing away computers", "AI is always wrong"], answer: "Poor input data leads to poor outputs" }
          ],
          passScore: 4,
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
      "Completed pattern game",
      "Submitted prompt",
      "Passed quiz"
    ],
    unlocks: "Module 2 – Computing Fundamentals"
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