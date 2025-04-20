import { PrismaClient, Status } from '@prisma/client'
import bcrypt from 'bcryptjs'
import './seed-settings'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...')

  // Seed Pages
  const pages = [
    {
      title: 'Home',
      slug: 'home',
      content: `
# Welcome to Our Company

We provide cutting-edge solutions for businesses of all sizes. Our team of experts is dedicated to delivering high-quality services that meet your specific needs.

## Our Mission

To empower businesses through innovative technology solutions that drive growth and success.

## Why Choose Us?

- Expert team with years of industry experience
- Customized solutions tailored to your business needs
- Commitment to quality and customer satisfaction
- Ongoing support and maintenance
      `,
      status: 'Published' as Status,
    },
    {
      title: 'About Us',
      slug: 'about',
      content: `
# About Our Company

Founded in 2010, our company has grown from a small startup to a leading provider of technology solutions. We believe in innovation, quality, and customer satisfaction.

## Our History

Our journey began with a simple idea: to create technology solutions that make a difference. Over the years, we've expanded our services and built a team of experts dedicated to this vision.

## Our Values

- **Innovation**: We constantly explore new technologies and approaches
- **Quality**: We maintain the highest standards in everything we do
- **Integrity**: We operate with honesty and transparency
- **Collaboration**: We work together to achieve common goals
      `,
      status: 'Published' as Status,
    },
    {
      title: 'Services',
      slug: 'services',
      content: `
# Our Services

We offer a wide range of services to meet your business needs. From web development to cloud solutions, we have the expertise to help you succeed.

## Web Development

Custom websites and web applications built with the latest technologies to deliver exceptional user experiences.

## UI/UX Design

Intuitive and engaging user interfaces designed to enhance user experience and drive conversion.

## Cloud Solutions

Scalable and secure cloud infrastructure to optimize your business operations and reduce costs.

## Mobile Development

Native and cross-platform mobile applications that provide seamless experiences across all devices.
      `,
      status: 'Published' as Status,
    },
    {
      title: 'Contact',
      slug: 'contact',
      content: `
# Contact Us

We'd love to hear from you! Get in touch with us to discuss your project or learn more about our services.

## Contact Information

- **Email**: info@example.com
- **Phone**: (123) 456-7890
- **Address**: 123 Main Street, City, Country

## Office Hours

Monday - Friday: 9:00 AM - 5:00 PM
Saturday - Sunday: Closed
      `,
      status: 'Published' as Status,
    },
    {
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      content: `
# Privacy Policy

Last updated: January 1, 2023

This Privacy Policy describes how we collect, use, and disclose your information when you use our services.

## Information We Collect

We collect information you provide directly to us, such as when you create an account, fill out a form, or communicate with us.

## How We Use Your Information

We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations.

## Information Sharing

We do not sell your personal information. We may share your information with third-party service providers who perform services on our behalf.
      `,
      status: 'Published' as Status,
    },
    {
      title: 'Draft Page',
      slug: 'draft-page',
      content: `
# This is a draft page

This page is still being worked on and is not yet published.

## Coming Soon

More content will be added to this page before it is published.
      `,
      status: 'Draft' as Status,
    },
  ]

  // Seed Services
  const services = [
    {
      title: 'Web Development',
      description: 'Custom websites and web applications built with the latest technologies to deliver exceptional user experiences.',
      icon: 'code',
    },
    {
      title: 'UI/UX Design',
      description: 'Intuitive and engaging user interfaces designed to enhance user experience and drive conversion.',
      icon: 'layers',
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable and secure cloud infrastructure to optimize your business operations and reduce costs.',
      icon: 'cloud',
    },
    {
      title: 'Database Management',
      description: 'Expert database design, optimization, and management to ensure your data is secure and accessible.',
      icon: 'database',
    },
    {
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications that provide seamless experiences across all devices.',
      icon: 'smartphone',
    },
    {
      title: 'IT Consulting',
      description: 'Expert advice and guidance to help you make informed decisions about your IT strategy.',
      icon: 'chart',
    },
    {
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your business from threats and ensure data integrity.',
      icon: 'shield',
    },
    {
      title: 'Technical Support',
      description: 'Responsive and reliable technical support to keep your systems running smoothly.',
      icon: 'support',
    },
  ]

  // Seed Team Members
  const teamMembers = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      bio: 'With over 15 years of experience in the tech industry, John leads our company with vision and expertise.',
      imageUrl: '/team/john-smith.jpg',
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      bio: 'Sarah oversees our technical strategy and ensures we stay at the cutting edge of technology.',
      imageUrl: '/team/sarah-johnson.jpg',
    },
    {
      name: 'Michael Chen',
      role: 'Lead Developer',
      bio: 'Michael brings 10+ years of development experience and a passion for clean, efficient code.',
      imageUrl: '/team/michael-chen.jpg',
    },
    {
      name: 'Emily Rodriguez',
      role: 'UX/UI Designer',
      bio: 'Emily creates beautiful, intuitive interfaces that delight users and drive engagement.',
      imageUrl: '/team/emily-rodriguez.jpg',
    },
    {
      name: 'David Park',
      role: 'Full-stack Developer',
      bio: 'David specializes in building end-to-end solutions with expertise in both frontend and backend technologies.',
      imageUrl: '/team/david-park.jpg',
    },
    {
      name: 'Alex Johnson',
      role: 'DevOps Engineer',
      bio: 'Alex ensures our infrastructure is scalable, secure, and running smoothly with automated CI/CD pipelines.',
      imageUrl: '/team/alex-johnson.jpg',
    },
    {
      name: 'Priya Patel',
      role: 'QA Engineer',
      bio: 'Priya ensures the highest quality of our products through rigorous testing and quality assurance processes.',
      imageUrl: '/team/priya-patel.jpg',
    },
    {
      name: 'Jamie Wilson',
      role: 'Technical Writer',
      bio: 'Jamie creates clear, concise documentation to help users get the most out of our products and services.',
      imageUrl: '/team/jamie-wilson.jpg',
    },
  ]

  // Seed Users
  const users = [
    {
      email: 'admin@example.com',
      password: 'Admin123!',
      role: 'admin',
      name: 'Admin User',
    },
    {
      email: 'editor@example.com',
      password: 'Editor123!',
      role: 'editor',
      name: 'Editor User',
    },
    {
      email: 'user@example.com',
      password: 'User123!',
      role: 'user',
      name: 'Regular User',
    },
  ]

  // Clear existing data
  console.log('Clearing existing data...')
  await prisma.page.deleteMany({})
  await prisma.service.deleteMany({})
  await prisma.teamMember.deleteMany({})
  await prisma.user.deleteMany({})

  // Seed pages
  console.log('Seeding pages...')
  for (const page of pages) {
    try {
      const created = await prisma.page.create({
        data: page,
      })
      console.log(`Created page: ${created.title}`)
    } catch (error) {
      console.error('Error creating page:', error)
    }
  }

  // Seed services
  console.log('Seeding services...')
  for (const service of services) {
    try {
      const created = await prisma.service.create({
        data: service,
      })
      console.log(`Created service: ${created.title}`)
    } catch (error) {
      console.error('Error creating service:', error)
    }
  }

  // Seed team members
  console.log('Seeding team members...')
  for (const member of teamMembers) {
    try {
      const created = await prisma.teamMember.create({
        data: member,
      })
      console.log(`Created team member: ${created.name}`)
    } catch (error) {
      console.error('Error creating team member:', error)
    }
  }

  // Seed users
  console.log('Seeding users...')
  for (const user of users) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10)
      const created = await prisma.user.create({
        data: {
          email: user.email,
          password: hashedPassword,
          role: user.role,
          name: user.name,
        },
      })
      console.log(`Created user: ${created.email} (${created.role})`)
    } catch (error) {
      console.error(`Error creating user ${user.email}:`, error)
    }
  }

  console.log('Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
