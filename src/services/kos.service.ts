import { createSupabaseServerClient } from '@/lib/supabase-server'
import { createSupabaseAdmin } from '@/lib/supabase-admin'

// ---- Types ----

export interface Kos {
  id: string
  name: string
  slug: string
  description: string | null
  address: string | null
  district: string | null
  city: string | null
  latitude: number | null
  longitude: number | null
  price: number
  kos_type: string | null
  gender_label: string | null
  target_tenant: string | null
  nearby_transport: string | null
  nearby_mall: string | null
  whatsapp_number: string | null
  image_url: string | null
  image_mobile_url: string | null
  is_featured: boolean
  is_published: boolean
  created_at: string
  updated_at: string
  kos_facilities?: KosFacility[]
  kos_images?: KosImage[]
  kos_tags?: KosTag[]
}

export interface KosTag {
  id: string
  kos_id: string
  name: string
  icon: string
  sort_order: number
}

export interface KosFacility {
  id: string
  kos_id: string
  name: string
  icon: string | null
  sort_order: number
}

export interface KosImage {
  id: string
  kos_id: string
  url: string
  alt_text: string | null
  is_primary: boolean
  sort_order: number
}

// ---- Filters ----

export interface KosFilters {
  city?: string
  kos_type?: string
  price_min?: number
  price_max?: number
}

// ---- Service Functions ----

/**
 * Get list of published kos with optional filters.
 * Includes facilities.
 */
export async function getKosList(filters?: KosFilters) {
  const supabase = await createSupabaseServerClient()
  let query = supabase
    .from('kos')
    .select('*, kos_facilities(*), kos_tags(*)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (filters?.city) {
    query = query.ilike('city', `%${filters.city}%`)
  }
  if (filters?.kos_type) {
    query = query.eq('kos_type', filters.kos_type)
  }
  if (filters?.price_min) {
    query = query.gte('price', filters.price_min)
  }
  if (filters?.price_max) {
    query = query.lte('price', filters.price_max)
  }

  const { data, error } = await query

  if (error) throw error
  return data as Kos[]
}

/**
 * Get a single kos by slug, with facilities and images.
 */
export async function getKosBySlug(slug: string) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('kos')
    .select('*, kos_facilities(*), kos_images(*), kos_tags(*)')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) throw error
  return data as Kos
}

/**
 * Get the featured kos for the hero section, with facilities.
 */
export async function getFeaturedKos() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('kos')
    .select('*, kos_facilities(*), kos_tags(*)')
    .eq('is_featured', true)
    .eq('is_published', true)
    .limit(1)
    .single()

  if (error) throw error
  return data as Kos
}

/**
 * Get kos list with coordinates for map display.
 * Returns only necessary fields to keep payloads small.
 */
export async function getKosForMap() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('kos')
    .select('id, slug, name, latitude, longitude, price')
    .eq('is_published', true)
    .not('latitude', 'is', null)
    .not('longitude', 'is', null)

  if (error) throw error
  return data
}

// ---- Admin CRUD ----

/**
 * Get ALL kos for admin (including unpublished).
 */
export async function getAllKosAdmin() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('kos')
    .select('*, kos_facilities(*), kos_tags(*)')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Kos[]
}

/**
 * Get kos by ID (admin, no published filter).
 */
export async function getKosById(id: string) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('kos')
    .select('*, kos_facilities(*), kos_images(*), kos_tags(*)')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Kos
}

/**
 * Create a new kos.
 */
export async function createKos(kosData: Partial<Kos>) {
  const supabase = createSupabaseAdmin()
  const { data, error } = await supabase
    .from('kos')
    .insert(kosData)
    .select()
    .single()

  if (error) throw error
  return data as Kos
}

/**
 * Update kos by ID.
 */
export async function updateKos(id: string, kosData: Partial<Kos>) {
  const supabase = createSupabaseAdmin()
  const { data, error } = await supabase
    .from('kos')
    .update({ ...kosData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Kos
}

/**
 * Delete kos by ID.
 */
export async function deleteKos(id: string) {
  const supabase = createSupabaseAdmin()
  const { error } = await supabase
    .from('kos')
    .delete()
    .eq('id', id)

  if (error) throw error
}