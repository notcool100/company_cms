import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Validation schema for creating a portfolio item
const portfolioItemSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  imageUrl: z.string().min(1, { message: "Image URL is required" }),
  projectUrl: z.string().optional(),
  featured: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const url = new URL(request.url);
    const featured = url.searchParams.get('featured');
    const limit = url.searchParams.get('limit');
    
    let portfolioItems;
    
    if (featured === 'true' && limit) {
      // Get featured portfolio items with limit
      portfolioItems = await db.getFeaturedPortfolioItems(parseInt(limit));
    } else if (featured === 'true') {
      // Get all featured portfolio items
      portfolioItems = await db.getFeaturedPortfolioItems();
    } else {
      // Get all portfolio items
      portfolioItems = await db.getPortfolioItems();
    }
    
    return NextResponse.json({ 
      success: true, 
      data: portfolioItems 
    });
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch portfolio items' },
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
    
    // Check authorization (only admin can create portfolio items)
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }
    
    // Parse and validate request body
    const data = await request.json();
    const result = portfolioItemSchema.safeParse(data);
    
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
    
    // Create the portfolio item
    const newPortfolioItem = await db.createPortfolioItem(result.data);
    
    return NextResponse.json(
      { success: true, data: newPortfolioItem },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create portfolio item' },
      { status: 500 }
    );
  }
}