'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { saveBannerSettings } from './actions'
import { toast } from 'sonner'
import type { Banner } from '@/services/banner.service'
import { Upload, X } from 'lucide-react'

export default function BannerForm({ initialBanner }: { initialBanner: Banner | null }) {
  const [desktopImage, setDesktopImage] = useState(initialBanner?.desktop_image_url || '')
  const [mobileImage, setMobileImage] = useState(initialBanner?.mobile_image_url || '')
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const desktopInputRef = useRef<HTMLInputElement>(null)
  const mobileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (file: File, type: 'banner-desktop' | 'banner-mobile') => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', type)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      if (type === 'banner-desktop') {
        setDesktopImage(data.url)
      } else {
        setMobileImage(data.url)
      }
      toast.success('Gambar berhasil diunggah')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsUploading(false)
    }
  }

  const handleSave = async () => {
    if (!desktopImage || !mobileImage) {
      toast.error('Kedua gambar (Desktop & Mobile) wajib diisi')
      return
    }

    setIsSaving(true)
    const result = await saveBannerSettings({
      desktop_image_url: desktopImage,
      mobile_image_url: mobileImage,
    })

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Pengaturan banner berhasil disimpan')
    }
    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader>
            <CardTitle>Banner Desktop</CardTitle>
            <CardDescription className="text-zinc-400">
              Rekomendasi ukuran: 1440 x 540 px (atau proporsi 16:6)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative aspect-[16/6] bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 flex items-center justify-center">
              {desktopImage ? (
                <>
                  <Image src={desktopImage} alt="Desktop Banner" fill className="object-cover" />
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-2 right-2 z-10"
                    onClick={() => setDesktopImage('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <div className="text-zinc-500 text-sm flex flex-col items-center">
                  <Upload className="h-8 w-8 mb-2 opacity-50" />
                  <span>Belum ada gambar</span>
                </div>
              )}
            </div>
            
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={desktopInputRef}
              onChange={(e) => {
                if (e.target.files?.[0]) handleUpload(e.target.files[0], 'banner-desktop')
              }}
            />
            <Button 
              variant="outline" 
              className="w-full border-zinc-700 text-zinc-300 hover:text-white"
              onClick={() => desktopInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? 'Mengunggah...' : 'Pilih Gambar Desktop'}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader>
            <CardTitle>Banner Mobile</CardTitle>
            <CardDescription className="text-zinc-400">
              Rekomendasi proporsi: 16:7 atau Kotak (1:1)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative aspect-[16/7] w-full max-w-xs mx-auto bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 flex items-center justify-center">
              {mobileImage ? (
                <>
                  <Image src={mobileImage} alt="Mobile Banner" fill className="object-cover" />
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-2 right-2 z-10"
                    onClick={() => setMobileImage('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <div className="text-zinc-500 text-sm flex flex-col items-center">
                  <Upload className="h-8 w-8 mb-2 opacity-50" />
                  <span>Belum ada gambar</span>
                </div>
              )}
            </div>

            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={mobileInputRef}
              onChange={(e) => {
                if (e.target.files?.[0]) handleUpload(e.target.files[0], 'banner-mobile')
              }}
            />
            <Button 
              variant="outline" 
              className="w-full border-zinc-700 text-zinc-300 hover:text-white"
              onClick={() => mobileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? 'Mengunggah...' : 'Pilih Gambar Mobile'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-4 border-t border-zinc-800">
        <Button onClick={handleSave} disabled={isSaving || isUploading} className="bg-white text-black hover:bg-zinc-200">
          {isSaving ? 'Menyimpan...' : 'Simpan Perubahan Banner'}
        </Button>
      </div>
    </div>
  )
}
