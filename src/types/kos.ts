// Shared types for CariKos application

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
