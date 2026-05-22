"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useMemo, useEffect } from "react";
import { MapPin, CaretDown, CaretUp, CheckSquare, Square, MinusSquare, X } from "@phosphor-icons/react";
import type { Kos } from "@/types/kos";
import { iconMap } from "@/lib/icon-map";
import { formatPrice } from "@/lib/utils";

const HARDCODED_LOCATIONS = [
  { city: "Jakarta Timur", districts: ["Cakung", "Cipayung", "Ciracas", "Duren Sawit", "Jatinegara", "Kramat Jati", "Makasar", "Matraman", "Pasar Rebo", "Pulo Gadung"] },
  { city: "Jakarta Selatan", districts: ["Setia Budi", "Tebet", "Cilandak", "Kebayoran Baru", "Kebayoran Lama", "Mampang"] },
  { city: "Jakarta Barat", districts: ["Cengkareng", "Grogol Petamburan", "Taman Sari", "Tambora", "Kebon Jeruk", "Kalideres", "Palmerah", "Kembangan"] },
  { city: "Jakarta Pusat", districts: ["Gambir", "Sawah Besar", "Kemayoran", "Senen", "Cempaka Putih", "Menteng", "Tanah Abang", "Johar Baru"] },
  { city: "Jakarta Utara", districts: ["Cilincing", "Kelapa Gading", "Koja", "Pademangan", "Penjaringan", "Tanjung Priok"] },
  { city: "Bali", districts: ["Kuta", "Denpasar Barat", "Canggu", "Tabanan", "Seminyak", "Uluwatu", "Denpasar Selatan"] },
  { city: "Depok", districts: ["Beji", "Pancoran mas", "Cimanggis", "Cinere"] },
  { city: "Bogor", districts: ["Dramaga", "Tanah Sereal", "Cibinong", "Cileungsi"] },
  { city: "Tanggerang", districts: ["Serpong", "Karawaci", "Pagedangan", "Kelapa dua", "Ponndok Aren"] },
  { city: "Surabaya", districts: ["Sukolilo", "Mulyorejo", "Gunung Anyar", "Tenggilis Mejoyo", "Wonocolo"] }
];

const KosTags = ({ kos }: { kos: Kos }) => (
  <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
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

export default function KosSlider({ kosList }: { kosList: Kos[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Filter States
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedCities, setExpandedCities] = useState<Set<string>>(new Set());
  
  // Format: Record<CityName, Set<DistrictName>>
  const [selectedLocs, setSelectedLocs] = useState<Record<string, Set<string>>>({});
  const [appliedLocs, setAppliedLocs] = useState<Record<string, Set<string>>>({});

  // Close filter on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const locations = HARDCODED_LOCATIONS;

  // Filter the kosList based on applied selections
  const filteredKosList = useMemo(() => {
    const hasFilters = Object.keys(appliedLocs).length > 0;
    if (!hasFilters) return kosList;

    return kosList.filter(kos => {
      if (!kos.city || !kos.district) return false;
      const citySet = appliedLocs[kos.city];
      return citySet && citySet.has(kos.district);
    });
  }, [kosList, appliedLocs]);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 344;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const toggleCityExpand = (city: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedCities);
    if (newExpanded.has(city)) newExpanded.delete(city);
    else newExpanded.add(city);
    setExpandedCities(newExpanded);
  };

  const toggleCitySelection = (city: string, allDistricts: string[]) => {
    const newSelected = { ...selectedLocs };
    if (newSelected[city]?.size === allDistricts.length) {
      delete newSelected[city];
    } else {
      newSelected[city] = new Set(allDistricts);
    }
    setSelectedLocs(newSelected);
  };

  const toggleDistrictSelection = (city: string, district: string) => {
    const newSelected = { ...selectedLocs };
    if (!newSelected[city]) newSelected[city] = new Set();
    
    if (newSelected[city].has(district)) {
      newSelected[city].delete(district);
      if (newSelected[city].size === 0) delete newSelected[city];
    } else {
      newSelected[city].add(district);
    }
    setSelectedLocs(newSelected);
  };

  const getCityState = (city: string, totalDistricts: number) => {
    const selectedCount = selectedLocs[city]?.size || 0;
    if (selectedCount === 0) return 'unchecked';
    if (selectedCount === totalDistricts) return 'checked';
    return 'indeterminate';
  };

  const hasAnySelection = Object.keys(selectedLocs).length > 0;

  const handleApply = () => {
    setAppliedLocs(selectedLocs);
    setIsFilterOpen(false);
  };

  const handleReset = () => {
    setSelectedLocs({});
    setAppliedLocs({});
  };

  const getFilterLabel = () => {
    const cities = Object.keys(appliedLocs);
    if (cities.length === 0) return "Pilih Lokasi";

    let totalDistricts = 0;
    cities.forEach(c => totalDistricts += appliedLocs[c].size);

    if (cities.length === 1) {
      const city = cities[0];
      const districtsArray = Array.from(appliedLocs[city]);
      if (districtsArray.length === 1) {
        return districtsArray[0];
      } else {
        return `${districtsArray.length} lokasi di ${city}`;
      }
    } else {
      return `${totalDistricts} lokasi terpilih`;
    }
  };

  const renderCheckboxIcon = (state: 'unchecked' | 'checked' | 'indeterminate') => {
    if (state === 'checked') return <CheckSquare className="w-[22px] h-[22px] text-black" weight="fill" />;
    if (state === 'indeterminate') return <MinusSquare className="w-[22px] h-[22px] text-black" weight="fill" />;
    return <Square className="w-[22px] h-[22px] text-black" weight="regular" />;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start w-[calc(100%+50px)] -mr-[50px] relative">
      {/* Left Text */}
      <div className="w-full lg:w-[20%] shrink-0 pr-4 lg:pr-8">
        <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold leading-[1.2] text-[#111111] mb-6 tracking-tight">
          Kost &<br />
          Coliving<br />
          Picked For<br />
          You
        </h2>
        <p className="text-[#888888] text-[14px] lg:text-[15px] leading-relaxed mb-10 max-w-[240px] md:max-w-[280px]">
          pekerja produktif Jakarta menghabiskan energi ekstra bukan karena jobdesc-nya berat, tapi karena environment sehari-harinya nggak supportif — mulai dari tempat tinggal sampai fasilitas yang tanggung
        </p>
        <div className="flex items-center -ml-4 gap-2">
          <button onClick={() => scrollSlider('left')} className="hover:opacity-80 transition-opacity outline-none" aria-label="Previous">
            <svg width="64" height="64" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_248_692)">
                <rect x="64" y="60" width="44" height="44" rx="22" transform="rotate(-180 64 60)" fill="white" shapeRendering="crispEdges" />
                <path d="M36.1309 37.3809L44.8809 28.6309C44.9622 28.5496 45.0588 28.4852 45.165 28.4412C45.2712 28.3972 45.385 28.3745 45.5 28.3745C45.615 28.3745 45.7288 28.3972 45.835 28.4412C45.9413 28.4852 46.0378 28.5496 46.1191 28.6309C46.2004 28.7122 46.2649 28.8087 46.3088 28.915C46.3528 29.0212 46.3755 29.135 46.3755 29.25C46.3755 29.365 46.3528 29.4788 46.3088 29.585C46.2649 29.6913 46.2004 29.7878 46.1191 29.8691L37.987 38L46.1191 46.1309C46.2833 46.2951 46.3755 46.5178 46.3755 46.75C46.3755 46.9822 46.2833 47.2049 46.1191 47.3691C45.9549 47.5332 45.7322 47.6255 45.5 47.6255C45.2678 47.6255 45.0451 47.5332 44.8809 47.3691L36.1309 38.6191C36.0496 38.5378 35.985 38.4413 35.941 38.3351C35.897 38.2289 35.8743 38.115 35.8743 38C35.8743 37.885 35.897 37.7712 35.941 37.6649C35.985 37.5587 36.0496 37.4622 36.1309 37.3809Z" fill="black" />
              </g>
              <defs>
                <filter id="filter0_d_248_692" x="0" y="0" width="84" height="84" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="10" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_248_692" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_248_692" result="shape" />
                </filter>
              </defs>
            </svg>
          </button>
          <button onClick={() => scrollSlider('right')} className="hover:opacity-80 transition-opacity outline-none -ml-4" aria-label="Next">
            <svg width="64" height="64" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_248_696)">
                <rect x="20" y="16" width="44" height="44" rx="22" fill="white" shapeRendering="crispEdges" />
                <path d="M47.8691 38.6191L39.1191 47.3691C39.0378 47.4504 38.9413 47.5148 38.835 47.5588C38.7288 47.6028 38.615 47.6255 38.5 47.6255C38.385 47.6255 38.2712 47.6028 38.165 47.5588C38.0587 47.5148 37.9622 47.4504 37.8809 47.3691C37.7996 47.2878 37.7352 47.1913 37.6912 47.085C37.6472 46.9788 37.6245 46.865 37.6245 46.75C37.6245 46.635 37.6472 46.5212 37.6912 46.415C37.7352 46.3087 37.7996 46.2122 37.8809 46.1309L46.013 38L37.8809 29.8691C37.7167 29.7049 37.6245 29.4822 37.6245 29.25C37.6245 29.0178 37.7167 28.7951 37.8809 28.6309C38.0451 28.4668 38.2678 28.3745 38.5 28.3745C38.7322 28.3745 38.9549 28.4668 39.1191 28.6309L47.8691 37.3809C47.9504 37.4622 48.015 37.5587 48.059 37.6649C48.103 37.7711 48.1257 37.885 48.1257 38C48.1257 38.115 48.103 38.2288 48.059 38.3351C48.015 38.4413 47.9504 38.5378 47.8691 38.6191Z" fill="black" />
              </g>
              <defs>
                <filter id="filter0_d_248_696" x="0" y="0" width="84" height="84" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="10" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_248_696" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_248_696" result="shape" />
                </filter>
              </defs>
            </svg>
          </button>
        </div>
      </div>

      {/* Right Cards Slider */}
      <div className="w-full lg:flex-1 min-w-0">
        
        {/* Filter Dropdown */}
        <div className="flex justify-start lg:justify-start items-center mb-6 pr-[50px] relative z-20" ref={filterRef}>
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 text-[#111111] hover:opacity-80 transition-opacity"
            >
              <MapPin className="w-5 h-5 shrink-0" weight="regular" />
              <span className="font-medium text-[16px] max-w-[200px] truncate">{getFilterLabel()}</span>
              {Object.keys(appliedLocs).length > 0 ? (
                <div onClick={(e) => { e.stopPropagation(); handleReset(); }} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer ml-1">
                   <X className="w-4 h-4 text-gray-500" weight="bold" />
                </div>
              ) : (
                <CaretDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} weight="bold" />
              )}
            </button>

            {isFilterOpen && (
              <div className="absolute top-full left-0 mt-3 w-[280px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden flex flex-col">
                <div className="max-h-[320px] overflow-y-auto p-2 scrollbar-hide">
                  {locations.length > 0 ? locations.map((loc) => {
                    const isExpanded = expandedCities.has(loc.city);
                    const cityState = getCityState(loc.city, loc.districts.length);

                    return (
                      <div key={loc.city} className="mb-1">
                        {/* City Row */}
                        <div className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors" onClick={(e) => toggleCityExpand(loc.city, e)}>
                          <div className="flex items-center gap-3">
                            <div onClick={(e) => { e.stopPropagation(); toggleCitySelection(loc.city, loc.districts); }}>
                              {renderCheckboxIcon(cityState)}
                            </div>
                            <span className="text-[15px] font-medium text-[#111111]">{loc.city}</span>
                          </div>
                          {isExpanded ? <CaretUp className="w-4 h-4 text-gray-500" /> : <CaretDown className="w-4 h-4 text-gray-500" />}
                        </div>

                        {/* Districts list */}
                        {isExpanded && (
                          <div className="ml-[34px] mt-1 space-y-1 mb-2">
                            {loc.districts.map(district => {
                              const isDistrictSelected = selectedLocs[loc.city]?.has(district);
                              return (
                                <div key={district} className="flex items-center gap-3 px-3 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors" onClick={() => toggleDistrictSelection(loc.city, district)}>
                                  {renderCheckboxIcon(isDistrictSelected ? 'checked' : 'unchecked')}
                                  <span className="text-[14px] text-gray-600">{district}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }) : (
                    <div className="p-4 text-center text-sm text-gray-500">Tidak ada lokasi</div>
                  )}
                </div>

                {/* Apply Button */}
                {hasAnySelection && (
                  <div className="p-4 border-t border-gray-100 bg-white">
                    <button 
                      onClick={handleApply}
                      className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-black/90 transition-colors text-[15px]"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-2 pr-[50px] [&::-webkit-scrollbar]:hidden"
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {filteredKosList.length > 0 ? (
            filteredKosList.map((kos) => (
              <Link key={kos.id} href={`/detail/${kos.slug}`} className="group cursor-pointer block w-[320px] shrink-0 snap-start">
                <div className="relative w-[320px] h-[320px] rounded-[24px] overflow-hidden mb-5 bg-gray-100">
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
            ))
          ) : (
            <div className="w-full py-20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-[#888888]">
                <MapPin size={32} weight="duotone" />
              </div>
              <h3 className="text-xl font-bold text-[#111111] mb-2">Kos Tidak Ditemukan</h3>
              <p className="text-[#888888] text-[15px] max-w-[300px]">Kami tidak menemukan kos yang sesuai dengan filter Anda. Coba ubah opsi pencarian.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
