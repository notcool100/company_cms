import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const teamMembers = await db.getTeamMembers();
  return NextResponse.json(teamMembers);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const newMember = await db.createTeamMember(data);
  return NextResponse.json(newMember);
}
