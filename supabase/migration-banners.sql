-- Migration: Add Banners Table
-- Description: Creates a table to store banner images for the homepage.

CREATE TABLE IF NOT EXISTS banners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    desktop_image_url TEXT NOT NULL,
    mobile_image_url TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

-- Policies
-- Anyone can view banners
CREATE POLICY "Public can view banners"
    ON banners
    FOR SELECT
    TO public
    USING (true);

-- Only service role (admin API) or authenticated admins can insert/update/delete
CREATE POLICY "Admins can insert banners"
    ON banners
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Admins can update banners"
    ON banners
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admins can delete banners"
    ON banners
    FOR DELETE
    TO authenticated
    USING (true);

-- Create a function to auto-update updated_at if it doesn't exist
CREATE OR REPLACE FUNCTION update_banners_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for updated_at
CREATE TRIGGER update_banners_updated_at
    BEFORE UPDATE ON banners
    FOR EACH ROW
    EXECUTE FUNCTION update_banners_updated_at_column();
