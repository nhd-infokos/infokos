"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Tooltip, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { MapPin } from "@phosphor-icons/react";
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
  image_url?: string | null;
  district?: string | null;
  city?: string | null;
  kos_type?: string | null;
}

interface MapProps {
  kosList?: MapKos[];
  className?: string;
  center?: [number, number];
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

const KRL_BOGOR_JAKARTAKOTA: [number, number][] = [
  [-6.59427, 106.79081], // Bogor
  [-6.53058, 106.80061], // Cilebut
  [-6.49167, 106.79417], // Bojong Gede
  [-6.44879, 106.80241], // Citayam
  [-6.40442, 106.81709], // Depok
  [-6.39104, 106.82168], // Depok Baru
  [-6.36883, 106.83215], // Pondok Cina
  [-6.36075, 106.83175], // Universitas Indonesia
  [-6.33583, 106.83417], // Universitas Pancasila
  [-6.32667, 106.83222], // Lenteng Agung
  [-6.30833, 106.83667], // Tanjung Barat
  [-6.28111, 106.84056], // Pasar Minggu
  [-6.26278, 106.85444], // Pasar Minggu Baru
  [-6.25361, 106.85306], // Duren Kalibata
  [-6.24255, 106.85869], // Cawang
  [-6.22611, 106.85611], // Tebet
  [-6.20778, 106.85278], // Manggarai
  [-6.19861, 106.84139], // Cikini
  [-6.18556, 106.83222], // Gondangdia
  [-6.16672, 106.83047], // Juanda
  [-6.16067, 106.82764], // Sawah Besar
  [-6.14968, 106.82703], // Mangga Besar
  [-6.14129, 106.82313], // Jayakarta
  [-6.13758, 106.81463], // Jakarta Kota
];

const KRL_CIKARANG_KAMPUNGBANDAN: [number, number][] = [
  [-6.25361, 107.14222], // Cikarang
  [-6.25539, 107.14513], // Metland Telagamurni
  [-6.26278, 107.08028], // Cibitung
  [-6.25861, 107.05600], // Tambun
  [-6.24689, 107.01811], // Bekasi Timur
  [-6.23590, 106.99860], // Bekasi
  [-6.22611, 106.98222], // Kranji
  [-6.21903, 106.95243], // Cakung
  [-6.21694, 106.93556], // Klender Baru
  [-6.22416, 106.92083], // Buaran
  [-6.21333, 106.89972], // Klender
  [-6.21500, 106.87000], // Jatinegara
  [-6.21256, 106.85983], // Matraman
  [-6.20778, 106.85278], // Manggarai
  [-6.20250, 106.82333], // Sudirman
  [-6.20083, 106.81583], // Karet
  [-6.18556, 106.81056], // Tanah Abang
  [-6.15611, 106.80139], // Duri
  [-6.14417, 106.80056], // Angke
  [-6.13278, 106.82861], // Kampung Bandan
];

const KRL_RANGKASBITUNG_TANAHABANG: [number, number][] = [
  [-6.35266, 106.25153], // Rangkasbitung
  [-6.33583, 106.32694], // Citeras
  [-6.33231, 106.39656], // Maja
  [-6.32667, 106.43417], // Tigaraksa
  [-6.34000, 106.46700], // Tenjo
  [-6.33805, 106.49246], // Daru
  [-6.35437, 106.50958], // Cilejit
  [-6.34415, 106.56866], // Parung Panjang
  [-6.33139, 106.61917], // Cicayur
  [-6.32222, 106.63722], // Cisauk
  [-6.32014, 106.66515], // Serpong
  [-6.31750, 106.67556], // Rawa Buntu
  [-6.29917, 106.71694], // Sudimara
  [-6.28861, 106.72917], // Jurangmangu
  [-6.28083, 106.74889], // Pondok Ranji
  [-6.23722, 106.78250], // Kebayoran
  [-6.20750, 106.79750], // Palmerah
  [-6.18556, 106.81056], // Tanah Abang
];

const KRL_TANGERANG_DURI: [number, number][] = [
  [-6.18028, 106.62917], // Tangerang
  [-6.17600, 106.64680], // Tanah Tinggi
  [-6.17221, 106.66509], // Batu Ceper
  [-6.17139, 106.67611], // Poris
  [-6.15487, 106.70605], // Kalideres
  [-6.16269, 106.72316], // Rawa Buaya
  [-6.15982, 106.73701], // Bojong Indah
  [-6.16010, 106.75380], // Taman Kota
  [-6.16127, 106.77147], // Pesing
  [-6.16203, 106.78937], // Grogol
  [-6.15611, 106.80139], // Duri
];

export default function Map({ kosList: externalKosList, className, center: externalCenter }: MapProps) {
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
  const defaultCenter: [number, number] = [-6.2615, 106.8106];
  const position = externalCenter || defaultCenter;

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
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
        id="map"
      >
        <ChangeView center={position} zoom={13} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* KRL Red Line: Bogor to Jakarta Kota */}
        <Polyline positions={KRL_BOGOR_JAKARTAKOTA} pathOptions={{ color: 'red', weight: 4, opacity: 0.7 }} />

        {/* KRL Blue Line: Cikarang to Kampung Bandan */}
        <Polyline positions={KRL_CIKARANG_KAMPUNGBANDAN} pathOptions={{ color: '#0066FF', weight: 4, opacity: 0.7 }} />

        {/* KRL Green Line: Rangkasbitung to Tanah Abang */}
        <Polyline positions={KRL_RANGKASBITUNG_TANAHABANG} pathOptions={{ color: '#00B14F', weight: 4, opacity: 0.7 }} />

        {/* KRL Brown Line: Tangerang to Duri */}
        <Polyline positions={KRL_TANGERANG_DURI} pathOptions={{ color: '#8B4513', weight: 4, opacity: 0.7 }} />

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
