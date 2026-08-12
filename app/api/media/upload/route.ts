import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server-admin';

// Uploads an image to Supabase Storage ("media" bucket) and records it in media_assets.
// Expects multipart/form-data with a "file" field. Optional "folder" field (default "uploads").
export async function POST(req: NextRequest) {
  const admin = getAdminClient();
  if (!admin) {
    return NextResponse.json({ error: 'Admin storage not configured' }, { status: 503 });
  }

  try {
    const form = await req.formData();
    const file = form.get('file') as File | null;
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Simple validation
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image must be under 5MB' }, { status: 400 });
    }

    const ext = file.name.split('.').pop() || 'bin';
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]/g, '-');
    // Upload to bucket root so the media manager can list everything in one place
    const path = `${Date.now()}-${safeName}`;

    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    const { error: uploadError } = await admin.storage
      .from('media')
      .upload(path, bytes, { contentType: file.type, upsert: false });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return NextResponse.json({ error: uploadError.message || 'Upload failed' }, { status: 500 });
    }

    const { data: publicUrlData } = admin.storage.from('media').getPublicUrl(path);
    const publicUrl = publicUrlData?.publicUrl;

    // Record in media_assets (best-effort)
    try {
      await admin.from('media_assets').insert([
        {
          url: publicUrl,
          file_name: file.name,
          mime_type: file.type,
          size_bytes: file.size,
          storage_path: path,
          created_at: new Date().toISOString(),
        },
      ] as any);
    } catch (err) {
      console.error('media_assets record error (non-fatal):', err);
    }

    return NextResponse.json({ success: true, url: publicUrl, path });
  } catch (e: any) {
    console.error('Media upload error:', e);
    return NextResponse.json({ error: e?.message || 'Upload failed' }, { status: 500 });
  }
}
