-- ==============================================================================
-- PROGRAMMATIC SEO: Supabase Database Schema
-- Goal: A highly optimized table for millions of SEO pages with lightning-fast reads.
-- ==============================================================================

-- 1. Create the Master Table
CREATE TABLE programmatic_pages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Routing
    category VARCHAR(255) NOT NULL,    -- e.g., 'plumbers', 'software-engineers'
    slug VARCHAR(255) NOT NULL UNIQUE, -- e.g., 'mumbai', 'delhi'
    
    -- SEO Metadata
    seo_title VARCHAR(255) NOT NULL,
    meta_description TEXT,
    h1_tag VARCHAR(255) NOT NULL,
    
    -- Content
    html_content TEXT NOT NULL,        -- Main content with dynamic variables
    schema_markup JSONB,               -- Specific Schema.org JSON for this page
    
    -- Analytics & Sorting
    search_volume INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Indexes for Extreme Speed (Essential for Next.js ISR)
-- Since Next.js queries by 'slug', this index makes it find the page in < 1 millisecond.
CREATE INDEX idx_programmatic_pages_slug ON programmatic_pages (slug);
CREATE INDEX idx_programmatic_pages_category ON programmatic_pages (category);

-- 3. Row Level Security (RLS)
-- Prevent public write access, but allow public read access for Vercel builds
ALTER TABLE programmatic_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" 
ON programmatic_pages FOR SELECT USING (true);
