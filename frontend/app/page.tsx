"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Bed, Bathtub, Television, Wind, WifiHigh, Thermometer, Martini, PersonSimpleWalk, Briefcase, MapPin, Buildings, GenderIntersex, Train, BagSimple, ShoppingBag } from "@phosphor-icons/react";

// Dynamically import the Map component with strictly SSR disabled
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] md:h-[600px] rounded-[32px] bg-gray-100 flex items-center justify-center text-gray-400 font-medium">Memuat Peta...</div>
});

const KosTags = () => (
  <div className="flex flex-col mb-3">
    <div className="grid grid-cols-2 gap-y-2.5 gap-x-2 mb-3 mt-1">
      <div className="flex items-center space-x-1.5">
        <GenderIntersex className="w-4 h-4 text-black" weight="duotone" />
        <span className="text-[12px] sm:text-[13px] font-medium text-black">Campur</span>
      </div>
      <div className="flex items-center space-x-1.5">
        <Train className="w-4 h-4 text-black" weight="duotone" />
        <span className="text-[12px] sm:text-[13px] font-medium text-black">6 min Krl Tebet</span>
      </div>
      <div className="flex items-center space-x-1.5">
        <BagSimple className="w-4 h-4 text-black" weight="duotone" />
        <span className="text-[12px] sm:text-[13px] font-medium text-black">Profesional</span>
      </div>
      <div className="flex items-center space-x-1.5">
        <ShoppingBag className="w-4 h-4 text-black" weight="duotone" />
        <span className="text-[12px] sm:text-[13px] font-medium text-black">Mall Kokas</span>
      </div>
    </div>
    
    <div className="flex items-center space-x-2.5 py-1.5 px-3 rounded-xl bg-green-50 border border-green-200 self-start shadow-sm mt-1">
      <Image src="/whatsapp.svg" alt="WhatsApp" width={16} height={16} className="w-4 h-4" />
      <span className="text-[11.5px] font-bold text-green-700 tracking-tight">Please check for availability</span>
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
        <div className="flex items-center flex-1">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-carikos.svg"
              alt="Carikos Logo"
              width={44}
              height={38}
              priority
              className="w-auto h-8 sm:h-10 cursor-pointer"
            />
            <span className="text-[32px] font-bold tracking-tight text-[#111111]" style={{ fontFamily: "var(--font-poppins)" }}>
              Kosku
            </span>
          </Link>
        </div>

        {/* Links / Navigation */}
        <div className="hidden sm:flex justify-center items-center space-x-2">
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

        {/* Right Action Button */}
        <div className="flex items-center justify-end flex-1 hidden sm:flex">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-[15px] font-medium rounded-full hover:bg-gray-800 transition-colors">
            <span>Daftarkan Kosmu Disini</span>
            <Buildings className="w-5 h-5" weight="duotone" />
          </button>
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
                    <span className="text-white font-medium text-[13px]">Ruang Tamu</span>
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
                    <span className="text-white font-medium text-[13px]">Kamar tidur</span>
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
                    <span className="text-white font-medium text-[13px]">Kolam Renang</span>
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
                    <span className="text-white font-medium text-[13px]">Teras</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Left Glass Card - Kos Details */}
          <div className="absolute top-6 left-6 md:top-12 md:left-12 p-6 md:p-8 rounded-[24px] bg-black/20 backdrop-blur-2xl border border-white/20 w-[calc(100%-48px)] md:w-80 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 tracking-tight">Kos New Mayapada</h2>

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
              <span className="text-xl md:text-2xl font-bold tracking-tight">Rp 2.500.000</span>
            </div>
          </div>

          {/* Right Glass Card - Facilities */}
          <div className="absolute top-6 right-6 md:top-12 md:right-12 p-6 md:p-8 rounded-[24px] bg-black/20 backdrop-blur-2xl border border-white/20 hidden lg:block w-72 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
            <h2 className="text-xl md:text-2xl font-bold mb-6 tracking-tight">Fasilitas Kos</h2>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Bed className="w-5 h-5 text-white" />
                <span className="font-bold text-sm">Kasur</span>
              </div>

              <div className="flex items-center space-x-3">
                <Bathtub className="w-5 h-5 text-white" />
                <span className="font-bold text-sm">Kamar Mandi Dalam</span>
              </div>

              <div className="flex items-center space-x-3">
                <Television className="w-5 h-5 text-white" />
                <span className="font-bold text-sm">TV</span>
              </div>

              <div className="flex items-center space-x-3">
                <Wind className="w-5 h-5 text-white" />
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
                      <Television weight="bold" className="w-4 h-4 text-[#2AF56E]" />
                      <span className="text-[11px] md:text-xs font-semibold text-gray-200">Smart TV 4K</span>
                    </div>
                    {/* High-Speed WiFi */}
                    <div className="flex items-center space-x-2.5 bg-black/30 hover:bg-black/50 transition-colors backdrop-blur-md rounded-[14px] p-2.5 md:p-3 border border-white/10">
                      <WifiHigh weight="bold" className="w-4 h-4 text-[#2AF56E]" />
                      <span className="text-[11px] md:text-xs font-semibold text-gray-200">High-Speed WiFi</span>
                    </div>
                    {/* Climate Control */}
                    <div className="flex items-center space-x-2.5 bg-black/30 hover:bg-black/50 transition-colors backdrop-blur-md rounded-[14px] p-2.5 md:p-3 border border-white/10">
                      <Thermometer weight="bold" className="w-4 h-4 text-[#2AF56E]" />
                      <span className="text-[11px] md:text-xs font-semibold text-gray-200">Climate Control</span>
                    </div>
                    {/* Minibar */}
                    <div className="flex items-center space-x-2.5 bg-black/30 hover:bg-black/50 transition-colors backdrop-blur-md rounded-[14px] p-2.5 md:p-3 border border-white/10">
                      <Martini weight="bold" className="w-4 h-4 text-[#2AF56E]" />
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
                <MapPin className="w-4 h-4" weight="fill" />
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
                <MapPin className="w-4 h-4" weight="fill" />
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
                <Image src="/kos-palbatu.png" alt="Kos New Cilandak" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-xl font-bold mb-1">Kos Pal Batu 271</h3>
              <div className="flex items-center text-gray-500 mb-2 text-sm font-medium space-x-1.5">
                <MapPin className="w-4 h-4" weight="fill" />
                <span>Tebet, Jakarta Selatan</span>
              </div>
              <KosTags />
              <div className="text-lg">
                <span className="font-bold text-[#E53E3E]">Rp 1.850.000</span>
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
                <MapPin className="w-4 h-4" weight="fill" />
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
                <Link href="/" className="flex items-center gap-3 w-fit">
                  <Image
                    src="/logo-carikos.svg"
                    alt="Carikos Logo"
                    width={44}
                    height={38}
                    className="h-8 md:h-10 w-auto cursor-pointer"
                  />
                  <span className="text-[32px] font-bold tracking-tight text-[#111111]" style={{ fontFamily: "var(--font-poppins)" }}>
                    Kosku
                  </span>
                </Link>
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
