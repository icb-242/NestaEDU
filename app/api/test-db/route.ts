import { NextRequest, NextResponse } from 'next/server'
import { getPrisma, disconnectPrisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  let prisma = null
  
  try {
    prisma = await getPrisma()

    await prisma.$queryRaw`SELECT 1 as test`

    const chatSessionsCount = await prisma.chatSession.count()
    const examResultsCount = await prisma.examResult.count()
    
    return NextResponse.json({
      status: 'success',
      databaseConnected: true,
      chatSessionsCount,
      examResultsCount,
      environment: process.env.NODE_ENV,
      hasDatabaseUrl: !!process.env.DATABASE_URL
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      databaseConnected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: process.env.NODE_ENV,
      hasDatabaseUrl: !!process.env.DATABASE_URL
    }, { status: 500 })
  } finally {
    // Always disconnect the client
    if (prisma) {
      await disconnectPrisma(prisma)
    }
  }
} 