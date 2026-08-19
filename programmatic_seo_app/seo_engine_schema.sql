CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Part 9.1.4: Create seo_pages Table
CREATE TABLE IF NOT EXISTS public.seo_pages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    url TEXT NOT NULL UNIQUE,
    target_keyword TEXT NOT NULL,
    baseline_clicks INTEGER DEFAULT 0,
    baseline_position NUMERIC(5,2) DEFAULT 0.00,
    last_checked_at TIMESTAMP WITH TIME ZONE,
    status TEXT DEFAULT 'tracking' -- 'tracking', 'decaying', 'healed'
);

CREATE INDEX IF NOT EXISTS idx_seo_pages_url ON public.seo_pages(url);

-- Part 9.1.5: Create seo_decay_logs Table
CREATE TABLE IF NOT EXISTS public.seo_decay_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    page_id UUID REFERENCES public.seo_pages(id) ON DELETE CASCADE,
    position_drop NUMERIC(5,2) DEFAULT 0.00, -- e.g. dropped by 3.5 positions
    ctr_drop_percentage NUMERIC(5,2) DEFAULT 0.00, -- e.g. dropped by 15%
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'needs_healing' -- 'needs_healing', 'healing_in_progress', 'healed'
);

CREATE INDEX IF NOT EXISTS idx_seo_decay_logs_page_id ON public.seo_decay_logs(page_id);
CREATE INDEX IF NOT EXISTS idx_seo_decay_logs_status ON public.seo_decay_logs(status);

-- RLS Policies
ALTER TABLE public.seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_decay_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon select seo_pages" ON public.seo_pages FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon select seo_decay_logs" ON public.seo_decay_logs FOR SELECT TO anon USING (true);
-- Note: Assuming internal server operations (service role) bypass RLS.

-- Part 9.3.1: Create serp_snapshots Table
CREATE TABLE IF NOT EXISTS public.serp_snapshots (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    decay_log_id UUID REFERENCES public.seo_decay_logs(id) ON DELETE CASCADE,
    target_keyword TEXT NOT NULL,
    competitor_urls JSONB DEFAULT '[]'::jsonb,
    extracted_headings JSONB DEFAULT '[]'::jsonb,
    analyzed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_serp_snapshots_decay_id ON public.serp_snapshots(decay_log_id);

ALTER TABLE public.serp_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon select serp_snapshots" ON public.serp_snapshots FOR SELECT TO anon USING (true);

-- ==========================================
-- TOOL 10: OMNICHANNEL CONTENT MULTIPLIER
-- ==========================================

-- Table: social_campaigns
-- Tracks the overarching social media strategy generated from a single blog post.
CREATE TABLE social_campaigns (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    blog_slug TEXT NOT NULL, -- Links to the published_articles table
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'generating', 'review_ready', 'scheduled', 'completed', 'failed')),
    target_platforms JSONB DEFAULT '["twitter", "linkedin"]'::jsonb, -- Array of platforms to post to
    scheduled_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for social_campaigns
ALTER TABLE social_campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can full access social_campaigns" 
ON social_campaigns FOR ALL 
USING (auth.role() = 'authenticated');

-- Trigger to auto-update 'updated_at'
CREATE TRIGGER update_social_campaigns_updated_at
BEFORE UPDATE ON social_campaigns
FOR EACH ROW EXECUTE PROCEDURE set_updated_at();


-- Table: social_posts
-- Holds individual pieces of content tailored for specific platforms (linked to a campaign)
CREATE TABLE social_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    campaign_id UUID NOT NULL REFERENCES social_campaigns(id) ON DELETE CASCADE,
    platform TEXT NOT NULL CHECK (platform IN ('twitter', 'linkedin', 'facebook', 'instagram')),
    content TEXT NOT NULL, -- The AI generated copy (can be long for LinkedIn, or an array/JSON for Twitter Threads)
    image_url TEXT, -- Optional media attached to the post
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'published', 'failed')),
    external_post_id TEXT, -- The ID returned by Twitter/LinkedIn after successful publishing
    error_log TEXT, -- Holds the reason if the post fails to publish
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast queries
CREATE INDEX idx_social_posts_campaign_id ON social_posts(campaign_id);

-- RLS Policies for social_posts
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can full access social_posts" 
ON social_posts FOR ALL 
USING (auth.role() = 'authenticated');

-- Trigger to auto-update 'updated_at'
CREATE TRIGGER update_social_posts_updated_at
BEFORE UPDATE ON social_posts
FOR EACH ROW EXECUTE PROCEDURE set_updated_at();


-- ===========================================================================
-- TOOL 11: EMPATHY-DRIVEN AI SDR (LEAD CONVERSION ENGINE)
-- ===========================================================================

-- Table: chat_sessions
-- Tracks unique visitor interactions with the AI SDR
CREATE TABLE chat_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    visitor_ip TEXT, -- Helps in rate limiting and identifying returning visitors
    user_agent TEXT, -- Browser/Device metadata
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'lead_captured', 'abandoned', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast lookup by status (useful for admin dashboard later)
CREATE INDEX idx_chat_sessions_status ON chat_sessions(status);

-- RLS Policies for chat_sessions
-- (Visitors should be able to create their own session, but only admins can view all)
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

-- Note: In a real production app, we would use an anonymous JWT or service role to insert. 
-- For simplicity, we allow inserts from the backend (service role bypasses RLS).
CREATE POLICY "Admin can full access chat_sessions" 
ON chat_sessions FOR ALL 
USING (auth.role() = 'authenticated');

-- Trigger to auto-update 'updated_at'
CREATE TRIGGER update_chat_sessions_updated_at
BEFORE UPDATE ON chat_sessions
FOR EACH ROW EXECUTE PROCEDURE set_updated_at();


-- Table: chat_messages
-- Stores individual messages within a chat session
CREATE TABLE chat_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index to quickly fetch a session's entire chat history in order
CREATE INDEX idx_chat_messages_session_time ON chat_messages(session_id, created_at ASC);

-- RLS Policies for chat_messages
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Note: Same as before, relying on backend service role for simplicity.
CREATE POLICY "Admin can full access chat_messages" 
ON chat_messages FOR ALL 
USING (auth.role() = 'authenticated');


-- Table: crm_leads
-- Stores hot leads generated by the AI SDR
CREATE TABLE crm_leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id UUID REFERENCES chat_sessions(id), -- To link back to the exact chat
    name TEXT NOT NULL,
    contact_info TEXT NOT NULL, -- Phone or Email
    query_summary TEXT, -- What the user was asking about
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'dead')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for admin sorting
CREATE INDEX idx_crm_leads_status ON crm_leads(status);
CREATE INDEX idx_crm_leads_created ON crm_leads(created_at DESC);

-- RLS Policies for crm_leads
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;

-- Note: Same as before, relying on backend service role for simplicity.
CREATE POLICY "Admin can full access crm_leads" 
ON crm_leads FOR ALL 
USING (auth.role() = 'authenticated');

-- Trigger to auto-update 'updated_at'
CREATE TRIGGER update_crm_leads_updated_at
BEFORE UPDATE ON crm_leads
FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

