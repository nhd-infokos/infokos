-- =============================================
-- Admin RLS Policies — Allow authenticated users to write
-- =============================================

-- Kos table: allow authenticated users full access
CREATE POLICY "Auth insert kos" ON kos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update kos" ON kos FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth delete kos" ON kos FOR DELETE TO authenticated USING (true);

-- Kos Facilities
CREATE POLICY "Auth insert kos_facilities" ON kos_facilities FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update kos_facilities" ON kos_facilities FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth delete kos_facilities" ON kos_facilities FOR DELETE TO authenticated USING (true);

-- Kos Rooms
CREATE POLICY "Auth insert kos_rooms" ON kos_rooms FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update kos_rooms" ON kos_rooms FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth delete kos_rooms" ON kos_rooms FOR DELETE TO authenticated USING (true);

-- Kos Room Facilities
CREATE POLICY "Auth insert kos_room_facilities" ON kos_room_facilities FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update kos_room_facilities" ON kos_room_facilities FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth delete kos_room_facilities" ON kos_room_facilities FOR DELETE TO authenticated USING (true);

-- Kos Images
CREATE POLICY "Auth insert kos_images" ON kos_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update kos_images" ON kos_images FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth delete kos_images" ON kos_images FOR DELETE TO authenticated USING (true);
