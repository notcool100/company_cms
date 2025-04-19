import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const media = await db.getMedia();
  return NextResponse.json(media);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const newMedia = await db.createMedia(data);
  return NextResponse.json(newMedia);
}
