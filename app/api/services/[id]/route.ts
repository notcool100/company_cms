import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const service = await db.getServiceById(id);
  if (!service) {
    return new NextResponse('Service not found', { status: 404 });
  }
  return NextResponse.json(service);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const data = await request.json();
  const updatedService = await db.updateService(id, data);
  if (!updatedService) {
    return new NextResponse('Service not found', { status: 404 });
  }
  return NextResponse.json(updatedService);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const deletedService = await db.deleteService(id);
  if (!deletedService) {
    return new NextResponse('Service not found', { status: 404 });
  }
  return NextResponse.json(deletedService);
}
