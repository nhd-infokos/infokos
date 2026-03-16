"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Bed, Bathtub, Television, Wind, WifiHigh, Thermometer, Martini, Buildings, GenderIntersex, Train, BagSimple, ShoppingBag } from "@phosphor-icons/react";

export default function DetailKosNewCilandak() {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [activeMobileCard, setActiveMobileCard] = useState<'details' | 'facilities' | 'map' | null>(null);

    return (
        <div className="min-h-screen relative w-full bg-black text-black font-sans selection:bg-black selection:text-white overflow-hidden">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
                {/* Desktop Background */}
                <div className="hidden md:block absolute inset-0">
                    <Image
                        src="/Pal Batu 271.png"
                        alt="Kos New Cilandak"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Mobile Background */}
                <div className="block md:hidden absolute inset-0">
                    <Image
                        src="/Pal Batu 271-mobile.png"
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

                {/* Right Action Button */}
                <div className="flex items-center justify-end flex-1 hidden sm:flex">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-[15px] font-medium rounded-full hover:bg-gray-800 transition-colors shadow-lg shadow-black/20">
                        <span>Daftarkan Kosmu Disini</span>
                        <Buildings className="w-5 h-5" weight="duotone" />
                    </button>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="relative z-20 w-full h-[calc(100vh-100px)] pointer-events-none">

                {/* Left Glass Card - Kos Details */}
                <div className={`absolute top-10 left-6 md:left-[50px] p-6 md:p-8 rounded-[24px] bg-black/40 backdrop-blur-2xl border border-white/20 w-[calc(100%-48px)] md:w-80 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] pointer-events-auto transition-opacity duration-300 flex flex-col ${activeMobileCard === 'details' ? 'opacity-100 z-40' : 'opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto z-10'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight">Kost Pal batu 271</h2>
                        {/* Mobile Close Button */}
                        <button onClick={() => setActiveMobileCard(null)} className="md:hidden p-1 bg-white/10 rounded-full hover:bg-white/20">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className="space-y-4 text-xs md:text-sm text-gray-200">
                        <p className="leading-relaxed">Jl. Pal Batu 2 No.71, Menteng Dalam, Kec. Tebet</p>
                        <p className="font-semibold text-white">Jakarta Selatan • Tebet</p>

                        <div className="grid grid-cols-2 gap-y-3 gap-x-2 pt-2">
                            <div className="flex items-center space-x-2">
                                <GenderIntersex className="w-[18px] h-[18px] text-white" weight="duotone" />
                                <span>Campur</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Train className="w-[18px] h-[18px] text-white" weight="duotone" />
                                <span>6 min Krl Tebet</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <BagSimple className="w-[18px] h-[18px] text-white" weight="duotone" />
                                <span>Profesional</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <ShoppingBag className="w-[18px] h-[18px] text-white" weight="duotone" />
                                <span>Mall Kokas</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-px w-full bg-white/20 my-6"></div>

                    <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-300 text-xs md:text-sm font-medium">Harga / bulan</span>
                        <span className="text-xl md:text-2xl font-bold tracking-tight text-white">Rp 1.850.000</span>
                    </div>

                    <div className="flex justify-between items-center mt-auto">
                        <span className="text-gray-200 text-xs font-medium">Please check for availability</span>
                        <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:bg-[#1DA851] transition-colors shadow-lg">
                            <Image src="/whatsapp.svg" alt="WhatsApp" width={20} height={20} className="w-5 h-5 md:w-6 md:h-6" />
                        </a>
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
                            <Bed className="w-5 h-5 text-white" weight="bold" />
                            <span className="font-bold text-sm">Kasur</span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <Bathtub className="w-5 h-5 text-white" weight="bold" />
                            <span className="font-bold text-sm">Kamar Mandi</span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <Television className="w-5 h-5 text-white" weight="bold" />
                            <span className="font-bold text-sm">TV</span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <Wind className="w-5 h-5 text-white" weight="bold" />
                            <span className="font-bold text-sm">AC</span>
                        </div>
                    </div>
                </div>

                {/* Map Location Card */}
                <div className={`absolute top-[48%] lg:top-[320px] right-6 md:right-[50px] md:left-auto left-6 p-5 md:p-6 rounded-[24px] bg-black/40 backdrop-blur-2xl border border-white/20 w-[calc(100%-48px)] lg:w-72 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] pointer-events-auto transition-opacity duration-300 flex flex-col ${activeMobileCard === 'map' ? 'opacity-100 z-40' : 'opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto z-10'}`}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl md:text-xl font-bold tracking-tight">Lokasi</h2>
                        {/* Mobile Close Button */}
                        <button onClick={() => setActiveMobileCard(null)} className="md:hidden p-1 bg-white/10 rounded-full hover:bg-white/20 relative z-50 pointer-events-auto">
                            <svg className="w-5 h-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className="relative w-full aspect-video md:h-40 rounded-xl overflow-hidden bg-black/20 border border-white/10 shadow-inner">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2804.580796786769!2d106.84320896136252!3d-6.227269210331134!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f327e6902361%3A0x1a3fc960d862afcf!2sKost%20Palbatu%20271!5e0!3m2!1sid!2sid!4v1773650707284!5m2!1sid!2sid"
                            className="absolute inset-0 w-full h-full"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
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
                                    <span className="text-white font-medium text-[13px]">Balkon</span>
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
                                    <span className="text-white font-medium text-[13px]">Kamar Tidur</span>
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
                            className="relative w-[340px] md:w-[400px] rounded-[24px] md:rounded-[32px] bg-black/40 backdrop-blur-2xl border border-white/20 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden flex flex-col pointer-events-auto animate-in fade-in zoom-in-95 duration-300 ease-out p-4 md:p-5"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setActiveModal(null)}
                                className="absolute top-6 right-6 z-10 p-1.5 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110"
                            >
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Image Frame */}
                            <div className="relative w-full aspect-[3/4] rounded-[16px] md:rounded-[20px] overflow-hidden bg-black/50 border border-white/10 shadow-inner">
                                <Image
                                    src="/kamar-tidur-kos-palbatu.png"
                                    alt="Kamar Tidur"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content Body */}
                            <div className="pt-4 pb-2 px-1">
                                <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2">Kamar Tidur</h2>
                                <p className="text-gray-200 text-xs md:text-[13px] leading-relaxed">
                                    Jelajahi desain, fasilitas, dan detail rumah yang bisa menjadi hunian Anda.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mobile Bottom Navigation Pills */}
                <div className="absolute bottom-6 left-0 right-0 flex md:hidden justify-center items-center gap-2 md:gap-3 px-4 z-50 pointer-events-auto">
                    <button
                        onClick={() => setActiveMobileCard(activeMobileCard === 'details' ? null : 'details')}
                        className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full backdrop-blur-md border border-white/20 text-white font-medium text-[12px] sm:text-sm transition-colors shadow-lg ${activeMobileCard === 'details' ? 'bg-white/40' : 'bg-white/20 hover:bg-white/30'}`}
                    >
                        Kos Information
                    </button>
                    <button
                        onClick={() => setActiveMobileCard(activeMobileCard === 'facilities' ? null : 'facilities')}
                        className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full backdrop-blur-md border border-white/20 text-white font-medium text-[12px] sm:text-sm transition-colors shadow-lg ${activeMobileCard === 'facilities' ? 'bg-white/40' : 'bg-white/20 hover:bg-white/30'}`}
                    >
                        Fasilitas
                    </button>
                    <button
                        onClick={() => setActiveMobileCard(activeMobileCard === 'map' ? null : 'map')}
                        className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full backdrop-blur-md border border-white/20 text-white font-medium text-[12px] sm:text-sm transition-colors shadow-lg ${activeMobileCard === 'map' ? 'bg-white/40' : 'bg-white/20 hover:bg-white/30'}`}
                    >
                        Lokasi Maps
                    </button>
                </div>

            </main>
        </div>
    );
}
