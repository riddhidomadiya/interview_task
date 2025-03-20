import { createClient, SupabaseClient } from "@supabase/supabase-js";

import AppConstants from "../constants/app_constants";

export const supabase = createClient(
  AppConstants.supabaseUrl,
  AppConstants.supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
) as SupabaseClient;

export default supabase;
