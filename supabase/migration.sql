-- =============================================
-- CariKos / Kosku — Supabase Database Migration
-- =============================================

-- 1. TABEL KOS (Properti Kos)
CREATE TABLE IF NOT EXISTS kos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  address TEXT,
  district TEXT,
  city TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  price INTEGER NOT NULL,  
  kos_type TEXT CHECK (kos_type IN ('putra', 'putri', 'campur')),
  gender_label TEXT,
  target_tenant TEXT,
  nearby_transport TEXT,
  nearby_mall TEXT,
  whatsapp_number TEXT,
  image_url TEXT,
  image_mobile_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. TABEL KOS_FACILITIES (Fasilitas Kos)
CREATE TABLE IF NOT EXISTS kos_facilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kos_id UUID NOT NULL REFERENCES kos(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  icon TEXT,
  sort_order INTEGER DEFAULT 0
);

-- 3. TABEL KOS_ROOMS (Ruangan Kos)
CREATE TABLE IF NOT EXISTS kos_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kos_id UUID NOT NULL REFERENCES kos(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  video_url TEXT,
  marker_top TEXT,
  marker_left TEXT,
  marker_mobile_top TEXT,
  marker_mobile_left TEXT,
  sort_order INTEGER DEFAULT 0
);

-- 4. TABEL KOS_ROOM_FACILITIES (Fasilitas per Ruangan)
CREATE TABLE IF NOT EXISTS kos_room_facilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES kos_rooms(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  icon TEXT
);

-- 5. TABEL KOS_IMAGES (Galeri Gambar Kos)
CREATE TABLE IF NOT EXISTS kos_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kos_id UUID NOT NULL REFERENCES kos(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0
);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX IF NOT EXISTS idx_kos_slug ON kos(slug);
CREATE INDEX IF NOT EXISTS idx_kos_city ON kos(city);
CREATE INDEX IF NOT EXISTS idx_kos_type ON kos(kos_type);
CREATE INDEX IF NOT EXISTS idx_kos_price ON kos(price);
CREATE INDEX IF NOT EXISTS idx_kos_featured ON kos(is_featured);
CREATE INDEX IF NOT EXISTS idx_kos_facilities_kos ON kos_facilities(kos_id);
CREATE INDEX IF NOT EXISTS idx_kos_rooms_kos ON kos_rooms(kos_id);
CREATE INDEX IF NOT EXISTS idx_kos_room_facilities_room ON kos_room_facilities(room_id);
CREATE INDEX IF NOT EXISTS idx_kos_images_kos ON kos_images(kos_id);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- Public read-only untuk semua tabel
-- =============================================
ALTER TABLE kos ENABLE ROW LEVEL SECURITY;
ALTER TABLE kos_facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE kos_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE kos_room_facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE kos_images ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Public read kos" ON kos FOR SELECT USING (true);
CREATE POLICY "Public read kos_facilities" ON kos_facilities FOR SELECT USING (true);
CREATE POLICY "Public read kos_rooms" ON kos_rooms FOR SELECT USING (true);
CREATE POLICY "Public read kos_room_facilities" ON kos_room_facilities FOR SELECT USING (true);
CREATE POLICY "Public read kos_images" ON kos_images FOR SELECT USING (true);

-- =============================================
-- SEED DATA
-- =============================================

-- Kos 1: Kos Mayapada
INSERT INTO kos (name, slug, address, district, city, latitude, longitude, price, kos_type, gender_label, target_tenant, nearby_transport, nearby_mall, whatsapp_number, image_url, is_featured)
VALUES (
  'Kos Mayapada', 'kos-mayapada',
  'Cilandak, Jakarta Selatan', 'Cilandak', 'Jakarta Selatan',
  -6.2800, 106.7900,
  1200000, 'campur', 'Campur', 'Profesional',
  '6 min Krl Tebet', 'Mall Kokas',
  '6281234567890',
  '/kos-1.jpg',
  false
);

-- Kos 2: Kos Waduk
INSERT INTO kos (name, slug, address, district, city, latitude, longitude, price, kos_type, gender_label, target_tenant, nearby_transport, nearby_mall, whatsapp_number, image_url)
VALUES (
  'Kos Waduk', 'kos-waduk',
  'Cilandak, Jakarta Selatan', 'Cilandak', 'Jakarta Selatan',
  -6.2500, 106.8300,
  950000, 'campur', 'Campur', 'Profesional',
  '6 min Krl Tebet', 'Mall Kokas',
  '6281234567890',
  '/kos-2.jpg'
);

-- Kos 3: Kos Pal Batu 271
INSERT INTO kos (name, slug, address, district, city, latitude, longitude, price, kos_type, gender_label, target_tenant, nearby_transport, nearby_mall, whatsapp_number, image_url, image_mobile_url)
VALUES (
  'Kos Pal Batu 271', 'kos-pal-batu-271',
  'Jl. Pal Batu 2 No.71, Menteng Dalam, Kec. Tebet', 'Tebet', 'Jakarta Selatan',
  -6.2615, 106.8106,
  1850000, 'campur', 'Campur', 'Profesional',
  '6 min Krl Tebet', 'Mall Kokas',
  '6281234567890',
  '/kos-palbatu.png',
  '/Pal Batu 271-mobile.png'
);

-- Kos 4: Kos Green Mayapada
INSERT INTO kos (name, slug, address, district, city, latitude, longitude, price, kos_type, gender_label, target_tenant, nearby_transport, nearby_mall, whatsapp_number, image_url)
VALUES (
  'Kos Green Mayapada', 'kos-green-mayapada',
  'Cilandak, Jakarta Selatan', 'Cilandak', 'Jakarta Selatan',
  -6.2700, 106.8000,
  980000, 'campur', 'Campur', 'Profesional',
  '6 min Krl Tebet', 'Mall Kokas',
  '6281234567890',
  '/kos-4.jpg'
);

-- Kos 5: Kos New Mayapada (Featured/Hero)
INSERT INTO kos (name, slug, address, district, city, latitude, longitude, price, kos_type, gender_label, target_tenant, nearby_transport, nearby_mall, whatsapp_number, image_url, is_featured)
VALUES (
  'Kos New Mayapada', 'kos-new-mayapada',
  'Cilandak, Jakarta Selatan', 'Cilandak', 'Jakarta Selatan',
  -6.2750, 106.7950,
  2500000, 'putra', 'Putra', 'Profesional',
  '6 min Krl Tebet', 'Mall Kokas',
  '6281234567890',
  '/kos-mayapada.webp',
  true
);

-- =============================================
-- SEED: Fasilitas per Kos
-- =============================================

-- Fasilitas untuk Kos New Mayapada (featured)
INSERT INTO kos_facilities (kos_id, name, icon, sort_order)
SELECT id, 'Kasur', 'Bed', 1 FROM kos WHERE slug = 'kos-new-mayapada';
INSERT INTO kos_facilities (kos_id, name, icon, sort_order)
SELECT id, 'Kamar Mandi Dalam', 'Bathtub', 2 FROM kos WHERE slug = 'kos-new-mayapada';
INSERT INTO kos_facilities (kos_id, name, icon, sort_order)
SELECT id, 'TV', 'Television', 3 FROM kos WHERE slug = 'kos-new-mayapada';
INSERT INTO kos_facilities (kos_id, name, icon, sort_order)
SELECT id, 'AC', 'Wind', 4 FROM kos WHERE slug = 'kos-new-mayapada';

-- Fasilitas untuk Kos Pal Batu 271
INSERT INTO kos_facilities (kos_id, name, icon, sort_order)
SELECT id, 'Kasur', 'Bed', 1 FROM kos WHERE slug = 'kos-pal-batu-271';
INSERT INTO kos_facilities (kos_id, name, icon, sort_order)
SELECT id, 'Kamar Mandi', 'Bathtub', 2 FROM kos WHERE slug = 'kos-pal-batu-271';
INSERT INTO kos_facilities (kos_id, name, icon, sort_order)
SELECT id, 'TV', 'Television', 3 FROM kos WHERE slug = 'kos-pal-batu-271';
INSERT INTO kos_facilities (kos_id, name, icon, sort_order)
SELECT id, 'AC', 'Wind', 4 FROM kos WHERE slug = 'kos-pal-batu-271';

-- =============================================
-- SEED: Rooms untuk Kos New Mayapada (Hero)
-- =============================================
INSERT INTO kos_rooms (kos_id, name, description, video_url, marker_top, marker_left, sort_order)
SELECT id, 'Ruang Tamu',
  'A spacious and elegant living area designed for comfort and luxury. Features premium furniture, ambient lighting, and panoramic views of the garden.',
  '/ruangtamu.mp4', '50%', '84%', 1
FROM kos WHERE slug = 'kos-new-mayapada';

INSERT INTO kos_rooms (kos_id, name, marker_top, marker_left, sort_order)
SELECT id, 'Kamar Tidur', '40%', '115%', 2
FROM kos WHERE slug = 'kos-new-mayapada';

INSERT INTO kos_rooms (kos_id, name, marker_top, marker_left, sort_order)
SELECT id, 'Kolam Renang', '62%', '110%', 3
FROM kos WHERE slug = 'kos-new-mayapada';

INSERT INTO kos_rooms (kos_id, name, marker_top, marker_left, sort_order)
SELECT id, 'Teras', '40%', '100%', 4
FROM kos WHERE slug = 'kos-new-mayapada';

-- Room Facilities untuk Ruang Tamu (Kos New Mayapada)
INSERT INTO kos_room_facilities (room_id, name, icon)
SELECT r.id, 'Smart TV 4K', 'Television'
FROM kos_rooms r JOIN kos k ON r.kos_id = k.id
WHERE k.slug = 'kos-new-mayapada' AND r.name = 'Ruang Tamu';

INSERT INTO kos_room_facilities (room_id, name, icon)
SELECT r.id, 'High-Speed WiFi', 'WifiHigh'
FROM kos_rooms r JOIN kos k ON r.kos_id = k.id
WHERE k.slug = 'kos-new-mayapada' AND r.name = 'Ruang Tamu';

INSERT INTO kos_room_facilities (room_id, name, icon)
SELECT r.id, 'Climate Control', 'Thermometer'
FROM kos_rooms r JOIN kos k ON r.kos_id = k.id
WHERE k.slug = 'kos-new-mayapada' AND r.name = 'Ruang Tamu';

INSERT INTO kos_room_facilities (room_id, name, icon)
SELECT r.id, 'Minibar', 'Martini'
FROM kos_rooms r JOIN kos k ON r.kos_id = k.id
WHERE k.slug = 'kos-new-mayapada' AND r.name = 'Ruang Tamu';

-- =============================================
-- SEED: Rooms untuk Kos Pal Batu 271 (Detail page)
-- =============================================
INSERT INTO kos_rooms (kos_id, name, marker_top, marker_left, sort_order)
SELECT id, 'Balkon', '60%', '92%', 1
FROM kos WHERE slug = 'kos-pal-batu-271';

INSERT INTO kos_rooms (kos_id, name, description, image_url, marker_top, marker_left, sort_order)
SELECT id, 'Kamar Tidur',
  'Jelajahi desain, fasilitas, dan detail rumah yang bisa menjadi hunian Anda.',
  '/kamar-tidur-kos-palbatu.png', '46%', '110%', 2
FROM kos WHERE slug = 'kos-pal-batu-271';

-- =============================================
-- SEED: Images
-- =============================================
INSERT INTO kos_images (kos_id, url, alt_text, is_primary, sort_order)
SELECT id, '/kos-1.jpg', 'Kos Mayapada', true, 1 FROM kos WHERE slug = 'kos-mayapada';

INSERT INTO kos_images (kos_id, url, alt_text, is_primary, sort_order)
SELECT id, '/kos-2.jpg', 'Kos Waduk', true, 1 FROM kos WHERE slug = 'kos-waduk';

INSERT INTO kos_images (kos_id, url, alt_text, is_primary, sort_order)
SELECT id, '/kos-palbatu.png', 'Kos Pal Batu 271', true, 1 FROM kos WHERE slug = 'kos-pal-batu-271';

INSERT INTO kos_images (kos_id, url, alt_text, is_primary, sort_order)
SELECT id, '/Pal Batu 271.png', 'Kos Pal Batu 271 Detail', false, 2 FROM kos WHERE slug = 'kos-pal-batu-271';

INSERT INTO kos_images (kos_id, url, alt_text, is_primary, sort_order)
SELECT id, '/Pal Batu 271-mobile.png', 'Kos Pal Batu 271 Mobile', false, 3 FROM kos WHERE slug = 'kos-pal-batu-271';

INSERT INTO kos_images (kos_id, url, alt_text, is_primary, sort_order)
SELECT id, '/kos-4.jpg', 'Kos Green Mayapada', true, 1 FROM kos WHERE slug = 'kos-green-mayapada';

INSERT INTO kos_images (kos_id, url, alt_text, is_primary, sort_order)
SELECT id, '/kos-mayapada.webp', 'Kos New Mayapada', true, 1 FROM kos WHERE slug = 'kos-new-mayapada';

INSERT INTO kos_images (kos_id, url, alt_text, is_primary, sort_order)
SELECT id, '/kos-mayapada-green.png', 'Kos New Mayapada Green', false, 2 FROM kos WHERE slug = 'kos-new-mayapada';
