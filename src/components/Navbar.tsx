"use client";

import Image from "next/image";
import Link from "next/link";
import { Buildings } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isHomeActive = pathname === "/" || pathname.startsWith("/detail/");
  const isMapsActive = pathname === "/maps";
  const isWhyNahdiaActive = pathname === "/why-nahdia";

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 md:px-[50px] py-6 w-full">
      <div className="flex items-center flex-1">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/nhdlogo.svg" alt="NHD Logo" width={50} height={39} priority className="w-auto h-8 sm:h-10 cursor-pointer" />
          <span className="text-[32px] font-medium tracking-tight text-[#111111]" style={{ fontFamily: "var(--font-poppins)" }}>Nahdia Infokost</span>
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
    </nav>
  );
}
