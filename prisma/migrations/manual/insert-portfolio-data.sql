-- Insert sample portfolio items
INSERT INTO "Portfolio" (
  "title",
  "category",
  "description",
  "imageUrl",
  "projectUrl",
  "featured",
  "createdAt",
  "updatedAt"
)
VALUES
  (
    'E-commerce Platform',
    'Web Development',
    'A fully responsive e-commerce platform with integrated payment processing and inventory management.',
    '/placeholder.svg?height=400&width=600',
    'https://example.com/ecommerce',
    true,
    NOW(),
    NOW()
  ),
  (
    'Mobile Banking App',
    'Mobile Development',
    'Secure and user-friendly mobile banking application with biometric authentication and real-time transaction tracking.',
    '/placeholder.svg?height=400&width=600',
    'https://example.com/banking-app',
    true,
    NOW(),
    NOW()
  ),
  (
    'Healthcare Management System',
    'Enterprise Solutions',
    'Comprehensive healthcare management system for hospitals and clinics, featuring patient records, appointment scheduling, and billing.',
    '/placeholder.svg?height=400&width=600',
    'https://example.com/healthcare',
    true,
    NOW(),
    NOW()
  ),
  (
    'Corporate Website Redesign',
    'UI/UX Design',
    'Complete redesign of a corporate website with focus on user experience, accessibility, and modern design principles.',
    '/placeholder.svg?height=400&width=600',
    'https://example.com/corporate-redesign',
    false,
    NOW(),
    NOW()
  ),
  (
    'Inventory Management System',
    'Enterprise Solutions',
    'Custom inventory management system with barcode scanning, automated reordering, and detailed analytics.',
    '/placeholder.svg?height=400&width=600',
    'https://example.com/inventory',
    false,
    NOW(),
    NOW()
  );