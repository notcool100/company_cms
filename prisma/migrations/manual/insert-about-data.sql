-- Insert default About data
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
);