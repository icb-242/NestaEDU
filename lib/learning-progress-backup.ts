// Learning progress management utilities

export interface ModuleProgress {
  moduleId: string
  completedSections: string[] // Changed from number[] to string[] (section IDs)
  totalSections: number
  completed: boolean
  completedAt?: Date
  timeSpent?: number // in minutes
}

export interface CourseProgress {
  courseId: string
  modules: Record<string, ModuleProgress>
  overallProgress: number
  startedAt: Date
  lastAccessedAt: Date
}

class LearningProgressManager {
  private getStorageKey(courseId: string): string {
    return `learning_progress_${courseId}`
  }

  private async getCurrentUserId(): Promise<string | null> {
    try {
      const userEmail = localStorage.getItem("userEmail")
      return userEmail || null
    } catch (error) {
      console.warn("Could not get current user ID:", error)
      return null
    }
  }

  // Sync progress with database
  private async syncWithDatabase(courseId: string, progress: CourseProgress): Promise<void> {
    try {
      const userId = await this.getCurrentUserId()
      if (!userId) return

      // Sync each module with the database
      const syncPromises = Object.values(progress.modules).map(async (moduleProgress) => {
        try {
          const response = await fetch('/api/learning-progress', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              courseId,
              moduleId: moduleProgress.moduleId,
              completedSections: moduleProgress.completedSections,
              totalSections: moduleProgress.totalSections,
              completed: moduleProgress.completed,
              completedAt: moduleProgress.completedAt?.toISOString(),
              timeSpent: moduleProgress.timeSpent || 0
            })
          })

          if (!response.ok) {
            console.warn(`Failed to sync module ${moduleProgress.moduleId}:`, response.statusText)
          }
        } catch (error) {
          console.warn(`Error syncing module ${moduleProgress.moduleId}:`, error)
        }
      })

      await Promise.allSettled(syncPromises)
    } catch (error) {
      console.warn("Database sync failed, using localStorage only:", error)
    }
  }

  // Load progress from database
  private async loadFromDatabase(courseId: string): Promise<CourseProgress | null> {
    try {
      const userId = await this.getCurrentUserId()
      if (!userId) return null

      const response = await fetch(`/api/learning-progress?userId=${userId}&courseId=${courseId}`)
      if (!response.ok) return null

      const dbProgress = await response.json()
      if (!Array.isArray(dbProgress) || dbProgress.length === 0) return null

      // Convert database format to CourseProgress format
      const modules: Record<string, ModuleProgress> = {}
      let startedAt = new Date()
      let lastAccessedAt = new Date()

      dbProgress.forEach((moduleData: any) => {
        modules[moduleData.module_id] = {
          moduleId: moduleData.module_id,
          completedSections: Array.isArray(moduleData.completed_sections) ? moduleData.completed_sections : [],
          totalSections: moduleData.total_sections || 0,
          completed: moduleData.completed || false,
          completedAt: moduleData.completed_at ? new Date(moduleData.completed_at) : undefined,
          timeSpent: moduleData.time_spent || 0
        }

        // Track earliest start and latest access
        const createdAt = new Date(moduleData.created_at)
        const updatedAt = new Date(moduleData.updated_at)
        if (createdAt < startedAt) startedAt = createdAt
        if (updatedAt > lastAccessedAt) lastAccessedAt = updatedAt
      })

      // Calculate overall progress
      const totalSections = Object.values(modules).reduce((sum, module) => sum + module.totalSections, 0)
      const completedSections = Object.values(modules).reduce((sum, module) => sum + module.completedSections.length, 0)
      const overallProgress = totalSections > 0 ? (completedSections / totalSections) * 100 : 0

      return {
        courseId,
        modules,
        overallProgress,
        startedAt,
        lastAccessedAt
      }
    } catch (error) {
      console.warn("Failed to load from database:", error)
      return null
    }
  }

  // Get course progress (tries database first, falls back to localStorage)
  async getCourseProgress(courseId: string): Promise<CourseProgress | null> {
    try {
      // Try to load from database first
      const dbProgress = await this.loadFromDatabase(courseId)
      if (dbProgress) {
        // Also update localStorage with fresh data
        this.saveCourseProgress(courseId, dbProgress)
        return dbProgress
      }

      // Fall back to localStorage
      const stored = localStorage.getItem(this.getStorageKey(courseId))
      if (!stored) return null

      const progress = JSON.parse(stored)
      return {
        ...progress,
        startedAt: new Date(progress.startedAt),
        lastAccessedAt: new Date(progress.lastAccessedAt),
        modules: Object.fromEntries(
          Object.entries(progress.modules).map(([key, module]: [string, any]) => [
            key,
            {
              ...module,
              completedAt: module.completedAt ? new Date(module.completedAt) : undefined
            }
          ])
        )
      }
    } catch (error) {
      console.error('Error loading course progress:', error)
      return null
    }
  }

  // Save course progress to localStorage and sync with database
  saveCourseProgress(courseId: string, progress: CourseProgress): void {
    try {
      localStorage.setItem(this.getStorageKey(courseId), JSON.stringify(progress))
      
      // Async sync with database (don't await to keep UI responsive)
      this.syncWithDatabase(courseId, progress).catch(error => {
        console.warn("Background database sync failed:", error)
      })
    } catch (error) {
      console.error('Error saving course progress:', error)
    }
  }

  // Initialize course progress
  async initializeCourseProgress(courseId: string, moduleIds: string[]): Promise<CourseProgress> {
    const existingProgress = await this.getCourseProgress(courseId)
    
    if (existingProgress) {
      // Update last accessed time
      existingProgress.lastAccessedAt = new Date()
      this.saveCourseProgress(courseId, existingProgress)
      return existingProgress
    }

    // Create new progress
    const newProgress: CourseProgress = {
      courseId,
      modules: {},
      overallProgress: 0,
      startedAt: new Date(),
      lastAccessedAt: new Date()
    }

    // Initialize all modules
    moduleIds.forEach(moduleId => {
      newProgress.modules[moduleId] = {
        moduleId,
        completedSections: [],
        totalSections: 0,
        completed: false
      }
    })

    this.saveCourseProgress(courseId, newProgress)
    return newProgress
  }

  // Get module progress
  async getModuleProgress(courseId: string, moduleId: string): Promise<ModuleProgress | null> {
    const courseProgress = await this.getCourseProgress(courseId)
    return courseProgress?.modules[moduleId] || null
  }

  // Update module progress
  async updateModuleProgress(
    courseId: string, 
    moduleId: string, 
    updates: Partial<ModuleProgress>
  ): Promise<void> {
    const courseProgress = await this.getCourseProgress(courseId)
    if (!courseProgress) return

    if (!courseProgress.modules[moduleId]) {
      courseProgress.modules[moduleId] = {
        moduleId,
        completedSections: [],
        totalSections: updates.totalSections || 0,
        completed: false
      }
    }

    // Update module progress
    courseProgress.modules[moduleId] = {
      ...courseProgress.modules[moduleId],
      ...updates
    }

    // Update last accessed time
    courseProgress.lastAccessedAt = new Date()

    // Recalculate overall progress
    this.recalculateOverallProgress(courseProgress)

    this.saveCourseProgress(courseId, courseProgress)
  }

  // Mark section as completed
  async completeSection(courseId: string, moduleId: string, sectionId: string): Promise<void> {
    const moduleProgress = await this.getModuleProgress(courseId, moduleId)
    if (!moduleProgress) return

    const completedSections = new Set(moduleProgress.completedSections)
    completedSections.add(sectionId)

    const isModuleCompleted = completedSections.size >= moduleProgress.totalSections

    await this.updateModuleProgress(courseId, moduleId, {
      completedSections: Array.from(completedSections),
      completed: isModuleCompleted,
      completedAt: isModuleCompleted ? new Date() : undefined
    })
  }

  // Set total sections for a module
  setModuleTotalSections(courseId: string, moduleId: string, totalSections: number): void {
    this.updateModuleProgress(courseId, moduleId, { totalSections })
  }

  // Check if section is completed
  isSectionCompleted(courseId: string, moduleId: string, sectionId: string): boolean {
    const moduleProgress = this.getModuleProgress(courseId, moduleId)
    return moduleProgress?.completedSections.includes(sectionId) || false
  }

  // Check if module is completed
  isModuleCompleted(courseId: string, moduleId: string): boolean {
    const moduleProgress = this.getModuleProgress(courseId, moduleId)
    return moduleProgress?.completed || false
  }

  // Recalculate overall course progress
  private recalculateOverallProgress(courseProgress: CourseProgress): void {
    const moduleIds = Object.keys(courseProgress.modules)
    if (moduleIds.length === 0) {
      courseProgress.overallProgress = 0
      return
    }

    const totalSections = moduleIds.reduce((sum, moduleId) => {
      return sum + courseProgress.modules[moduleId].totalSections
    }, 0)

    const completedSections = moduleIds.reduce((sum, moduleId) => {
      return sum + courseProgress.modules[moduleId].completedSections.length
    }, 0)

    courseProgress.overallProgress = totalSections > 0 ? (completedSections / totalSections) * 100 : 0
  }

  // Get completed modules count
  getCompletedModulesCount(courseId: string): number {
    const courseProgress = this.getCourseProgress(courseId)
    if (!courseProgress) return 0

    return Object.values(courseProgress.modules).filter(module => module.completed).length
  }

  // Get course statistics
  getCourseStats(courseId: string): {
    totalModules: number
    completedModules: number
    overallProgress: number
    timeSpent: number
    sectionsCompleted: number
    totalSections: number
  } {
    const courseProgress = this.getCourseProgress(courseId)
    
    if (!courseProgress) {
      return {
        totalModules: 0,
        completedModules: 0,
        overallProgress: 0,
        timeSpent: 0,
        sectionsCompleted: 0,
        totalSections: 0
      }
    }

    const modules = Object.values(courseProgress.modules)
    
    return {
      totalModules: modules.length,
      completedModules: modules.filter(m => m.completed).length,
      overallProgress: courseProgress.overallProgress,
      timeSpent: modules.reduce((sum, m) => sum + (m.timeSpent || 0), 0),
      sectionsCompleted: modules.reduce((sum, m) => sum + m.completedSections.length, 0),
      totalSections: modules.reduce((sum, m) => sum + m.totalSections, 0)
    }
  }

  // Reset course progress
  resetCourseProgress(courseId: string): void {
    localStorage.removeItem(this.getStorageKey(courseId))
  }

  // Reset module progress
  resetModuleProgress(courseId: string, moduleId: string): void {
    const courseProgress = this.getCourseProgress(courseId)
    if (!courseProgress || !courseProgress.modules[moduleId]) return

    courseProgress.modules[moduleId] = {
      moduleId,
      completedSections: [],
      totalSections: courseProgress.modules[moduleId].totalSections,
      completed: false
    }

    this.recalculateOverallProgress(courseProgress)
    this.saveCourseProgress(courseId, courseProgress)
  }
}

// Export singleton instance
export const learningProgress = new LearningProgressManager()

// React hook for using learning progress
export function useLearningProgress(courseId: string) {
  const getProgress = () => learningProgress.getCourseProgress(courseId)
  const getStats = () => learningProgress.getCourseStats(courseId)
  
  return {
    getProgress,
    getStats,
    initializeCourse: (moduleIds: string[]) => 
      learningProgress.initializeCourseProgress(courseId, moduleIds),
    getModuleProgress: (moduleId: string) => 
      learningProgress.getModuleProgress(courseId, moduleId),
    updateModuleProgress: (moduleId: string, updates: Partial<ModuleProgress>) =>
      learningProgress.updateModuleProgress(courseId, moduleId, updates),
    completeSection: (moduleId: string, sectionId: string) =>
      learningProgress.completeSection(courseId, moduleId, sectionId),
    setModuleTotalSections: (moduleId: string, totalSections: number) =>
      learningProgress.setModuleTotalSections(courseId, moduleId, totalSections),
    isSectionCompleted: (moduleId: string, sectionId: string) =>
      learningProgress.isSectionCompleted(courseId, moduleId, sectionId),
    isModuleCompleted: (moduleId: string) =>
      learningProgress.isModuleCompleted(courseId, moduleId),
    getCompletedModulesCount: () =>
      learningProgress.getCompletedModulesCount(courseId),
    resetProgress: () =>
      learningProgress.resetCourseProgress(courseId),
    resetModuleProgress: (moduleId: string) =>
      learningProgress.resetModuleProgress(courseId, moduleId)
  }
} 