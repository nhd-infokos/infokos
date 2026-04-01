"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, GenderIntersex, Money } from "@phosphor-icons/react";
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
  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-1">
    {kos.kos_tags?.map((tag) => {
      const TagIcon = iconMap[tag.icon];
      return (
        <div key={tag.id} className="flex items-center space-x-1.5">
          {TagIcon && <TagIcon className="w-5 h-5 text-[#111111]" weight="regular" />}
          <span className="text-[15px] text-[#111111]">{tag.name}</span>
        </div>
      );
    })}
  </div>
);

interface MapsContentProps {
  kosList: Kos[];
  initialLocation?: string;
  initialType?: string;
  initialPrice?: string;
}

export default function MapsContent({ kosList, initialLocation, initialType, initialPrice }: MapsContentProps) {
  const [filterLokasi, setFilterLokasi] = useState(initialLocation || "Lokasi");
  const [filterTipe, setFilterTipe] = useState(initialType || "Tipe Kos");
  const [filterHarga, setFilterHarga] = useState(initialPrice || "Harga");

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
    <>
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
      <div className="w-full flex flex-col lg:flex-row gap-6 mt-4">
        {/* Left Column — Kos Card List */}
        <div className="w-full lg:w-1/2 max-h-[700px] overflow-y-auto pr-2 scrollbar-thin">
          {filteredKosList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredKosList.map((kos) => (
                <Link key={kos.id} href={`/detail/${kos.slug}`} className="group cursor-pointer block">
                  <div className="relative w-full aspect-square rounded-[24px] overflow-hidden mb-5 bg-gray-100">
                    <Image src={kos.image_url || ""} alt={kos.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="px-[12px]">
                    <h3 className="text-[24px] font-semibold mb-2 text-[#111111]">{kos.name}</h3>
                    <div className="flex items-center text-[#888888] mb-4 text-[15px] space-x-2">
                      <MapPin className="w-5 h-5 text-[#B0B0B0]" weight="fill" />
                      <span>{kos.district}, {kos.city}</span>
                    </div>
                    <KosTags kos={kos} />
                    <div className="text-right mt-5">
                      <span className="font-medium text-[#E53E3E] text-[20px]">{formatPrice(kos.price)}</span>
                      <span className="font-medium text-[#111111] text-[20px]">/monthly</span>
                    </div>
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
    </>
  );
}
