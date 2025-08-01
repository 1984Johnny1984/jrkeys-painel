import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://loydenntqrwqrzdinwkx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNzAwODQwNjYzLCJleHAiOjIwMTYxMjY2NjN9.iKZhEemxf2e3IhP80KPX7oZCNnReyk9rszgykiqvkeU'

export const supabase = createClient(supabaseUrl, supabaseKey)
