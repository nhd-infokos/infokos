import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { KosRoom } from "@/types/kos";
import { getKosBySlug } from "@/services/kos.service";
import { getRoomsByKosId } from "@/services/room.service";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import RoomMarkers from "@/components/RoomMarkers";
import Navbar from "@/components/Navbar";
import KosInfoCard from "@/components/KosInfoCard";

// Cache halaman selama 5 menit di server
export const revalidate = 300;

export default async function DetailKos({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Validasi: harus login untuk mengakses halaman detail
  const supabase = await createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/langganan");
  }

  let kos = null;
  let rooms: KosRoom[] = [];

  try {
    // Fetch kos first, then use its id for rooms (avoids redundant slug→id lookup)
    kos = await getKosBySlug(slug);
    if (kos) {
      rooms = (await getRoomsByKosId(kos.id)) || [];
    }
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
