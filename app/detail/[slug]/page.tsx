import Image from "next/image";
import Link from "next/link";
import type { KosRoom } from "@/types/kos";
import { getKosBySlug } from "@/services/kos.service";
import { getRoomsByKosSlug } from "@/services/room.service";
import RoomMarkers from "@/components/RoomMarkers";
import Navbar from "@/components/Navbar";
import KosInfoCard from "@/components/KosInfoCard";

export default async function DetailKos({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let kos = null;
  let rooms: KosRoom[] = [];

  try {
    const [kosData, roomsData] = await Promise.all([
      getKosBySlug(slug),
      getRoomsByKosSlug(slug),
    ]);
    kos = kosData;
    rooms = roomsData || [];
  } catch (err) {
    console.error("Error fetching kos detail:", err);
  }

  if (!kos) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Kos tidak ditemukan</h1>
          <Link href="/" className="text-green-400 hover:underline">Kembali ke Home</Link>
        </div>
      </div>
    );
  }

  // Find detail background from kos_images (non-primary, sort_order 2) or fallback to image_url
  const detailDesktopImage = kos.kos_images?.find((img) => !img.is_primary && img.sort_order === 2)?.url || kos.image_url || "";
  const detailMobileImage = kos.image_mobile_url || detailDesktopImage;
  const mapEmbedUrl = kos.latitude && kos.longitude
    ? `https://maps.google.com/maps?q=${kos.latitude},${kos.longitude}&z=15&output=embed`
    : "";

  return (
    <div className="min-h-screen relative w-full bg-black text-black font-sans selection:bg-black selection:text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="hidden md:block absolute inset-0">
          <Image src={detailDesktopImage} alt={kos.name} fill className="object-cover" priority />
        </div>
        <div className="block md:hidden absolute inset-0">
          <Image src={detailMobileImage} alt={`${kos.name} Mobile`} fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
      </div>

      {/* Navigation Header */}
      <Navbar />
      {/* Main Content */}
      <main className="relative z-20 w-full h-[calc(100vh-100px)] pointer-events-none">
        {/* Desktop & Mobile Card Layout component */}
        <KosInfoCard kos={kos} mapEmbedUrl={mapEmbedUrl} />

        <RoomMarkers rooms={rooms} />
      </main>
    </div>
  );
}
