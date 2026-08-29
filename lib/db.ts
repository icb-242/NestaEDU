import { PrismaClient } from '@prisma/client'

// For serverless environments, create a completely new client for each request
// to avoid prepared statement conflicts
export async function getPrisma(): Promise<PrismaClient> {
  const databaseUrl = process.env.DATABASE_URL
  const connectionString = databaseUrl
    ? `${databaseUrl}?pgbouncer=true&connection_limit=1&pool_timeout=0&connect_timeout=10&prepared_statements=false&statement_timeout=30000`
    : process.env.DATABASE_URL

  const client = new PrismaClient({
    log: ['error'],
    datasources: {
      db: {
        url: connectionString,
      },
    },
  })

  try {
    await client.$connect()
  } catch (error) {
    await client.$disconnect()
    throw error
  }

  return client
}

export async function disconnectPrisma(client: PrismaClient): Promise<void> {
  try {
    await client.$disconnect()
  } catch {
    // Ignore disconnect errors in serverless environments
  }
}

// Singleton for development to avoid too many connections during hot reload
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

if (process.env.NODE_ENV !== 'production') {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({ log: ['error'] })
  }
}

export const prisma = globalForPrisma.prisma