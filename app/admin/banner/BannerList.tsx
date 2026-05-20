'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Plus, Star, Pencil, Trash } from 'lucide-react'
import type { Banner } from '@/services/banner.service'
import BannerForm from './BannerForm'
import { deleteBannerAction, setActiveBannerAction } from './actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface BannerListProps {
  banners: Banner[]
}

export default function BannerList({ banners }: BannerListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null)
  const [isProcessing, setIsProcessing] = useState<string | null>(null)
  const router = useRouter()

  const handleAdd = () => {
    setSelectedBanner(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (banner: Banner) => {
    setSelectedBanner(banner)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus banner ini?')) return
    
    setIsProcessing(id)
    const result = await deleteBannerAction(id)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Banner berhasil dihapus')
      router.refresh()
    }
    setIsProcessing(null)
  }

  const handleSetActive = async (id: string) => {
    setIsProcessing(id)
    const result = await setActiveBannerAction(id)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Banner berhasil diaktifkan')
      router.refresh()
    }
    setIsProcessing(null)
  }

  const handleFormSuccess = () => {
    setIsDialogOpen(false)
    router.refresh()
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-zinc-400">Total {banners.length} banner(s)</p>
        <Button onClick={handleAdd} className="bg-white text-black hover:bg-zinc-200">
          <Plus className="mr-2 h-4 w-4" /> Tambah Banner
        </Button>
      </div>

      <div className="rounded-md border border-zinc-800 bg-zinc-950 overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-900">
            <TableRow className="border-zinc-800 hover:bg-zinc-900/50">
              <TableHead className="text-zinc-400">Desktop Image</TableHead>
              <TableHead className="text-zinc-400">Mobile Image</TableHead>
              <TableHead className="text-zinc-400">Status</TableHead>
              <TableHead className="text-zinc-400 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners.length === 0 ? (
              <TableRow className="border-zinc-800 hover:bg-zinc-900/50">
                <TableCell colSpan={4} className="text-center py-8 text-zinc-500">
                  Belum ada banner. Silakan tambah banner baru.
                </TableCell>
              </TableRow>
            ) : (
              banners.map((banner) => (
                <TableRow key={banner.id} className="border-zinc-800 hover:bg-zinc-900/50">
                  <TableCell>
                    <div className="relative w-32 h-12 bg-zinc-800 rounded overflow-hidden">
                      <Image 
                        src={banner.desktop_image_url} 
                        alt="Desktop" 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="relative w-12 h-12 bg-zinc-800 rounded overflow-hidden">
                      <Image 
                        src={banner.mobile_image_url} 
                        alt="Mobile" 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    {banner.is_active ? (
                      <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">
                        Aktif
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-zinc-500 border-zinc-700">
                        Tidak Aktif
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 p-0 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800 transition-colors" disabled={isProcessing === banner.id}>
                        <span className="sr-only">Buka menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-white">
                        {!banner.is_active && (
                          <DropdownMenuItem 
                            onClick={() => handleSetActive(banner.id)}
                            className="cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800"
                          >
                            <Star className="mr-2 h-4 w-4" />
                            <span>Jadikan Aktif</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem 
                          onClick={() => handleEdit(banner)}
                          className="cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800"
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(banner.id)}
                          className="cursor-pointer text-red-500 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-500"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Hapus</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedBanner ? 'Edit Banner' : 'Tambah Banner'}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <BannerForm 
              initialBanner={selectedBanner} 
              onSuccess={handleFormSuccess} 
              onCancel={() => setIsDialogOpen(false)} 
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
