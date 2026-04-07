import bcrypt from 'bcryptjs'
import { createClient } from '@supabase/supabase-js'
import { API_CONFIG } from '../config/api-keys'

// Re-export JWT types and functions from the Edge-compatible module
export type { UserData } from './jwt'
export { generateToken, verifyToken } from './jwt'

// Node.js only — do not import this module in middleware or Edge routes

function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || API_CONFIG.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || API_CONFIG.SUPABASE_SERVICE_ROLE_KEY
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || API_CONFIG.SUPABASE_ANON_KEY

  if (!supabaseUrl) throw new Error('Supabase URL not configured')

  const keyToUse = supabaseServiceKey || supabaseAnonKey
  if (!keyToUse) throw new Error('Supabase authentication keys not configured')

  return createClient(supabaseUrl, keyToUse)
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createUser(
  email: string,
  password: string,
  userData: { firstName?: string; lastName?: string; phone?: string; gradeLevel?: string; school?: string; avatar?: string } = {}
) {
  try {
    const hashedPassword = await hashPassword(password)
    const supabase = createSupabaseClient()

    const { data: user, error } = await supabase
      .from('users')
      .insert({
        email,
        password_hash: hashedPassword,
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone,
        grade_level: userData.gradeLevel,
        school: userData.school,
        avatar: userData.avatar,
      })
      .select('id, email, first_name, last_name, phone, grade_level, school, avatar')
      .single()

    if (error) throw new Error(`Failed to create user: ${error.message}`)

    return {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      gradeLevel: user.grade_level,
      school: user.school,
      avatar: user.avatar,
    }
  } catch (error: any) {
    throw new Error(`Database connection failed: ${error.message}`)
  }
}

export async function findUserByEmail(email: string) {
  try {
    const supabase = createSupabaseClient()

    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, password_hash, first_name, last_name, phone, grade_level, school, avatar')
      .eq('email', email)
      .single()

    if (error || !user) return null

    return {
      id: user.id,
      email: user.email,
      passwordHash: user.password_hash as string,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      gradeLevel: user.grade_level,
      school: user.school,
      avatar: user.avatar,
    }
  } catch {
    throw new Error('Database connection failed. Please check your database configuration.')
  }
}

export async function findUserById(id: string) {
  try {
    const supabase = createSupabaseClient()

    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, phone, grade_level, school, avatar')
      .eq('id', id)
      .single()

    if (error || !user) return null

    return {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      gradeLevel: user.grade_level,
      school: user.school,
      avatar: user.avatar,
    }
  } catch {
    throw new Error('Database connection failed. Please check your database configuration.')
  }
}
