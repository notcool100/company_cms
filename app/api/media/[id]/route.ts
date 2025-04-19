import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const mediaItem = await db.getMediaById(id);
  if (!mediaItem) {
    return new NextResponse('Media not found', { status: 404 });
  }
  return NextResponse.json(mediaItem);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const deletedMedia = await db.deleteMedia(id);
  if (!deletedMedia) {
    return new NextResponse('Media not found', { status: 404 });
  }
  return NextResponse.json(deletedMedia);
}
