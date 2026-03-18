import { supabase } from '@/lib/supabase'

// ---- Types ----

export interface KosRoom {
  id: string
  kos_id: string
  name: string
  description: string | null
  image_url: string | null
  video_url: string | null
  marker_top: string | null
  marker_left: string | null
  sort_order: number
  kos_room_facilities?: KosRoomFacility[]
}

export interface KosRoomFacility {
  id: string
  room_id: string
  name: string
  icon: string | null
}

// ---- Service Functions ----

/**
 * Get all rooms for a kos by kos ID, including room facilities.
 */
export async function getRoomsByKosId(kosId: string) {
  const { data, error } = await supabase
    .from('kos_rooms')
    .select('*, kos_room_facilities(*)')
    .eq('kos_id', kosId)
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data as KosRoom[]
}

/**
 * Get all rooms for a kos by kos slug, including room facilities.
 * Useful when you only have the slug from the URL.
 */
export async function getRoomsByKosSlug(slug: string) {
  // First, get the kos ID from the slug
  const { data: kos, error: kosError } = await supabase
    .from('kos')
    .select('id')
    .eq('slug', slug)
    .single()

  if (kosError) throw kosError
  if (!kos) throw new Error(`Kos with slug "${slug}" not found`)

  return getRoomsByKosId(kos.id)
}
