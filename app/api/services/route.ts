import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const services = await db.getServices();
  return NextResponse.json(services);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const newService = await db.createService(data);
  return NextResponse.json(newService);
}
