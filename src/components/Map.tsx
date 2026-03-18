"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useRouter } from "next/navigation";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { formatPriceShort } from "@/lib/utils";

interface MapKos {
  id: string;
  slug: string;
  name: string;
  latitude: number;
  longitude: number;
  price: number;
}

const createPriceIcon = (price: string) => {
  return L.divIcon({
    className: "bg-transparent border-none",
    iconSize: [80, 36],
    iconAnchor: [40, 18],
    html: `<div class="bg-[#3FE074] text-black px-4 py-1.5 rounded-full font-bold text-sm shadow-md border-[3px] border-white whitespace-nowrap flex items-center justify-center w-full h-full cursor-pointer hover:bg-green-400 transition-colors">${price}</div>`,
  });
};

export default function Map() {
  const router = useRouter();
  const [mapId, setMapId] = useState("");
  const [kosList, setKosList] = useState<MapKos[]>([]);

  useEffect(() => {
    setMapId("map-" + Date.now());

    async function fetchMapData() {
      try {
        const res = await fetch("/api/kos?map=true");
        const json = await res.json();
        setKosList(json.data || []);
      } catch (err) {
        console.error("Error fetching map data:", err);
      }
    }
    fetchMapData();
  }, []);

  const position: [number, number] = [-6.2615, 106.8106];

  if (!mapId) {
    return (
      <div className="w-full h-[500px] md:h-[600px] rounded-[32px] bg-gray-100 flex items-center justify-center text-gray-400 font-medium">
        Memuat Peta...
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] md:h-[600px] rounded-[32px] overflow-hidden shadow-sm border border-gray-100 relative z-0">
      <MapContainer
        key={mapId}
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
        id="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {kosList.map((kos) => (
          <Marker
            key={kos.id}
            position={[kos.latitude, kos.longitude]}
            icon={createPriceIcon(formatPriceShort(kos.price))}
            eventHandlers={{ click: () => router.push(`/detail/${kos.slug}`) }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
