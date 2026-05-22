"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, CheckCircle } from "@phosphor-icons/react";

export default function LanggananPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center p-6 md:p-12">
      {/* Close Button */}
      <button 
        onClick={() => router.back()}
        className="absolute top-6 right-6 p-2 text-black hover:bg-gray-100 rounded-full transition-colors"
      >
        <X className="w-8 h-8" weight="regular" />
      </button>

      {/* Header */}
      <div className="flex flex-col items-center mb-10 md:mb-14">
        <div className="flex items-center gap-3 mb-4">
          <Image src="/nhdlogo.svg" alt="NHD Logo" width={42} height={33} className="w-auto h-8" />
          <span className="text-[26px] md:text-[30px] font-medium tracking-tight text-black" style={{ fontFamily: "var(--font-poppins)" }}>
            Nahdia Infokost
          </span>
        </div>
        <h1 className="text-[18px] md:text-[22px] font-medium text-black text-center">
          Pilih Tipe Langganan yang Cocok Buat Kamu
        </h1>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-[800px] justify-center items-stretch">
        
        {/* Free Card */}
        <div className="border border-gray-300 rounded-[20px] p-8 flex flex-col flex-1 bg-white max-w-[380px] w-full mx-auto shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <div className="mb-6">
            <Image src="/nhdlogo.svg" alt="NHD Logo" width={34} height={26} className="w-auto h-7" />
          </div>
          <h2 className="text-[28px] font-bold text-black mb-3">Free</h2>
          <p className="text-gray-500 text-[14px] mb-8 leading-relaxed">
            Cocok buat kamu yang baru mulai cari kost.
          </p>
          
          <ul className="space-y-4 mb-auto">
            <li className="flex items-start gap-3 text-[14px] text-black font-medium">
              <CheckCircle weight="duotone" className="w-[20px] h-[20px] shrink-0 text-black mt-0.5" />
              <span>Akses informasi kost (terbatas)</span>
            </li>
            <li className="flex items-start gap-3 text-[14px] text-black font-medium">
              <CheckCircle weight="duotone" className="w-[20px] h-[20px] shrink-0 text-black mt-0.5" />
              <span>Bebas eksplor tanpa biaya</span>
            </li>
          </ul>
          
          <button className="w-full mt-10 py-3.5 bg-gray-500 text-white rounded-full font-medium text-[15px] cursor-default">
            Paket Aktif
          </button>
        </div>

        {/* Premium Card */}
        <div className="border border-gray-300 rounded-[20px] p-8 flex flex-col flex-1 bg-white max-w-[380px] w-full mx-auto shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <div className="mb-6">
            <Image src="/nhdlogo.svg" alt="NHD Logo" width={34} height={26} className="w-auto h-7" />
          </div>
          <h2 className="text-[28px] font-bold text-black mb-3">Premium</h2>
          <p className="text-gray-500 text-[14px] mb-6 leading-relaxed">
            Cocok buat kamu yang serius cari kost terbaik.
          </p>
          
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-[32px] md:text-[36px] font-medium text-black">Rp 58.000</span>
            <span className="text-gray-500 text-[14px]">selamanya</span>
          </div>
          
          <p className="font-medium text-[14px] text-black mb-5">Everything in Free</p>
          
          <ul className="space-y-4 mb-auto">
            <li className="flex items-start gap-3 text-[14px] text-black font-medium">
              <CheckCircle weight="duotone" className="w-[20px] h-[20px] shrink-0 text-black mt-0.5" />
              <span>Akses ratusan informasi kost</span>
            </li>
            <li className="flex items-start gap-3 text-[14px] text-black font-medium">
              <CheckCircle weight="duotone" className="w-[20px] h-[20px] shrink-0 text-black mt-0.5" />
              <span>Akses detail informasi kost</span>
            </li>
            <li className="flex items-start gap-3 text-[14px] text-black font-medium">
              <CheckCircle weight="duotone" className="w-[20px] h-[20px] shrink-0 text-black mt-0.5" />
              <span>Akses maps dan filter kost</span>
            </li>
          </ul>
          
          <button className="w-full mt-10 py-3.5 bg-black text-white rounded-full font-medium text-[15px] hover:bg-gray-800 transition-colors">
            Upgrade ke Premium
          </button>
        </div>

      </div>
    </div>
  );
}
