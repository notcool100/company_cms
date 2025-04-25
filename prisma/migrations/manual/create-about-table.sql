-- Create About table
CREATE TABLE "About" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "features" TEXT[] NOT NULL,
  "buttonText" TEXT NOT NULL DEFAULT 'Learn More',
  "buttonUrl" TEXT NOT NULL DEFAULT '/about',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);