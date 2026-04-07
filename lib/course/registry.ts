import { Course } from "./types";

export const introToAICourse: Course = {
  id: "intro-to-ai",
  title: "Introduction to Artificial Intelligence (AI) 🤖",
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
          type: "hero",
          heading: "AI In Your Everyday Life",
          content: "AI is when machines mimic thinking — using data to make decisions without being explicitly told how.",
          uiHints: { motion: "parallax", cta: "See how it learns" },
          requiresCompletion: true
        },
        {
          type: "content",
          heading: "Defining Artificial Intelligence",
          content: "Artificial Intelligence (AI) is the science of making machines that can learn from data and make decisions like humans — without being explicitly told what to do. Traditional computer programs follow fixed instructions ('If this, then that'). AI systems, on the other hand, learn patterns from examples. This section introduces that distinction — what 'learning' means for a computer and why it's a big deal.",
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
          content: "Four moments that shaped how we think about AI—from asking whether machines can 'think,' to domain-specific superhuman performance, to the architectural breakthrough behind modern LLMs, and finally to mainstream, everyday use.",
          events: [
            {
              id: "1950-turing",
              year: "1950",
              description: "Alan Turing—British mathematician, WWII codebreaker, and computing pioneer—publishes \"Computing Machinery and Intelligence.\" Instead of debating 'Can machines think?' he proposes the Imitation Game (later called the Turing Test): if a text-only judge can't reliably tell a machine from a human, the machine should count as 'intelligent' for practical purposes. This reframed AI as a behavioral test rather than a philosophical argument."
            },
            {
              id: "1997-deepblue",
              year: "1997",
              description: "IBM's Deep Blue defeats reigning world chess champion Garry Kasparov 3.5–2.5 under standard tournament conditions. Deep Blue used massive search, custom hardware, and hand-crafted evaluation—superhuman in one narrow domain. The lesson: computers can far exceed us at tightly-defined tasks, but this is not general intelligence."
            },
            {
              id: "2017-transformer",
              year: "2017",
              description: "Google researchers release \"Attention Is All You Need,\" introducing the Transformer—an architecture that relies on self-attention instead of recurrence or convolutions. Transformers train faster in parallel and model long-range relationships, enabling large-scale language understanding. This becomes the foundation for today's LLMs."
            },
            {
              id: "2023-genai",
              year: "2023",
              description: "Generative AI goes mainstream. ChatGPT (launched late 2022) rapidly becomes a global phenomenon; in 2023, more capable models and APIs (e.g., GPT-4) accelerate real-world adoption. LLMs move from labs into classrooms, workplaces, and consumer apps, making AI assistance a daily experience."
            }
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
          content: "Large language models like ChatGPT don't 'understand' language the way humans do—they predict it, one token at a time. Every response you see is the result of this four-step cycle running thousands of times in sequence. Here's exactly what happens behind the scenes:",
          steps: [
            { 
              id: "tokens", 
              label: "Tokens", 
              desc: "Before the model can process anything, text must be converted into tokens—chunks of characters that the model can work with. A token might be a whole word like 'cat,' a fragment like 'un' in 'unusual,' or even a single punctuation mark. The phrase 'The sky is blue' might become ['The', ' sky', ' is', ' blue']. ChatGPT uses a tokenizer (trained on billions of examples) that balances common words and subword fragments, allowing it to handle any input—even made-up words or emojis—by breaking them into recognizable pieces." 
            },
            { 
              id: "context", 
              label: "Context", 
              desc: "Once tokenized, the model reads the sequence and builds a rich, mathematical representation of the context—what the conversation is about, the tone, the relationships between words, and what's most relevant right now. It does this using attention mechanisms: every token 'looks at' all the previous tokens and decides which ones matter most for predicting what comes next. For example, in 'The cat sat on the ___,' the model pays strong attention to 'cat' and 'sat on' to infer the answer is likely 'mat' or 'floor.' This context window (the number of tokens the model can 'remember') determines how much history it can consider—GPT-4, for instance, can process thousands of tokens at once." 
            },
            { 
              id: "probabilities", 
              label: "Probabilities", 
              desc: "With the context understood, the model generates a probability distribution over its entire vocabulary—tens of thousands of possible tokens. Each token gets a score representing how likely it is to come next based on the patterns the model learned during training. If the input is 'The capital of France is ___,' the model assigns very high probability to 'Paris,' moderate probability to 'located' or 'known,' and extremely low probability to random words like 'banana.' These probabilities come from billions of training examples where the model learned which words typically follow others in real human text. The result is a ranked list of candidates, each with a confidence score." 
            },
            { 
              id: "output", 
              label: "Output", 
              desc: "The model doesn't always pick the highest-probability token—that would make responses repetitive and robotic. Instead, it samples from the top candidates using a technique called temperature-controlled sampling. At low temperature, it picks more predictable tokens (useful for factual answers). At high temperature, it takes more creative risks (useful for brainstorming or storytelling). Once a token is chosen, it's added to the sequence, and the entire process repeats: the new token becomes part of the context, probabilities are recalculated, and the next token is selected. This loop continues until the model generates a stop token or reaches a length limit. That's how 'The capital of France is' becomes 'The capital of France is Paris, known for the Eiffel Tower and rich cultural history.'" 
            }
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
          content: "Prompts are how we 'talk' to AI. A good prompt gives **three key elements** that turn vague requests into focused, useful responses:\n\n**The Three Elements of a Great Prompt:**\n\n• **Role** – Tell the AI what expertise or perspective to adopt\n• **Context** – Explain the situation and what you need\n• **Constraints** – Define boundaries, format, length, or style requirements\n\n---\n\n**Example in Action:**\n\n*\"You are a professional email writer. Help me draft a polite follow-up email to a professor about a recommendation letter. Keep it under 100 words, professional but friendly, and mention that I submitted my application last week.\"*\n\n---\n\n**Breaking it Down:**\n\n| Element | What it Does | Example from Above |\n|---------|-------------|--------------------|\n| **Role** | Sets the AI's expertise | \"You are a professional email writer\" |\n| **Context** | Explains the situation | \"Help me draft a polite follow-up email to a professor about a recommendation letter\" |\n| **Constraints** | Defines boundaries and requirements | \"Under 100 words, professional but friendly, mention application submitted last week\" |\n\n---\n\nThis clarity helps the AI understand exactly what you need and how to format the response.\n\nNow, let's write one that could guide a study-helper bot.",
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
          content: "Every AI system goes through these three stages. At each point, human choices and limitations can introduce bias that affects the final model's behavior. Explore each stage to understand how bias enters and what we can do about it.",
          asset: { kind: "svg", src: "/assets/bias-pipeline.svg", alt: "AI development pipeline showing three stages where bias can enter" },
          hotspots: [
            { 
              id: "data", 
              x: 0.175, 
              y: 0.38, 
              title: "Data Collection", 
              body: "Bias starts here when training data isn't representative. If your dataset oversamples one demographic, underrepresents another, or reflects historical prejudices (like résumés from male-dominated industries), the AI learns those patterns as 'normal.' Diverse, balanced data is the foundation—but it's rarely perfect. Example: A facial recognition system trained mostly on lighter-skinned faces performs poorly on darker skin tones." 
            },
            { 
              id: "model", 
              x: 0.525, 
              y: 0.38, 
              title: "Model Training", 
              body: "Even with good data, bias can enter during training. If human labelers disagree or apply inconsistent standards (e.g., one person labels 'professional attire' differently than another), the model learns those inconsistencies as truth. Feature selection also matters: choosing age or zip code as inputs might correlate with protected attributes. Model architects must carefully audit which signals the AI learns from and how it weights them." 
            },
            { 
              id: "evaluation", 
              x: 0.85, 
              y: 0.38, 
              title: "Evaluation", 
              body: "A model might look accurate overall but fail specific groups. If your test set doesn't reflect real-world diversity—or if you only measure aggregate accuracy—you'll miss disparate performance. A loan approval model might have 95% accuracy overall but deny qualified applicants from certain neighborhoods at higher rates. Responsible evaluation requires disaggregated metrics: test across demographics, edge cases, and underrepresented groups." 
            }
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
      title: "AI in the Real World: Power and Limits",
      slides: [
        {
          type: "carousel",
          heading: "Where AI Shines",
          content: "AI performs best where there are lots of consistent patterns to learn from. In these domains, models spot structure in data and make useful predictions at scale.",
          items: [
            {
              label: "Healthcare (Medical Imaging)",
              caption: "Models trained on large, labeled scan datasets can flag patterns linked to disease (e.g., early tumor indicators). Radiologists use AI suggestions as a second set of eyes—not a final verdict."
            },
            {
              label: "Finance (Fraud Detection)",
              caption: "Anomaly-detection models watch transaction streams and compare them to normal behavior profiles, flagging suspicious deviations for review."
            },
            {
              label: "Language (Translation & Captions)",
              caption: "Sequence models (LLMs/ASR) map audio/text patterns to likely outputs, enabling real-time subtitles and multilingual communication."
            },
            {
              label: "Creativity (Idea Generation)",
              caption: "Generative models remix learned patterns to propose drafts, styles, and variations—useful for brainstorming before human editing."
            }
          ],
          uiHints: { motion: "slide", progress: true },
          requiresCompletion: true
        },

        {
          type: "flipcard",
          heading: "Where AI Struggles (And Why)",
          content: "AI predicts what seems likely from past data; it does not truly understand meaning, values, or context like humans. Flip each card to learn common failure modes.",
          cards: [
            {
              front: "Context & Common Sense",
              back: "Models can miss implied meaning (sarcasm, subtle humor, cultural references) because they match patterns rather than reason about real-world intent."
            },
            {
              front: "Bias in Training Data",
              back: "If examples are skewed or labels inconsistent, the model learns and amplifies that bias—leading to unfair or inaccurate outcomes."
            },
            {
              front: "Factual Errors (Hallucinations)",
              back: "LLMs sometimes generate plausible-sounding but incorrect statements when context is thin or the prompt is ambiguous."
            },
            {
              front: "Ambiguous Goals & Values",
              back: "Tasks requiring ethics, empathy, or trade-offs (e.g., policy writing, conflict mediation) depend on human judgment, not pattern matching."
            }
          ],
          requiresCompletion: true
        },

        {
          type: "drag-drop",
          heading: "Activity: AI or Human?",
          content: "Sort each task into the column where it is most reliable today. Use what you've learned about patterns, data, and context.",
          items: [
            { id: "tumor",     label: "Detect tumors in scans",               correctTarget: "ai" },
            { id: "sarcasm",   label: "Understand sarcasm in group chats",    correctTarget: "human" },
            { id: "emails",    label: "Sort emails by topic",                 correctTarget: "ai" },
            { id: "policy",    label: "Write school policy with trade-offs",  correctTarget: "human" },
            { id: "transcribe",label: "Transcribe a lecture accurately",      correctTarget: "ai" },
            { id: "mediate",   label: "Mediate a conflict between friends",   correctTarget: "human" }
          ],
          targets: [
            { id: "ai",    label: "AI does well" },
            { id: "human", label: "Humans do better" }
          ],
          uiHints: { snap: true, celebrateOnComplete: true },
          requiresCompletion: true
        },

        {
          type: "reflection",
          heading: "What Would You Trust AI To Do?",
          prompt: "Name one task in your life you'd trust AI to help with, and one you would not. Explain your reasoning using the ideas of patterns, data quality, and context.",
          saveKey: "m1_l4_reflection",
          requiresCompletion: true
        }
      ]
    },
    {
      lesson: 5,
      title: "Module 1 Knowledge Check",
      slides: [
        {
          type: "content",
          heading: "Test Your Understanding",
          content: "You've learned about AI fundamentals, how models work, responsible use, and real-world applications. This quiz will help you confirm your understanding of the key concepts from Module 1.\n\nYou'll need to get at least 8 out of 10 questions correct to pass.",
          requiresCompletion: true
        },
        {
          type: "quiz",
          heading: "Module 1 Final Quiz (10 Questions)",
          questions: [
            {
              id: "q1",
              q: "What is the main difference between traditional computer programs and AI systems?",
              options: [
                "AI systems are faster",
                "AI systems learn patterns from data instead of following fixed rules",
                "AI systems use more electricity",
                "Traditional programs are more accurate"
              ],
              answer: "AI systems learn patterns from data instead of following fixed rules",
              explain: "The key distinction is that AI learns from examples and data, while traditional programs follow explicit instructions written by humans."
            },
            {
              id: "q2",
              q: "Which of these is the correct hierarchy from broadest to most specific?",
              options: [
                "Deep Learning → Machine Learning → AI → LLMs",
                "AI → Machine Learning → Deep Learning → LLMs",
                "LLMs → AI → Machine Learning → Deep Learning",
                "Machine Learning → AI → LLMs → Deep Learning"
              ],
              answer: "AI → Machine Learning → Deep Learning → LLMs",
              explain: "AI is the broadest field. Machine Learning is a subset of AI. Deep Learning is a subset of ML using neural networks. LLMs are a specific type of deep learning model."
            },
            {
              id: "q3",
              q: "In the Netflix AI feedback loop, what happens in the 'Feedback' stage?",
              options: [
                "Netflix collects data about what you watch",
                "Netflix finds patterns in viewing behavior",
                "Netflix shows you recommendations",
                "Your actions (watching, skipping, quitting) teach the system what works"
              ],
              answer: "Your actions (watching, skipping, quitting) teach the system what works",
              explain: "The feedback stage closes the loop—your response to recommendations becomes new data that improves future predictions."
            },
            {
              id: "q4",
              q: "What breakthrough did the 2017 Transformer architecture introduce?",
              options: [
                "It beat humans at chess",
                "It used self-attention to model long-range relationships in text",
                "It created the first chatbot",
                "It made AI run on phones"
              ],
              answer: "It used self-attention to model long-range relationships in text",
              explain: "The Transformer's self-attention mechanism allows models to efficiently process longer sequences and understand context better, becoming the foundation for modern LLMs."
            },
            {
              id: "q5",
              q: "How do Large Language Models like ChatGPT generate responses?",
              options: [
                "They search the internet for answers",
                "They predict the next token based on patterns learned from training data",
                "They use a database of pre-written responses",
                "They understand meaning like humans do"
              ],
              answer: "They predict the next token based on patterns learned from training data",
              explain: "LLMs generate text by repeatedly predicting the most likely next token (word or word piece) based on the context, not by truly understanding meaning."
            },
            {
              id: "q6",
              q: "What are the three key elements of a good AI prompt?",
              options: [
                "Length, detail, examples",
                "Role, context, constraints",
                "Question, answer, feedback",
                "Data, pattern, prediction"
              ],
              answer: "Role, context, constraints",
              explain: "Good prompts define the AI's role (expertise), provide context (situation), and set constraints (format, length, style) to get focused, useful responses."
            },
            {
              id: "q7",
              q: "At which stage of the AI pipeline can bias NOT enter?",
              options: [
                "Data Collection",
                "Model Training",
                "Evaluation",
                "Bias can enter at all three stages"
              ],
              answer: "Bias can enter at all three stages",
              explain: "Bias can enter during data collection (unrepresentative data), model training (inconsistent labels, poor feature selection), and evaluation (non-diverse test sets)."
            },
            {
              id: "q8",
              q: "Which statement about AI is TRUE?",
              options: [
                "AI always produces correct answers",
                "AI understands meaning like humans do",
                "AI recognizes patterns but doesn't truly understand context",
                "AI will soon replace all human workers"
              ],
              answer: "AI recognizes patterns but doesn't truly understand context",
              explain: "AI matches statistical patterns in data—it doesn't reason, understand meaning, or grasp context the way humans do. This is why it can make errors and miss nuance."
            },
            {
              id: "q9",
              q: "For which task would AI likely perform BEST today?",
              options: [
                "Understanding sarcasm in a group chat",
                "Mediating a conflict between friends",
                "Sorting thousands of emails by topic",
                "Writing school policy involving ethical trade-offs"
              ],
              answer: "Sorting thousands of emails by topic",
              explain: "Email sorting is a pattern-recognition task with clear signals and lots of training data. The other tasks require human judgment, context, empathy, and understanding of nuance."
            },
            {
              id: "q10",
              q: "What does 'hallucination' mean in the context of LLMs?",
              options: [
                "When the model generates plausible-sounding but incorrect information",
                "When the model creates artistic images",
                "When the model becomes self-aware",
                "When the model runs too slowly"
              ],
              answer: "When the model generates plausible-sounding but incorrect information",
              explain: "LLMs sometimes generate factually incorrect statements that sound confident and believable, especially when context is thin or prompts are ambiguous. This is called hallucination."
            }
          ],
          passScore: 8,
          requiresCompletion: true
        },
        {
          type: "content",
          heading: "Congratulations!",
          content: "You've completed Module 1: What Is AI!\n\nYou now understand:\n\n• The difference between AI and traditional programming\n• How machine learning systems learn from data\n• How Large Language Models predict text\n• Where bias can enter AI systems\n• AI's strengths and limitations in real-world applications\n• How to write effective prompts\n\nYou're ready to move on to Module 2, where you'll dive deeper into the technical foundations of computing and build toward creating your own AI application.",
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

// Module 2: How Computers Learn
introToAICourse.modules.push({
  module: 2,
  title: "How Computers Learn",
  goal: "Build an intuitive understanding of how machines learn from data: labeling, features, training vs. inference, and evaluating models without heavy math.",
  duration: "~60–75 minutes",
  lessons: [
    // LESSON 1
    {
      lesson: 1,
      title: "Data & Labeling Basics",
      slides: [
        {
          type: "hero",
          heading: "Data Is the Fuel",
          content: "Before a computer can 'learn,' it needs examples. In supervised learning, we pair inputs (like images or sentences) with labels (like 'cat' or 'positive'). The quality of these labels—and how representative the data is—directly shapes what the model will learn.",
          asset: { kind: "svg", src: "/assets/labeled-data.svg", alt: "Examples of labeled data for supervised learning" }
        },
        {
          type: "flipcard",
          heading: "Key Terms:",
          content: "Flip the cards to get comfortable with the core vocabulary we'll use throughout building and testing models.",
          cards: [
            { front: "Data / Example", back: "A single item like an image, a sentence, or a set of numbers that the model sees." },
            { front: "Label", back: "The 'answer' the model should predict (e.g., 'cat', 'spam', 'positive')." },
            { front: "Dataset", back: "A collection of labeled (or unlabeled) examples used for training and evaluation." },
            { front: "Class Balance", back: "How evenly labels are represented (e.g., 50% cats / 50% dogs vs. 95% cats / 5% dogs)." }
          ],
          requiresCompletion: true
        },
        {
          type: "drag-drop",
          heading: "Activity: Good Data vs. Risky Data",
          content: "Sort each card into the column that best describes its quality. Use what you learned about representativeness, balance, and clarity.",
          items: [
            { id: "balanced", label: "Balanced classes (equal cats/dogs)", correctTarget: "good" },
            { id: "blurry",   label: "Very blurry images with wrong labels", correctTarget: "risky" },
            { id: "diverse",  label: "Diverse photos (lighting, angles)", correctTarget: "good" },
            { id: "skewed",   label: "95% cats / 5% dogs", correctTarget: "risky" },
            { id: "ambiguous",label: "Ambiguous labels ('maybe cat?')", correctTarget: "risky" },
            { id: "clear",    label: "Clear, human-checked labels", correctTarget: "good" }
          ],
          targets: [
            { id: "good",  label: "Good / Representative" },
            { id: "risky", label: "Risky / Misleading" }
          ],
          uiHints: { snap: true, celebrateOnComplete: true },
          requiresCompletion: true
        },
        {
          type: "reflection",
          heading: "Labeling Matters",
          prompt: "Think of a simple task (e.g., classify school subjects by difficulty). What would be a clear label? What might be a confusing label?",
          saveKey: "m2_l1_reflection",
          requiresCompletion: true
        }
      ]
    },

    // LESSON 2
    {
      lesson: 2,
      title: "From Examples to Models",
      slides: [
        {
          type: "diagram",
          heading: "Training vs. Inference",
          content: "Training is when the model learns from labeled examples and adjusts its internal parameters to reduce error. Inference is when the trained model uses what it learned to predict labels for new, unseen inputs.",
          asset: { kind: "svg", src: "TrainingVsInferenceDiagram", alt: "Training, freeze, and inference pipeline" },
          steps: [
            { id: "train",   label: "Training",  desc: "Show labeled examples → measure error → adjust parameters → repeat. The model 'learns' by seeing many examples (like cats, dogs, foxes) and continuously adjusting its internal weights to minimize mistakes. This phase is computationally expensive and time-consuming." },
            { id: "freeze",  label: "Freeze",    desc: "When performance stabilizes, we 'freeze' the learned parameters. The model stops learning and we save its weights. This locked-in knowledge becomes permanent—like taking a snapshot of everything it learned. No more adjustments happen after this point." },
            { id: "infer",   label: "Inference", desc: "Use the frozen model to predict labels for new inputs quickly. The model takes new, unseen data (like a mystery animal photo) and instantly predicts what it is based on the patterns it memorized during training. This is fast because there's no learning—just applying what it already knows." }
          ],
          uiHints: { motion: "stepper" },
          requiresCompletion: true
        },
        {
          type: "chart-playground",
          heading: "Learning Curves (Toy Sim)",
          content: "Move the slider to change the number of training examples. Observe how accuracy and overfitting/underfitting behavior change with dataset size.",
          controls: [{ type: "slider", id: "n_samples", min: 10, max: 10000, start: 200 }],
          chartModel: "learningCurve",
          explain: "With more high-quality data, models often generalize better—up to a point. Too little data → underfitting; too complex a model on small data → overfitting.",
          initialData: { accuracy: 0.75, samples: 200 },
          requiresCompletion: true
        },
        {
          type: "scenario",
          heading: "Split Your Data (Think Like a Builder)",
          scenario: "You've collected 2,000 labeled examples. How do you split them to both train and evaluate honestly?",
          choices: [
            { id: "all-train", text: "Use all 2,000 for training (0 for testing)" },
            { id: "train-test", text: "Use 1,600 for training, 400 for testing" },
            { id: "train-val-test", text: "Use 1,400 train, 300 validation, 300 test" }
          ],
          correctChoice: "train-val-test",
          feedback: {
            "all-train": "No test set means you can't tell if the model generalizes.",
            "train-test": "Better, but without validation you may overfit on the test.",
            "train-val-test": "Right. Validation helps tune choices; test stays clean to measure final performance."
          },
          requiresCompletion: true
        },
        {
          type: "quiz",
          heading: "Quick Check",
          questions: [
            { id: "q1", q: "Training is…", options: ["Making predictions with a finished model", "Learning from labeled examples by adjusting parameters"], answer: "Learning from labeled examples by adjusting parameters" },
            { id: "q2", q: "Inference is…", options: ["Learning from labels", "Using a trained model to make predictions on new inputs"], answer: "Using a trained model to make predictions on new inputs" }
          ],
          passScore: 2,
          requiresCompletion: true
        }
      ]
    },

    // LESSON 3
    {
      lesson: 3,
      title: "Features & Representations",
      slides: [
        {
          type: "flipcard",
          heading: "What Are Features?",
          content: "Models don't 'see' images or text like we do—they process numbers. Features are the numeric signals that describe inputs in a useful way.",
          cards: [
            { front: "Feature", back: "A numeric description of an input (e.g., word frequency, edge strength, average color)." },
            { front: "One-Hot", back: "A simple representation of categories as vectors (e.g., [0,0,1,0] for class #3)." },
            { front: "Embedding", back: "A dense vector capturing similarity (words with related meaning have closer vectors)." },
            { front: "Feature Engineering", back: "Choosing or crafting features that help a model learn more effectively." }
          ],
          requiresCompletion: true
        },
        {
          type: "diagram",
          heading: "Visualizing a Feature Space",
          content: "Imagine putting on AI Vision Glasses. The world you see becomes a grid of numbers and patterns instead of colors and shapes. Each dot or patch represents a feature the model thinks is important — brightness, edges, or texture. Similar examples, like cats or dogs, cluster together because their features look alike to the model.",
          asset: { kind: "svg", src: "AIVisionGlasses", alt: "AI Vision Glasses showing human vs AI perception" },
          steps: [
            { id: "points", label: "Points", desc: "Each example becomes a vector of numbers. When we plot these numbers as coordinates, each data point appears as a dot in space. For instance, if Feature 1 is 'edge patterns' and Feature 2 is 'color intensity,' every cat and dog gets positioned based on those measurements. Move the slider to see points organize from chaos into structure." },
            { id: "clusters", label: "Clusters", desc: "Similar vectors group together naturally. As the AI 'understanding' increases, cats cluster near other cats because they share similar feature values. Dogs form their own cluster. The visualization shows how training transforms mixed, overlapping data into organized, separated groups — this is what 'learning' looks like mathematically." },
            { id: "decision", label: "Decision Boundary", desc: "Models learn boundaries that separate classes in this space. The purple dashed line shows where the model 'draws the line' between categories. At 0%, it's messy and uncertain. At 100%, it's smooth and stable. This boundary is what the model uses to classify new examples — which side of the line does it fall on?" }
          ],
          uiHints: { motion: "stepper" },
          requiresCompletion: true
        },
        {
          type: "drag-drop",
          heading: "Pick Helpful Features",
          content: "Match each task to features that would likely help a simple model learn effectively.",
          items: [
            { id: "email-words", label: "Top word frequencies", correctTarget: "spam" },
            { id: "img-edges", label: "Edge/texture strength", correctTarget: "vision" },
            { id: "review-embedding", label: "Sentence embeddings", correctTarget: "sentiment" },
            { id: "color-hist", label: "Dominant colors", correctTarget: "vision" }
          ],
          targets: [
            { id: "spam", label: "Spam Filter (NLP)" },
            { id: "vision", label: "Image Classifier (Vision)" },
            { id: "sentiment", label: "Sentiment (NLP)" }
          ],
          uiHints: { snap: true, celebrateOnComplete: true },
          requiresCompletion: true
        },
        {
          type: "interactive-input",
          heading: "Your Turn: Describe Features",
          content: "Pick a task you care about (e.g., classify homework type). Write 2–3 features you'd use and why.",
          placeholder: "Example: word count, key phrases, section headers…",
          requiresCompletion: true
        }
      ]
    },

    // LESSON 4
    {
      lesson: 4,
      title: "Evaluate & Improve: Metrics & Error Analysis",
      slides: [
        {
          type: "hero",
          heading: "How Do We Know a Model Is Good?",
          content: "Training a model is only half the journey. We also need to measure how well it works—and learn where it fails—so we can improve data, features, thresholds, or the model itself. This lesson connects Lessons 1–3: data quality, training→inference, and feature spaces → into practical evaluation and iteration.",
          asset: { kind: "svg", src: "/assets/data-to-decision.svg", alt: "Evaluation loop" }
        },

        {
          type: "diagram",
          heading: "Confusion Matrix (Binary Classification)",
          content: "A confusion matrix summarizes predictions vs. reality. It helps you see true/false positives and negatives at a glance.",
          asset: { kind: "svg", src: "/assets/confusion-matrix.svg", alt: "2x2 confusion matrix" },
          steps: [
            { id: "tp", label: "True Positive", desc: "Model predicted POSITIVE and it was POSITIVE (correct detection)." },
            { id: "fp", label: "False Positive", desc: "Model predicted POSITIVE but it was actually NEGATIVE (false alarm)." },
            { id: "tn", label: "True Negative", desc: "Model predicted NEGATIVE and it was NEGATIVE (correct rejection)." },
            { id: "fn", label: "False Negative", desc: "Model predicted NEGATIVE but it was actually POSITIVE (missed case)." }
          ],
          uiHints: { motion: "stepper" },
          requiresCompletion: true
        },

        {
          type: "chart-playground",
          heading: "Threshold Matters: Precision vs. Recall (Toy Sim)",
          content: "Slide the decision threshold to see how precision and recall trade off. Lower threshold catches more positives (higher recall) but risks more false alarms (lower precision). Higher threshold does the opposite.",
          controls: [{ type: "slider", id: "threshold", min: 0, max: 100, start: 50 }],
          chartModel: "precisionRecallToy",
          explain: "There is no 'perfect' threshold. Pick based on what matters more for your task: missing positives vs. raising false alarms.",
          initialData: { threshold: 50, precision: 0.82, recall: 0.78 },
          requiresCompletion: true
        },

        {
          type: "scenario",
          heading: "Pick a Threshold for the Job",
          scenario: "Imagine a model that flags possibly unsafe school lab equipment. Which threshold strategy is best?",
          choices: [
            { id: "low", text: "Lower threshold: catch more risky cases; accept more false alarms." },
            { id: "mid", text: "Balanced threshold: moderate precision and recall." },
            { id: "high", text: "Higher threshold: fewer false alarms; risk missing some real issues." }
          ],
          correctChoice: "low",
          feedback: {
            "low": "Correct: in safety-critical cases, you often prioritize recall (catch more true risks), even if precision drops.",
            "mid": "Reasonable in neutral contexts, but safety tasks usually favor recall.",
            "high": "This minimizes false alarms but risks missing true hazards."
          },
          requiresCompletion: true
        },

        {
          type: "drag-drop",
          heading: "Error Triage: What Would You Fix First?",
          content: "Classify common failure examples into buckets so you can decide how to improve the system next.",
          items: [
            { id: "missing-class", label: "Model misses rare class (few labels)", correctTarget: "data" },
            { id: "spurious-cue", label: "Relies on background cue (wrong feature)", correctTarget: "features" },
            { id: "class-imbalance", label: "Too many negatives vs. positives", correctTarget: "data" },
            { id: "vague-labels", label: "Inconsistent or vague labeling", correctTarget: "data" },
            { id: "threshold-issue", label: "Good scores but wrong operational balance", correctTarget: "threshold" }
          ],
          targets: [
            { id: "data", label: "Improve Data (collect/balance/clean)" },
            { id: "features", label: "Improve Features/Representation" },
            { id: "threshold", label: "Tune Threshold/Operating Point" }
          ],
          uiHints: { snap: true, celebrateOnComplete: true },
          requiresCompletion: true
        }
      ]
    },

    // LESSON 5: Module 2 Knowledge Check
    {
      lesson: 5,
      title: "Module 2 Knowledge Check",
      slides: [
        {
          type: "content",
          heading: "Module 2 Knowledge Check — How Computers Learn",
          content: "You've learned about data, labels, training vs. inference, features, and evaluation metrics. This comprehensive quiz will test your understanding of all the key concepts from Module 2.\n\nYou'll need to get at least 8 out of 10 questions correct to pass and unlock Module 3.",
          requiresCompletion: true
        },
        {
          type: "quiz",
          heading: "Final Quiz (10 Questions)",
          questions: [
            {
              id: "q1",
              q: "Why are clear, representative labels important in supervised learning?",
              options: [
                "They make the app look nicer",
                "They directly shape what the model learns and how it generalizes",
                "They make training faster but don't affect performance"
              ],
              answer: "They directly shape what the model learns and how it generalizes",
              explain: "Labels define the target; poor labels teach the wrong patterns."
            },
            {
              id: "q2",
              q: "What is the key difference between training and inference?",
              options: [
                "Training learns parameters from labeled data; inference uses the trained model to predict on new inputs",
                "Training is faster than inference",
                "Inference requires labels and training does not"
              ],
              answer: "Training learns parameters from labeled data; inference uses the trained model to predict on new inputs",
              explain: "Training adjusts weights; inference applies them."
            },
            {
              id: "q3",
              q: "Which statement best describes a feature?",
              options: [
                "A numeric description that helps the model capture useful patterns",
                "A random visual decoration",
                "A label assigned by a human"
              ],
              answer: "A numeric description that helps the model capture useful patterns",
              explain: "Features translate raw inputs into signals a model can use."
            },
            {
              id: "q4",
              q: "In a feature space, points that are close together usually mean…",
              options: [
                "They are visually similar to humans only",
                "They share similar feature values and are likely the same or related class",
                "They must be mislabeled"
              ],
              answer: "They share similar feature values and are likely the same or related class",
              explain: "Closeness reflects similarity in the learned representation."
            },
            {
              id: "q5",
              q: "A confusion matrix helps you see…",
              options: [
                "Only model speed",
                "True/false positives and negatives across predictions",
                "Data download time"
              ],
              answer: "True/false positives and negatives across predictions",
              explain: "It summarizes prediction outcomes vs. ground truth."
            },
            {
              id: "q6",
              q: "If you lower the decision threshold for a positive class, what typically happens?",
              options: [
                "Recall increases; precision may decrease",
                "Precision increases; recall may decrease",
                "Both precision and recall always increase"
              ],
              answer: "Recall increases; precision may decrease",
              explain: "Lower thresholds catch more positives but admit more false alarms."
            },
            {
              id: "q7",
              q: "Your model misses many rare positive cases. What's the FIRST fix you'd try?",
              options: [
                "Collect more labeled examples of the rare class",
                "Increase batch size",
                "Use a prettier UI"
              ],
              answer: "Collect more labeled examples of the rare class",
              explain: "Data scarcity for a class causes misses; address class imbalance."
            },
            {
              id: "q8",
              q: "You discover the model is relying on a background shortcut (spurious cue). What should you improve?",
              options: [
                "Features/representation and dataset diversity",
                "The app icon",
                "Only the threshold"
              ],
              answer: "Features/representation and dataset diversity",
              explain: "Break shortcuts by diversifying data and improving representations."
            },
            {
              id: "q9",
              q: "Which split best supports honest evaluation and tuning?",
              options: [
                "Use all data for training",
                "Train/Test only",
                "Train/Validation/Test with a clean hold-out test set"
              ],
              answer: "Train/Validation/Test with a clean hold-out test set",
              explain: "Validation tunes choices; the test set measures final generalization."
            },
            {
              id: "q10",
              q: "If training accuracy is very high but test accuracy is low, you're likely seeing…",
              options: [
                "Underfitting",
                "Overfitting",
                "Perfect generalization"
              ],
              answer: "Overfitting",
              explain: "The model memorized training data but failed to generalize."
            }
          ],
          passScore: 8,
          requiresCompletion: true
        },
        {
          type: "content",
          heading: "Congratulations!",
          content: "You've completed Module 2: How Computers Learn!\n\nYou now understand:\n\n• How data quality and labels shape learning\n• The difference between training and inference\n• What features are and why they matter\n• How models organize data in feature spaces\n• Confusion matrices and evaluation metrics\n• The precision vs. recall trade-off\n• How to diagnose and fix common errors\n\nYou're ready to move on to Module 3: Talking to Machines, where you'll learn to communicate effectively with AI systems.",
          requiresCompletion: true
        }
      ]
    }
  ],
  moduleExit: {
    type: "badge",
    title: "ML Explorer",
    criteria: [
      "Completed data quality sort",
      "Explored learning curve sim",
      "Ran bias-variance playground",
      "Passed Module 2 quiz"
    ],
    unlocks: "Module 3: Inside the Machine"
  }
});

// Module 3: Inside the Machine — Neural Networks & LLMs
introToAICourse.modules.push({
  module: 3,
  title: "Inside the Machine — Neural Networks & LLMs",
  goal: "Understand how neural networks work, what makes them 'deep,' and how Large Language Models use these foundations to process and generate text.",
  duration: "~75 minutes",
  lessons: [
    // LESSON 1: The Brain Behind AI
    {
      lesson: 1,
      title: "The Brain Behind AI",
      slides: [
        {
          type: "hero",
          heading: "The Brain Behind AI",
          content: "Neural networks are inspired by how your brain works — millions of neurons firing together to recognize patterns, learn from experience, and make decisions.",
          asset: { kind: "svg", src: "/assets/brain-to-neural-network.svg", alt: "Human brain neurons transitioning to artificial neural network" },
          uiHints: { motion: "parallax", cta: "See how it works" },
          requiresCompletion: true
        },
        {
          type: "content",
          heading: "Biological vs Artificial Neurons",
          content: "Your brain contains about 86 billion neurons. Each neuron receives signals from other neurons, processes them, and sends its own signal forward. AI mimics this: artificial neurons receive inputs (numbers), process them with simple math, and output a number. The magic isn't in one neuron—it's in how millions of them work together, just like in your brain.",
          requiresCompletion: true
        },
        {
          type: "diagram",
          heading: "Comparing Brain and AI Neurons",
          content: "On the left: A biological neuron receives chemical signals through dendrites, processes them in the cell body, and fires an electrical signal down the axon. On the right: An artificial neuron receives numeric inputs, multiplies each by a weight, adds them up with a bias, and passes the result through an activation function to produce an output.",
          asset: { kind: "svg", src: "MiniBrainDiagram", alt: "Comparison of biological and artificial neurons" },
          steps: [
            { id: "bio", label: "Biological Neuron", desc: "Dendrites receive chemical signals from other neurons. The cell body processes these signals. If the combined signal is strong enough, the neuron fires an electrical pulse down the axon to other neurons." },
            { id: "artificial", label: "Artificial Neuron", desc: "Inputs (numbers) are multiplied by weights (importance). These weighted inputs are summed with a bias (threshold adjustment). The result passes through an activation function (like ReLU or sigmoid) to produce an output." }
          ],
          uiHints: { motion: "stepper" },
          requiresCompletion: true
        },
        {
          type: "drag-drop",
          heading: "Label the Neuron",
          content: "Drag the correct labels to match each part of the artificial neuron:",
          items: [
            { id: "input", label: "Input Values", correctTarget: "inputs" },
            { id: "weight", label: "Weights", correctTarget: "weights" },
            { id: "bias", label: "Bias", correctTarget: "bias" },
            { id: "activation", label: "Activation Function", correctTarget: "activation" },
            { id: "output", label: "Output", correctTarget: "output" }
          ],
          targets: [
            { id: "inputs", label: "Numbers coming in" },
            { id: "weights", label: "Multiply inputs" },
            { id: "bias", label: "Add offset" },
            { id: "activation", label: "Squash result" },
            { id: "output", label: "Final value" }
          ],
          requiresCompletion: true
        },
        {
          type: "content",
          heading: "Key Takeaway: Learning Through Connections",
          content: "Just like your brain strengthens connections between neurons when you practice a skill, AI strengthens the weights between artificial neurons during training. When you learn to ride a bike, your brain adjusts which neurons fire together. When AI learns to recognize a cat, it adjusts which weights are stronger. The learning process is surprisingly similar.",
          requiresCompletion: true
        }
      ]
    },

    // LESSON 2: Layers, Weights & Activations
    {
      lesson: 2,
      title: "Layers, Weights & Activations",
      slides: [
        {
          type: "content",
          heading: "How Data Flows Through a Network",
          content: "A neural network isn't just one neuron—it's organized in layers. Data enters through the input layer, passes through one or more hidden layers where the learning happens, and exits through the output layer with a prediction. Each connection between neurons has a weight (how important that connection is) and each neuron has a bias (a threshold for activation).",
          requiresCompletion: true
        },
        {
          type: "diagram",
          heading: "Forward and Backward Flow",
          content: "During training, data flows forward through the network to make a prediction. Then, the error flows backward to adjust the weights—this is called backpropagation. During inference (using the trained model), only the forward pass happens.",
          asset: { kind: "svg", src: "TrainingVsInferenceDiagram", alt: "Forward and backward data flow in neural networks" },
          steps: [
            { id: "forward", label: "Forward Pass", desc: "Data enters the input layer and flows forward through each layer. Each neuron processes its inputs using weights and activation functions. The final output layer produces a prediction." },
            { id: "error", label: "Calculate Error", desc: "During training, we compare the prediction to the true answer. The difference is the error—how wrong the model was. This error tells us how much to adjust the weights." },
            { id: "backward", label: "Backward Pass (Backpropagation)", desc: "The error flows backward through the network. Each layer calculates how much it contributed to the error and adjusts its weights accordingly. This is how the network learns." },
            { id: "inference", label: "Inference (Using the Model)", desc: "Once trained, only the forward pass happens. New data flows through the frozen weights to produce predictions. No learning occurs—just fast prediction." }
          ],
          uiHints: { motion: "stepper" },
          requiresCompletion: true
        },
        {
          type: "flipcard",
          heading: "Neural Network Vocabulary",
          content: "Flip each card to learn the key terms:",
          cards: [
            { 
              front: "Neuron", 
              back: "A single unit that receives inputs, applies weights and bias, then passes the result through an activation function to produce an output." 
            },
            { 
              front: "Weight", 
              back: "A number that determines how important a connection is. Larger weights mean stronger influence. Weights are adjusted during training." 
            },
            { 
              front: "Bias", 
              back: "An offset added to the weighted sum before activation. It helps the neuron activate even when inputs are zero, giving the network more flexibility." 
            },
            { 
              front: "Layer", 
              back: "A group of neurons organized together. Input layer receives data, hidden layers process it, output layer produces predictions." 
            },
            { 
              front: "Activation Function", 
              back: "A mathematical function that decides whether a neuron should 'fire.' Common ones: ReLU (turns negatives to zero), Sigmoid (squashes to 0-1)." 
            },
            { 
              front: "Backpropagation", 
              back: "The process of sending error information backward through the network to adjust weights. It's how the network learns from mistakes." 
            }
          ],
          uiHints: { layout: "grid-2x3" },
          requiresCompletion: true
        },
        {
          type: "drag-drop",
          heading: "Match the Term to Its Definition",
          content: "Test your understanding by matching each term to what it does:",
          items: [
            { id: "weight-item", label: "Weight", correctTarget: "importance" },
            { id: "bias-item", label: "Bias", correctTarget: "threshold" },
            { id: "activation-item", label: "Activation Function", correctTarget: "decision" },
            { id: "backprop-item", label: "Backpropagation", correctTarget: "learning" }
          ],
          targets: [
            { id: "importance", label: "Controls connection strength" },
            { id: "threshold", label: "Shifts when neuron fires" },
            { id: "decision", label: "Decides if neuron activates" },
            { id: "learning", label: "Adjusts weights from errors" }
          ],
          requiresCompletion: true
        },
        {
          type: "content",
          heading: "Why This Matters",
          content: "Understanding these building blocks helps you see how complex AI systems are just millions of simple operations working together. Each weight adjustment is tiny, but when you have thousands or millions of them happening across many layers, the network can learn remarkably complex patterns—from recognizing faces to writing essays.",
          requiresCompletion: true
        }
      ]
    },

    // LESSON 3: Deep Learning in Action
    {
      lesson: 3,
      title: "Deep Learning in Action",
      slides: [
        {
          type: "content",
          heading: "What Makes a Network 'Deep'?",
          content: "The term 'deep learning' simply means using neural networks with many hidden layers—often dozens or even hundreds. Each layer learns progressively more abstract features. Early layers might detect simple edges and colors. Middle layers combine those into shapes and textures. Final layers recognize complete objects like faces or cats.",
          requiresCompletion: true
        },
        {
          type: "diagram",
          heading: "From Pixels to Understanding",
          content: "Watch how a deep network processes an image in stages: Layer 1 sees raw pixels and detects edges. Layer 2 combines edges into shapes. Layer 3 recognizes textures like fur. Layer 4 identifies body parts. Final layer: 'That's a cat!' Each layer builds on the previous one, creating a hierarchy of understanding.",
          asset: { kind: "svg", src: "AIVisionGlasses", alt: "Hierarchical feature learning in deep networks" },
          steps: [
            { id: "pixels", label: "Raw Pixels", desc: "The image starts as a grid of numbers representing colors. Red, green, and blue values for each pixel. The network sees only numbers, not a picture." },
            { id: "edges", label: "Layer 1: Edges", desc: "First-layer neurons detect edges—where brightness changes sharply. Horizontal, vertical, and diagonal lines emerge. These are the simplest visual features." },
            { id: "shapes", label: "Layer 2: Shapes", desc: "Middle layers combine edges into shapes—circles, curves, corners. The network is building more complex representations from simple building blocks." },
            { id: "textures", label: "Layer 3: Textures & Patterns", desc: "Deeper layers recognize textures—fur, scales, wood grain. These patterns combine many shapes and give clues about what objects might be." },
            { id: "parts", label: "Layer 4: Object Parts", desc: "High-level layers detect eyes, ears, noses, wheels—recognizable components that belong to specific objects." },
            { id: "object", label: "Output: Object Recognition", desc: "The final layer combines all previous features: 'I see two eyes, pointed ears, whiskers, and fur texture arranged this way—that's a cat!' Each layer contributed essential information." }
          ],
          uiHints: { motion: "stepper" },
          requiresCompletion: true
        },
        {
          type: "hotspot",
          heading: "Visual Recognition Pipeline",
          content: "Click each layer to see what the network 'sees' as it processes an image:",
          hotspots: [
            {
              id: "layer1",
              x: 0.15,
              y: 0.3,
              title: "Layer 1: Edge Detection",
              body: "The first layer activates when it sees edges—horizontal lines, vertical lines, diagonals. It doesn't know what objects are yet, just that there are boundaries in the image. These are the simplest features."
            },
            {
              id: "layer2",
              x: 0.35,
              y: 0.3,
              title: "Layer 2: Shape Formation",
              body: "The second layer combines edges from Layer 1 into simple shapes—circles, rectangles, curves. Now the network is starting to see structure, but still not objects."
            },
            {
              id: "layer3",
              x: 0.55,
              y: 0.3,
              title: "Layer 3: Texture Recognition",
              body: "Layer 3 combines shapes to recognize textures and patterns—fur, scales, smooth surfaces. It's getting closer to understanding what things are made of."
            },
            {
              id: "layer4",
              x: 0.75,
              y: 0.3,
              title: "Layer 4: Part Detection",
              body: "Now the network recognizes object parts—eyes, ears, noses, paws. It knows what components exist but hasn't put them together yet."
            },
            {
              id: "output",
              x: 0.9,
              y: 0.3,
              title: "Output: Object Classification",
              body: "The final layer combines everything: 'I see two eyes, pointed ears, whiskers, and fur texture arranged in this pattern—that's a cat!' Each layer contributed to this conclusion."
            }
          ],
          requireAllViewed: true,
          requiresCompletion: true
        },
        {
          type: "reflection",
          heading: "Think Like the Network",
          prompt: "Describe a real-life example where humans learn in layers, building from simple to complex understanding. (For example: learning to read starts with letters, then words, then sentences, then stories.)",
          saveKey: "m3_l3_reflection",
          requiresCompletion: true
        },
        {
          type: "content",
          heading: "The Power of Depth",
          content: "More layers = more abstract thinking. A shallow network might only match simple patterns. A deep network can understand context, relationships, and complex concepts. This is why modern AI uses deep networks: they can learn representations that would be impossible to hand-code.",
          requiresCompletion: true
        }
      ]
    },

    // LESSON 4: What Are Large Language Models (LLMs)?
    {
      lesson: 4,
      title: "What Are Large Language Models (LLMs)?",
      slides: [
        {
          type: "content",
          heading: "Text as Data",
          content: "Large Language Models (LLMs) are specialized deep neural networks trained on massive amounts of text. Instead of recognizing images, they recognize patterns in language. Their core job: predict what word (or token) comes next. From that simple task, they learn grammar, facts, reasoning patterns, and even some common sense.",
          requiresCompletion: true
        },
        {
          type: "content",
          heading: "How LLMs Predict the Next Word",
          content: "Imagine you're reading: 'The cat sat on the ___.' Your brain instantly suggests 'mat,' 'chair,' or 'floor'—words that make sense in context. LLMs do the same thing, but they've read billions of sentences and learned which words follow which patterns. They don't 'know' facts—they predict what's most likely based on training data.",
          requiresCompletion: true
        },
        {
          type: "content",
          heading: "Next Word Prediction Game",
          content: "Now let's think like an LLM! Complete each sentence by choosing the most likely next word based on patterns you've seen before.",
          requiresCompletion: true
        },
        {
          type: "scenario",
          heading: "Prediction Challenge #1",
          scenario: "The sun rises in the ___",
          choices: [
            { id: "east", text: "east" },
            { id: "west", text: "west" },
            { id: "ocean", text: "ocean" },
            { id: "yesterday", text: "yesterday" }
          ],
          correctChoice: "east",
          feedback: {
            "east": "Correct! LLMs learn this from seeing 'sun rises in the east' many times in training data.",
            "west": "That's where it sets! The pattern 'sun rises in the east' is common in text.",
            "ocean": "Not quite. LLMs learn from common phrases like 'sun rises in the east.'",
            "yesterday": "That's a time, not a direction. The phrase 'sun rises in the east' appears frequently in training data."
          },
          requiresCompletion: true
        },
        {
          type: "scenario",
          heading: "Prediction Challenge #2",
          scenario: "She opened the door and ___",
          choices: [
            { id: "walked", text: "walked" },
            { id: "elephant", text: "elephant" },
            { id: "seven", text: "7" },
            { id: "because", text: "because" }
          ],
          correctChoice: "walked",
          feedback: {
            "walked": "Correct! Verbs typically follow 'and' after a subject performs an action. This is a common grammatical pattern.",
            "elephant": "A noun here doesn't make grammatical sense. Action verbs usually follow 'and' in this context.",
            "seven": "Numbers rarely follow 'and' in this sentence structure. The model expects a verb.",
            "because": "This conjunction doesn't fit the pattern. After 'and' in this context, an action verb is expected."
          },
          requiresCompletion: true
        },
        {
          type: "scenario",
          heading: "Prediction Challenge #3",
          scenario: "The Eiffel Tower is located in ___",
          choices: [
            { id: "paris", text: "Paris" },
            { id: "london", text: "London" },
            { id: "space", text: "space" },
            { id: "tuesday", text: "Tuesday" }
          ],
          correctChoice: "paris",
          feedback: {
            "paris": "Correct! This is a factual pattern the model learned—not because it 'knows' geography, but because it saw this phrase frequently in training data.",
            "london": "That's where Big Ben is! The model learned 'Eiffel Tower is in Paris' from many examples.",
            "space": "Creative, but LLMs learn from real-world text patterns. 'Eiffel Tower in Paris' is common.",
            "tuesday": "That's a day, not a place! The model learned location patterns from training data."
          },
          requiresCompletion: true
        },
        {
          type: "flipcard",
          heading: "Popular LLMs You Might Know",
          content: "These are some well-known Large Language Models:",
          cards: [
            {
              front: "ChatGPT (GPT-4)",
              back: "Developed by OpenAI. One of the most advanced conversational AI systems. Trained on hundreds of billions of words from books, websites, and articles."
            },
            {
              front: "Claude",
              back: "Created by Anthropic. Designed with a focus on being helpful, honest, and harmless. Uses constitutional AI training methods."
            },
            {
              front: "Gemini",
              back: "Built by Google DeepMind. Multimodal AI that can process text, images, audio, and video—not just text."
            },
            {
              front: "LLaMA",
              back: "Meta's open-source LLM family. Available for researchers and developers to use and customize."
            }
          ],
          uiHints: { layout: "grid-2x2" },
          requiresCompletion: true
        },
        {
          type: "content",
          heading: "Key Insight: Pattern Matching, Not Understanding",
          content: "LLMs don't actually 'understand' text the way you do. They recognize patterns: 'When I see these words in this order, these other words usually follow.' This is incredibly powerful—but it also means LLMs can confidently generate wrong answers if the pattern leads them astray. They predict; they don't reason.",
          requiresCompletion: true
        }
      ]
    },

    // LESSON 5: Training, Tokens, and Transformers
    {
      lesson: 5,
      title: "Training, Tokens, and Transformers",
      slides: [
        {
          type: "content",
          heading: "Breaking Text Into Tokens",
          content: "Before an LLM can process text, it breaks sentences into tokens—small chunks like words, parts of words, or punctuation. 'ChatGPT is amazing!' becomes ['Chat', 'G', 'PT', ' is', ' amazing', '!']. Why split words? It helps the model handle new words, typos, and languages it hasn't seen much of.",
          requiresCompletion: true
        },
        {
          type: "diagram",
          heading: "How Tokens Flow Through a Transformer",
          content: "Transformers are the architecture behind modern LLMs. They process all tokens in a sentence at once (not one by one) and use 'attention' to figure out which words relate to each other. For example, in 'The cat, which was orange, sat on the mat,' attention helps the model link 'which was orange' back to 'cat.'",
          asset: { kind: "svg", src: "PatternFinder", alt: "Transformer attention mechanism visualized" },
          steps: [
            { id: "tokenize", label: "Tokenization", desc: "Text is broken into tokens—words, word pieces, or punctuation. 'The cat sat' becomes ['The', ' cat', ' sat']. Each token gets converted to a number (token ID)." },
            { id: "embed", label: "Embedding", desc: "Each token ID is converted into a vector—a list of hundreds or thousands of numbers that capture the token's meaning. Similar words get similar vectors." },
            { id: "attention", label: "Attention", desc: "This is the magic: the model compares every token to every other token to figure out relationships. 'Orange' connects strongly to 'cat' because they're related. Attention creates weighted connections." },
            { id: "layers", label: "Multiple Layers", desc: "Transformers stack many attention layers (often 12–96 layers). Each layer refines the representation, capturing progressively more complex relationships and context." },
            { id: "predict", label: "Next Token Prediction", desc: "The final layer outputs a probability distribution over all possible next tokens. The model picks the most likely one: 'The cat sat on the ___' → 'mat' has high probability." }
          ],
          uiHints: { motion: "stepper" },
          requiresCompletion: true
        },
        {
          type: "flipcard",
          heading: "Transformer Vocabulary",
          content: "Flip each card to learn how transformers work:",
          cards: [
            {
              front: "Token",
              back: "A piece of text the model processes. Could be a word, part of a word, or punctuation. LLMs convert text to tokens before processing."
            },
            {
              front: "Embedding",
              back: "A vector (list of numbers) that represents a token's meaning in high-dimensional space. Similar words get similar embeddings."
            },
            {
              front: "Attention",
              back: "The mechanism that lets the model focus on relevant words in a sentence. It creates connections between related tokens, like linking pronouns to nouns."
            },
            {
              front: "Context Window",
              back: "The maximum amount of text the model can 'remember' at once. If your input is too long, the model forgets earlier parts. Typical windows: 4K-128K tokens."
            },
            {
              front: "Transformer",
              back: "The neural network architecture that uses attention to process sequences efficiently. It's what made modern LLMs possible."
            },
            {
              front: "Pre-training",
              back: "The phase where the model learns from billions of text examples. It predicts the next word over and over, adjusting billions of weights."
            }
          ],
          uiHints: { layout: "grid-2x3" },
          requiresCompletion: true
        },
        {
          type: "content",
          heading: "Why Transformers Changed Everything",
          content: "Before transformers, models processed text one word at a time, forgetting earlier context. Transformers process all words together and use attention to track relationships across long distances. This breakthrough made it possible to train LLMs on entire books, not just sentences. The result: AI that can hold conversations, write essays, and answer complex questions.",
          requiresCompletion: true
        },
        {
          type: "content",
          heading: "Training Scale",
          content: "Modern LLMs are trained on trillions of tokens—essentially reading the entire internet. Training takes months on thousands of high-powered GPUs and costs millions of dollars. But once trained, running the model (inference) is much cheaper, which is why you can chat with ChatGPT for free.",
          requiresCompletion: true
        }
      ]
    },

    // LESSON 6: Why It Works (and When It Doesn't)
    {
      lesson: 6,
      title: "Why It Works (and When It Doesn't)",
      slides: [
        {
          type: "content",
          heading: "The Strengths of LLMs",
          content: "LLMs excel at pattern recognition across language: writing drafts, summarizing text, translating languages, answering factual questions (when the pattern was in training data), and generating creative ideas. They're incredibly versatile because language is how humans express almost every concept.",
          requiresCompletion: true
        },
        {
          type: "flipcard",
          heading: "Where LLMs Struggle",
          content: "Flip each card to learn common failure modes:",
          cards: [
            {
              front: "Bias",
              back: "If training data contains biased text (stereotypes, prejudice), the model learns those patterns. It can generate biased outputs even without intending to."
            },
            {
              front: "Hallucinations",
              back: "When uncertain, LLMs don't say 'I don't know'—they generate plausible-sounding but incorrect answers. They prioritize fluency over accuracy."
            },
            {
              front: "Outdated Information",
              back: "LLMs only know what was in their training data. If they were trained in 2023, they won't know events from 2024."
            },
            {
              front: "No True Reasoning",
              back: "LLMs match patterns; they don't reason logically. They can fail at simple math, logic puzzles, or tasks requiring multi-step thinking."
            },
            {
              front: "Context Limits",
              back: "If your conversation exceeds the context window, the model forgets earlier parts. It can't remember everything forever."
            },
            {
              front: "Lack of Common Sense",
              back: "LLMs struggle with implicit knowledge humans have, like 'water is wet' or 'people need to breathe.' These aren't always explicit in text."
            }
          ],
          uiHints: { layout: "grid-2x3" },
          requiresCompletion: true
        },
        {
          type: "content",
          heading: "Spot the AI Mistake",
          content: "LLMs make different types of errors. Read each example and identify what went wrong. Understanding these failure modes helps you use AI more effectively.",
          requiresCompletion: true
        },
        {
          type: "scenario",
          heading: "AI Mistake #1: Letter Counting",
          scenario: "User: How many Rs are in 'strawberry'?\nAI: There are two Rs in strawberry.\n\nWhat type of error is this?",
          choices: [
            { id: "reasoning", text: "Reasoning failure" },
            { id: "hallucination", text: "Hallucination" },
            { id: "bias", text: "Bias" },
            { id: "outdated", text: "Outdated info" }
          ],
          correctChoice: "reasoning",
          feedback: {
            "reasoning": "Correct! The AI doesn't count letters; it pattern-matches. There are actually three Rs in 'strawberry'—this is a reasoning task LLMs often fail at.",
            "hallucination": "Close, but hallucination is when AI makes up information confidently. This is a reasoning error—the AI tried to count but failed.",
            "bias": "Bias is when training data skews outputs toward certain groups or perspectives. This is a reasoning/logic failure.",
            "outdated": "Outdated info is when the model doesn't know recent events. This is about logical reasoning, not missing data."
          },
          requiresCompletion: true
        },
        {
          type: "scenario",
          heading: "AI Mistake #2: Missing Recent Events",
          scenario: "User: Who won the 2024 election?\nAI: (Trained in 2023) Joe Biden won the 2020 election.\n\nWhat type of error is this?",
          choices: [
            { id: "outdated", text: "Outdated info" },
            { id: "hallucination", text: "Hallucination" },
            { id: "bias", text: "Bias" },
            { id: "context", text: "Context limit" }
          ],
          correctChoice: "outdated",
          feedback: {
            "outdated": "Correct! The model doesn't know events after its training cutoff. It answered about 2020 because that's what it learned. This is a knowledge cutoff issue.",
            "hallucination": "The AI didn't make up false info—it gave a related but outdated fact from before its training ended.",
            "bias": "Bias affects how the model presents information, not what timeframe it knows about.",
            "context": "Context limits are about conversation length, not missing recent data. This is a training cutoff issue."
          },
          requiresCompletion: true
        },
        {
          type: "scenario",
          heading: "AI Mistake #3: Made-Up Biography",
          scenario: "User: Tell me about Dr. Emily Rodriguez's award-winning research on solar cells.\nAI: [Generates detailed but completely made-up biography]\n\nWhat type of error is this?",
          choices: [
            { id: "hallucination", text: "Hallucination" },
            { id: "reasoning", text: "Reasoning failure" },
            { id: "bias", text: "Bias" },
            { id: "context", text: "Context limit" }
          ],
          correctChoice: "hallucination",
          feedback: {
            "hallucination": "Correct! The AI generated plausible-sounding but completely false information. When uncertain, LLMs often 'hallucinate' fluent nonsense rather than saying 'I don't know.'",
            "reasoning": "Reasoning failures are logic errors. This is hallucination—inventing convincing but fake information.",
            "bias": "Bias skews outputs based on training data patterns. This is hallucination—making up facts confidently.",
            "context": "Context limits are about forgetting earlier conversation. This is about inventing information that doesn't exist."
          },
          requiresCompletion: true
        },
        {
          type: "content",
          heading: "The Role of Humans",
          content: "LLMs are powerful tools, but they need human oversight. Humans must: verify facts, check for bias, add context the AI lacks, make ethical decisions, and catch errors. Think of LLMs as very smart pattern-matchers, not thinking beings. They help you work faster—but you're still in charge.",
          requiresCompletion: true
        },
        {
          type: "reflection",
          heading: "Your Responsibility",
          prompt: "Why do you think humans still need to guide and verify AI outputs? Give a specific example where you wouldn't trust AI alone.",
          saveKey: "m3_l6_reflection",
          requiresCompletion: true
        }
      ]
    },

    // LESSON 7: Module 3 Knowledge Check
    {
      lesson: 7,
      title: "Module 3 Knowledge Check",
      slides: [
        {
          type: "content",
          heading: "Module 3 Knowledge Check — Neural Networks & LLMs",
          content: "You've learned about neural networks, deep learning, and how Large Language Models work. This comprehensive quiz will test your understanding of all the key concepts from Module 3.\n\nYou'll need to get at least 8 out of 10 questions correct to pass and unlock Module 4.",
          requiresCompletion: true
        },
        {
          type: "quiz",
          heading: "Final Quiz (10 Questions)",
          questions: [
            {
              id: "q1",
              q: "Neural networks are inspired by:",
              options: [
                "Human brains",
                "Car engines",
                "Computer processors"
              ],
              answer: "Human brains",
              explain: "Neural networks mimic how biological neurons in the brain process and transmit signals."
            },
            {
              id: "q2",
              q: "In a neural network, a weight is:",
              options: [
                "The physical size of the computer",
                "A number showing how important a connection is",
                "The amount of time training takes"
              ],
              answer: "A number showing how important a connection is",
              explain: "Weights determine connection strength; larger weights = stronger influence."
            },
            {
              id: "q3",
              q: "'Deep' in deep learning refers to:",
              options: [
                "How difficult the math is",
                "Many layers in the neural network",
                "The depth of the ocean where data is stored"
              ],
              answer: "Many layers in the neural network",
              explain: "Deep learning uses neural networks with many hidden layers, each learning progressively abstract features."
            },
            {
              id: "q4",
              q: "Backpropagation is the process of:",
              options: [
                "Making the network run backwards",
                "Adjusting weights based on errors to improve predictions",
                "Deleting old data"
              ],
              answer: "Adjusting weights based on errors to improve predictions",
              explain: "Backpropagation sends error information backward through the network to update weights—this is how neural networks learn."
            },
            {
              id: "q5",
              q: "LLM stands for:",
              options: [
                "Large Language Model",
                "Long Learning Machine",
                "Limited Logic Module"
              ],
              answer: "Large Language Model",
              explain: "LLMs are specialized neural networks trained on massive amounts of text data."
            },
            {
              id: "q6",
              q: "The main task LLMs are trained to do is:",
              options: [
                "Predict the next word or token",
                "Store all facts perfectly",
                "Understand human emotions"
              ],
              answer: "Predict the next word or token",
              explain: "LLMs learn by predicting what word comes next in billions of text sequences."
            },
            {
              id: "q7",
              q: "In LLMs, tokens are:",
              options: [
                "Physical coins used to pay for computing",
                "Pieces of text the AI reads and processes",
                "Rewards given when the AI is correct"
              ],
              answer: "Pieces of text the AI reads and processes",
              explain: "Tokens are small chunks of text—words, parts of words, or punctuation—that the model processes."
            },
            {
              id: "q8",
              q: "Transformers help AI understand:",
              options: [
                "How to transform into robots",
                "Relationships between words in a sentence using attention",
                "Only individual words without context"
              ],
              answer: "Relationships between words in a sentence using attention",
              explain: "The attention mechanism in transformers lets models figure out which words relate to each other, even across long distances."
            },
            {
              id: "q9",
              q: "When an LLM gives a confident but incorrect answer, this is called:",
              options: [
                "A hallucination",
                "Perfect accuracy",
                "Backpropagation"
              ],
              answer: "A hallucination",
              explain: "Hallucinations occur when LLMs generate plausible-sounding but false information because they pattern-match without true understanding."
            },
            {
              id: "q10",
              q: "Human oversight of AI is important because:",
              options: [
                "AI always knows the right answer",
                "AI can be biased, make mistakes, and lack common sense",
                "Humans have nothing better to do"
              ],
              answer: "AI can be biased, make mistakes, and lack common sense",
              explain: "LLMs are powerful pattern-matchers but need human verification, ethical judgment, and contextual understanding."
            }
          ],
          passScore: 8,
          requiresCompletion: true
        },
        {
          type: "content",
          heading: "Congratulations!",
          content: "You've completed Module 3: Inside the Machine — Neural Networks & LLMs!\n\nYou now understand:\n\n• How neural networks mimic the human brain\n• What neurons, layers, weights, and biases do\n• How deep learning builds abstract understanding\n• What Large Language Models are and how they work\n• The role of tokens, attention, and transformers\n• Why LLMs make mistakes and need human oversight\n\nYou're ready to move on to Module 4, where you'll learn to communicate effectively with AI systems through prompt engineering.",
          requiresCompletion: true
        }
      ]
    }
  ],
  moduleExit: {
    type: "badge",
    title: "Neural Network Navigator",
    criteria: [
      "Labeled neuron diagram",
      "Matched neural network vocabulary",
      "Explored layered visual recognition",
      "Played next-word prediction game",
      "Identified AI mistakes and limitations",
      "Passed Module 3 quiz"
    ],
    unlocks: "Module 4: Talking to Machines"
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