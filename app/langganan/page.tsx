"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, CheckCircle, ThumbsUp } from "@phosphor-icons/react";

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
      <div className="flex flex-col items-center mb-12 md:mb-16 max-w-[800px] text-center">
        <h1 className="text-[28px] md:text-[36px] font-bold text-black mb-4">
          Yah, detail kostnya masih dikunci 👀
        </h1>
        <p className="text-[#888888] text-[15px] md:text-[16px] leading-relaxed max-w-[650px]">
          Upgrade ke Premium buat buka semua informasi kost pilihan, filter lokasi strategis, dan detail lengkap yang bikin proses cari tempat tinggal jadi lebih sat-set
        </p>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 w-full max-w-[850px] justify-center items-stretch">
        
        {/* Free Card */}
        <div className="p-8 flex flex-col flex-1 bg-white max-w-[380px] w-full mx-auto md:mt-4">
          <div className="mb-6">
            <Image src="/nhdlogo.svg" alt="NHD Logo" width={34} height={26} className="w-auto h-8" />
          </div>
          <h2 className="text-[28px] font-bold text-black mb-3">Free</h2>
          <p className="text-gray-500 text-[14px] mb-8 leading-relaxed">
            Cocok buat kamu yang baru mulai cari kost.
          </p>
          
          <ul className="space-y-4 mb-auto">
            <li className="flex items-start gap-3 text-[14px] text-black font-medium">
              <CheckCircle weight="regular" className="w-[20px] h-[20px] shrink-0 text-black mt-0.5" />
              <span>Akses informasi kost (terbatas)</span>
            </li>
            <li className="flex items-start gap-3 text-[14px] text-black font-medium">
              <CheckCircle weight="regular" className="w-[20px] h-[20px] shrink-0 text-black mt-0.5" />
              <span>Bebas eksplor tanpa biaya</span>
            </li>
          </ul>
          
          <button className="w-full mt-10 py-3.5 bg-[#888888] text-white rounded-full font-medium text-[15px] cursor-default">
            Paket Kamu Sekarang
          </button>
        </div>

        {/* Premium Card */}
        <div className="relative border border-black rounded-[24px] p-8 flex flex-col flex-1 bg-white max-w-[380px] w-full mx-auto shadow-sm">
          {/* Floating Badge */}
          <div className="absolute -top-4 right-6 bg-white border border-black rounded-full px-4 py-1.5 flex items-center gap-2">
            <ThumbsUp className="w-[18px] h-[18px] text-black" weight="regular" />
            <span className="text-[13px] font-medium text-black">Pilihan Terbaik Untukmu</span>
          </div>

          <div className="mb-6 mt-2">
            <Image src="/nhdlogo.svg" alt="NHD Logo" width={34} height={26} className="w-auto h-8" />
          </div>
          <h2 className="text-[28px] font-bold text-black mb-3">Premium</h2>
          <p className="text-gray-500 text-[14px] mb-8 leading-relaxed">
            Cocok buat kamu yang serius cari kost terbaik.
          </p>
          
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-[40px] md:text-[44px] font-medium text-black tracking-tight">Rp 58.000</span>
            <span className="text-gray-500 text-[14px]">selamanya</span>
          </div>
          
          <p className="font-medium text-[14px] text-black mb-5">Everything in Free</p>
          
          <ul className="space-y-4 mb-auto">
            <li className="flex items-start gap-3 text-[14px] text-black font-medium">
              <CheckCircle weight="regular" className="w-[20px] h-[20px] shrink-0 text-black mt-0.5" />
              <span>Akses ratusan informasi kost</span>
            </li>
            <li className="flex items-start gap-3 text-[14px] text-black font-medium">
              <CheckCircle weight="regular" className="w-[20px] h-[20px] shrink-0 text-black mt-0.5" />
              <span>Akses detail informasi kost</span>
            </li>
            <li className="flex items-start gap-3 text-[14px] text-black font-medium">
              <CheckCircle weight="regular" className="w-[20px] h-[20px] shrink-0 text-black mt-0.5" />
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
