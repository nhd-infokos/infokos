import { getAllBanners } from '@/services/banner.service'
import BannerList from './BannerList'

export const dynamic = 'force-dynamic'

export default async function BannerPage() {
  const banners = await getAllBanners()

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Kelola Banner</h1>
        <p className="text-zinc-400 mt-2">
          Kelola banner yang akan ditampilkan di halaman utama. Anda bisa menambah, mengubah, atau memilih banner mana yang aktif.
        </p>
      </div>

      <BannerList banners={banners} />
    </div>
  )
}
