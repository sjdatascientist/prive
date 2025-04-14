// Establishing connection with Supabase Client
require('dotenv').config();
// import { createClient } from '@supabase/supabase-js';
const createClient = require('@supabase/supabase-js').createClient;

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.SUPABASE_PROJECT_URL, process.env.PUBLIC_ANON_KEY)

// console.log(supabase)

// export default supabase;
module.exports = {supabase}