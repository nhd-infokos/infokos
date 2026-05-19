import { getActiveBanner } from '@/services/banner.service'
import BannerForm from './BannerForm'

export const dynamic = 'force-dynamic'

export default async function BannerPage() {
  const initialBanner = await getActiveBanner()

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Kelola Banner</h1>
        <p className="text-zinc-400 mt-2">
          Ubah gambar banner yang akan ditampilkan di halaman utama.
        </p>
      </div>

      <BannerForm initialBanner={initialBanner} />
    </div>
  )
}
