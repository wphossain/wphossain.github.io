import { createClient, SupabaseClient } from '@supabase/supabase-js';

// IMPORTANT: This is a SERVER-ONLY client using the service_role key.
// It must NEVER be imported from a client component or bundled into the browser.
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';

let adminClient: SupabaseClient<any, 'public', any> | null = null;

export function getAdminClient(): SupabaseClient<any, 'public', any> | null {
  if (
    !serviceRoleKey ||
    !supabaseUrl ||
    serviceRoleKey.includes('dummy') ||
    !supabaseUrl.includes('supabase.co')
  ) {
    return null;
  }
  if (!adminClient) {
    adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return adminClient;
}
