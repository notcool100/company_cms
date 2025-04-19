import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Seed Services
  const services = [
    {
      title: 'Web Development',
      description: 'Custom websites and web applications built with the latest technologies to deliver exceptional user experiences.',
      icon: 'Code',
    },
    {
      title: 'UI/UX Design',
      description: 'Intuitive and engaging user interfaces designed to enhance user experience and drive conversion.',
      icon: 'Layers',
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable and secure cloud infrastructure to optimize your business operations and reduce costs.',
      icon: 'Database',
    },
    {
      title: 'Digital Marketing',
      description: 'Strategic digital marketing campaigns to increase your online presence and drive business growth.',
      icon: 'Globe',
    },
    {
      title: 'IT Consulting',
      description: 'Expert advice and guidance to help you make informed decisions about your IT strategy.',
      icon: 'MessageSquare',
    },
    {
      title: 'Quality Assurance',
      description: 'Comprehensive testing and quality assurance to ensure your software meets the highest standards.',
      icon: 'CheckCircle',
    },
  ]

  for (const service of services) {
    try {
      const created = await prisma.service.create({
        data: service,
      })
      console.log('Created service:', created)
    } catch (error) {
      console.error('Error creating service:', error)
    }
  }

  // Seed Team Members
  const teamMembers = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      bio: 'With over 15 years of experience in the tech industry, John leads our company with vision and expertise.',
      imageUrl: '/placeholder.svg?height=400&width=400',
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      bio: 'Sarah oversees our technical strategy and ensures we stay at the cutting edge of technology.',
      imageUrl: '/placeholder.svg?height=400&width=400',
    },
    {
      name: 'Michael Chen',
      role: 'Lead Developer',
      bio: 'Michael brings 10+ years of development experience and a passion for clean, efficient code.',
      imageUrl: '/placeholder.svg?height=400&width=400',
    },
    {
      name: 'Emily Rodriguez',
      role: 'UX/UI Designer',
      bio: 'Emily creates beautiful, intuitive interfaces that delight users and drive engagement.',
      imageUrl: '/placeholder.svg?height=400&width=400',
    },
  ]

  for (const member of teamMembers) {
    try {
      const created = await prisma.teamMember.create({
        data: member,
      })
      console.log('Created team member:', created)
    } catch (error) {
      console.error('Error creating team member:', error)
    }
  }

  // Seed Admin User
  const adminEmail = 'admin@example.com'
  const adminPassword = 'admin123' // You may want to change this password

  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  try {
    const adminUser = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    })
    console.log('Created admin user:', adminUser)
  } catch (error) {
    console.error('Error creating admin user:', error)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
