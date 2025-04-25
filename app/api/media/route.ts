import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for updating media
const updateMediaSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  alt: z.string().nullable().optional(),
  tags: z.string().nullable().optional(),
});

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get query parameters
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    const query = url.searchParams.get('query');
    
    let media;
    
    if (query) {
      // Search media by name, description, or tags
      media = await prisma.media.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { tags: { contains: query, mode: 'insensitive' } },
          ],
        },
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    } else if (type) {
      // Filter by media type
      media = await prisma.media.findMany({
        where: { type },
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    } else {
      // Get all media
      media = await prisma.media.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      data: media 
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch media' },
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
    
    // Check authorization (only admin and editor can upload media)
    if (session.user.role !== 'admin' && session.user.role !== 'editor') {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }
    
    // Handle file upload
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const description = formData.get('description') as string;
    const alt = formData.get('alt') as string;
    const tags = formData.get('tags') as string;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }
    
    // In a real application, you would upload the file to a storage service
    // For this demo, we'll use placeholder URLs
    
    // Get file details
    const name = file.name;
    const size = file.size;
    const mimeType = file.type;
    const type = file.type.split('/')[0]; // e.g., 'image' from 'image/jpeg'
    
    // Generate placeholder URL and dimensions
    let url = '/placeholder.svg';
    let dimensions = null;
    
    if (type === 'image') {
      url = `/placeholder.svg?height=800&width=600`;
      dimensions = '800x600';
    } else if (type === 'video') {
      url = `/placeholder.svg?height=1280&width=720`;
      dimensions = '1280x720';
    } else if (type === 'document') {
      url = `/placeholder.svg?height=800&width=600&text=Document`;
    } else if (type === 'audio') {
      url = `/placeholder.svg?height=400&width=400&text=Audio`;
    } else {
      url = `/placeholder.svg?height=400&width=400&text=File`;
    }
    
    // Save media information to database
    const newMedia = await prisma.media.create({
      data: {
        name,
        description: description || null,
        type,
        mimeType,
        url,
        size,
        dimensions,
        alt: alt || null,
        tags: tags || null,
        uploadedBy: parseInt(session.user.id),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    
    return NextResponse.json(
      { success: true, data: newMedia },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error uploading media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload media' },
      { status: 500 }
    );
  }
}
