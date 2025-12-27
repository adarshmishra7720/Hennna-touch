-- Enable Row Level Security
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, service_role;

-- 1. LEADS TABLE
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  event_date DATE,
  location TEXT,
  type TEXT, -- e.g., 'Bridal', 'Guest', 'Party'
  message TEXT
);

-- Enable RLS for leads
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow public to INSERT new leads (anyone can submit the form)
CREATE POLICY "Public can insert leads" 
ON leads FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow only authenticated users (admins) to VIEW leads
CREATE POLICY "Admins can view leads" 
ON leads FOR SELECT 
TO authenticated 
USING (true);


-- 2. INTERACTIONS TABLE (Analytics)
CREATE TABLE IF NOT EXISTS interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  type TEXT NOT NULL CHECK (type IN ('whatsapp_click', 'call_click')),
  page TEXT -- The page where the click happened (e.g., 'home', 'footer')
);

-- Enable RLS for interactions
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;

-- Allow public to INSERT interactions
CREATE POLICY "Public can insert interactions" 
ON interactions FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow admins to VIEW interactions
CREATE POLICY "Admins can view interactions" 
ON interactions FOR SELECT 
TO authenticated 
USING (true);


-- 3. PORTFOLIO TABLE
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT,
  category TEXT, -- e.g., 'Bridal', 'Guest'
  image_url TEXT NOT NULL
);

-- Enable RLS for portfolio
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

-- Allow public to READ portfolio items
CREATE POLICY "Public can view portfolio" 
ON portfolio FOR SELECT 
TO public 
USING (true);

-- Allow admins to INSERT/UPDATE/DELETE portfolio
CREATE POLICY "Admins can manage portfolio" 
ON portfolio FOR ALL 
TO authenticated 
USING (true);


-- 4. STORAGE BUCKET (Portfolio Images)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio', 'portfolio', true);

-- Storage Policy: Allow public to view images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING ( bucket_id = 'portfolio' );

-- Storage Policy: Allow authenticated users (uploaders) to upload
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'portfolio' );
