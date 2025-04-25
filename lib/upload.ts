import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';
import { randomUUID } from 'crypto';

// Allowed file types and their corresponding MIME types
const ALLOWED_FILE_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'application/pdf': 'pdf',
  'text/csv': 'csv',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
};

// Maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export type UploadResult = {
  success: boolean;
  error?: string;
  file?: {
    name: string;
    type: string;
    mimeType: string;
    size: number;
    url: string;
    dimensions?: string;
  };
};

export async function uploadFile(
  file: File,
  directory: string = 'uploads'
): Promise<UploadResult> {
  try {
    // Validate file type
    if (!Object.keys(ALLOWED_FILE_TYPES).includes(file.type)) {
      return {
        success: false,
        error: `File type not allowed. Allowed types: ${Object.keys(ALLOWED_FILE_TYPES).join(', ')}`,
      };
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        error: `File too large. Maximum size: ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
      };
    }

    // Create upload directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', directory);
    await mkdir(uploadDir, { recursive: true });

    // Generate unique filename
    const extension = ALLOWED_FILE_TYPES[file.type as keyof typeof ALLOWED_FILE_TYPES];
    const uniqueFilename = `${randomUUID()}.${extension}`;
    const filePath = join(uploadDir, uniqueFilename);

    // Read file as ArrayBuffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Write file to disk
    await writeFile(filePath, buffer);

    // Get file dimensions if it's an image
    let dimensions;
    if (file.type.startsWith('image/')) {
      // In a real implementation, you would use a library like sharp to get dimensions
      // For simplicity, we'll skip this step
      dimensions = 'unknown';
    }

    // Determine file type category (image, video, document, etc.)
    let fileCategory = 'document';
    if (file.type.startsWith('image/')) {
      fileCategory = 'image';
    } else if (file.type.startsWith('video/')) {
      fileCategory = 'video';
    } else if (file.type.startsWith('audio/')) {
      fileCategory = 'audio';
    }

    // Return file information
    return {
      success: true,
      file: {
        name: file.name,
        type: fileCategory,
        mimeType: file.type,
        size: file.size,
        url: `/${directory}/${uniqueFilename}`,
        dimensions,
      },
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return {
      success: false,
      error: 'Failed to upload file',
    };
  }
}

// Helper function to format file size
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' bytes';
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  else return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}