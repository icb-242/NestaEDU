// Course and Module Types
export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
}

export interface Module {
  module: number;
  title: string;
  goal: string;
  duration: string;
  lessons: Lesson[];
  moduleExit?: ModuleExit;
}

export interface Lesson {
  lesson: number;
  title: string;
  slides: Slide[];
}

export interface ModuleExit {
  type: string;
  title: string;
  criteria: string[];
  unlocks: string;
}

// Asset Types
export interface Asset {
  kind: "svg" | "image" | "video";
  src: string;
  alt: string;
}

export interface UIHints {
  motion?: string;
  cta?: string;
  layout?: string;
  progress?: boolean;
  snap?: boolean;
  celebrateOnComplete?: boolean;
  orientation?: string;
  stepper?: boolean;
  pulse?: boolean;
}

// Slide Types
export interface BaseSlide {
  type: string;
  heading: string;
  content?: string;
  requiresCompletion?: boolean;
  uiHints?: UIHints;
}

export interface ContentSlide extends BaseSlide {
  type: "content";
}

export interface HeroSlide extends BaseSlide {
  type: "hero";
  asset?: Asset;
}

export interface CarouselSlide extends BaseSlide {
  type: "carousel";
  items: CarouselItem[];
}

export interface CarouselItem {
  label: string;
  caption: string;
}

export interface HotspotSlide extends BaseSlide {
  type: "hotspot";
  asset: Asset;
  hotspots: Hotspot[];
  requireAllViewed?: boolean;
}

export interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  body: string;
}

export interface FlipCardSlide extends BaseSlide {
  type: "flipcard";
  cards: FlipCard[];
}

export interface FlipCard {
  front: string;
  back: string;
}

export interface DiagramSlide extends BaseSlide {
  type: "diagram";
  asset: Asset;
  steps: DiagramStep[];
}

export interface DiagramStep {
  id: string;
  label: string;
  desc: string;
}

export interface ChartPlaygroundSlide extends BaseSlide {
  type: "chart-playground";
  controls: ChartControl[];
  chartModel: string;
  explain?: string;
  initialData: Record<string, any>;
}

export interface ChartControl {
  type: string;
  id: string;
  min: number;
  max: number;
  start: number;
}

export interface TimelineSlide extends BaseSlide {
  type: "timeline";
  events: TimelineEvent[];
}

export interface TimelineEvent {
  id: string;
  year: string;
  description: string;
}

export interface PromptWorkbenchSlide extends BaseSlide {
  type: "prompt-workbench";
  instructions: string;
  inputLabel: string;
  improvementHints: string[];
  aiEnabled?: boolean;
  saveKey: string;
}

export interface DragDropSlide extends BaseSlide {
  type: "drag-drop";
  items: DragDropItem[];
  targets: DragDropTarget[];
}

export interface DragDropItem {
  id: string;
  label: string;
  correctTarget: string;
}

export interface DragDropTarget {
  id: string;
  label: string;
}

export interface ScenarioSlide extends BaseSlide {
  type: "scenario";
  scenario: string;
  choices: ScenarioChoice[];
  correctChoice: string;
  feedback: Record<string, string>;
}

export interface ScenarioChoice {
  id: string;
  text: string;
}

export interface InteractiveInputSlide extends BaseSlide {
  type: "interactive-input";
  placeholder?: string;
  feedback?: string;
  saveKey?: string;
}

export interface ReflectionSlide extends BaseSlide {
  type: "reflection";
  prompt: string;
  saveKey: string;
}

export interface ChecklistSlide extends BaseSlide {
  type: "checklist";
  items: string[];
  requireAllChecked?: boolean;
}

export interface QuizSlide extends BaseSlide {
  type: "quiz";
  questions: QuizQuestion[];
  passScore?: number;
}

export interface QuizQuestion {
  id: string;
  q: string;
  options: string[];
  answer: string | string[];
  explain?: string;
  isMulti?: boolean;
}

// Union type for all slide types
export type Slide = 
  | ContentSlide
  | HeroSlide
  | CarouselSlide
  | HotspotSlide
  | FlipCardSlide
  | DiagramSlide
  | ChartPlaygroundSlide
  | TimelineSlide
  | PromptWorkbenchSlide
  | DragDropSlide
  | ScenarioSlide
  | InteractiveInputSlide
  | ReflectionSlide
  | ChecklistSlide
  | QuizSlide;
