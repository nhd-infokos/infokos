"use client";

import { EnvelopeSimple, Lock, Buildings } from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";

export default function LoginForm({ backgroundImages }: { backgroundImages: string[] }) {
  // We'll create columns for the animated background. 
  // To make it infinite, we duplicate the images in each column.
  const columnCount = 5;
  const imagesPerColumn = Math.max(4, Math.ceil(backgroundImages.length / columnCount));
  
  // Fill columns with random or sequential images
  const columns = Array.from({ length: columnCount }).map((_, colIndex) => {
    let colImages = [];
    for (let i = 0; i < imagesPerColumn; i++) {
      const img = backgroundImages[(colIndex * imagesPerColumn + i) % backgroundImages.length];
      if (img) colImages.push(img);
    }
    // Duplicate for seamless scroll
    return [...colImages, ...colImages];
  });

  return (
    <div className="flex min-h-screen w-full bg-white font-sans">
      
      {/* Left Side: Animated Masonry Background */}
      <div className="relative hidden lg:flex lg:w-1/2 overflow-hidden bg-gray-50 border-r border-gray-100">
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
          {/* Container that is larger than screen and rotated */}
          <div 
            className="flex gap-4 md:gap-6 lg:gap-8 w-[200vw] h-[200vh] items-start justify-center"
            style={{ transform: "rotate(-12deg) scale(1.1)" }}
          >
            {columns.map((colImages, i) => (
              <div 
                key={i} 
                className={`flex flex-col gap-4 md:gap-6 lg:gap-8 w-48 md:w-64 lg:w-80 shrink-0 ${i % 2 === 0 ? "animate-marquee-up" : "animate-marquee-down"}`}
                style={{
                  animationDuration: `${40 + i * 5}s`,
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite"
                }}
              >
                {colImages.map((src, imgIdx) => (
                  <div key={imgIdx} className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shrink-0 shadow-sm border border-gray-200">
                    <Image src={src} alt="Background Property" fill className="object-cover" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Form Container */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-24 xl:px-32 py-12 relative z-10 bg-white">
        <div className="w-full max-w-[460px] mx-auto">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 mb-12">
            <Image src="/nhdlogo.svg" alt="NHD Logo" width={50} height={39} priority className="w-auto h-10 cursor-pointer" />
            <span className="text-[28px] font-bold tracking-tight text-[#111111]" style={{ fontFamily: "var(--font-poppins)" }}>Nahdia Infokost</span>
          </div>

          <h1 className="text-[32px] font-bold text-[#111111] mb-3 tracking-tight">Log in</h1>
          <p className="text-[#666666] text-[15px] mb-10 leading-relaxed">
            Belum punya akun? <Link href="/langganan" className="text-[#111111] underline font-semibold hover:opacity-80 transition-opacity">Berlangganan dulu</Link> untuk mendapatkan akses penuh ke semua detail hunian.
          </p>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[#111111] text-[15px] font-medium block">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <EnvelopeSimple className="h-5 w-5 text-[#888888]" weight="duotone" />
                </div>
                <input 
                  type="email" 
                  className="w-full pl-[52px] pr-5 py-3.5 bg-transparent border border-[#CCCCCC] rounded-full text-[#111111] placeholder:text-[#888888] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  placeholder="designer@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[#111111] text-[15px] font-medium block">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#888888]" weight="duotone" />
                </div>
                <input 
                  type="password" 
                  className="w-full pl-[52px] pr-5 py-3.5 bg-transparent border border-[#CCCCCC] rounded-full text-[#111111] placeholder:text-[#888888] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  placeholder="password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-black hover:bg-black/90 text-white font-semibold py-4 rounded-full transition-colors text-[16px]"
              >
                Log in
              </button>
            </div>
          </form>

        </div>
      </div>

    </div>
  );
}
