"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { MapPin, GenderIntersex, Money, CaretDown, FadersHorizontal, Train, CaretUp } from "@phosphor-icons/react";
import type { Kos } from "@/types/kos";
import { iconMap } from "@/lib/icon-map";
import { formatPrice } from "@/lib/utils";
import { KRL_LINES, MRT_LINES, isNearKrlLine } from "@/lib/krl-routes";
import { SlidersHorizontal } from "lucide-react";

// Coordinate centers for each location option
const LOCATION_CENTERS: Record<string, [number, number]> = {
  "Jakarta Selatan": [-6.2615, 106.8106],
  "Jakarta Pusat": [-6.1862, 106.8340],
  "Jakarta Barat": [-6.1680, 106.7580],
  "Jakarta Timur": [-6.2250, 106.9004],
  "Jakarta Utara": [-6.1384, 106.8638],
  "Bali": [-8.4095, 115.1889],
};

// No default center here, let Map.tsx handle it so it can adjust zoom accordingly

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
  const [selectedRailLines, setSelectedRailLines] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [krlSectionOpen, setKrlSectionOpen] = useState(true);
  const [mrtSectionOpen, setMrtSectionOpen] = useState(true);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleRailLine = (lineId: string) => {
    setSelectedRailLines((prev) =>
      prev.includes(lineId)
        ? prev.filter((id) => id !== lineId)
        : [...prev, lineId]
    );
  };

  const activeFilterCount = selectedRailLines.length;

  const filteredKosList = kosList.filter((kos) => {
    // Location filter
    if (filterLokasi !== "Lokasi" && kos.city !== filterLokasi && kos.district !== filterLokasi) return false;

    // Type filter — strict case-insensitive comparison
    if (filterTipe !== "Tipe Kos") {
      const filterLower = filterTipe.toLowerCase();
      const genderLabel = (kos.gender_label || "").toLowerCase();
      const kosType = (kos.kos_type || "").toLowerCase();

      if (genderLabel !== filterLower && kosType !== filterLower) return false;
    }

    // Price filter
    if (filterHarga !== "Harga") {
      const price = kos.price || 0;
      if (filterHarga === "1 - 2 Juta" && (price < 1000000 || price > 2000000)) return false;
      if (filterHarga === "> 3 Juta" && price <= 3000000) return false;
    }

    // KRL Line proximity filter
    if (selectedRailLines.length > 0 && kos.latitude && kos.longitude) {
      const isNearAnySelectedLine = selectedRailLines.some((lineId) => {
        const line = [...KRL_LINES, ...MRT_LINES].find((l) => l.id === lineId);
        if (!line) return false;
        return isNearKrlLine(kos.latitude!, kos.longitude!, line.coordinates);
      });
      if (!isNearAnySelectedLine) return false;
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
      image_url: k.image_url,
      district: k.district,
      city: k.city,
      kos_type: k.kos_type,
    }));

  // Determine map center based on selected location
  const mapCenter = LOCATION_CENTERS[filterLokasi];

  return (
    <>
      <div className="flex flex-col items-center mb-8 text-center mt-6 w-full">
        <span className="text-sm font-medium uppercase mb-3 text-gray-800 tracking-widest">JELAJAHI KOS LEWAT MAPS</span>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.3] text-[#111111] mb-8">
          Cari kos hemat hingga eksklusif di sekitar anda
        </h1>
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 w-full px-4 md:px-0">
          <div className="flex flex-col md:flex-row items-stretch bg-white rounded-[24px] md:rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-4 md:p-6 w-full md:w-fit gap-4 md:gap-0">
            {/* Lokasi */}
            <div className="relative flex items-center px-2 md:px-6 group border-b md:border-b-0 border-gray-100 pb-4 md:pb-0">
              <MapPin className="w-6 h-6 text-black mr-3 shrink-0" weight="duotone" />
              <div className="flex flex-col min-w-0 pr-8 text-left">
                <span className="text-[15px] font-semibold text-gray-900 leading-tight">Lokasi</span>
                <select
                  className="appearance-none w-full bg-transparent text-[14px] text-gray-500 focus:outline-none cursor-pointer mt-0.5 truncate"
                  value={filterLokasi}
                  onChange={(e) => setFilterLokasi(e.target.value)}
                >
                  <option value="Lokasi">pilih lokasi</option>
                  <option value="Jakarta Selatan">Jakarta Selatan</option>
                  <option value="Jakarta Pusat">Jakarta Pusat</option>
                  <option value="Jakarta Barat">Jakarta Barat</option>
                  <option value="Jakarta Timur">Jakarta Timur</option>
                  <option value="Jakarta Utara">Jakarta Utara</option>
                  <option value="Bali">Bali</option>
                </select>
              </div>
              <div className="pointer-events-none absolute right-2 md:right-6 flex items-center text-gray-900">
                <CaretDown className="w-4 h-4" weight="bold" />
              </div>
            </div>

            <div className="hidden md:block h-10 w-px bg-gray-200 shrink-0 self-center" />

            {/* Budget */}
            <div className="relative flex items-center px-2 md:px-6 group border-b md:border-b-0 border-gray-100 pb-4 md:pb-0">
              <Money className="w-6 h-6 text-black mr-3 shrink-0" weight="duotone" />
              <div className="flex flex-col min-w-0 pr-8 text-left">
                <span className="text-[15px] font-semibold text-gray-900 leading-tight">Budget</span>
                <select
                  className="appearance-none w-full bg-transparent text-[14px] text-gray-500 focus:outline-none cursor-pointer mt-0.5 truncate"
                  value={filterHarga}
                  onChange={(e) => setFilterHarga(e.target.value)}
                >
                  <option value="Harga">set budget</option>
                  <option value="1 - 2 Juta">1 - 2 Juta</option>
                  <option value="> 3 Juta">&gt; 3 Juta</option>
                </select>
              </div>
              <div className="pointer-events-none absolute right-2 md:right-6 flex items-center text-gray-900">
                <CaretDown className="w-4 h-4" weight="bold" />
              </div>
            </div>

            <div className="hidden md:block h-10 w-px bg-gray-200 shrink-0 self-center" />

            {/* Pilih Properti */}
            <div className="relative flex items-center px-2 md:px-6 group border-b md:border-b-0 border-gray-100 pb-4 md:pb-0">
              <GenderIntersex className="w-6 h-6 text-black mr-3 shrink-0" weight="duotone" />
              <div className="flex flex-col min-w-0 pr-8 text-left">
                <span className="text-[15px] font-semibold text-gray-900 leading-tight">Pilih Properti</span>
                <select
                  className="appearance-none w-full bg-transparent text-[14px] text-gray-500 focus:outline-none cursor-pointer mt-0.5 truncate"
                  value={filterTipe}
                  onChange={(e) => setFilterTipe(e.target.value)}
                >
                  <option value="Tipe Kos">pilih tipe properti</option>
                  <option value="Putra">Putra</option>
                  <option value="Putri">Putri</option>
                  <option value="Campur">Campur</option>
                  <option value="Kontrakan">Kontrakan</option>
                </select>
              </div>
              <div className="pointer-events-none absolute right-2 md:right-6 flex items-center text-gray-900">
                <CaretDown className="w-4 h-4" weight="bold" />
              </div>
            </div>

          </div>

          {/* Filters Button */}
          <div className="relative bg-white rounded-[24px] md:rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-4 md:p-6 w-full md:w-auto flex items-center justify-center shrink-0" ref={filterRef}>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
            >
              <SlidersHorizontal className="w-6 h-6 text-black shrink-0" weight="duotone" />
              <span className="text-[15px] font-semibold text-gray-900">Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-black text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center ml-1">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Filters Dropdown Panel */}
            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-3 w-[280px] bg-white rounded-[20px] shadow-[0_12px_40px_rgb(0,0,0,0.12)] border border-gray-100 z-50 overflow-hidden">
                <div className="p-5">
                  {/* KRL Lines Section */}
                  <div>
                    <button
                      onClick={() => setKrlSectionOpen(!krlSectionOpen)}
                      className="flex items-center justify-between w-full mb-4"
                    >
                      <div className="flex items-center gap-2.5">
                        <Train className="w-5 h-5 text-gray-900" weight="duotone" />
                        <span className="text-[15px] font-semibold text-gray-900">KRL Lines</span>
                      </div>
                      {krlSectionOpen ? (
                        <CaretUp className="w-4 h-4 text-gray-500" weight="bold" />
                      ) : (
                        <CaretDown className="w-4 h-4 text-gray-500" weight="bold" />
                      )}
                    </button>

                    {krlSectionOpen && (
                      <div className="flex flex-col gap-3 pl-1">
                        {KRL_LINES.map((line) => (
                          <label
                            key={line.id}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={selectedRailLines.includes(line.id)}
                                onChange={() => toggleRailLine(line.id)}
                                className="sr-only peer"
                              />
                              <div className="w-5 h-5 rounded-md border-2 border-gray-300 peer-checked:border-black peer-checked:bg-black transition-all flex items-center justify-center">
                                {selectedRailLines.includes(line.id) && (
                                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full shrink-0"
                                style={{ backgroundColor: line.color }}
                              />
                              <span className="text-[14px] text-gray-800 font-medium group-hover:text-black transition-colors">
                                {line.name}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* MRT Lines Section */}
                  <div className="mt-6 border-t border-gray-100 pt-4">
                    <button
                      onClick={() => setMrtSectionOpen(!mrtSectionOpen)}
                      className="flex items-center justify-between w-full mb-4"
                    >
                      <div className="flex items-center gap-2.5">
                        <Train className="w-5 h-5 text-gray-900" weight="duotone" />
                        <span className="text-[15px] font-semibold text-gray-900">MRT Lines</span>
                      </div>
                      {mrtSectionOpen ? (
                        <CaretUp className="w-4 h-4 text-gray-500" weight="bold" />
                      ) : (
                        <CaretDown className="w-4 h-4 text-gray-500" weight="bold" />
                      )}
                    </button>

                    {mrtSectionOpen && (
                      <div className="flex flex-col gap-3 pl-1">
                        {MRT_LINES.map((line) => (
                          <label
                            key={line.id}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={selectedRailLines.includes(line.id)}
                                onChange={() => toggleRailLine(line.id)}
                                className="sr-only peer"
                              />
                              <div className="w-5 h-5 rounded-md border-2 border-gray-300 peer-checked:border-black peer-checked:bg-black transition-all flex items-center justify-center">
                                {selectedRailLines.includes(line.id) && (
                                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full shrink-0"
                                style={{ backgroundColor: line.color }}
                              />
                              <span className="text-[14px] text-gray-800 font-medium group-hover:text-black transition-colors">
                                {line.name}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Apply Button */}
                <div className="px-5 pb-5 pt-2">
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full py-3 bg-black text-white text-[14px] font-bold rounded-full hover:bg-gray-800 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="w-full flex flex-col lg:flex-row gap-6 mt-4">
        {/* Left Column — Kos Card List */}
        <div className="w-full lg:w-1/2 max-h-[700px] overflow-y-auto pr-2 scrollbar-thin">
          {filteredKosList.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
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
                    <div className="flex justify-between items-center mt-5">
                      <span className="text-[#888888] text-[15px]">Start from</span>
                      <div>
                        <span className="font-medium text-[#E53E3E] text-[20px]">{formatPrice(kos.price)}</span>
                        <span className="font-medium text-[#111111] text-[20px]">/monthly</span>
                      </div>
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
            center={mapCenter}
            activeLines={selectedRailLines}
            className="w-full h-full rounded-[24px] overflow-hidden shadow-sm border border-gray-100 relative z-0"
          />
        </div>
      </div>
    </>
  );
}
