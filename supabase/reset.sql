-- ⚠️ WARNING: THIS WILL DELETE ALL DATA ⚠️

-- 1. Drop Tables (and associated policies)
DROP TABLE IF EXISTS leads CASCADE;
DROP TABLE IF EXISTS interactions CASCADE;
DROP TABLE IF EXISTS portfolio CASCADE;

-- 2. Cleanup Storage (Portfolio Bucket)
-- First, remove all files in the bucket
DELETE FROM storage.objects WHERE bucket_id = 'portfolio';

-- Then, remove the bucket itself
DELETE FROM storage.buckets WHERE id = 'portfolio';

-- 3. Drop Storage Policies (if they persist)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
