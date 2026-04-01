"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { MapPin, GenderIntersex, Money, CaretDown, X } from "@phosphor-icons/react";

export default function HomeSearchForm() {
  const router = useRouter();
  const [location, setLocation] = useState("Lokasi");
  const [price, setPrice] = useState("Harga");
  const [type, setType] = useState("Tipe Kos");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location !== "Lokasi") params.set("location", location);
    if (price !== "Harga") params.set("price", price);
    if (type !== "Tipe Kos") params.set("type", type);
    
    setIsMobileOpen(false);
    router.push(`/maps?${params.toString()}`);
  };

  return (
    <>
      <div className="hidden md:flex items-center bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-2 w-full">
      <div className="relative flex items-center flex-1 px-4 py-3 md:px-8">
        <MapPin className="w-5 h-5 text-gray-900 mr-2 shrink-0" weight="duotone" />
        <select 
          className="appearance-none w-full bg-transparent text-[15px] font-medium text-gray-800 focus:outline-none cursor-pointer pr-6"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="Lokasi">Lokasi</option>
          <option value="Jakarta Selatan">Jakarta Selatan</option>
          <option value="Jakarta Pusat">Jakarta Pusat</option>
          <option value="Jakarta Barat">Jakarta Barat</option>
          <option value="Jakarta Timur">Jakarta Timur</option>
          <option value="Jakarta Utara">Jakarta Utara</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-4 md:right-6 flex items-center text-gray-900">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>

      <div className="h-8 w-px bg-gray-300 shrink-0" />

      <div className="relative flex items-center flex-1 px-4 py-3 md:px-8">
        <Money className="w-5 h-5 text-gray-900 mr-2 shrink-0" weight="duotone" />
        <select 
          className="appearance-none w-full bg-transparent text-[15px] font-medium text-gray-800 focus:outline-none cursor-pointer pr-6"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        >
          <option value="Harga">Harga</option>
          <option value="< 1 Juta">&lt; 1 Juta</option>
          <option value="1 - 2 Juta">1 - 2 Juta</option>
          <option value="> 2 Juta">&gt; 2 Juta</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-4 md:right-6 flex items-center text-gray-900">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>

      <div className="h-8 w-px bg-gray-300 shrink-0" />

      <div className="relative flex items-center flex-1 px-4 py-3 md:px-8">
        <GenderIntersex className="w-5 h-5 text-gray-900 mr-2 shrink-0" weight="duotone" />
        <select 
          className="appearance-none w-full bg-transparent text-[15px] font-medium text-gray-800 focus:outline-none cursor-pointer pr-6"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Tipe Kos">Tipe Kos</option>
          <option value="Putra">Putra</option>
          <option value="Putri">Putri</option>
          <option value="Campuran">Campuran</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-4 md:right-6 flex items-center text-gray-900">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>

      <button 
        onClick={handleSearch}
        className="ml-2 px-8 py-3.5 bg-black text-white text-[15px] font-semibold rounded-full hover:bg-gray-800 transition-colors whitespace-nowrap shrink-0"
      >
        Cari Kos
      </button>
    </div>

      {/* Mobile Search - Pill Trigger */}
      <div 
        className="flex md:hidden items-center justify-between bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] py-4 px-6 w-full cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsMobileOpen(true)}
      >
        <div className="flex items-center">
           <MapPin className="w-6 h-6 text-black mr-4 text-gray-900" weight="regular" />
           <div className="flex flex-col">
             <span className="text-[16px] font-semibold text-black leading-tight mb-1">{location !== "Lokasi" ? location : "Lokasi"}</span>
             <span className="text-[13px] text-[#888888] font-medium leading-tight">
               {price !== "Harga" ? price : "Harga"} • {type !== "Tipe Kos" ? type : "Tipe Kos"}
             </span>
           </div>
        </div>
        <CaretDown className="w-5 h-5 text-gray-900" weight="bold" />
      </div>

      {/* Mobile Search - Bottom Sheet Modal via Portal */}
      {mounted && isMobileOpen && createPortal(
        <div className="md:hidden">
          <div 
            className="fixed inset-0 z-[90] bg-black/60 transition-opacity" 
            onClick={() => setIsMobileOpen(false)} 
          />
          <div className="fixed bottom-0 left-0 right-0 w-full z-[100] bg-white rounded-t-[32px] pt-10 pb-8 px-6 flex flex-col">
            
            <div className="flex flex-col space-y-8 flex-1 mb-10">
              <div className="relative flex items-center">
                <MapPin className="w-[26px] h-[26px] text-black mr-4" weight="regular" />
                <select 
                  className="appearance-none w-full bg-transparent text-[18px] font-medium text-black focus:outline-none pr-6"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="Lokasi">Lokasi</option>
                  <option value="Jakarta Selatan">Jakarta Selatan</option>
                  <option value="Jakarta Pusat">Jakarta Pusat</option>
                  <option value="Jakarta Barat">Jakarta Barat</option>
                  <option value="Jakarta Timur">Jakarta Timur</option>
                  <option value="Jakarta Utara">Jakarta Utara</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                  <CaretDown className="w-5 h-5 text-gray-500 hidden" />
                </div>
              </div>

              <div className="relative flex items-center">
                <Money className="w-[26px] h-[26px] text-black mr-4" weight="duotone" />
                <select 
                  className="appearance-none w-full bg-transparent text-[18px] font-medium text-black focus:outline-none pr-6"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                >
                  <option value="Harga">Harga</option>
                  <option value="< 1 Juta">&lt; 1 Juta</option>
                  <option value="1 - 2 Juta">1 - 2 Juta</option>
                  <option value="> 2 Juta">&gt; 2 Juta</option>
                </select>
              </div>

              <div className="relative flex items-center">
                <GenderIntersex className="w-[26px] h-[26px] text-black mr-4" weight="regular" />
                <select 
                  className="appearance-none w-full bg-transparent text-[18px] font-medium text-black focus:outline-none pr-6"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="Tipe Kos">Tipe Kos</option>
                  <option value="Putra">Putra</option>
                  <option value="Putri">Putri</option>
                  <option value="Campuran">Campuran</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleSearch}
              className="px-8 py-4 bg-black text-white text-[16px] font-bold rounded-full hover:bg-gray-800 transition-colors w-full flex items-center justify-center"
            >
              Cari Kos
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
