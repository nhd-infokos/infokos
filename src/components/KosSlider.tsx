"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { MapPin } from "@phosphor-icons/react";
import type { Kos } from "@/types/kos";
import { iconMap } from "@/lib/icon-map";
import { formatPrice } from "@/lib/utils";

const KosTags = ({ kos }: { kos: Kos }) => (
  <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
    {kos.kos_tags?.map((tag) => {
      const TagIcon = iconMap[tag.icon];
      return (
        <div key={tag.id} className="flex items-center space-x-1.5">
          {TagIcon && <TagIcon className="w-5 h-5 text-[#111111]" weight="regular" />}
          <span className="text-[15px] text-[#111111]">{tag.name}</span>
        </div>
      );
    })}
  </div>
);

export default function KosSlider({ kosList }: { kosList: Kos[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 344;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start w-[calc(100%+50px)] -mr-[50px]">
      {/* Left Text */}
      <div className="w-full lg:w-[20%] shrink-0 pr-4 lg:pr-8">
        <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold leading-[1.2] text-[#111111] mb-6 tracking-tight">
          Kost &<br />
          Coliving<br />
          Picked For<br />
          You
        </h2>
        <p className="text-[#888888] text-[14px] lg:text-[15px] leading-relaxed mb-10 max-w-[240px] md:max-w-[280px]">
          pekerja produktif Jakarta menghabiskan energi ekstra bukan karena jobdesc-nya berat, tapi karena environment sehari-harinya nggak supportif — mulai dari tempat tinggal sampai fasilitas yang tanggung
        </p>
        <div className="flex items-center -ml-4 gap-2">
          <button onClick={() => scrollSlider('left')} className="hover:opacity-80 transition-opacity outline-none" aria-label="Previous">
            <svg width="64" height="64" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_248_692)">
                <rect x="64" y="60" width="44" height="44" rx="22" transform="rotate(-180 64 60)" fill="white" shapeRendering="crispEdges" />
                <path d="M36.1309 37.3809L44.8809 28.6309C44.9622 28.5496 45.0588 28.4852 45.165 28.4412C45.2712 28.3972 45.385 28.3745 45.5 28.3745C45.615 28.3745 45.7288 28.3972 45.835 28.4412C45.9413 28.4852 46.0378 28.5496 46.1191 28.6309C46.2004 28.7122 46.2649 28.8087 46.3088 28.915C46.3528 29.0212 46.3755 29.135 46.3755 29.25C46.3755 29.365 46.3528 29.4788 46.3088 29.585C46.2649 29.6913 46.2004 29.7878 46.1191 29.8691L37.987 38L46.1191 46.1309C46.2833 46.2951 46.3755 46.5178 46.3755 46.75C46.3755 46.9822 46.2833 47.2049 46.1191 47.3691C45.9549 47.5332 45.7322 47.6255 45.5 47.6255C45.2678 47.6255 45.0451 47.5332 44.8809 47.3691L36.1309 38.6191C36.0496 38.5378 35.985 38.4413 35.941 38.3351C35.897 38.2289 35.8743 38.115 35.8743 38C35.8743 37.885 35.897 37.7712 35.941 37.6649C35.985 37.5587 36.0496 37.4622 36.1309 37.3809Z" fill="black" />
              </g>
              <defs>
                <filter id="filter0_d_248_692" x="0" y="0" width="84" height="84" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="10" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_248_692" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_248_692" result="shape" />
                </filter>
              </defs>
            </svg>
          </button>
          <button onClick={() => scrollSlider('right')} className="hover:opacity-80 transition-opacity outline-none -ml-4" aria-label="Next">
            <svg width="64" height="64" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_248_696)">
                <rect x="20" y="16" width="44" height="44" rx="22" fill="white" shapeRendering="crispEdges" />
                <path d="M47.8691 38.6191L39.1191 47.3691C39.0378 47.4504 38.9413 47.5148 38.835 47.5588C38.7288 47.6028 38.615 47.6255 38.5 47.6255C38.385 47.6255 38.2712 47.6028 38.165 47.5588C38.0587 47.5148 37.9622 47.4504 37.8809 47.3691C37.7996 47.2878 37.7352 47.1913 37.6912 47.085C37.6472 46.9788 37.6245 46.865 37.6245 46.75C37.6245 46.635 37.6472 46.5212 37.6912 46.415C37.7352 46.3087 37.7996 46.2122 37.8809 46.1309L46.013 38L37.8809 29.8691C37.7167 29.7049 37.6245 29.4822 37.6245 29.25C37.6245 29.0178 37.7167 28.7951 37.8809 28.6309C38.0451 28.4668 38.2678 28.3745 38.5 28.3745C38.7322 28.3745 38.9549 28.4668 39.1191 28.6309L47.8691 37.3809C47.9504 37.4622 48.015 37.5587 48.059 37.6649C48.103 37.7711 48.1257 37.885 48.1257 38C48.1257 38.115 48.103 38.2288 48.059 38.3351C48.015 38.4413 47.9504 38.5378 47.8691 38.6191Z" fill="black" />
              </g>
              <defs>
                <filter id="filter0_d_248_696" x="0" y="0" width="84" height="84" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="10" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_248_696" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_248_696" result="shape" />
                </filter>
              </defs>
            </svg>
          </button>
        </div>
      </div>

      {/* Right Cards Slider */}
      <div className="w-full lg:w-[70%]">
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-2 pr-[50px] [&::-webkit-scrollbar]:hidden"
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {kosList.length > 0 ? (
            kosList.map((kos) => (
              <Link key={kos.id} href={`/detail/${kos.slug}`} className="group cursor-pointer block w-[320px] shrink-0 snap-start">
                <div className="relative w-[320px] h-[320px] rounded-[24px] overflow-hidden mb-5 bg-gray-100">
                  <Image src={kos.image_url || ""} alt={kos.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="px-[12px]">
                  <h3 className="text-[24px] font-semibold mb-2 text-[#111111]">{kos.name}</h3>
                  <div className="flex items-center text-[#888888] mb-4 text-[15px] space-x-2">
                    <MapPin className="w-5 h-5 text-[#B0B0B0]" weight="fill" />
                    <span>{kos.district}, {kos.city}</span>
                  </div>
                  <KosTags kos={kos} />
                  <div className="text-right mt-5">
                    <span className="font-medium text-[#E53E3E] text-[20px]">{formatPrice(kos.price)}</span>
                    <span className="font-medium text-[#111111] text-[20px]">/bulan</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="w-full py-20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <MapPin size={32} weight="duotone" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Kos Tidak Ditemukan</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
