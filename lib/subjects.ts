export const SUBJECT_DISPLAY_NAMES: Record<string, string> = {
  'bjc-math': 'BJC Mathematics',
  'bjc-general-science': 'BJC General Science',
  'bjc-health-science': 'BJC Health Science',
  'bgcse-math': 'BGCSE Mathematics',
  'bgcse-chemistry': 'BGCSE Chemistry',
  'bgcse-physics': 'BGCSE Physics',
  'bgcse-biology': 'BGCSE Biology',
  'bgcse-combined-science': 'BGCSE Combined Science',
}

export function getSubjectDisplayName(subjectRoute: string): string {
  return SUBJECT_DISPLAY_NAMES[subjectRoute] ?? subjectRoute
}
