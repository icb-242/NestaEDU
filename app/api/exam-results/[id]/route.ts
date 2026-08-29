import { NextRequest, NextResponse } from 'next/server'
import { getPrisma, disconnectPrisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

// GET - Retrieve detailed exam result by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let prisma = null
  
  try {
    const userId = request.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    prisma = await getPrisma()

    const result = await prisma.examResult.findFirst({
      where: { id: params.id, user_id: userId },
    })

    if (!result) {
      return NextResponse.json({ error: 'Exam result not found' }, { status: 404 })
    }

    let questionResults = []
    if (result.answers && typeof result.answers === 'object') {
      const answersData = result.answers as any
      if (answersData.questionResults) {
        questionResults = answersData.questionResults
      }
    }

    return NextResponse.json({ ...result, questionResults })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  } finally {
    // Always disconnect the client
    if (prisma) {
      await disconnectPrisma(prisma)
    }
  }
} 