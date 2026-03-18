import { createSupabaseServerClient } from '@/lib/supabase-server'

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
  const supabase = await createSupabaseServerClient()
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
  const supabase = await createSupabaseServerClient()
  const { data: kos, error: kosError } = await supabase
    .from('kos')
    .select('id')
    .eq('slug', slug)
    .single()

  if (kosError) throw kosError
  if (!kos) throw new Error(`Kos with slug "${slug}" not found`)

  return getRoomsByKosId(kos.id)
}

// ---- Admin CRUD ----

export async function createRoom(kosId: string, data: Partial<KosRoom>) {
  const supabase = await createSupabaseServerClient()
  const { data: room, error } = await supabase
    .from('kos_rooms')
    .insert({ kos_id: kosId, ...data })
    .select()
    .single()

  if (error) throw error
  return room as KosRoom
}

export async function updateRoom(id: string, data: Partial<KosRoom>) {
  const supabase = await createSupabaseServerClient()
  const { data: room, error } = await supabase
    .from('kos_rooms')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return room as KosRoom
}

export async function deleteRoom(id: string) {
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('kos_rooms').delete().eq('id', id)
  if (error) throw error
}

export async function addRoomFacility(roomId: string, data: { name: string; icon?: string }) {
  const supabase = await createSupabaseServerClient()
  const { data: facility, error } = await supabase
    .from('kos_room_facilities')
    .insert({ room_id: roomId, ...data })
    .select()
    .single()

  if (error) throw error
  return facility as KosRoomFacility
}

export async function deleteRoomFacility(id: string) {
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('kos_room_facilities').delete().eq('id', id)
  if (error) throw error
}

