"use client";

import { useEffect, useState } from "react";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useRouter } from "next/navigation";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Helper function to dynamically generate a custom React-Less HTML Price Icon
const createPriceIcon = (price: string) => {
    return L.divIcon({
        className: "bg-transparent border-none", // Reset leaflet default styling
        iconSize: [80, 36], // Approximate sizing to keep it centered properly
        iconAnchor: [40, 18], // Pin relative to center
        html: `<div class="bg-[#3FE074] text-black px-4 py-1.5 rounded-full font-bold text-sm shadow-md border-[3px] border-white whitespace-nowrap flex items-center justify-center w-full h-full cursor-pointer hover:bg-green-400 transition-colors">${price}</div>`
    });
};

export default function Map() {
    const router = useRouter();
    const [mapId, setMapId] = useState("");

    // Use useEffect to ensure the key is only created after the component mounts on the client
    // This prevents hydration mismatches and guarantees a unique key for each mount
    useEffect(() => {
        setMapId("map-" + Date.now());
    }, []);

    // Center of Jakarta Selatan roughly
    const position: [number, number] = [-6.2615, 106.8106];

    if (!mapId) return <div className="w-full h-[500px] md:h-[600px] rounded-[32px] bg-gray-100 flex items-center justify-center text-gray-400 font-medium">Memuat Peta...</div>;

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

                {/* Example prominent price markers */}
                <Marker
                    position={[-6.2615, 106.8106]}
                    icon={createPriceIcon("Rp 1.5jt")}
                    eventHandlers={{ click: () => router.push("/detail/kos-new-cilandak") }}
                />

                <Marker
                    position={[-6.2800, 106.7900]}
                    icon={createPriceIcon("Rp 1.2jt")}
                    eventHandlers={{ click: () => router.push("/detail/kos-new-cilandak") }}
                />

                <Marker
                    position={[-6.2500, 106.8300]}
                    icon={createPriceIcon("Rp 2.0jt")}
                    eventHandlers={{ click: () => router.push("/detail/kos-new-cilandak") }}
                />

            </MapContainer>
        </div>
    );
}
