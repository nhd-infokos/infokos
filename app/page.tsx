import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Buildings, GenderIntersex, Money
} from "@phosphor-icons/react/dist/ssr";
import KosSlider from "@/components/KosSlider";
import { getKosList } from "@/services/kos.service";

export default async function Home() {
  const kosList = await getKosList();

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pt-6 overflow-x-clip">
      {/* Navigation Header */}
      <nav className="flex items-center justify-between px-[50px] py-6 w-full">
        <div className="flex items-center flex-1">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/nhdlogo.svg" alt="NHD Logo" width={50} height={39} priority className="w-auto h-8 sm:h-10 cursor-pointer" />
            <span className="text-[32px] font-medium tracking-tight text-[#111111]" style={{ fontFamily: "var(--font-poppins)" }}>Nahdia Infokost</span>
          </Link>
        </div>
        <div className="hidden sm:flex justify-center items-center space-x-8">
          <Link href="/" className="text-[15px] font-bold text-black hover:text-gray-600 transition-colors">Home</Link>
          <Link href="/maps" className="text-[15px] font-regular text-gray-500 hover:text-black transition-colors">Maps</Link>
          <a href="#" className="text-[15px] font-regular text-gray-500 hover:text-black transition-colors">Why Nahdia</a>
        </div>
        <div className="flex items-center justify-end flex-1 hidden sm:flex">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-[15px] font-medium rounded-full hover:bg-gray-800 transition-colors">
            <span>Daftarkan Kosmu Disini</span>
            <Buildings className="w-5 h-5" weight="duotone" />
          </button>
        </div>
      </nav>

      <main className="flex flex-col items-center w-full px-[50px] pb-16">
        {/* Hero Banner */}
        <div className="relative w-full mb-12 lg:mb-20">
          <div className="relative w-full aspect-[16/7] md:aspect-[16/6] min-h-[400px] md:min-h-[520px] rounded-[24px] md:rounded-[32px] overflow-hidden">
            <Image src="/img-webp/bg-banner.webp" alt="Hero Banner" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/30" />

            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold leading-[1.25] tracking-tight text-white text-center max-w-[800px]" style={{ fontFamily: "var(--font-poppins)" }}>
                Cari kos modern yang tenang, nyaman, dan siap jadi tempat pulang terbaikmu setiap hari.
              </h1>
            </div>

            {/* Arrow Left */}
            <button className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 hover:opacity-80 transition-opacity" aria-label="Previous">
              <svg width="48" height="48" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#hero_arrow_left)">
                  <rect x="64" y="60" width="44" height="44" rx="22" transform="rotate(-180 64 60)" fill="white" fillOpacity="0.9" shapeRendering="crispEdges" />
                  <path d="M36.1309 37.3809L44.8809 28.6309C44.9622 28.5496 45.0588 28.4852 45.165 28.4412C45.2712 28.3972 45.385 28.3745 45.5 28.3745C45.615 28.3745 45.7288 28.3972 45.835 28.4412C45.9413 28.4852 46.0378 28.5496 46.1191 28.6309C46.2004 28.7122 46.2649 28.8087 46.3088 28.915C46.3528 29.0212 46.3755 29.135 46.3755 29.25C46.3755 29.365 46.3528 29.4788 46.3088 29.585C46.2649 29.6913 46.2004 29.7878 46.1191 29.8691L37.987 38L46.1191 46.1309C46.2833 46.2951 46.3755 46.5178 46.3755 46.75C46.3755 46.9822 46.2833 47.2049 46.1191 47.3691C45.9549 47.5332 45.7322 47.6255 45.5 47.6255C45.2678 47.6255 45.0451 47.5332 44.8809 47.3691L36.1309 38.6191C36.0496 38.5378 35.985 38.4413 35.941 38.3351C35.897 38.2289 35.8743 38.115 35.8743 38C35.8743 37.885 35.897 37.7712 35.941 37.6649C35.985 37.5587 36.0496 37.4622 36.1309 37.3809Z" fill="black" />
                </g>
                <defs>
                  <filter id="hero_arrow_left" x="0" y="0" width="84" height="84" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="10" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                  </filter>
                </defs>
              </svg>
            </button>

            {/* Arrow Right */}
            <button className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 hover:opacity-80 transition-opacity" aria-label="Next">
              <svg width="48" height="48" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#hero_arrow_right)">
                  <rect x="20" y="16" width="44" height="44" rx="22" fill="white" fillOpacity="0.9" shapeRendering="crispEdges" />
                  <path d="M47.8691 38.6191L39.1191 47.3691C39.0378 47.4504 38.9413 47.5148 38.835 47.5588C38.7288 47.6028 38.615 47.6255 38.5 47.6255C38.385 47.6255 38.2712 47.6028 38.165 47.5588C38.0587 47.5148 37.9622 47.4504 37.8809 47.3691C37.7996 47.2878 37.7352 47.1913 37.6912 47.085C37.6472 46.9788 37.6245 46.865 37.6245 46.75C37.6245 46.635 37.6472 46.5212 37.6912 46.415C37.7352 46.3087 37.7996 46.2122 37.8809 46.1309L46.013 38L37.8809 29.8691C37.7167 29.7049 37.6245 29.4822 37.6245 29.25C37.6245 29.0178 37.7167 28.7951 37.8809 28.6309C38.0451 28.4668 38.2678 28.3745 38.5 28.3745C38.7322 28.3745 38.9549 28.4668 39.1191 28.6309L47.8691 37.3809C47.9504 37.4622 48.015 37.5587 48.059 37.6649C48.103 37.7711 48.1257 37.885 48.1257 38C48.1257 38.115 48.103 38.2288 48.059 38.3351C48.015 38.4413 47.9504 38.5378 47.8691 38.6191Z" fill="black" />
                </g>
                <defs>
                  <filter id="hero_arrow_right" x="0" y="0" width="84" height="84" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="10" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                  </filter>
                </defs>
              </svg>
            </button>
          </div>

          {/* Filter Form - overlapping bottom */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 w-full max-w-[880px] px-4 hidden md:block">
            <div className="flex items-center bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-2 w-full">
              <div className="relative flex items-center flex-1 px-4 py-3 md:px-8">
                <MapPin className="w-5 h-5 text-gray-900 mr-2 shrink-0" weight="duotone" />
                <select className="appearance-none w-full bg-transparent text-[15px] font-medium text-gray-800 focus:outline-none cursor-pointer pr-6">
                  <option>Lokasi</option>
                  <option>Jakarta Selatan</option>
                  <option>Jakarta Pusat</option>
                  <option>Jakarta Barat</option>
                  <option>Jakarta Timur</option>
                  <option>Jakarta Utara</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 md:right-6 flex items-center text-gray-900">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>

              <div className="h-8 w-px bg-gray-300 shrink-0" />

              <div className="relative flex items-center flex-1 px-4 py-3 md:px-8">
                <Money className="w-5 h-5 text-gray-900 mr-2 shrink-0" weight="duotone" />
                <select className="appearance-none w-full bg-transparent text-[15px] font-medium text-gray-800 focus:outline-none cursor-pointer pr-6">
                  <option>Harga</option>
                  <option>&lt; 1 Juta</option>
                  <option>1 - 2 Juta</option>
                  <option>&gt; 2 Juta</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 md:right-6 flex items-center text-gray-900">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>

              <div className="h-8 w-px bg-gray-300 shrink-0" />

              <div className="relative flex items-center flex-1 px-4 py-3 md:px-8">
                <GenderIntersex className="w-5 h-5 text-gray-900 mr-2 shrink-0" weight="duotone" />
                <select className="appearance-none w-full bg-transparent text-[15px] font-medium text-gray-800 focus:outline-none cursor-pointer pr-6">
                  <option>Tipe Kos</option>
                  <option>Putra</option>
                  <option>Putri</option>
                  <option>Campuran</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 md:right-6 flex items-center text-gray-900">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>

              <button className="ml-2 px-8 py-3.5 bg-black text-white text-[15px] font-semibold rounded-full hover:bg-gray-800 transition-colors whitespace-nowrap shrink-0">
                Cari Kos
              </button>
            </div>
          </div>
        </div>

        <section className="w-full mt-24 mb-10 overflow-hidden">
          <KosSlider kosList={kosList} />
        </section>

        {/* Call to Action Section */}
        <section className="w-full mt-24">
          <div className="bg-[#F0F0F0] rounded-[32px] flex flex-col md:flex-row items-center justify-between relative min-h-[400px] overflow-hidden">
            {/* Left Image */}
            <div className="w-full md:w-[40%] h-[300px] md:h-[450px] relative hidden md:block">
              <Image
                src="/img-preview-daftarkos.png"
                alt="Kos Preview"
                fill
                className="object-cover object-left md:object-contain"
              />
            </div>

            {/* Mobile Image */}
            <div className="w-full h-[250px] relative block md:hidden mb-6 bg-white/10 rounded-t-[32px] overflow-hidden">
              <Image
                src="/img-preview-daftarkos.png"
                alt="Kos Preview"
                fill
                className="object-cover"
              />
            </div>

            {/* Middle Title */}
            <div className="w-full md:w-[30%] flex items-center justify-center px-4 mb-8 md:mb-0 z-10 w-full text-center md:text-left">
              <h2 className="text-2xl md:text-[24px] font-bold leading-[1.3] text-black md:max-w-[250px] w-full ">
                Mau Kosmu Cepat Terisi?
              </h2>
            </div>

            {/* Right Card */}
            <div className="w-full md:w-[30%] flex justify-center md:justify-end md:pr-10 z-10 pb-6 md:pb-0 px-6 md:pr-10 md:pl-0 w-full">
              <div className="bg-white rounded-[24px] p-8 shadow-sm w-full max-w-[360px]">
                <h3 className="text-[22px] font-bold text-[#111111] leading-[1.3] mb-4">
                  Yuk, Listing-in Kosmu!
                </h3>
                <p className="text-[14px] text-[#888888] font-medium leading-relaxed mb-8">
                  Biar gak kosong terus 😉 Daftar kosmu di sini, langsung dilirik banyak calon penghuni. Cepat, praktis, dan cuan makin lancar!
                </p>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white text-[15px] font-semibold rounded-full hover:bg-gray-800 transition-colors w-full mt-2">
                  <span>Daftarkan Kosmu Disini</span>
                  <Buildings className="w-5 h-5" weight="duotone" />
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full px-[50px] py-16 mt-10 bg-white">
        <div className="w-full">
          <div className="flex flex-col md:flex-row justify-between mb-16 gap-10">
            <div className="max-w-sm">
              <div className="mb-6">
                <Link href="/" className="flex items-center gap-3 w-fit">
                  <Image src="/nhdlogo.svg" alt="NHD Logo" width={50} height={39} className="h-8 md:h-10 w-auto cursor-pointer" />
                  <span className="text-[32px] font-bold tracking-tight text-[#111111]" style={{ fontFamily: "var(--font-poppins)" }}>Kosku</span>
                </Link>
              </div>
              <p className="text-[#888888] text-sm md:text-[15px] leading-relaxed font-medium">
                Temukan kos populer di berbagai lokasi dengan pilihan sesuai kebutuhan dan budgetmu.
              </p>
            </div>
            <div className="flex gap-16 md:gap-24 pr-4 lg:pr-10">
              <div>
                <h3 className="text-black font-bold text-[15px] mb-6 tracking-wide">MENU</h3>
                <ul className="space-y-4 text-sm md:text-[15px] text-[#888888] font-medium">
                  <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
                  <li><Link href="/maps" className="hover:text-black transition-colors">Maps</Link></li>
                  <li><a href="#" className="hover:text-black transition-colors">Why Nahdia</a></li>
                </ul>
              </div>
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
          <div className="pt-8 border-t border-gray-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#888888] font-medium">2026 kosku All rights reserved</p>
            <div className="flex items-center space-x-6 text-[#888888]">
              <a href="#" className="hover:text-black transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
              </a>
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
