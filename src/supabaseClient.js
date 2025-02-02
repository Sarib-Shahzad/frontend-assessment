import { createClient } from '@supabase/supabase-js'


const SUPABASE_URL = "https://rfxaxolvwwwnwvlvzagx.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmeGF4b2x2d3d3bnd2bHZ6YWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMzAzNTQsImV4cCI6MjA1MjYwNjM1NH0.dA7JpHBDdmaFGnYjYPgMdF8ikS2jcAXA6QExufcXHrw"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

