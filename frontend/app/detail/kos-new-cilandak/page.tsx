"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Bed, Bathtub, Television, Wind, WifiHigh, Thermometer, Martini } from "@phosphor-icons/react";

export default function DetailKosNewCilandak() {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [activeMobileCard, setActiveMobileCard] = useState<'details' | 'facilities' | null>(null);

    return (
        <div className="min-h-screen relative w-full bg-black text-black font-sans selection:bg-black selection:text-white overflow-hidden">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
                {/* Desktop Background */}
                <div className="hidden md:block absolute inset-0">
                    <Image
                        src="/kos-new-cilandak.png"
                        alt="Kos New Cilandak"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Mobile Background */}
                <div className="block md:hidden absolute inset-0">
                    <Image
                        src="/kos-new-cilandak-mobile.png"
                        alt="Kos New Cilandak Mobile"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Subtle overlay to ensure text readability if needed */}
                <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
            </div>

            {/* Navigation Header (Overlay) */}
            <nav className="relative z-50 flex items-center justify-between px-[50px] py-6 w-full">
                <div className="flex items-center">
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
                <div className="hidden sm:flex items-center space-x-2">
                    <Link href="/" className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors">
                        Home
                    </Link>
                    <a href="#" className="px-6 py-2.5 bg-white/20 backdrop-blur-md text-black border border-white/30 text-sm font-medium rounded-full shadow-sm hover:bg-white/40 transition-colors">
                        Cari Kos
                    </a>
                    <a href="#" className="px-6 py-2.5 bg-white/20 backdrop-blur-md text-black border border-white/30 text-sm font-medium rounded-full shadow-sm hover:bg-white/40 transition-colors">
                        Maps
                    </a>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="relative z-20 w-full h-[calc(100vh-100px)] pointer-events-none">

                {/* Left Glass Card - Kos Details */}
                <div className={`absolute top-10 left-6 md:left-[50px] p-6 md:p-8 rounded-[24px] bg-black/40 backdrop-blur-2xl border border-white/20 w-[calc(100%-48px)] md:w-80 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] pointer-events-auto transition-opacity duration-300 ${activeMobileCard === 'details' ? 'opacity-100 z-40' : 'opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto z-10'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight">Kos New Cilandak</h2>
                        {/* Mobile Close Button */}
                        <button onClick={() => setActiveMobileCard(null)} className="md:hidden p-1 bg-white/10 rounded-full hover:bg-white/20">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

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
                <div className={`absolute top-10 right-6 md:right-[50px] md:left-auto left-6 p-6 md:p-8 rounded-[24px] bg-black/40 backdrop-blur-2xl border border-white/20 w-[calc(100%-48px)] lg:w-72 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] pointer-events-auto transition-opacity duration-300 ${activeMobileCard === 'facilities' ? 'opacity-100 z-40' : 'opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto z-10'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight">Fasilitas Kos</h2>
                        {/* Mobile Close Button */}
                        <button onClick={() => setActiveMobileCard(null)} className="md:hidden p-1 bg-white/10 rounded-full hover:bg-white/20 relative z-50 pointer-events-auto">
                            <svg className="w-5 h-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full">
                                <Bed className="w-4 h-4 text-black" weight="fill" />
                            </div>
                            <span className="font-bold text-sm">Kasur</span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full">
                                <Bed className="w-4 h-4 text-black" weight="fill" />
                            </div>
                            <span className="font-bold text-sm">Bantal</span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full">
                                <Bathtub className="w-4 h-4 text-black" weight="fill" />
                            </div>
                            <span className="font-bold text-sm">Kamar Mandi</span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full">
                                <Television className="w-4 h-4 text-black" weight="bold" />
                            </div>
                            <span className="font-bold text-sm">TV</span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full">
                                <Wind className="w-4 h-4 text-black" weight="bold" />
                            </div>
                            <span className="font-bold text-sm">AC</span>
                        </div>
                    </div>
                </div>

                {/* Map Markers (Pointer Events Auto to allow hovering/clicking) */}

                {/* Marker 1 (Upper Balcony) */}
                <div className="absolute top-[60%] left-[92%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 animate-[float_3s_ease-in-out_infinite] relative pointer-events-auto">
                    <div className="w-8 h-8 md:w-12 md:h-12 relative flex items-center justify-center group cursor-pointer">
                        <Image src="/icon-markers.svg" alt="Marker" width={48} height={48} className="absolute inset-0 w-full h-full drop-shadow-lg transition-opacity duration-300 group-hover:opacity-0" />

                        <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 pointer-events-none flex items-center justify-center -translate-y-2 drop-shadow-xl">
                            <div className="relative w-[119px] h-[42px]">
                                <Image src="/icon-markers-hover.svg" alt="Hover bg" fill className="object-contain" />
                                <div className="absolute inset-0 flex items-start justify-center pt-[6px] pointer-events-none">
                                    <span className="text-black font-medium text-[13px]">Balkon</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Marker 2 (Living Room Downstairs) */}
                <div
                    className="absolute top-[46%] left-[110%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 animate-[float_4s_ease-in-out_infinite_0.5s] relative pointer-events-auto"
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

                            {/* Image Header */}
                            <div className="relative w-full aspect-[21/9] md:h-[280px] shrink-0 bg-black/50">
                                <Image
                                    src="/ruangtamu-koscilanda.png"
                                    alt="Ruang Tamu"
                                    fill
                                    className="object-cover"
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

                {/* Mobile Bottom Navigation Pills */}
                <div className="absolute bottom-6 left-0 right-0 flex md:hidden justify-center items-center gap-3 px-4 z-50 pointer-events-auto">
                    <button
                        onClick={() => setActiveMobileCard(activeMobileCard === 'details' ? null : 'details')}
                        className={`px-5 py-2.5 rounded-full backdrop-blur-md border border-white/20 text-white font-medium text-[13px] sm:text-sm transition-colors shadow-lg ${activeMobileCard === 'details' ? 'bg-white/40' : 'bg-white/20 hover:bg-white/30'}`}
                    >
                        Kos Information
                    </button>
                    <button
                        onClick={() => setActiveMobileCard(activeMobileCard === 'facilities' ? null : 'facilities')}
                        className={`px-6 py-2.5 rounded-full backdrop-blur-md border border-white/20 text-white font-medium text-[13px] sm:text-sm transition-colors shadow-lg ${activeMobileCard === 'facilities' ? 'bg-white/40' : 'bg-white/20 hover:bg-white/30'}`}
                    >
                        Fasilitas
                    </button>
                </div>

            </main>
        </div>
    );
}
