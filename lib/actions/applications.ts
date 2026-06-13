'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export type ApplicationType = 'organizer' | 'villa_owner'

export async function submitHostApplication(data: {
  application_type: ApplicationType
  business_name: string
  city: string
  phone?: string
  description?: string
  property_name?: string
  price_per_night?: number
  payout_phone?: string
  logo_url?: string
  media_urls?: string[]
}) {
  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'You must be signed in to apply.' }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_organizer, is_villa_owner')
    .eq('id', user.id)
    .single()

  if (data.application_type === 'organizer' && profile?.is_organizer) {
    return { error: 'You are already an approved organizer.' }
  }
  if (data.application_type === 'villa_owner' && profile?.is_villa_owner) {
    return { error: 'You are already an approved villa owner.' }
  }

  const { data: existing } = await supabase
    .from('host_applications')
    .select('id')
    .eq('user_id', user.id)
    .eq('application_type', data.application_type)
    .eq('status', 'pending')
    .maybeSingle()

  if (existing) {
    return { error: 'You already have a pending application. We will review it soon.' }
  }

  const { error } = await supabase.from('host_applications').insert({
    user_id: user.id,
    application_type: data.application_type,
    business_name: data.business_name,
    city: data.city,
    phone: data.phone ?? null,
    description: data.description ?? null,
    property_name: data.property_name ?? null,
    price_per_night: data.price_per_night ?? null,
    payout_phone: data.payout_phone ?? null,
    logo_url: data.logo_url ?? null,
    media_urls: data.media_urls ?? [],
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/approvals')
  return { success: true }
}

export async function approveApplication(applicationId: string) {
  const supabase = await createClient()
  const { error } = await supabase.rpc('approve_host_application', {
    app_id: applicationId,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/approvals')
  return { success: true }
}

export async function rejectApplication(applicationId: string, reason?: string) {
  const supabase = await createClient()
  const { error } = await supabase.rpc('reject_host_application', {
    app_id: applicationId,
    reason: reason ?? null,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/approvals')
  return { success: true }
}

export async function getPendingApplications() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('host_applications')
    .select(`
      *,
      profiles:user_id (full_name, email)
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  if (error) {
    return { error: error.message, data: [] }
  }

  return { data: data ?? [] }
}

export async function getCurrentProfile() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  return data
}
