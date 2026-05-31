-- =============================================
-- Migration: Profiles & Role-based Access
-- Jalankan di Supabase SQL Editor
-- =============================================

-- 1. Buat tabel profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable RLS pada profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. RLS: User bisa baca profil sendiri
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- 4. RLS: User bisa update profil sendiri (tapi TIDAK bisa ubah role)
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 5. Trigger: Auto-create profile saat user sign up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'member')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger jika sudah ada
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Buat trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- 6. Buat profile untuk user yang SUDAH ada
-- Semua user existing di-set sebagai member dulu
INSERT INTO profiles (id, email, role)
SELECT id, email, 'member'
FROM auth.users
WHERE NOT EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.users.id)
ON CONFLICT (id) DO NOTHING;

-- 7. Set admincms@gmail.com sebagai admin
UPDATE profiles SET role = 'admin' WHERE email = 'admincms@gmail.com';

-- =============================================
-- Helper function: cek apakah user admin
-- =============================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- Update RLS Policies: Hanya admin yang bisa write
-- =============================================

-- Drop old policies yang terlalu longgar
DROP POLICY IF EXISTS "Auth insert kos" ON kos;
DROP POLICY IF EXISTS "Auth update kos" ON kos;
DROP POLICY IF EXISTS "Auth delete kos" ON kos;
DROP POLICY IF EXISTS "Auth insert kos_facilities" ON kos_facilities;
DROP POLICY IF EXISTS "Auth update kos_facilities" ON kos_facilities;
DROP POLICY IF EXISTS "Auth delete kos_facilities" ON kos_facilities;
DROP POLICY IF EXISTS "Auth insert kos_rooms" ON kos_rooms;
DROP POLICY IF EXISTS "Auth update kos_rooms" ON kos_rooms;
DROP POLICY IF EXISTS "Auth delete kos_rooms" ON kos_rooms;
DROP POLICY IF EXISTS "Auth insert kos_room_facilities" ON kos_room_facilities;
DROP POLICY IF EXISTS "Auth update kos_room_facilities" ON kos_room_facilities;
DROP POLICY IF EXISTS "Auth delete kos_room_facilities" ON kos_room_facilities;
DROP POLICY IF EXISTS "Auth insert kos_images" ON kos_images;
DROP POLICY IF EXISTS "Auth update kos_images" ON kos_images;
DROP POLICY IF EXISTS "Auth delete kos_images" ON kos_images;

-- Kos: hanya admin
CREATE POLICY "Admin insert kos" ON kos FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "Admin update kos" ON kos FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin delete kos" ON kos FOR DELETE TO authenticated USING (is_admin());

-- Kos Facilities: hanya admin
CREATE POLICY "Admin insert kos_facilities" ON kos_facilities FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "Admin update kos_facilities" ON kos_facilities FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin delete kos_facilities" ON kos_facilities FOR DELETE TO authenticated USING (is_admin());

-- Kos Rooms: hanya admin
CREATE POLICY "Admin insert kos_rooms" ON kos_rooms FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "Admin update kos_rooms" ON kos_rooms FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin delete kos_rooms" ON kos_rooms FOR DELETE TO authenticated USING (is_admin());

-- Kos Room Facilities: hanya admin
CREATE POLICY "Admin insert kos_room_facilities" ON kos_room_facilities FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "Admin update kos_room_facilities" ON kos_room_facilities FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin delete kos_room_facilities" ON kos_room_facilities FOR DELETE TO authenticated USING (is_admin());

-- Kos Images: hanya admin
CREATE POLICY "Admin insert kos_images" ON kos_images FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY "Admin update kos_images" ON kos_images FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin delete kos_images" ON kos_images FOR DELETE TO authenticated USING (is_admin());
