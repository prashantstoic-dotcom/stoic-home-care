-- ============================================================
-- Stoic Home Care — Enquiry Tables for Lead Form
-- Run this SQL in your Supabase SQL Editor
-- ============================================================

-- Table 1: enquiries (General contact form / HomeEnquiryForm)
CREATE TABLE IF NOT EXISTS public.enquiries (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    service_name TEXT DEFAULT 'General Enquiry',
    city TEXT DEFAULT 'Not specified',
    message TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_created ON public.enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);

-- Table 2: popup_enquiries (Quick 12-second popup callback form)
CREATE TABLE IF NOT EXISTS public.popup_enquiries (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    service_interest TEXT DEFAULT 'General',
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_popup_enquiries_created ON public.popup_enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_popup_enquiries_status ON public.popup_enquiries(status);

-- ============================================================
-- RLS Policies — anon INSERT allowed, anon SELECT allowed
-- (Admin uses anon key via REST API in this project)
-- ============================================================

-- enquiries RLS
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon insert enquiries"
    ON public.enquiries FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "Allow anon select enquiries"
    ON public.enquiries FOR SELECT
    TO anon
    USING (true);

CREATE POLICY "Allow anon update enquiries"
    ON public.enquiries FOR UPDATE
    TO anon
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow anon delete enquiries"
    ON public.enquiries FOR DELETE
    TO anon
    USING (true);

-- popup_enquiries RLS
ALTER TABLE public.popup_enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon insert popup_enquiries"
    ON public.popup_enquiries FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "Allow anon select popup_enquiries"
    ON public.popup_enquiries FOR SELECT
    TO anon
    USING (true);

CREATE POLICY "Allow anon update popup_enquiries"
    ON public.popup_enquiries FOR UPDATE
    TO anon
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow anon delete popup_enquiries"
    ON public.popup_enquiries FOR DELETE
    TO anon
    USING (true);
