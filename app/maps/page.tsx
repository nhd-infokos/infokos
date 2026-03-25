"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  MapPin, Buildings, GenderIntersex, Money
} from "@phosphor-icons/react";
import type { Kos } from "@/types/kos";
import { iconMap } from "@/lib/icon-map";
import { formatPrice } from "@/lib/utils";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-[24px] bg-gray-100 flex items-center justify-center text-gray-400 font-medium">
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

export default function MapsPage() {
  const [kosList, setKosList] = useState<Kos[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [filterLokasi, setFilterLokasi] = useState("Lokasi");
  const [filterTipe, setFilterTipe] = useState("Tipe Kos");
  const [filterHarga, setFilterHarga] = useState("Harga");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/kos");
        const json = await res.json();
        if (json.data) {
          setKosList(json.data);
        }
      } catch (err) {
        console.error("Error fetching kos data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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

  // Build map-compatible data from filtered list (only kos with lat/lng)
  const mapKosList = filteredKosList
    .filter((k) => k.latitude && k.longitude)
    .map((k) => ({
      id: k.id,
      slug: k.slug,
      name: k.name,
      latitude: k.latitude!,
      longitude: k.longitude!,
      price: k.price,
    }));

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pt-6 overflow-x-clip">
      {/* Navigation Header */}
      <nav className="flex items-center justify-between px-6 md:px-[50px] py-6 w-full">
        <div className="flex items-center flex-1">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo-carikos.svg" alt="Carikos Logo" width={44} height={38} priority className="w-auto h-8 sm:h-10 cursor-pointer" />
            <span className="text-[32px] font-bold tracking-tight text-[#111111]" style={{ fontFamily: "var(--font-poppins)" }}>Kosku</span>
          </Link>
        </div>
        <div className="hidden sm:flex justify-center items-center space-x-8">
          <Link href="/" className="text-[15px] font-regular text-gray-500 hover:text-black transition-colors">Home</Link>
          <Link href="/maps" className="text-[15px] font-bold text-black hover:text-gray-600 transition-colors">Maps</Link>
          <a href="#" className="text-[15px] font-regular text-gray-500 hover:text-black transition-colors">Why Kosku</a>
        </div>
        <div className="flex items-center justify-end flex-1 hidden sm:flex">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-[15px] font-medium rounded-full hover:bg-gray-800 transition-colors">
            <span>Daftarkan Kosmu Disini</span>
            <Buildings className="w-5 h-5" weight="duotone" />
          </button>
        </div>
      </nav>

      <main className="flex flex-col items-center w-full px-6 md:px-[50px] pb-16">
        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center mt-6">
          <span className="text-sm font-medium uppercase mb-3 text-gray-800 tracking-widest">JELAJAHI KOS LEWAT MAPS</span>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.3] text-[#111111] mb-8">
            Cari kos hemat hingga eksklusif di sekitar anda
          </h1>

          {/* Pill Filter Bar */}
          <div className="flex flex-col md:flex-row items-center bg-white md:border border-gray-800 md:rounded-full md:p-2 justify-center w-full md:w-auto gap-3 md:gap-0">
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

        {/* Two-Column Layout */}
        {loading ? (
          <div className="w-full py-20 flex items-center justify-center">
            <div className="text-gray-400 text-lg font-medium animate-pulse">Memuat...</div>
          </div>
        ) : (
          <div className="w-full flex flex-col lg:flex-row gap-6 mt-4">
            {/* Left Column — Kos Card List */}
            <div className="w-full lg:w-1/2 max-h-[700px] overflow-y-auto pr-2 scrollbar-thin">
              {filteredKosList.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
            </div>

            {/* Right Column — Map */}
            <div className="w-full lg:w-1/2 lg:sticky lg:top-6 h-[500px] lg:h-[700px]">
              <Map
                kosList={mapKosList}
                className="w-full h-full rounded-[24px] overflow-hidden shadow-sm border border-gray-100 relative z-0"
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full px-6 md:px-[50px] py-16 mt-10 bg-white border-t border-gray-100">
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
                  <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
                  <li><Link href="/maps" className="hover:text-black transition-colors">Maps</Link></li>
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
          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
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
