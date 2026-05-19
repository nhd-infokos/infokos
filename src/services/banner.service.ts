import { createSupabaseServerClient } from '@/lib/supabase-server';

export interface Banner {
  id: string;
  desktop_image_url: string;
  mobile_image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Get the currently active banner.
 */
export async function getActiveBanner() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching banner:', error);
    return null;
  }
  
  return data as Banner | null;
}

/**
 * Update or create a banner.
 */
export async function upsertBanner(data: { desktop_image_url: string; mobile_image_url: string }) {
  const supabase = await createSupabaseServerClient();
  
  // First, get any existing active banner to update it, or just insert a new one
  const { data: existing } = await supabase
    .from('banners')
    .select('id')
    .eq('is_active', true)
    .limit(1)
    .maybeSingle();

  if (existing) {
    const { data: updated, error } = await supabase
      .from('banners')
      .update({
        desktop_image_url: data.desktop_image_url,
        mobile_image_url: data.mobile_image_url,
      })
      .eq('id', existing.id)
      .select()
      .single();
      
    if (error) throw error;
    return updated as Banner;
  } else {
    const { data: inserted, error } = await supabase
      .from('banners')
      .insert({
        desktop_image_url: data.desktop_image_url,
        mobile_image_url: data.mobile_image_url,
        is_active: true,
      })
      .select()
      .single();
      
    if (error) throw error;
    return inserted as Banner;
  }
}
