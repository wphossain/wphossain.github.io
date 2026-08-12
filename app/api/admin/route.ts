import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminClient } from '@/lib/supabase/server-admin';

function purgeCache() {
  try {
    revalidatePath('/', 'page');
    revalidatePath('/blog', 'page');
    revalidatePath('/case-studies', 'page');
  } catch (e) {
    console.error('Revalidate error', e);
  }
}

// Server-only admin data API.
// All admin mutations flow through here using the service_role key,
// so RLS (which blocks anon writes) never blocks admin edits.
export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { action, table, payload, id, where, data } = body || {};
  const admin = getAdminClient();

  if (!admin) {
    return NextResponse.json(
      { error: 'Admin database is not configured' },
      { status: 503 }
    );
  }

  try {
    switch (action) {
      case 'upsert': {
        if ((table === 'site_settings' || table === 'tracking_codes') && !payload.id) {
          const { data: existing } = await admin
            .from(table)
            .select('id')
            .order('updated_at', { ascending: false })
            .limit(1)
            .maybeSingle();
          if (existing?.id) {
            payload.id = existing.id;
          }
        }
        const { data: result, error } = await admin
          .from(table)
          .upsert(payload, { onConflict: where?.onConflict });
        if (error) throw error;
        purgeCache();
        return NextResponse.json({ ok: true, data: result });
      }
      case 'insert': {
        const { data: result, error } = await admin.from(table).insert(payload);
        if (error) throw error;
        purgeCache();
        return NextResponse.json({ ok: true, data: result });
      }
      case 'update': {
        let query = admin.from(table).update(data);
        if (where && Object.keys(where).length > 0) {
          for (const [key, value] of Object.entries(where)) {
            query = query.eq(key, value);
          }
        } else {
          // Singletons (site_settings, tracking_codes): update the existing row(s)
          query = query.neq('id', '');
        }
        const { data: result, error } = await query;
        if (error) throw error;
        purgeCache();
        return NextResponse.json({ ok: true, data: result });
      }
      case 'delete': {
        let query = admin.from(table).delete();
        if (where && Object.keys(where).length > 0) {
          for (const [key, value] of Object.entries(where)) {
            query = query.eq(key, value);
          }
        }
        const { data: result, error } = await query;
        if (error) throw error;
        purgeCache();
        return NextResponse.json({ ok: true, data: result });
      }
      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Database operation failed' }, { status: 500 });
  }
}
