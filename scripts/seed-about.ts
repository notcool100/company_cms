import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Creating About record...');
    
    // Check if the About table exists in the database
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'About'
    `;
    
    console.log('Tables:', tables);
    
    // Try to query the About table
    const existingAbout = await prisma.$queryRaw`SELECT * FROM "About" LIMIT 1`;
    console.log('Existing About:', existingAbout);
    
    // Create the About record using raw SQL
    const result = await prisma.$executeRaw`
      INSERT INTO "About" (
        "title", 
        "description", 
        "imageUrl", 
        "features", 
        "buttonText", 
        "buttonUrl", 
        "createdAt", 
        "updatedAt"
      ) 
      VALUES (
        'About Our Company',
        'Founded in 2010, our IT company has been at the forefront of technological innovation, helping businesses of all sizes transform their digital presence and operations.',
        '/placeholder.svg?height=600&width=600',
        ARRAY['Over 10 years of industry experience', 'Team of 50+ skilled professionals', 'Successfully delivered 200+ projects', 'Partnerships with leading technology providers'],
        'Learn More',
        '/about',
        NOW(),
        NOW()
      )
    `;
    
    console.log('About record created, rows affected:', result);
  } catch (error) {
    console.error('Error creating About record:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  });