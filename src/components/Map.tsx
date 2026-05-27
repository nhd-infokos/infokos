"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Tooltip, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { MapPin } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { formatPriceShort } from "@/lib/utils";
import { KRL_LINES, MRT_LINES } from "@/lib/krl-routes";

interface MapKos {
  id: string;
  slug: string;
  name: string;
  latitude: number;
  longitude: number;
  price: number;
  image_url?: string | null;
  district?: string | null;
  city?: string | null;
  kos_type?: string | null;
}

interface MapProps {
  kosList?: MapKos[];
  className?: string;
  center?: [number, number];
  activeLines?: string[]; // IDs of active KRL lines to highlight
}

const createPriceIcon = (price: string) => {
  return L.divIcon({
    className: "bg-transparent border-none",
    iconSize: [60, 26],
    iconAnchor: [30, 13],
    html: `<div class="bg-white text-black px-2 py-0.5 rounded-full font-medium text-[12px] shadow-sm border-[1.5px] border-black whitespace-nowrap flex items-center justify-center w-full h-full cursor-pointer hover:bg-gray-50 transition-colors">${price}</div>`,
  });
};

const createClusterCustomIcon = function (cluster: any) {
  return L.divIcon({
    html: `<div class="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-[15px] shadow-sm border-[1.5px] border-black hover:bg-gray-50 transition-colors"><span>${cluster.getChildCount()}</span></div>`,
    className: 'bg-transparent border-none',
    iconSize: L.point(40, 40, true),
  });
};

// Helper component to update map view when center changes
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center[0], center[1], zoom, map]);
  return null;
}

export default function Map({ kosList: externalKosList, className, center: externalCenter, activeLines }: MapProps) {
  const router = useRouter();
  const [mapId, setMapId] = useState("");
  const [internalKosList, setInternalKosList] = useState<MapKos[]>([]);

  useEffect(() => {
    setMapId("map-" + Date.now());

    // Only fetch internally if no external data provided
    if (!externalKosList) {
      async function fetchMapData() {
        try {
          const res = await fetch("/api/kos?map=true");
          const json = await res.json();
          setInternalKosList(json.data || []);
        } catch (err) {
          console.error("Error fetching map data:", err);
        }
      }
      fetchMapData();
    }
  }, [externalKosList]);

  const kosList = externalKosList ?? internalKosList;
  const defaultCenter: [number, number] = [-6.35, 106.85]; // Center of Jabodetabek
  const position = externalCenter || defaultCenter;

  const hasActiveLines = activeLines && activeLines.length > 0;

  if (!mapId) {
    return (
      <div className={className || "w-full h-[500px] md:h-[600px] rounded-[32px] bg-gray-100 flex items-center justify-center text-gray-400 font-medium"}>
        Memuat Peta...
      </div>
    );
  }

  return (
    <div className={className || "w-full h-[500px] md:h-[600px] rounded-[32px] overflow-hidden shadow-sm border border-gray-100 relative z-0"}>
      <MapContainer
        key={mapId}
        center={position}
        zoom={externalCenter ? 13 : 10}
        scrollWheelZoom={false}
        className="w-full h-full"
        id="map"
      >
        <ChangeView center={position} zoom={externalCenter ? 13 : 10} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* KRL Lines - highlight active ones, dim inactive ones */}
        {KRL_LINES.map((line) => {
          const isActive = !hasActiveLines || activeLines!.includes(line.id);
          return (
            <Polyline
              key={line.id}
              positions={line.coordinates}
              pathOptions={{
                color: line.color,
                weight: isActive ? 4 : 2,
                opacity: isActive ? 0.8 : 0.2,
              }}
            />
          );
        })}

        {/* MRT Lines - highlight active ones, dim inactive ones */}
        {MRT_LINES.map((line) => {
          const isActive = !hasActiveLines || activeLines!.includes(line.id);
          return (
            <Polyline
              key={line.id}
              positions={line.coordinates}
              pathOptions={{
                color: line.color,
                weight: isActive ? 4 : 2,
                opacity: isActive ? 0.8 : 0.2,
              }}
            />
          );
        })}

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={50}
        >
          {kosList.map((kos) => (
            <Marker
              key={kos.id}
              position={[kos.latitude, kos.longitude]}
              icon={createPriceIcon(formatPriceShort(kos.price))}
              eventHandlers={{ click: () => router.push(`/detail/${kos.slug}`) }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1} className="!bg-transparent !border-none !shadow-none !p-0 before:!hidden">
                <div className="w-[200px] bg-white rounded-[16px] overflow-hidden shadow-xl border border-gray-100 flex flex-col pointer-events-none">
                  <div className="w-full h-[120px] relative bg-gray-100">
                    {kos.image_url ? (
                      <img src={kos.image_url} alt={kos.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                    )}
                    {kos.kos_type && (
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-black text-[10px] font-medium px-2 py-1 rounded-full">
                        {kos.kos_type}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="text-[14px] font-semibold text-black line-clamp-1 mb-1">{kos.name}</h4>
                    <div className="flex items-center text-gray-500 text-[11px] mb-2 gap-1">
                      <MapPin weight="fill" className="w-3 h-3 shrink-0" />
                      <span className="line-clamp-1">{kos.district || '-'}, {kos.city || '-'}</span>
                    </div>
                    <div className="font-bold text-[#E53E3E] text-[13px]">{formatPriceShort(kos.price)}<span className="text-gray-800 font-normal text-[11px]">/bln</span></div>
                  </div>
                </div>
              </Tooltip>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
