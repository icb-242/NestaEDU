export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create Supabase client function to handle runtime configuration
function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  // Validate configuration at runtime
  if (!supabaseUrl) {
    throw new Error('Supabase URL not configured')
  }

  if (!supabaseServiceKey) {
    throw new Error('Supabase service role key not configured')
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}

// GET - Retrieve user profile
export async function GET(request: NextRequest) {
  try {
    // Get user ID from request headers (set by middleware)
    const userId = request.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createSupabaseClient()
    const { data: profile, error } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, phone, grade_level, school')
      .eq('id', userId)
      .single()

    if (error || !profile) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: profile.id,
      email: profile.email,
      firstName: profile.first_name,
      lastName: profile.last_name,
      phone: profile.phone,
      gradeLevel: profile.grade_level,
      school: profile.school,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update user profile
export async function PUT(request: NextRequest) {
  try {
    // Get user ID from request headers (set by middleware)
    const userId = request.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { firstName, lastName, phone, gradeLevel, school } = await request.json()

    const supabase = createSupabaseClient()
    const { data: updatedProfile, error } = await supabase
      .from('users')
      .update({
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        grade_level: gradeLevel,
        school: school,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select('id, email, first_name, last_name, phone, grade_level, school')
      .single()

    if (error) {
      return NextResponse.json(
        { error: `Failed to update profile: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({
      id: updatedProfile.id,
      email: updatedProfile.email,
      firstName: updatedProfile.first_name,
      lastName: updatedProfile.last_name,
      phone: updatedProfile.phone,
      gradeLevel: updatedProfile.grade_level,
      school: updatedProfile.school,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 