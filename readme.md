# Company CMS

A modern, full-featured Content Management System built with Next.js, Prisma, and PostgreSQL.

## Features

- **Content Management**: Create, edit, and publish pages, blog posts, and other content
- **Media Library**: Upload and manage images and other media files
- **User Management**: Role-based access control with admin, editor, and user roles
- **API-First Architecture**: RESTful API endpoints for all functionality
- **Authentication**: Secure authentication using NextAuth.js
- **Responsive Design**: Mobile-friendly admin interface
- **SEO Optimization**: Built-in SEO tools for better search engine visibility

## Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Form Validation**: Zod, React Hook Form
- **UI Components**: Radix UI, Shadcn UI

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/company-cms.git
   cd company-cms
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   # or
   pnpm install --no-frozen-lockfile
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/company_cms?schema=public"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Seed the database with initial data:
   ```bash
   npx tsx prisma/seed.ts
   ```

6. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Default User Accounts

After seeding the database, you can log in with the following accounts:

- **Admin**: admin@example.com / Admin123!
- **Editor**: editor@example.com / Editor123!
- **User**: user@example.com / User123!

## API Documentation

Comprehensive API documentation is available in the [API_DOCUMENTATION.md](API_DOCUMENTATION.md) file.

## Project Structure

```
company_cms/
├── app/                  # Next.js app directory
│   ├── admin/            # Admin panel pages
│   ├── api/              # API routes
│   └── ...               # Public-facing pages
├── components/           # React components
│   ├── ui/               # UI components
│   └── ...               # Feature components
├── lib/                  # Utility functions and shared code
├── prisma/               # Prisma schema and migrations
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeder
├── public/               # Static assets
└── styles/               # Global styles
```

## Development

### Database Management

- Generate Prisma client after schema changes:
  ```bash
  npx prisma generate
  ```

- Create a new migration:
  ```bash
  npx prisma migrate dev --name migration_name
  ```

### Running Tests

```bash
npm run test
# or
pnpm test
```

## Deployment

1. Build the application:
   ```bash
   npm run build
   # or
   pnpm build
   ```

2. Start the production server:
   ```bash
   npm run start
   # or
   pnpm start
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

