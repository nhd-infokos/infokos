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
 * Get all banners.
 */
export async function getAllBanners() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching banners:', error);
    return [];
  }
  
  return data as Banner[];
}

/**
 * Create a new banner.
 */
export async function createBanner(data: { desktop_image_url: string; mobile_image_url: string }) {
  const supabase = await createSupabaseServerClient();
  
  const { data: inserted, error } = await supabase
    .from('banners')
    .insert({
      desktop_image_url: data.desktop_image_url,
      mobile_image_url: data.mobile_image_url,
      is_active: false, // New banners are inactive by default
    })
    .select()
    .single();
    
  if (error) throw error;
  return inserted as Banner;
}

/**
 * Update an existing banner.
 */
export async function updateBanner(id: string, data: { desktop_image_url: string; mobile_image_url: string }) {
  const supabase = await createSupabaseServerClient();
  
  const { data: updated, error } = await supabase
    .from('banners')
    .update({
      desktop_image_url: data.desktop_image_url,
      mobile_image_url: data.mobile_image_url,
    })
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return updated as Banner;
}

/**
 * Delete a banner.
 */
export async function deleteBanner(id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from('banners')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
}

/**
 * Set a banner as active, and deactivate all others.
 */
export async function setActiveBanner(id: string) {
  const supabase = await createSupabaseServerClient();
  
  // First, deactivate all banners
  const { error: deactivateError } = await supabase
    .from('banners')
    .update({ is_active: false })
    .neq('id', id); // Just a generic update condition, could also be .neq('id', 'uuid-not-possible') but this works
    
  if (deactivateError) throw deactivateError;
  
  // Then activate the target banner
  const { data, error: activateError } = await supabase
    .from('banners')
    .update({ is_active: true })
    .eq('id', id)
    .select()
    .single();
    
  if (activateError) throw activateError;
  return data as Banner;
}
