import Image from "next/image";
import Link from "next/link";
import DynamicIcon from "@/components/DynamicIcon";
import { formatPrice } from "@/lib/utils";
import type { KosRoom } from "@/types/kos";
import { getKosBySlug } from "@/services/kos.service";
import { getRoomsByKosSlug } from "@/services/room.service";
import RoomMarkers from "@/components/RoomMarkers";
import Navbar from "@/components/Navbar";

export default async function DetailKos({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let kos = null;
  let rooms: KosRoom[] = [];

  try {
    const [kosData, roomsData] = await Promise.all([
      getKosBySlug(slug),
      getRoomsByKosSlug(slug),
    ]);
    kos = kosData;
    rooms = roomsData || [];
  } catch (err) {
    console.error("Error fetching kos detail:", err);
  }

  if (!kos) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Kos tidak ditemukan</h1>
          <Link href="/" className="text-green-400 hover:underline">Kembali ke Home</Link>
        </div>
      </div>
    );
  }

  // Find detail background from kos_images (non-primary, sort_order 2) or fallback to image_url
  const detailDesktopImage = kos.kos_images?.find((img) => !img.is_primary && img.sort_order === 2)?.url || kos.image_url || "";
  const detailMobileImage = kos.image_mobile_url || detailDesktopImage;
  const mapEmbedUrl = kos.latitude && kos.longitude
    ? `https://maps.google.com/maps?q=${kos.latitude},${kos.longitude}&z=15&output=embed`
    : "";

  return (
    <div className="min-h-screen relative w-full bg-black text-black font-sans selection:bg-black selection:text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="hidden md:block absolute inset-0">
          <Image src={detailDesktopImage} alt={kos.name} fill className="object-cover" priority />
        </div>
        <div className="block md:hidden absolute inset-0">
          <Image src={detailMobileImage} alt={`${kos.name} Mobile`} fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
      </div>

      {/* Navigation Header */}
      <Navbar />
      {/* Main Content */}
      <main className="relative z-20 w-full h-[calc(100vh-100px)] pointer-events-none">
        {/* Combined Glass Card - Kos Details, Facilities, Location */}
        <div className="absolute top-10 left-6 md:left-[50px] p-6 md:p-8 rounded-[24px] bg-black/40 backdrop-blur-2xl border border-white/20 w-[calc(100%-48px)] md:w-[420px] max-h-[calc(100vh-100px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] pointer-events-auto z-40 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">{kos.name}</h2>
          </div>
          <div className="space-y-4 text-xs md:text-sm text-gray-200">
            {kos.address && <p className="leading-relaxed">{kos.address}</p>}
            <p className="font-semibold text-white text-sm">{kos.city} • {kos.district}</p>
            <div className="grid grid-cols-2 gap-y-3 gap-x-2 pt-2">
              {kos.kos_tags?.map((tag) => {
                return (
                  <div key={tag.id} className="flex items-center space-x-2">
                    <DynamicIcon name={tag.icon} className="w-[18px] h-[18px] text-white" />
                    <span>{tag.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Facilities */}
          {kos.kos_facilities && kos.kos_facilities.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold tracking-tight mb-4 text-white">Fasilitas</h3>
              <div className="flex flex-wrap gap-x-5 gap-y-4">
                {kos.kos_facilities.map((f) => {
                  return (
                    <div key={f.id} className="flex items-center space-x-2 text-sm text-gray-200">
                      <DynamicIcon name={f.icon} className="w-5 h-5 text-white" />
                      <span>{f.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Map Location */}
          {mapEmbedUrl && (
            <div className="mt-6 md:mt-8">
              <h3 className="text-xl font-bold tracking-tight mb-4 text-white">Lokasi</h3>
              <div className="relative w-full h-[150px] md:h-[180px] rounded-xl overflow-hidden bg-white/10 border border-white/20 shadow-inner">
                <iframe src={mapEmbedUrl} className="absolute inset-0 w-full h-full" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          )}

          <div className="h-px w-full bg-white/20 my-6"></div>
          <div className="flex justify-between items-center mb-6 mt-auto">
            <span className="text-gray-200 text-xs md:text-sm font-medium">Harga / bulan</span>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-white">{formatPrice(kos.price)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white text-[13px] md:text-sm font-medium">Please check for availability</span>
            <a href={`https://wa.me/${kos.whatsapp_number || "6281234567890"}`} target="_blank" rel="noreferrer" className="flex items-center justify-center hover:opacity-80 transition-opacity">
              <Image src="/whatsapp.svg" alt="WhatsApp" width={32} height={32} className="w-8 h-8 md:w-9 md:h-9" />
            </a>
          </div>
        </div>

        <RoomMarkers rooms={rooms} />
      </main>
    </div>
  );
}
