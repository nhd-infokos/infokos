"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MapPin, Buildings, GenderIntersex, Money
} from "@phosphor-icons/react";
import type { Kos, KosRoom } from "@/types/kos";
import { iconMap } from "@/lib/icon-map";
import { formatPrice } from "@/lib/utils";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] md:h-[600px] rounded-[32px] bg-gray-100 flex items-center justify-center text-gray-400 font-medium">
      Memuat Peta...
    </div>
  ),
});

const KosTags = ({ kos }: { kos: Kos }) => (
  <div className="flex flex-col mb-3">
    <div className="grid grid-cols-2 gap-y-2.5 gap-x-2 mb-3 mt-1">
      {kos.kos_tags?.map((tag) => {
        const TagIcon = iconMap[tag.icon];
        return (
          <div key={tag.id} className="flex items-center space-x-1.5">
            {TagIcon && <TagIcon className="w-4 h-4 text-black" weight="duotone" />}
            <span className="text-[12px] sm:text-[13px] font-medium text-black">{tag.name}</span>
          </div>
        );
      })}
    </div>
    <div className="flex items-center space-x-2.5 py-1.5 px-3 rounded-xl bg-green-50 border border-green-200 self-start shadow-sm mt-1">
      <Image src="/whatsapp.svg" alt="WhatsApp" width={16} height={16} className="w-4 h-4" />
      <span className="text-[11.5px] font-bold text-green-700 tracking-tight">Please check for availability</span>
    </div>
  </div>
);

export default function Home() {
  const [featuredKos, setFeaturedKos] = useState<Kos | null>(null);
  const [featuredRooms, setFeaturedRooms] = useState<KosRoom[]>([]);
  const [kosList, setKosList] = useState<Kos[]>([]);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [filterLokasi, setFilterLokasi] = useState("Lokasi");
  const [filterTipe, setFilterTipe] = useState("Tipe Kos");
  const [filterHarga, setFilterHarga] = useState("Harga");

  const { scrollY } = useScroll();

  // Use absolute scroll position to avoid hydration ref errors when loading
  // 4-point mapping:
  // 50-350: Expand to full screen
  // 350-600: Stay full screen
  // 600-900: Shrink back to rounded bounds
  const widthPadding = useTransform(scrollY, [50, 350, 600, 900], [0, 100, 100, 0]);
  const containerWidth = useTransform(widthPadding, (w) => `calc(100% + ${w}px)`);
  const marginStr = useTransform(widthPadding, (w) => `-${w / 2}px`);
  const borderRadius = useTransform(scrollY, [50, 350, 600, 900], ["32px", "0px", "0px", "32px"]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [featuredRes, listRes] = await Promise.all([
          fetch("/api/kos?featured=true"),
          fetch("/api/kos"),
        ]);
        const featured = await featuredRes.json();
        const list = await listRes.json();

        if (featured.data) {
          setFeaturedKos(featured.data);
          const roomsRes = await fetch(`/api/kos/${featured.data.slug}/rooms`);
          const rooms = await roomsRes.json();
          setFeaturedRooms(rooms.data || []);
        }
        if (list.data) {
          setKosList(list.data.filter((k: Kos) => !k.is_featured));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const activeRoom = featuredRooms.find((r) => r.id === activeModal);
  const floatDurations = [3, 4, 3.5, 3];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-400 text-lg font-medium animate-pulse">Memuat...</div>
      </div>
    );
  }

  const filteredKosList = kosList.filter((kos) => {
    if (filterLokasi !== "Lokasi" && kos.city !== filterLokasi && kos.district !== filterLokasi) return false;
    if (filterTipe !== "Tipe Kos" && kos.gender_label !== filterTipe && kos.kos_type !== filterTipe) return false;

    if (filterHarga !== "Harga") {
      const price = kos.price || 0;
      if (filterHarga === "< 1 Juta" && price >= 1000000) return false;
      if (filterHarga === "1 - 2 Juta" && (price < 1000000 || price > 2000000)) return false;
      if (filterHarga === "> 2 Juta" && price <= 2000000) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pt-6 overflow-x-clip">
      {/* Navigation Header */}
      <nav className="flex items-center justify-between px-[50px] py-6 w-full">
        <div className="flex items-center flex-1">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo-carikos.svg" alt="Carikos Logo" width={44} height={38} priority className="w-auto h-8 sm:h-10 cursor-pointer" />
            <span className="text-[32px] font-bold tracking-tight text-[#111111]" style={{ fontFamily: "var(--font-poppins)" }}>Kosku</span>
          </Link>
        </div>
        <div className="hidden sm:flex justify-center items-center space-x-8">
          <a href="#" className="text-[15px] font-bold text-black hover:text-gray-600 transition-colors">Home</a>
          <a href="#" className="text-[15px] font-regular text-gray-500 hover:text-black transition-colors">Maps</a>
          <a href="#" className="text-[15px] font-regular text-gray-500 hover:text-black transition-colors">Why Kosku</a>
        </div>
        <div className="flex items-center justify-end flex-1 hidden sm:flex">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-[15px] font-medium rounded-full hover:bg-gray-800 transition-colors">
            <span>Daftarkan Kosmu Disini</span>
            <Buildings className="w-5 h-5" weight="duotone" />
          </button>
        </div>
      </nav>

      <main className="flex flex-col items-center w-full px-[50px] pb-16">
        {/* Hero Title */}
        <div className="text-center w-full px-4 sm:px-0 mt-6 sm:mt-12 mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[45px] font-medium leading-[1.2] tracking-tight text-[#111111] max-w-[1000px] mx-auto">
            Cari kos modern yang tenang, nyaman, dan siap<br className="hidden md:block" />
            jadi tempat pulang terbaikmu setiap hari.
          </h1>
        </div>

        {/* Hero Image & Cards */}
        {featuredKos && (
          <motion.div
            className="relative overflow-hidden aspect-[4/3] md:aspect-[16/10] bg-gray-100 shadow-2xl"
            style={{
              width: containerWidth,
              marginLeft: marginStr,
              marginRight: marginStr,
              borderRadius
            }}
          >
            <Image src={featuredKos.image_url || ""} alt={featuredKos.name} fill className="object-cover" priority />

            {/* Room Markers */}
            {featuredRooms.map((room, index) => (
              <div
                key={room.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 hidden md:flex flex-col items-center z-20"
                style={{
                  top: room.marker_top || "50%",
                  left: room.marker_left || "50%",
                  animation: `float ${floatDurations[index % 4]}s ease-in-out infinite ${index * 0.5}s`,
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

            {/* Left Glass Card - Kos Details */}
            <div className="absolute top-10 left-6 md:top-36 md:left-12 p-6 md:p-8 rounded-[24px] bg-black/20 backdrop-blur-2xl border border-white/20 w-[calc(100%-48px)] md:w-80 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
              <h2 className="text-xl md:text-2xl font-bold mb-6 tracking-tight">{featuredKos.name}</h2>
              <div className="space-y-4 text-xs md:text-sm text-gray-200">
                {featuredKos.address && <p className="leading-relaxed">{featuredKos.address}</p>}
                <p className="font-semibold text-white">{featuredKos.city} • {featuredKos.district}</p>
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 pt-2">
                  {featuredKos.kos_tags?.map((tag) => {
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
                <span className="text-xl md:text-2xl font-bold tracking-tight text-white">{formatPrice(featuredKos.price)}</span>
              </div>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-gray-200 text-xs font-medium">Please check for availability</span>
                <a href={`https://wa.me/${featuredKos.whatsapp_number || "6281234567890"}`} target="_blank" rel="noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:bg-[#1DA851] transition-colors shadow-lg">
                  <Image src="/whatsapp.svg" alt="WhatsApp" width={20} height={20} className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              </div>
            </div>

            {/* Right Glass Card - Facilities */}
            {featuredKos.kos_facilities && featuredKos.kos_facilities.length > 0 && (
              <div className="absolute top-10 right-6 md:top-36 md:right-12 p-6 md:p-8 rounded-[24px] bg-black/20 backdrop-blur-2xl border border-white/20 hidden lg:block w-72 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
                <h2 className="text-xl md:text-2xl font-bold mb-6 tracking-tight">Fasilitas Kos</h2>
                <div className="space-y-4">
                  {featuredKos.kos_facilities.map((facility) => {
                    const IconComponent = facility.icon ? iconMap[facility.icon] : null;
                    return (
                      <div key={facility.id} className="flex items-center space-x-3">
                        {IconComponent && <IconComponent className="w-5 h-5 text-white" />}
                        <span className="font-bold text-sm">{facility.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Room Detail Modal */}
            {activeRoom && (
              <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 pointer-events-none">
                <div className="relative w-full max-w-3xl rounded-[24px] md:rounded-[32px] bg-black/40 backdrop-blur-2xl border border-white/20 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-full pointer-events-auto animate-in fade-in zoom-in-95 duration-300 ease-out">
                  <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Video or Image Header */}
                  <div className="relative w-full aspect-[21/9] md:h-[280px] shrink-0 bg-black/50">
                    {activeRoom.video_url ? (
                      <video src={activeRoom.video_url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    ) : activeRoom.image_url ? (
                      <Image src={activeRoom.image_url} alt={activeRoom.name} fill className="object-cover" />
                    ) : null}
                  </div>

                  <div className="p-5 md:p-8 overflow-y-auto">
                    <h2 className="text-2xl md:text-4xl font-medium tracking-tight mb-3">{activeRoom.name}</h2>
                    {activeRoom.description && (
                      <p className="text-gray-200 text-xs md:text-sm leading-relaxed max-w-2xl mb-6">{activeRoom.description}</p>
                    )}
                    {activeRoom.kos_room_facilities && activeRoom.kos_room_facilities.length > 0 && (
                      <>
                        <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#2AF56E] mb-3 md:mb-4">Facilities</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
                          {activeRoom.kos_room_facilities.map((rf) => {
                            const RFIcon = rf.icon ? iconMap[rf.icon] : null;
                            return (
                              <div key={rf.id} className="flex items-center space-x-2.5 bg-black/30 hover:bg-black/50 transition-colors backdrop-blur-md rounded-[14px] p-2.5 md:p-3 border border-white/10">
                                {RFIcon && <RFIcon weight="bold" className="w-4 h-4 text-[#2AF56E]" />}
                                <span className="text-[11px] md:text-xs font-semibold text-gray-200">{rf.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Popular Kos Section */}
        <section className="w-full mt-24">
          <div className="flex flex-col items-center mb-12 text-center">
            <span className="text-sm font-medium uppercase mb-3 text-gray-800">JELAJAHI KOS POPULER</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.3] text-[#111111] mb-8">
              Dari kos hemat hingga eksklusif — semua ada dalam satu tempat.
            </h2>

            {/* Pill Search Form */}
            <div className="flex flex-col md:flex-row items-center bg-white md:border border-gray-800 md:rounded-full md:p-2 justify-center mt-4 w-full md:w-auto gap-3 md:gap-0">
              <div className="relative flex items-center w-full md:w-auto border border-gray-300 md:border-transparent rounded-full md:rounded-none px-6 py-4 md:py-4 md:px-10">
                <MapPin className="w-5 h-5 text-gray-900 mr-2" weight="duotone" />
                <select
                  className="appearance-none w-full md:w-auto bg-transparent text-sm font-medium text-gray-800 focus:outline-none cursor-pointer pr-8 md:pr-6 text-center md:text-left"
                  value={filterLokasi}
                  onChange={(e) => setFilterLokasi(e.target.value)}
                >
                  <option value="Lokasi">Lokasi</option>
                  <option value="Jakarta Selatan">Jakarta Selatan</option>
                  <option value="Jakarta Pusat">Jakarta Pusat</option>
                  <option value="Jakarta Barat">Jakarta Barat</option>
                  <option value="Jakarta Timur">Jakarta Timur</option>
                  <option value="Jakarta Utara">Jakarta Utara</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center pr-1 text-gray-900">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
              <div className="hidden md:block h-8 w-px bg-gray-300 mx-2"></div>
              <div className="relative flex items-center w-full md:w-auto border border-gray-300 md:border-transparent rounded-full md:rounded-none px-6 py-4 md:py-4 md:px-10">
                <GenderIntersex className="w-5 h-5 text-gray-900 mr-2" weight="duotone" />
                <select
                  className="appearance-none w-full md:w-auto bg-transparent text-sm font-medium text-gray-800 focus:outline-none cursor-pointer pr-8 md:pr-6 text-center md:text-left"
                  value={filterTipe}
                  onChange={(e) => setFilterTipe(e.target.value)}
                >
                  <option value="Tipe Kos">Tipe Kos</option>
                  <option value="Putra">Putra</option>
                  <option value="Putri">Putri</option>
                  <option value="Campuran">Campuran</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center pr-1 text-gray-900">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
              <div className="hidden md:block h-8 w-px bg-gray-300 mx-2"></div>
              <div className="relative flex items-center w-full md:w-auto border border-gray-300 md:border-transparent rounded-full md:rounded-none px-6 py-4 md:py-4 md:px-10">
                <Money className="w-5 h-5 text-gray-900 mr-2" weight="duotone" />
                <select
                  className="appearance-none w-full md:w-auto bg-transparent text-sm font-medium text-gray-800 focus:outline-none cursor-pointer pr-8 md:pr-6 text-center md:text-left"
                  value={filterHarga}
                  onChange={(e) => setFilterHarga(e.target.value)}
                >
                  <option value="Harga">Harga</option>
                  <option value="< 1 Juta">&lt; 1 Juta</option>
                  <option value="1 - 2 Juta">1 - 2 Juta</option>
                  <option value="> 2 Juta">&gt; 2 Juta</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center pr-1 text-gray-900">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
          </div>

          {filteredKosList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredKosList.map((kos) => (
                <Link key={kos.id} href={`/detail/${kos.slug}`} className="group cursor-pointer block">
                  <div className="relative w-full aspect-square rounded-[24px] overflow-hidden mb-4 bg-gray-100">
                    <Image src={kos.image_url || ""} alt={kos.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{kos.name}</h3>
                  <div className="flex items-center text-gray-500 mb-2 text-sm font-medium space-x-1.5">
                    <MapPin className="w-4 h-4" weight="fill" />
                    <span>{kos.district}, {kos.city}</span>
                  </div>
                  <KosTags kos={kos} />
                  <div className="text-lg">
                    <span className="font-bold text-[#E53E3E]">{formatPrice(kos.price)}</span>
                    <span className="font-medium">/bulan</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="w-full py-20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <MapPin size={32} weight="duotone" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Kos Tidak Ditemukan</h3>
              <p className="text-gray-500 max-w-md">Kami tidak menemukan kos yang sesuai dengan filter Anda. Coba ubah opsi pencarian.</p>
            </div>
          )}
        </section>

        {/* Interactive Maps Section */}
        <section className="w-full mt-24 mb-10">
          <div className="flex justify-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">Cari Lewat Maps</h2>
          </div>
          <div className="relative w-full mx-auto flex flex-col items-center">
            <div className="absolute -top-6 transform z-20 w-11/12 sm:w-[500px] h-14 bg-white rounded-full shadow-lg border border-gray-200 flex items-center px-2 pr-2">
              <input type="text" placeholder="Cari Kos" className="flex-1 w-full bg-transparent outline-none pl-6 text-sm font-medium text-gray-800 placeholder-gray-400" />
              <button className="h-10 px-8 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors">Cari</button>
            </div>
            <Map />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full px-[50px] py-16 mt-10 bg-white">
        <div className="w-full">
          <div className="flex flex-col md:flex-row justify-between mb-16 gap-10">
            <div className="max-w-sm">
              <div className="mb-6">
                <Link href="/" className="flex items-center gap-3 w-fit">
                  <Image src="/logo-carikos.svg" alt="Carikos Logo" width={44} height={38} className="h-8 md:h-10 w-auto cursor-pointer" />
                  <span className="text-[32px] font-bold tracking-tight text-[#111111]" style={{ fontFamily: "var(--font-poppins)" }}>Kosku</span>
                </Link>
              </div>
              <p className="text-[#888888] text-sm md:text-[15px] leading-relaxed font-medium">
                Temukan kos populer di berbagai lokasi dengan pilihan sesuai kebutuhan dan budgetmu.
              </p>
            </div>
            <div className="flex gap-16 md:gap-24 pr-4 lg:pr-10">
              <div>
                <h3 className="text-black font-bold text-[15px] mb-6 tracking-wide">MENU</h3>
                <ul className="space-y-4 text-sm md:text-[15px] text-[#888888] font-medium">
                  <li><a href="#" className="hover:text-black transition-colors">Home</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Maps</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Why Kosku</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-black font-bold text-[15px] mb-6 tracking-wide">FAQ</h3>
                <ul className="space-y-4 text-sm md:text-[15px] text-[#888888] font-medium">
                  <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Terms & Condition</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Help</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#888888] font-medium">2026 kosku All rights reserved</p>
            <div className="flex items-center space-x-6 text-[#888888]">
              <a href="#" className="hover:text-black transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
              </a>
              <a href="#" className="hover:text-black transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
