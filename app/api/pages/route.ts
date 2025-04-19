import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const pages = await db.getPages();
  return NextResponse.json(pages);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const newPage = await db.createPage(data);
  return NextResponse.json(newPage);
}
