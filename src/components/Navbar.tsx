"use client";

import Image from "next/image";
import Link from "next/link";
import { Buildings, X } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();

  const isHomeActive = pathname === "/" || pathname.startsWith("/detail/");
  const isMapsActive = pathname === "/maps";
  const isWhyNahdiaActive = pathname === "/why-nahdia";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 md:px-[50px] py-6 w-full">
      <div className="flex items-center flex-1">
        <Link href="/" className="flex items-center gap-3 w-fit">
          <Image src="/nhdlogo.svg" alt="NHD Logo" width={50} height={39} priority className="w-auto h-8 sm:h-10 cursor-pointer" />
          <span className="text-[24px] sm:text-[32px] font-medium tracking-tight text-[#111111]" style={{ fontFamily: "var(--font-poppins)" }}>Nahdia Infokost</span>
        </Link>
      </div>
      <div className="hidden sm:flex justify-center items-center space-x-8">
        <Link 
          href="/" 
          className={`text-[15px] transition-colors ${isHomeActive ? "font-bold text-black hover:text-gray-600" : "font-regular text-gray-500 hover:text-black"}`}
        >
          Home
        </Link>
        <Link 
          href="/maps" 
          className={`text-[15px] transition-colors ${isMapsActive ? "font-bold text-black hover:text-gray-600" : "font-regular text-gray-500 hover:text-black"}`}
        >
          Maps
        </Link>
        <Link 
          href="/why-nahdia" 
          className={`text-[15px] transition-colors ${isWhyNahdiaActive ? "font-bold text-black hover:text-gray-600" : "font-regular text-gray-500 hover:text-black"}`}
        >
          Why Nahdia
        </Link>
      </div>
      <div className="flex items-center justify-end flex-1 hidden sm:flex">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-[15px] font-medium rounded-full hover:bg-gray-800 transition-colors shadow-lg shadow-black/20">
          <span>Daftarkan Kosmu Disini</span>
          <Buildings className="w-5 h-5" weight="duotone" />
        </button>
      </div>

      <div className="flex items-center sm:hidden">
        <button onClick={() => setIsMobileMenuOpen(true)}>
          <Image src="/Menu-List.svg" alt="Menu" width={24} height={24} className="w-8 h-8 cursor-pointer" />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white pt-6 px-6">
          <div className="flex justify-between items-center mb-10 text-black">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 w-fit">
              <Image src="/nhdlogo.svg" alt="NHD Logo" width={50} height={39} className="w-auto h-8 cursor-pointer" />
              <span className="text-[24px] font-medium tracking-tight text-[#111111]" style={{ fontFamily: "var(--font-poppins)" }}>Nahdia Infokost</span>
            </Link>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X className="w-8 h-8 text-black" />
            </button>
          </div>
          <div className="flex flex-col space-y-6">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-[20px] pb-4 border-b border-gray-100 ${isHomeActive ? "font-bold text-black" : "font-medium text-gray-500"}`}
            >
              Home
            </Link>
            <Link 
              href="/maps" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-[20px] pb-4 border-b border-gray-100 ${isMapsActive ? "font-bold text-black" : "font-medium text-gray-500"}`}
            >
              Maps
            </Link>
            <Link 
              href="/why-nahdia" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-[20px] pb-4 border-b border-gray-100 ${isWhyNahdiaActive ? "font-bold text-black" : "font-medium text-gray-500"}`}
            >
              Why Nahdia
            </Link>
          </div>
          <div className="mt-10">
            <button className="flex items-center justify-center gap-2 px-5 py-3.5 bg-black text-white text-[16px] font-medium rounded-full w-full shadow-lg shadow-black/20">
              <span>Daftarkan Kosmu Disini</span>
              <Buildings className="w-5 h-5" weight="duotone" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
