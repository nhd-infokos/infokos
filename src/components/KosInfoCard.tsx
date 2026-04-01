"use client";

import { useState } from "react";
import Image from "next/image";
import DynamicIcon from "@/components/DynamicIcon";
import { formatPrice } from "@/lib/utils";
import type { Kos } from "@/types/kos";

interface KosInfoCardProps {
  kos: Kos;
  mapEmbedUrl: string;
}

export default function KosInfoCard({ kos, mapEmbedUrl }: KosInfoCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const cardContent = (
    <>
      <div className="flex justify-between items-center mb-6 pr-8">
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
    </>
  );

  return (
    <>
      {/* Desktop Card (Always visible) */}
      <div className="hidden md:flex absolute top-10 left-[50px] p-8 rounded-[24px] bg-black/40 backdrop-blur-2xl border border-white/20 w-[420px] max-h-[calc(100vh-100px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] pointer-events-auto z-40 flex-col">
        {cardContent}
      </div>

      {/* Mobile Card Layout */}
      <div className={`md:hidden absolute z-40 pointer-events-auto ${!isOpen ? "bottom-8 left-1/2 -translate-x-1/2" : "top-10 left-6 right-6"}`}>
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="px-8 py-3.5 rounded-full bg-black/40 backdrop-blur-2xl border border-white/20 text-white font-semibold flex items-center justify-center shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all active:scale-95 whitespace-nowrap"
          >
            <span className="text-[15px]">Kos Information</span>
          </button>
        ) : (
          <div className="p-6 rounded-[24px] bg-black/40 backdrop-blur-2xl border border-white/20 w-full max-h-[calc(100vh-140px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 z-50 p-2 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M1 13L13 1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            {cardContent}
          </div>
        )}
      </div>
    </>
  );
}
