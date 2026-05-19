'use server'

import { upsertBanner } from '@/services/banner.service'
import { revalidatePath } from 'next/cache'

export async function saveBannerSettings(data: { desktop_image_url: string; mobile_image_url: string }) {
  try {
    if (!data.desktop_image_url || !data.mobile_image_url) {
      return { error: 'Both desktop and mobile images are required.' }
    }
    
    await upsertBanner(data)
    revalidatePath('/')
    
    return { success: true }
  } catch (error: any) {
    console.error('Error saving banner:', error)
    return { error: error.message || 'Failed to save banner' }
  }
}
