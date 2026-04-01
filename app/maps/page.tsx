import Image from "next/image";
import Link from "next/link";
import { getKosList } from "@/services/kos.service";
import MapsContent from "@/components/MapsContent";
import Navbar from "@/components/Navbar";

export default async function MapsPage({ searchParams }: { searchParams: Promise<{ location?: string, type?: string, price?: string }> }) {
  const { location, type, price } = await searchParams;
  const kosList = await getKosList();

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pt-6 overflow-x-clip">
      {/* Navigation Header */}
      <Navbar />

      <main className="flex flex-col items-center w-full px-6 md:px-[50px] pb-16">
        <MapsContent 
          kosList={kosList} 
          initialLocation={location}
          initialType={type}
          initialPrice={price}
        />
      </main>

      {/* Footer */}
      <footer className="w-full px-6 md:px-[50px] py-16 mt-10 bg-white border-t border-gray-100">
        <div className="w-full">
          <div className="flex flex-col md:flex-row justify-between mb-16 gap-10">
            <div className="max-w-sm">
              <div className="mb-6">
                <Link href="/" className="flex items-center gap-3 w-fit">
                  <Image src="/logo-carikos.svg" alt="Carikos Logo" width={44} height={38} className="h-8 md:h-10 w-auto cursor-pointer" />
                  <span className="text-[32px] font-bold tracking-tight text-[#111111]" style={{ fontFamily: "var(--font-poppins)" }}>Nahdia Infokost</span>
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
                  <li><Link href="/why-nahdia" className="hover:text-black transition-colors">Why Nahdia</Link></li>
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
          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
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
