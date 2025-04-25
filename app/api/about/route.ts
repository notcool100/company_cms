import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Validation schema for updating about section
const updateAboutSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).optional(),
  description: z.string().min(1, { message: "Description is required" }).optional(),
  imageUrl: z.string().min(1, { message: "Image URL is required" }).optional(),
  features: z.array(z.string()).optional(),
  buttonText: z.string().optional(),
  buttonUrl: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    // Get about section data
    const about = await db.getAbout();
    
    return NextResponse.json({ 
      success: true, 
      data: about 
    });
  } catch (error) {
    console.error('Error fetching about section:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch about section' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check authorization (only admin can update about section)
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }
    
    // Parse and validate request body
    const data = await request.json();
    const result = updateAboutSchema.safeParse(data);
    
    if (!result.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed', 
          details: result.error.format() 
        },
        { status: 400 }
      );
    }
    
    // Update the about section
    const updatedAbout = await db.updateAbout(result.data);
    
    return NextResponse.json(
      { success: true, data: updatedAbout }
    );
  } catch (error) {
    console.error('Error updating about section:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update about section' },
      { status: 500 }
    );
  }
}