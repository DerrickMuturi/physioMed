"use client";
import { createClient } from "@supabase/supabase-js";

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
const supabaseUrl = "https://eejowrrhyyummrlskjln.supabase.co";

export const supabase = createClient(supabaseUrl, supabaseKey);
