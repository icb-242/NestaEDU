import { NextRequest, NextResponse } from "next/server"
import { getPrisma, disconnectPrisma } from "@/lib/db"

// GET - Fetch user's learning progress
export async function GET(request: NextRequest) {
  const prisma = await getPrisma()
  
  try {
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const courseId = searchParams.get("courseId")
    const moduleId = searchParams.get("moduleId")

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      )
    }

    let progress

    if (courseId && moduleId) {
      // Get specific module progress
      progress = await prisma.learningProgress.findUnique({
        where: {
          user_id_course_id_module_id: {
            user_id: userId,
            course_id: courseId,
            module_id: moduleId
          }
        }
      })
    } else if (courseId) {
      // Get all modules for a course
      progress = await prisma.learningProgress.findMany({
        where: {
          user_id: userId,
          course_id: courseId
        },
        orderBy: {
          created_at: 'asc'
        }
      })
    } else {
      // Get all progress for user
      progress = await prisma.learningProgress.findMany({
        where: {
          user_id: userId
        },
        orderBy: [
          { course_id: 'asc' },
          { created_at: 'asc' }
        ]
      })
    }

    return NextResponse.json(progress)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch learning progress" },
      { status: 500 }
    )
  } finally {
    await disconnectPrisma(prisma)
  }
}

// POST - Create or update learning progress
export async function POST(request: NextRequest) {
  const prisma = await getPrisma()
  
  try {
    const body = await request.json()
    const {
      userId,
      courseId,
      moduleId,
      completedSections = [],
      totalSections = 0,
      completed = false,
      completedAt,
      timeSpent = 0
    } = body

    if (!userId || !courseId || !moduleId) {
      return NextResponse.json(
        { error: "User ID, Course ID, and Module ID are required" },
        { status: 400 }
      )
    }

    // Use upsert to create or update
    const progress = await prisma.learningProgress.upsert({
      where: {
        user_id_course_id_module_id: {
          user_id: userId,
          course_id: courseId,
          module_id: moduleId
        }
      },
      update: {
        completed_sections: completedSections,
        total_sections: totalSections,
        completed: completed,
        completed_at: completedAt ? new Date(completedAt) : null,
        time_spent: timeSpent,
        updated_at: new Date()
      },
      create: {
        user_id: userId,
        course_id: courseId,
        module_id: moduleId,
        completed_sections: completedSections,
        total_sections: totalSections,
        completed: completed,
        completed_at: completedAt ? new Date(completedAt) : null,
        time_spent: timeSpent
      }
    })

    return NextResponse.json(progress)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save learning progress" },
      { status: 500 }
    )
  } finally {
    await disconnectPrisma(prisma)
  }
}

// PUT - Update existing progress
export async function PUT(request: NextRequest) {
  const prisma = await getPrisma()
  
  try {
    const body = await request.json()
    const {
      userId,
      courseId,
      moduleId,
      completedSections,
      totalSections,
      completed,
      completedAt,
      timeSpent
    } = body

    if (!userId || !courseId || !moduleId) {
      return NextResponse.json(
        { error: "User ID, Course ID, and Module ID are required" },
        { status: 400 }
      )
    }

    const updateData: any = {
      updated_at: new Date()
    }

    if (completedSections !== undefined) updateData.completed_sections = completedSections
    if (totalSections !== undefined) updateData.total_sections = totalSections
    if (completed !== undefined) updateData.completed = completed
    if (completedAt !== undefined) updateData.completed_at = completedAt ? new Date(completedAt) : null
    if (timeSpent !== undefined) updateData.time_spent = timeSpent

    const progress = await prisma.learningProgress.update({
      where: {
        user_id_course_id_module_id: {
          user_id: userId,
          course_id: courseId,
          module_id: moduleId
        }
      },
      data: updateData
    })

    return NextResponse.json(progress)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update learning progress" },
      { status: 500 }
    )
  } finally {
    await disconnectPrisma(prisma)
  }
}

// DELETE - Reset progress for a module or course
export async function DELETE(request: NextRequest) {
  const prisma = await getPrisma()
  
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const courseId = searchParams.get("courseId")
    const moduleId = searchParams.get("moduleId")

    if (!userId || !courseId) {
      return NextResponse.json(
        { error: "User ID and Course ID are required" },
        { status: 400 }
      )
    }

    if (moduleId) {
      // Delete specific module progress
      await prisma.learningProgress.delete({
        where: {
          user_id_course_id_module_id: {
            user_id: userId,
            course_id: courseId,
            module_id: moduleId
          }
        }
      })
    } else {
      // Delete all progress for a course
      await prisma.learningProgress.deleteMany({
        where: {
          user_id: userId,
          course_id: courseId
        }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete learning progress" },
      { status: 500 }
    )
  } finally {
    await disconnectPrisma(prisma)
  }
} 