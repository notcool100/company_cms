import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

// Validation schema for updating a page
const updatePageSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).optional(),
  slug: z.string().min(1, { message: "Slug is required" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { 
      message: "Slug must contain only lowercase letters, numbers, and hyphens" 
    }).optional(),
  content: z.string().optional(),
  status: z.enum(['Published', 'Draft']).optional()
});

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Validate ID parameter
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    // Get the page
    const page = await db.getPageById(id);
    if (!page) {
      return NextResponse.json(
        { success: false, error: 'Page not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    console.error('Error fetching page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch page' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check authorization (only admin and editor can update pages)
    if (session.user.role !== 'admin' && session.user.role !== 'editor') {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Validate ID parameter
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    // Check if page exists
    const existingPage = await db.getPageById(id);
    if (!existingPage) {
      return NextResponse.json(
        { success: false, error: 'Page not found' },
        { status: 404 }
      );
    }

    // Parse and validate request body
    const data = await request.json();
    const result = updatePageSchema.safeParse(data);
    
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

    // If slug is being updated, check if it's already in use by another page
    if (result.data.slug && result.data.slug !== existingPage.slug) {
      const pageWithSlug = await db.getPageBySlug(result.data.slug);
      if (pageWithSlug && pageWithSlug.id !== id) {
        return NextResponse.json(
          { success: false, error: 'Slug already in use' },
          { status: 409 }
        );
      }
    }

    // Update the page
    const updatedPage = await db.updatePage(id, result.data);
    
    return NextResponse.json({ success: true, data: updatedPage });
  } catch (error) {
    console.error('Error updating page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update page' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check authorization (only admin can delete pages)
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Validate ID parameter
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    // Check if page exists
    const existingPage = await db.getPageById(id);
    if (!existingPage) {
      return NextResponse.json(
        { success: false, error: 'Page not found' },
        { status: 404 }
      );
    }

    // Delete the page
    const deletedPage = await db.deletePage(id);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Page deleted successfully',
      data: deletedPage 
    });
  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete page' },
      { status: 500 }
    );
  }
}
