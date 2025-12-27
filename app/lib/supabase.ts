import { createClient } from '@supabase/supabase-js'

// Fallback to empty string to prevent build time errors
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
// Note: createClient throws if URL is missing, so we need a check or dummy value if we want build to pass without env vars
// But better is to just let it fail if not present? No, static gen fails.
// Let's use a dummy URL if missing so build passes. Real usage will fail but that's better than build failing.
const validUrl = supabaseUrl || 'https://placeholder.supabase.co'
const validKey = supabaseAnonKey || 'placeholder'

export const supabase = createClient(validUrl, validKey)

// Admin client with Service Role Key (bypasses RLS)
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
export const supabaseAdmin = serviceRoleKey
    ? createClient(validUrl, serviceRoleKey)
    : null
