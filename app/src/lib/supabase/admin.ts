import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role client — bypasses RLS entirely. Server-only: never import
 * this from a "use client" file or expose SUPABASE_SERVICE_ROLE_KEY to the
 * browser. Used exclusively by admin Server Actions, which are already
 * gated behind the /admin auth check in src/app/admin/(protected)/layout.tsx.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
