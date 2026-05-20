'use server'

import { createBanner, updateBanner, deleteBanner, setActiveBanner } from '@/services/banner.service'
import { revalidatePath } from 'next/cache'

export async function createBannerAction(data: { desktop_image_url: string; mobile_image_url: string }) {
  try {
    if (!data.desktop_image_url || !data.mobile_image_url) {
      return { error: 'Both desktop and mobile images are required.' }
    }
    
    await createBanner(data)
    revalidatePath('/')
    revalidatePath('/admin/banner')
    
    return { success: true }
  } catch (error: any) {
    console.error('Error creating banner:', error)
    return { error: error.message || 'Failed to create banner' }
  }
}

export async function updateBannerAction(id: string, data: { desktop_image_url: string; mobile_image_url: string }) {
  try {
    if (!data.desktop_image_url || !data.mobile_image_url) {
      return { error: 'Both desktop and mobile images are required.' }
    }
    
    await updateBanner(id, data)
    revalidatePath('/')
    revalidatePath('/admin/banner')
    
    return { success: true }
  } catch (error: any) {
    console.error('Error updating banner:', error)
    return { error: error.message || 'Failed to update banner' }
  }
}

export async function deleteBannerAction(id: string) {
  try {
    await deleteBanner(id)
    revalidatePath('/')
    revalidatePath('/admin/banner')
    
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting banner:', error)
    return { error: error.message || 'Failed to delete banner' }
  }
}

export async function setActiveBannerAction(id: string) {
  try {
    await setActiveBanner(id)
    revalidatePath('/')
    revalidatePath('/admin/banner')
    
    return { success: true }
  } catch (error: any) {
    console.error('Error setting active banner:', error)
    return { error: error.message || 'Failed to set active banner' }
  }
}
