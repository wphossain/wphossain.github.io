import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server-admin';

export async function GET() {
  const admin = getAdminClient();
  if (!admin) {
    return NextResponse.json({ error: 'Admin storage not configured' }, { status: 503 });
  }
  try {
    const { data: files, error } = await admin.storage.from('media').list('', {
      limit: 200,
      sortBy: { column: 'created_at', order: 'desc' },
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    const items = (files || [])
      .filter((f: any) => !f.id?.includes('/'))
      .map((f: any) => {
        const { data } = admin.storage.from('media').getPublicUrl(f.name);
        return {
          id: f.id || f.name,
          url: data.publicUrl,
          file_name: f.name,
          size_bytes: f.metadata?.size,
          storage_path: f.name,
          mime_type: f.metadata?.mimetype,
          created_at: f.created_at,
        };
      });
    return NextResponse.json({ success: true, data: items });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed to load media' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const admin = getAdminClient();
  if (!admin) {
    return NextResponse.json({ error: 'Admin storage not configured' }, { status: 503 });
  }
  try {
    const { storage_path } = await req.json();
    if (storage_path) {
      const { error } = await admin.storage.from('media').remove([storage_path]);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Delete failed' }, { status: 500 });
  }
}
