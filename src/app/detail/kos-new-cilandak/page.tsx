"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function DetailKosNewCilandak() {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    return (
        <div className="min-h-screen relative w-full bg-black text-black font-sans selection:bg-black selection:text-white overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/kos-new-cilandak.png"
                    alt="Kos New Cilandak"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Subtle overlay to ensure text readability if needed */}
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Navigation Header (Overlay) */}
            <nav className="relative z-50 flex items-center justify-between px-[50px] py-6 w-full">
                <div className="flex items-center">
                    <Link href="/">
                        <Image
                            src="/logo-carikos.svg"
                            alt="Carikos Logo"
                            width={120}
                            height={40}
                            priority
                            className="w-auto h-8 sm:h-10 cursor-pointer"
                        />
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
                <div className="absolute top-10 left-[50px] p-6 md:p-8 rounded-[24px] bg-black/40 backdrop-blur-2xl border border-white/20 w-[calc(100%-48px)] md:w-80 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] pointer-events-auto">
                    <h2 className="text-xl md:text-2xl font-bold mb-6 tracking-tight">Kos New Cilandak</h2>

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
                <div className="absolute top-10 right-[50px] p-6 md:p-8 rounded-[24px] bg-black/40 backdrop-blur-2xl border border-white/20 hidden lg:block w-72 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] pointer-events-auto">
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

                {/* Map Markers (Pointer Events Auto to allow hovering/clicking) */}

                {/* Marker 1 (Upper Balcony) */}
                <div className="absolute top-[60%] left-[92%] transform -translate-x-1/2 -translate-y-1/2 hidden md:flex flex-col items-center z-20 animate-[float_3s_ease-in-out_infinite] relative pointer-events-auto">
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
                    className="absolute top-[46%] left-[110%] transform -translate-x-1/2 -translate-y-1/2 hidden md:flex flex-col items-center z-20 animate-[float_4s_ease-in-out_infinite_0.5s] relative pointer-events-auto"
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

            </main>
        </div>
    );
}
