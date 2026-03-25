"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Buildings
} from "@phosphor-icons/react";
import type { Kos, KosRoom } from "@/types/kos";
import { iconMap } from "@/lib/icon-map";
import { formatPrice } from "@/lib/utils";

export default function DetailKos() {
  const params = useParams();
  const slug = params.slug as string;

  const [kos, setKos] = useState<Kos | null>(null);
  const [rooms, setRooms] = useState<KosRoom[]>([]);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeMobileCard, setActiveMobileCard] = useState<'details' | 'facilities' | 'map' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [kosRes, roomsRes] = await Promise.all([
          fetch(`/api/kos/${slug}`),
          fetch(`/api/kos/${slug}/rooms`),
        ]);
        const kosData = await kosRes.json();
        const roomsData = await roomsRes.json();
        setKos(kosData.data || null);
        setRooms(roomsData.data || []);
      } catch (err) {
        console.error("Error fetching kos detail:", err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchData();
  }, [slug]);

  const activeRoom = rooms.find((r) => r.id === activeModal);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-400 text-lg font-medium animate-pulse">Memuat...</div>
      </div>
    );
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
  const detailDesktopImage = kos.kos_images?.find(img => !img.is_primary && img.sort_order === 2)?.url || kos.image_url || "";
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
      <nav className="relative z-50 flex items-center justify-between px-[50px] py-6 w-full">
        <div className="flex items-center flex-1">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo-carikos.svg" alt="Carikos Logo" width={44} height={38} priority className="w-auto h-8 sm:h-10 cursor-pointer" />
            <span className="text-[32px] font-bold tracking-tight text-[#111111]" style={{ fontFamily: "var(--font-poppins)" }}>Kosku</span>
          </Link>
        </div>
        <div className="hidden sm:flex justify-center items-center space-x-8">
          <Link href="/" className="text-[15px] font-regular text-gray-500 hover:text-black transition-colors">Home</Link>
          <a href="#" className="text-[15px] font-regular text-gray-500 hover:text-black transition-colors">Cari Kos</a>
          <Link href="/maps" className="text-[15px] font-regular text-gray-500 hover:text-black transition-colors">Maps</Link>
        </div>
        <div className="flex items-center justify-end flex-1 hidden sm:flex">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-[15px] font-medium rounded-full hover:bg-gray-800 transition-colors shadow-lg shadow-black/20">
            <span>Daftarkan Kosmu Disini</span>
            <Buildings className="w-5 h-5" weight="duotone" />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-20 w-full h-[calc(100vh-100px)] pointer-events-none">
        {/* Left Glass Card - Kos Details */}
        <div className={`absolute top-10 left-6 md:left-[50px] p-6 md:p-8 rounded-[24px] bg-black/40 backdrop-blur-2xl border border-white/20 w-[calc(100%-48px)] md:w-80 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] pointer-events-auto transition-opacity duration-300 flex flex-col ${activeMobileCard === 'details' ? 'opacity-100 z-40' : 'opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto z-10'}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">{kos.name}</h2>
            <button onClick={() => setActiveMobileCard(null)} className="md:hidden p-1 bg-white/10 rounded-full hover:bg-white/20">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="space-y-4 text-xs md:text-sm text-gray-200">
            {kos.address && <p className="leading-relaxed">{kos.address}</p>}
            <p className="font-semibold text-white">{kos.city} • {kos.district}</p>
            <div className="grid grid-cols-2 gap-y-3 gap-x-2 pt-2">
              {kos.kos_tags?.map((tag) => {
                const TagIcon = iconMap[tag.icon];
                return (
                  <div key={tag.id} className="flex items-center space-x-2">
                    {TagIcon && <TagIcon className="w-[18px] h-[18px] text-white" weight="duotone" />}
                    <span>{tag.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="h-px w-full bg-white/20 my-6"></div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-300 text-xs md:text-sm font-medium">Harga / bulan</span>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-white">{formatPrice(kos.price)}</span>
          </div>
          <div className="flex justify-between items-center mt-auto">
            <span className="text-gray-200 text-xs font-medium">Please check for availability</span>
            <a href={`https://wa.me/${kos.whatsapp_number || "6281234567890"}`} target="_blank" rel="noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:bg-[#1DA851] transition-colors shadow-lg">
              <Image src="/whatsapp.svg" alt="WhatsApp" width={20} height={20} className="w-5 h-5 md:w-6 md:h-6" />
            </a>
          </div>
        </div>

        {/* Right Glass Card - Facilities */}
        {kos.kos_facilities && kos.kos_facilities.length > 0 && (
          <div className={`absolute top-10 right-6 md:right-[50px] md:left-auto left-6 p-6 md:p-8 rounded-[24px] bg-black/40 backdrop-blur-2xl border border-white/20 w-[calc(100%-48px)] lg:w-72 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] pointer-events-auto transition-opacity duration-300 ${activeMobileCard === 'facilities' ? 'opacity-100 z-40' : 'opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto z-10'}`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">Fasilitas Kos</h2>
              <button onClick={() => setActiveMobileCard(null)} className="md:hidden p-1 bg-white/10 rounded-full hover:bg-white/20 relative z-50 pointer-events-auto">
                <svg className="w-5 h-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-4">
              {kos.kos_facilities.map((f) => {
                const Icon = f.icon ? iconMap[f.icon] : null;
                return (
                  <div key={f.id} className="flex items-center space-x-3">
                    {Icon && <Icon className="w-5 h-5 text-white" weight="bold" />}
                    <span className="font-bold text-sm">{f.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Map Location Card */}
        {mapEmbedUrl && (
          <div className={`absolute top-[48%] lg:top-[320px] right-6 md:right-[50px] md:left-auto left-6 p-5 md:p-6 rounded-[24px] bg-black/40 backdrop-blur-2xl border border-white/20 w-[calc(100%-48px)] lg:w-72 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] pointer-events-auto transition-opacity duration-300 flex flex-col ${activeMobileCard === 'map' ? 'opacity-100 z-40' : 'opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto z-10'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-xl font-bold tracking-tight">Lokasi</h2>
              <button onClick={() => setActiveMobileCard(null)} className="md:hidden p-1 bg-white/10 rounded-full hover:bg-white/20 relative z-50 pointer-events-auto">
                <svg className="w-5 h-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="relative w-full aspect-video md:h-40 rounded-xl overflow-hidden bg-black/20 border border-white/10 shadow-inner">
              <iframe src={mapEmbedUrl} className="absolute inset-0 w-full h-full" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        )}

        {/* Room Markers — Desktop */}
        {rooms.map((room, index) => (
          <div
            key={room.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 hidden md:flex flex-col items-center z-20 pointer-events-auto"
            style={{
              top: room.marker_top || "50%",
              left: room.marker_left || "50%",
              animation: `float ${[3, 4, 3.5, 3][index % 4]}s ease-in-out infinite ${index * 0.5}s`,
            }}
            onClick={() => setActiveModal(room.id)}
          >
            <div className="w-8 h-8 md:w-12 md:h-12 relative flex items-center justify-center group cursor-pointer">
              <Image src="/icon-markers.svg" alt="Marker" width={48} height={48} className="absolute inset-0 w-full h-full drop-shadow-lg transition-opacity duration-300 group-hover:opacity-0" />
              <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 pointer-events-none flex items-center justify-center -translate-y-2 drop-shadow-xl">
                <div className="relative w-[119px] h-[42px]">
                  <Image src="/icon-markers-hover.svg" alt="Hover bg" fill className="object-contain" />
                  <div className="absolute inset-0 flex items-start justify-center pt-[6px] pointer-events-none">
                    <span className="text-white font-medium text-[13px]">{room.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Room Markers — Mobile */}
        {rooms.map((room, index) => (
          <div
            key={`mobile-${room.id}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex md:hidden flex-col items-center z-20 pointer-events-auto"
            style={{
              top: room.marker_mobile_top || room.marker_top || "50%",
              left: room.marker_mobile_left || room.marker_left || "50%",
              animation: `float ${[3, 4, 3.5, 3][index % 4]}s ease-in-out infinite ${index * 0.5}s`,
            }}
            onClick={() => setActiveModal(room.id)}
          >
            <div className="w-8 h-8 relative flex items-center justify-center group cursor-pointer">
              <Image src="/icon-markers.svg" alt="Marker" width={48} height={48} className="absolute inset-0 w-full h-full drop-shadow-lg transition-opacity duration-300 group-hover:opacity-0" />
              <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 pointer-events-none flex items-center justify-center -translate-y-2 drop-shadow-xl">
                <div className="relative w-[119px] h-[42px]">
                  <Image src="/icon-markers-hover.svg" alt="Hover bg" fill className="object-contain" />
                  <div className="absolute inset-0 flex items-start justify-center pt-[6px] pointer-events-none">
                    <span className="text-white font-medium text-[13px]">{room.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Room Detail Modal */}
        {activeRoom && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 pointer-events-none">
            <div className="relative w-[340px] md:w-[400px] rounded-[24px] md:rounded-[32px] bg-black/40 backdrop-blur-2xl border border-white/20 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden flex flex-col pointer-events-auto animate-in fade-in zoom-in-95 duration-300 ease-out p-4 md:p-5">
              <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 z-10 p-1.5 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {activeRoom.image_url && (
                <div className="relative w-full aspect-[3/4] rounded-[16px] md:rounded-[20px] overflow-hidden bg-black/50 border border-white/10 shadow-inner">
                  <Image src={activeRoom.image_url} alt={activeRoom.name} fill className="object-cover" />
                </div>
              )}
              <div className="pt-4 pb-2 px-1">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2">{activeRoom.name}</h2>
                {activeRoom.description && (
                  <p className="text-gray-200 text-xs md:text-[13px] leading-relaxed">{activeRoom.description}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Bottom Navigation Pills */}
        <div className="absolute bottom-6 left-0 right-0 flex md:hidden justify-center items-center gap-2 md:gap-3 px-4 z-50 pointer-events-auto">
          <button
            onClick={() => setActiveMobileCard(activeMobileCard === 'details' ? null : 'details')}
            className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full backdrop-blur-md border border-white/20 text-white font-medium text-[12px] sm:text-sm transition-colors shadow-lg ${activeMobileCard === 'details' ? 'bg-white/40' : 'bg-white/20 hover:bg-white/30'}`}
          >Kos Information</button>
          <button
            onClick={() => setActiveMobileCard(activeMobileCard === 'facilities' ? null : 'facilities')}
            className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full backdrop-blur-md border border-white/20 text-white font-medium text-[12px] sm:text-sm transition-colors shadow-lg ${activeMobileCard === 'facilities' ? 'bg-white/40' : 'bg-white/20 hover:bg-white/30'}`}
          >Fasilitas</button>
          <button
            onClick={() => setActiveMobileCard(activeMobileCard === 'map' ? null : 'map')}
            className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full backdrop-blur-md border border-white/20 text-white font-medium text-[12px] sm:text-sm transition-colors shadow-lg ${activeMobileCard === 'map' ? 'bg-white/40' : 'bg-white/20 hover:bg-white/30'}`}
          >Lokasi Maps</button>
        </div>
      </main>
    </div>
  );
}
