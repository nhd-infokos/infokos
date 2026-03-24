-- =============================================
-- Tabel KOS_TAGS (Tags per Kos)
-- =============================================
CREATE TABLE IF NOT EXISTS kos_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kos_id UUID NOT NULL REFERENCES kos(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_kos_tags_kos ON kos_tags(kos_id);

ALTER TABLE kos_tags ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Public read kos_tags" ON kos_tags FOR SELECT USING (true);

-- Auth write
CREATE POLICY "Auth insert kos_tags" ON kos_tags FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update kos_tags" ON kos_tags FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth delete kos_tags" ON kos_tags FOR DELETE TO authenticated USING (true);
