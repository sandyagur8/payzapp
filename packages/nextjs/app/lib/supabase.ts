import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://vfxfcdlgnqcoeaohyqlv.supabase.co/";
const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmeGZjZGxnbnFjb2Vhb2h5cWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2OTYwOTMsImV4cCI6MjA0MDI3MjA5M30.YPSDzisgs9O7xlas2Oer_T_fzcVzDCbEjj1virVPqMI";

export const supabase = createClient(supabaseUrl, supabaseKey);
