"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Map component with strictly SSR disabled
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] md:h-[600px] rounded-[32px] bg-gray-100 flex items-center justify-center text-gray-400 font-medium">Memuat Peta...</div>
});

const KosTags = () => (
  <div className="flex flex-wrap gap-1.5 mb-3">
    <div className="flex items-center space-x-1.5 bg-[#F6F6F6] px-2.5 py-1 rounded-lg">
      <svg className="w-4 h-4 text-[#555555]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 7.3V13H8V9.6l1.8-.7" />
      </svg>
      <span className="text-[13px] font-medium text-[#555555]">7 menit ke halte bus</span>
    </div>
    <div className="flex items-center space-x-1.5 bg-[#F6F6F6] px-2.5 py-1 rounded-lg">
      <svg className="w-4 h-4 text-[#555555]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
      </svg>
      <span className="text-[13px] font-medium text-[#555555]">untuk profesional</span>
    </div>
    <div className="flex items-center space-x-1.5 bg-[#F6F6F6] px-2.5 py-1 rounded-lg">
      <svg className="w-4 h-4 text-[#555555]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 10c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
      </svg>
      <span className="text-[13px] font-medium text-[#555555]">trisakti</span>
    </div>
    <div className="flex items-center space-x-1.5 bg-[#F6F6F6] px-2.5 py-1 rounded-lg">
      <svg className="w-4 h-4 text-[#555555]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
      <span className="text-[13px] font-medium text-[#555555]">untar</span>
    </div>
  </div>
);

export default function Home() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* Navigation Header */}
      <nav className="flex items-center justify-between px-[50px] py-6 w-full">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logo-carikos.svg"
            alt="Carikos Logo"
            width={120}
            height={40}
            priority
            className="w-auto h-8 sm:h-10"
          />
        </div>

        {/* Links / Navigation */}
        <div className="hidden sm:flex items-center space-x-2">
          <a href="#" className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors">
            Home
          </a>
          <a href="#" className="px-6 py-2.5 bg-white text-black border border-gray-300 text-sm font-medium rounded-full shadow-sm hover:bg-gray-50 transition-colors">
            Cari Kos
          </a>
          <a href="#" className="px-6 py-2.5 bg-white text-black border border-gray-300 text-sm font-medium rounded-full shadow-sm hover:bg-gray-50 transition-colors">
            Maps
          </a>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex flex-col items-center w-full px-[50px] pb-16">
        {/* Hero Title Area */}
        <div className="text-center w-full px-4 sm:px-0 mt-6 sm:mt-12 mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[45px] font-medium leading-[1.2] tracking-tight text-[#111111] max-w-[1000px] mx-auto">
            Cari kos modern yang tenang, nyaman, dan siap<br className="hidden md:block" />
            jadi tempat pulang terbaikmu setiap hari.
          </h1>
        </div>

        {/* Hero Image & Cards Container */}
        <div className="relative w-full rounded-[32px] overflow-hidden aspect-[4/3] md:aspect-[16/10] bg-gray-100 shadow-2xl">
          {/* Background Image */}
          <Image
            src="/kos-mayapada.webp"
            alt="Kos Green Mayapada"
            fill
            className="object-cover"
            priority
          />

          {/* Markers */}
          {/* Marker 1: Ruang Tamu */}
          {/* Marker 1: Ruang Tamu */}
          <div
            className="absolute top-[50%] left-[84%] transform -translate-x-1/2 -translate-y-1/2 hidden md:flex flex-col items-center z-20 animate-[float_3s_ease-in-out_infinite] relative"
            onClick={() => setActiveModal("ruang-tamu")}
          >
            <div className="w-8 h-8 md:w-12 md:h-12 relative flex items-center justify-center group cursor-pointer">
              <Image src="/icon-markers.svg" alt="Marker" width={48} height={48} className="absolute inset-0 w-full h-full drop-shadow-lg transition-opacity duration-300 group-hover:opacity-0" />

              <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 pointer-events-none flex items-center justify-center -translate-y-2 drop-shadow-xl">
                <div className="relative w-[119px] h-[42px]">
                  <Image src="/icon-markers-hover.svg" alt="Hover bg" fill className="object-contain" />
                  <div className="absolute inset-0 flex items-start justify-center pt-[6px] pointer-events-none">
                    <span className="text-black font-medium text-[13px]">Ruang Tamu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Marker 2: Kamar tidur */}
          <div className="absolute top-[40%] left-[115%] transform -translate-x-1/2 -translate-y-1/2 hidden md:flex flex-col items-center z-20 animate-[float_4s_ease-in-out_infinite_0.5s] relative">
            <div className="w-8 h-8 md:w-12 md:h-12 relative flex items-center justify-center group cursor-pointer">
              <Image src="/icon-markers.svg" alt="Marker" width={48} height={48} className="absolute inset-0 w-full h-full drop-shadow-lg transition-opacity duration-300 group-hover:opacity-0" />

              <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 pointer-events-none flex items-center justify-center -translate-y-2 drop-shadow-xl">
                <div className="relative w-[119px] h-[42px]">
                  <Image src="/icon-markers-hover.svg" alt="Hover bg" fill className="object-contain" />
                  <div className="absolute inset-0 flex items-start justify-center pt-[6px] pointer-events-none">
                    <span className="text-black font-medium text-[13px]">Kamar tidur</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Marker 3: Kolam Renang */}
          <div className="absolute top-[62%] left-[110%] transform -translate-x-1/2 -translate-y-1/2 hidden md:flex flex-col items-center z-20 animate-[float_3.5s_ease-in-out_infinite_1s] relative">
            <div className="w-8 h-8 md:w-12 md:h-12 relative flex items-center justify-center group cursor-pointer">
              <Image src="/icon-markers.svg" alt="Marker" width={48} height={48} className="absolute inset-0 w-full h-full drop-shadow-lg transition-opacity duration-300 group-hover:opacity-0" />

              <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 pointer-events-none flex items-center justify-center -translate-y-2 drop-shadow-xl">
                <div className="relative w-[119px] h-[42px]">
                  <Image src="/icon-markers-hover.svg" alt="Hover bg" fill className="object-contain" />
                  <div className="absolute inset-0 flex items-start justify-center pt-[6px] pointer-events-none">
                    <span className="text-black font-medium text-[13px]">Kolam Renang</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Marker 4: Teras */}
          <div className="absolute top-[40%] left-[100%] transform -translate-x-1/2 -translate-y-1/2 hidden md:flex flex-col items-center z-20 animate-[float_3s_ease-in-out_infinite_1.5s] relative">
            <div className="w-8 h-8 md:w-12 md:h-12 relative flex items-center justify-center group cursor-pointer">
              <Image src="/icon-markers.svg" alt="Marker" width={48} height={48} className="absolute inset-0 w-full h-full drop-shadow-lg transition-opacity duration-300 group-hover:opacity-0" />

              <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 pointer-events-none flex items-center justify-center -translate-y-2 drop-shadow-xl">
                <div className="relative w-[119px] h-[42px]">
                  <Image src="/icon-markers-hover.svg" alt="Hover bg" fill className="object-contain" />
                  <div className="absolute inset-0 flex items-start justify-center pt-[6px] pointer-events-none">
                    <span className="text-black font-medium text-[13px]">Teras</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Left Glass Card - Kos Details */}
          <div className="absolute top-6 left-6 md:top-12 md:left-12 p-6 md:p-8 rounded-[24px] bg-white/10 backdrop-blur-xl border border-white/20 w-[calc(100%-48px)] md:w-80 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 tracking-tight">Kos Green Mayapada</h2>

            <div className="space-y-4 text-xs md:text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-medium">Lokasi</span>
                <span className="font-semibold text-right">Cilandak, Jakarta Selatan</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-medium">Tipe Kos</span>
                <span className="font-semibold text-right">Putra</span>
              </div>
            </div>

            <div className="h-px w-full bg-white/20 my-6"></div>

            <div className="flex justify-between items-baseline">
              <span className="text-gray-300 text-xs md:text-sm font-medium">Harga / bulan</span>
              <span className="text-xl md:text-2xl font-bold tracking-tight">Rp 1.200.000</span>
            </div>
          </div>

          {/* Right Glass Card - Facilities */}
          <div className="absolute top-6 right-6 md:top-12 md:right-12 p-6 md:p-8 rounded-[24px] bg-white/10 backdrop-blur-xl border border-white/20 hidden lg:block w-72 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
            <h2 className="text-xl md:text-2xl font-bold mb-6 tracking-tight">Fasilitas Kos</h2>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full">
                  <svg className="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="font-bold text-sm">Kasur</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full">
                  <svg className="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="font-bold text-sm">Bantal</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full">
                  <svg className="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="font-bold text-sm">Kamar Mandi</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full">
                  <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                    <polyline points="17 2 12 7 7 2"></polyline>
                  </svg>
                </div>
                <span className="font-bold text-sm">TV</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full">
                  <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="12" x2="20" y2="12"></line>
                    <line x1="4" y1="8" x2="20" y2="8"></line>
                    <line x1="4" y1="16" x2="20" y2="16"></line>
                  </svg>
                </div>
                <span className="font-bold text-sm">AC</span>
              </div>
            </div>
          </div>

          {/* Detail Modal (Inside Hero Frame) */}
          {activeModal === "ruang-tamu" && (
            <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 pointer-events-none">
              {/* Modal Content - Glass Style */}
              <div
                className="relative w-full max-w-3xl rounded-[24px] md:rounded-[32px] bg-black/40 backdrop-blur-2xl border border-white/20 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-full pointer-events-auto animate-in fade-in zoom-in-95 duration-300 ease-out"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveModal(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Video Header */}
                <div className="relative w-full aspect-[21/9] md:h-[280px] shrink-0 bg-black/50">
                  <video
                    src="/ruangtamu.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content Body */}
                <div className="p-5 md:p-8 overflow-y-auto">
                  <h2 className="text-2xl md:text-4xl font-medium tracking-tight mb-3">Ruang Tamu</h2>
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed max-w-2xl mb-6">
                    A spacious and elegant living area designed for comfort and luxury. Features premium furniture, ambient lighting, and panoramic views of the garden.
                  </p>

                  <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#2AF56E] mb-3 md:mb-4">Facilities</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
                    {/* Smart TV 4K */}
                    <div className="flex items-center space-x-2.5 bg-black/30 hover:bg-black/50 transition-colors backdrop-blur-md rounded-[14px] p-2.5 md:p-3 border border-white/10">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2AF56E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>
                      <span className="text-[11px] md:text-xs font-semibold text-gray-200">Smart TV 4K</span>
                    </div>
                    {/* High-Speed WiFi */}
                    <div className="flex items-center space-x-2.5 bg-black/30 hover:bg-black/50 transition-colors backdrop-blur-md rounded-[14px] p-2.5 md:p-3 border border-white/10">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2AF56E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
                      <span className="text-[11px] md:text-xs font-semibold text-gray-200">High-Speed WiFi</span>
                    </div>
                    {/* Climate Control */}
                    <div className="flex items-center space-x-2.5 bg-black/30 hover:bg-black/50 transition-colors backdrop-blur-md rounded-[14px] p-2.5 md:p-3 border border-white/10">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2AF56E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"></line><line x1="12" y1="2" x2="15" y2="5"></line><line x1="12" y1="2" x2="9" y2="5"></line><line x1="12" y1="22" x2="15" y2="19"></line><line x1="12" y1="22" x2="9" y2="19"></line><line x1="3.34" y1="7" x2="20.66" y2="17"></line><line x1="3.34" y1="7" x2="6.35" y2="8.61"></line><line x1="3.34" y1="7" x2="2.7" y2="10.8"></line><line x1="20.66" y1="17" x2="17.65" y2="15.39"></line><line x1="20.66" y1="17" x2="21.3" y2="13.2"></line><line x1="3.34" y1="17" x2="20.66" y2="7"></line><line x1="3.34" y1="17" x2="6.35" y2="15.39"></line><line x1="3.34" y1="17" x2="2.7" y2="13.2"></line><line x1="20.66" y1="7" x2="17.65" y2="8.61"></line><line x1="20.66" y1="7" x2="21.3" y2="10.8"></line></svg>
                      <span className="text-[11px] md:text-xs font-semibold text-gray-200">Climate Control</span>
                    </div>
                    {/* Minibar */}
                    <div className="flex items-center space-x-2.5 bg-black/30 hover:bg-black/50 transition-colors backdrop-blur-md rounded-[14px] p-2.5 md:p-3 border border-white/10">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2AF56E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="4" y1="9" x2="20" y2="9"></line><line x1="9" y1="14" x2="9" y2="18"></line></svg>
                      <span className="text-[11px] md:text-xs font-semibold text-gray-200">Minibar</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Popular Kos Section */}
        <section className="w-full mt-24">
          <div className="flex flex-col items-center mb-12 text-center">
            <span className="text-sm font-medium uppercase mb-3 text-gray-800">JELAJAHI KOS POPULER</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.3] text-[#111111] mb-8">
              Dari kos hemat hingga eksklusif — semua ada dalam satu tempat.
            </h2>

            {/* Pill Search Form */}
            <div className="flex flex-col md:flex-row items-center bg-white md:border border-gray-800 md:rounded-full md:p-1.5 justify-center mt-4 w-full md:w-auto gap-3 md:gap-0">
              <div className="relative w-full md:w-auto border border-gray-300 md:border-transparent rounded-full md:rounded-none px-4 py-3 md:py-0 md:pl-6 md:pr-4">
                <select className="appearance-none w-full bg-transparent text-sm font-medium text-gray-800 focus:outline-none cursor-pointer pr-8 md:pr-6 text-center md:text-left">
                  <option>Lokasi</option>
                  <option>Jakarta Selatan</option>
                  <option>Jakarta Pusat</option>
                  <option>Jakarta Barat</option>
                  <option>Jakarta Timur</option>
                  <option>Jakarta Utara</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center pr-1 text-gray-900">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              <div className="hidden md:block h-6 w-px bg-gray-300 mx-2"></div>

              <div className="relative w-full md:w-auto border border-gray-300 md:border-transparent rounded-full md:rounded-none px-4 py-3 md:py-0 md:px-4">
                <select className="appearance-none w-full bg-transparent text-sm font-medium text-gray-800 focus:outline-none cursor-pointer pr-8 md:pr-6 text-center md:text-left">
                  <option>Tipe Kos</option>
                  <option>Putra</option>
                  <option>Putri</option>
                  <option>Campuran</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center pr-1 text-gray-900">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              <div className="hidden md:block h-6 w-px bg-gray-300 mx-2"></div>

              <div className="relative w-full md:w-auto border border-gray-300 md:border-transparent rounded-full md:rounded-none px-4 py-3 md:py-0 md:px-4">
                <select className="appearance-none w-full bg-transparent text-sm font-medium text-gray-800 focus:outline-none cursor-pointer pr-8 md:pr-6 text-center md:text-left">
                  <option>Harga</option>
                  <option>&lt; 1 Juta</option>
                  <option>1 - 2 Juta</option>
                  <option>&gt; 2 Juta</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center pr-1 text-gray-900">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              <button className="w-full md:w-auto bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors md:ml-4">
                Cari Kos
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="group cursor-pointer">
              <div className="relative w-full aspect-square rounded-[24px] overflow-hidden mb-4 bg-gray-100">
                <Image src="/kos-1.jpg" alt="Kos Mayapada" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-xl font-bold mb-1">Kos Mayapada</h3>
              <div className="flex items-center text-gray-500 mb-2 text-sm font-medium space-x-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                <span>Cilandak, Jakarta Selatan</span>
              </div>
              <KosTags />
              <div className="text-lg">
                <span className="font-bold text-[#E53E3E]">Rp 1.200.000</span>
                <span className="font-medium">/bulan</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group cursor-pointer">
              <div className="relative w-full aspect-square rounded-[24px] overflow-hidden mb-4 bg-gray-100">
                <Image src="/kos-2.jpg" alt="Kos Waduk" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-xl font-bold mb-1">Kos Waduk</h3>
              <div className="flex items-center text-gray-500 mb-2 text-sm font-medium space-x-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                <span>Cilandak, Jakarta Selatan</span>
              </div>
              <KosTags />
              <div className="text-lg">
                <span className="font-bold text-[#E53E3E]">Rp 950.000</span>
                <span className="font-medium">/bulan</span>
              </div>
            </div>

            {/* Card 3 */}
            <Link href="/detail/kos-new-cilandak" className="group cursor-pointer block">
              <div className="relative w-full aspect-square rounded-[24px] overflow-hidden mb-4 bg-gray-100">
                <Image src="/kos-3.jpg" alt="Kos New Cilandak" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-xl font-bold mb-1">Kos New Cilandak</h3>
              <div className="flex items-center text-gray-500 mb-2 text-sm font-medium space-x-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                <span>Cilandak, Jakarta Selatan</span>
              </div>
              <KosTags />
              <div className="text-lg">
                <span className="font-bold text-[#E53E3E]">Rp 1.500.000</span>
                <span className="font-medium">/bulan</span>
              </div>
            </Link>

            {/* Card 4 */}
            <div className="group cursor-pointer">
              <div className="relative w-full aspect-square rounded-[24px] overflow-hidden mb-4 bg-gray-100">
                <Image src="/kos-4.jpg" alt="Kos Green Mayapada" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-xl font-bold mb-1">Kos Green Mayapada</h3>
              <div className="flex items-center text-gray-500 mb-2 text-sm font-medium space-x-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                <span>Cilandak, Jakarta Selatan</span>
              </div>
              <KosTags />
              <div className="text-lg">
                <span className="font-bold text-[#E53E3E]">Rp 980.000</span>
                <span className="font-medium">/bulan</span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Maps Section */}
        <section className="w-full mt-24 mb-10">
          <div className="flex justify-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">Cari Lewat Maps</h2>
          </div>

          <div className="relative w-full mx-auto flex flex-col items-center">
            {/* Pill Search Form Overlay */}
            <div className="absolute -top-6 transform z-20 w-11/12 sm:w-[500px] h-14 bg-white rounded-full shadow-lg border border-gray-200 flex items-center px-2 pr-2">
              <input
                type="text"
                placeholder="Cari Kos"
                className="flex-1 w-full bg-transparent outline-none pl-6 text-sm font-medium text-gray-800 placeholder-gray-400"
              />
              <button className="h-10 px-8 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors">
                Cari
              </button>
            </div>

            {/* Map Container */}
            <Map />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full px-[50px] py-16 mt-10 bg-white">
        <div className="w-full">
          {/* Top section */}
          <div className="flex flex-col md:flex-row justify-between mb-16 gap-10">
            {/* Logo and Description */}
            <div className="max-w-sm">
              <div className="mb-6">
                <Image
                  src="/logo-carikos.svg"
                  alt="Carikos Logo"
                  width={140}
                  height={46}
                  className="h-8 md:h-10 w-auto"
                />
              </div>
              <p className="text-[#888888] text-sm md:text-[15px] leading-relaxed font-medium">
                Temukan kos populer di berbagai lokasi dengan pilihan sesuai kebutuhan dan budgetmu.
              </p>
            </div>

            {/* Links Columns */}
            <div className="flex gap-16 md:gap-24 pr-4 lg:pr-10">
              {/* Menu Links */}
              <div>
                <h3 className="text-black font-bold text-[15px] mb-6 tracking-wide">MENU</h3>
                <ul className="space-y-4 text-sm md:text-[15px] text-[#888888] font-medium">
                  <li><a href="#" className="hover:text-black transition-colors">Home</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Cari Kos</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Maps</a></li>
                </ul>
              </div>

              {/* FAQ Links */}
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

          {/* Bottom section (Copyright & Socials) */}
          <div className="pt-8 border-t border-gray-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#888888] font-medium">
              2026 kosku All rights reserved
            </p>

            <div className="flex items-center space-x-6 text-[#888888]">
              {/* Tiktok Icon */}
              <a href="#" className="hover:text-black transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              {/* Instagram Icon */}
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
