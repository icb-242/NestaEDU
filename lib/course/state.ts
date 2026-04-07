// Types for module progress
interface ModuleProgress {
  completedSlideIds: string[];
}

// Load progress from localStorage (or return empty progress if none exists)
export function loadModuleProgress(courseId: string, moduleId: number): ModuleProgress {
  if (typeof window === 'undefined') {
    return { completedSlideIds: [] };
  }

  const key = `course_progress_${courseId}_module_${moduleId}`;
  const stored = localStorage.getItem(key);
  
  if (!stored) {
    return { completedSlideIds: [] };
  }

  try {
    return JSON.parse(stored);
  } catch {
    return { completedSlideIds: [] };
  }
}

// Save progress to localStorage
export function saveModuleProgress(courseId: string, moduleId: number, progress: ModuleProgress): void {
  if (typeof window === 'undefined') return;

  const key = `course_progress_${courseId}_module_${moduleId}`;
  localStorage.setItem(key, JSON.stringify(progress));
}

// Mark a slide as completed
export function markSlideCompleted(courseId: string, moduleId: number, slideId: string): void {
  const progress = loadModuleProgress(courseId, moduleId);
  
  if (!progress.completedSlideIds.includes(slideId)) {
    progress.completedSlideIds.push(slideId);
    saveModuleProgress(courseId, moduleId, progress);
  }
}

// Alias for consistency with SlideRenderer
export const markSlideComplete = markSlideCompleted;

// Check if a slide is completed
export function isSlideCompleted(courseId: string, moduleId: number, slideId: string): boolean {
  const progress = loadModuleProgress(courseId, moduleId);
  return progress.completedSlideIds.includes(slideId);
}

// Save quiz score
export function saveQuizScore(courseId: string, moduleId: number, quizId: string, score: { correct: number; total: number }): void {
  if (typeof window === 'undefined') return;

  const key = `quiz_score_${courseId}_module_${moduleId}_${quizId}`;
  localStorage.setItem(key, JSON.stringify(score));
}

// Load quiz score
export function loadQuizScore(courseId: string, moduleId: number, quizId: string): { correct: number; total: number } | null {
  if (typeof window === 'undefined') return null;

  const key = `quiz_score_${courseId}_module_${moduleId}_${quizId}`;
  const stored = localStorage.getItem(key);
  
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

// Reset progress for a module
export function resetModuleProgress(courseId: string, moduleId: number): void {
  saveModuleProgress(courseId, moduleId, { completedSlideIds: [] });
}





