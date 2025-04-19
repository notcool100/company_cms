import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const page = await db.getPageById(id);
  if (!page) {
    return new NextResponse('Page not found', { status: 404 });
  }
  return NextResponse.json(page);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const data = await request.json();
  const updatedPage = await db.updatePage(id, data);
  if (!updatedPage) {
    return new NextResponse('Page not found', { status: 404 });
  }
  return NextResponse.json(updatedPage);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const deletedPage = await db.deletePage(id);
  if (!deletedPage) {
    return new NextResponse('Page not found', { status: 404 });
  }
  return NextResponse.json(deletedPage);
}
