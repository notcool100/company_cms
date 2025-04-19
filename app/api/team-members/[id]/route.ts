import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const member = await db.getTeamMemberById(id);
  if (!member) {
    return new NextResponse('Team member not found', { status: 404 });
  }
  return NextResponse.json(member);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const data = await request.json();
  const updatedMember = await db.updateTeamMember(id, data);
  if (!updatedMember) {
    return new NextResponse('Team member not found', { status: 404 });
  }
  return NextResponse.json(updatedMember);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const deletedMember = await db.deleteTeamMember(id);
  if (!deletedMember) {
    return new NextResponse('Team member not found', { status: 404 });
  }
  return NextResponse.json(deletedMember);
}
