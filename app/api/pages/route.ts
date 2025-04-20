import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

// Validation schema for creating a page
const createPageSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  slug: z.string().min(1, { message: "Slug is required" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { 
      message: "Slug must contain only lowercase letters, numbers, and hyphens" 
    }),
  content: z.string(),
  status: z.enum(['Published', 'Draft'])
});

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    
    let pages;
    if (status && (status === 'Published' || status === 'Draft')) {
      // Filter pages by status if provided
      pages = await db.getPages();
      pages = pages.filter(page => page.status === status);
    } else {
      // Get all pages
      pages = await db.getPages();
    }
    
    return NextResponse.json({ 
      success: true, 
      data: pages 
    });
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check authorization (only admin and editor can create pages)
    if (session.user.role !== 'admin' && session.user.role !== 'editor') {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }
    
    // Parse and validate request body
    const data = await request.json();
    const result = createPageSchema.safeParse(data);
    
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
    
    // Check if slug is already in use
    const existingPage = await db.getPageBySlug(result.data.slug);
    if (existingPage) {
      return NextResponse.json(
        { success: false, error: 'Slug already in use' },
        { status: 409 }
      );
    }
    
    // Create the page
    const newPage = await db.createPage(result.data);
    
    return NextResponse.json(
      { success: true, data: newPage },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create page' },
      { status: 500 }
    );
  }
}
