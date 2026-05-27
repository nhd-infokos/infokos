export interface RailLine {
  id: string;
  name: string;
  color: string;
  coordinates: [number, number][];
}

export const KRL_LINES: RailLine[] = [
  {
    id: "bogor",
    name: "Bogor Line",
    color: "red",
    coordinates: [
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
    ],
  },
  {
    id: "bekasi",
    name: "Bekasi Line",
    color: "#0066FF",
    coordinates: [
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
    ],
  },
  {
    id: "tangerang",
    name: "Tanggerang Line",
    color: "#8B4513",
    coordinates: [
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
    ],
  },
  {
    id: "rangkasbitung",
    name: "Rangkasbitung Line",
    color: "#00B14F",
    coordinates: [
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
    ],
  },
];

export const MRT_LINES: RailLine[] = [
  {
    id: "mrt_jakarta",
    name: "Jakarta Line",
    color: "#00008B", // dark blue
    coordinates: [
      [-6.289230, 106.775276], // Lebak Bulus
      [-6.292490, 106.793755], // Fatmawati
      [-6.278385, 106.797587], // Cipete Raya
      [-6.266730, 106.797551], // Haji Nawi
      [-6.255866, 106.797034], // Blok A
      [-6.244368, 106.798150], // Blok M
      [-6.237255, 106.799047], // ASEAN
      [-6.226955, 106.802111], // Senayan
      [-6.222718, 106.805561], // Istora
      [-6.215286, 106.818318], // Bendungan Hilir
      [-6.208643, 106.821382], // Setiabudi Astra
      [-6.200805, 106.822833], // Dukuh Atas
      [-6.191870, 106.822980], // Bundaran HI
    ],
  },
];

// Radius in km to consider a kos "near" a KRL line
const PROXIMITY_RADIUS_KM = 1.5;

/**
 * Haversine distance between two lat/lng points in km
 */
function haversineDistance(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Distance from a point to the closest point on a line segment
 */
function pointToSegmentDistance(
  px: number, py: number,
  ax: number, ay: number,
  bx: number, by: number
): number {
  const dx = bx - ax;
  const dy = by - ay;
  if (dx === 0 && dy === 0) {
    return haversineDistance(px, py, ax, ay);
  }
  let t = ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy);
  t = Math.max(0, Math.min(1, t));
  const closestLat = ax + t * dx;
  const closestLon = ay + t * dy;
  return haversineDistance(px, py, closestLat, closestLon);
}

/**
 * Check if a point is near any segment of a KRL line
 */
export function isNearKrlLine(
  lat: number,
  lon: number,
  lineCoordinates: [number, number][],
  radiusKm: number = PROXIMITY_RADIUS_KM
): boolean {
  for (let i = 0; i < lineCoordinates.length - 1; i++) {
    const [aLat, aLon] = lineCoordinates[i];
    const [bLat, bLon] = lineCoordinates[i + 1];
    const dist = pointToSegmentDistance(lat, lon, aLat, aLon, bLat, bLon);
    if (dist <= radiusKm) return true;
  }
  return false;
}
