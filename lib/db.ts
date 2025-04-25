import { PrismaClient, Status, Page, Media, TeamMember, Service, User, Setting, About, Portfolio } from '@prisma/client';

const prisma = new PrismaClient();

export const db = {
  // Pages
  getPages: async () => {
    return await prisma.page.findMany();
  },
  getPageById: async (id: number) => {
    return await prisma.page.findUnique({
      where: { id },
    });
  },
  getPageBySlug: async (slug: string) => {
    return await prisma.page.findUnique({
      where: { slug },
    });
  },
  createPage: async (page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await prisma.page.create({
      data: {
        ...page,
        status: page.status as Status,
      },
    });
  },
  updatePage: async (id: number, data: Partial<Page>) => {
    return await prisma.page.update({
      where: { id },
      data: {
        ...data,
        status: data.status as Status | undefined,
      },
    });
  },
  deletePage: async (id: number) => {
    return await prisma.page.delete({
      where: { id },
    });
  },

  // Media
  getMedia: async () => {
    return await prisma.media.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },
  getMediaById: async (id: number) => {
    return await prisma.media.findUnique({
      where: { id },
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
  },
  getMediaByType: async (type: string) => {
    return await prisma.media.findMany({
      where: { type },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },
  searchMedia: async (query: string) => {
    return await prisma.media.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { tags: { contains: query, mode: 'insensitive' } },
        ],
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
      orderBy: {
        createdAt: 'desc',
      },
    });
  },
  createMedia: async (item: Omit<Media, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await prisma.media.create({
      data: item,
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
  },
  updateMedia: async (id: number, data: Partial<Omit<Media, 'id' | 'createdAt' | 'updatedAt'>>) => {
    return await prisma.media.update({
      where: { id },
      data,
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
  },
  deleteMedia: async (id: number) => {
    return await prisma.media.delete({
      where: { id },
    });
  },

  // Team Members
  getTeamMembers: async () => {
    return await prisma.teamMember.findMany();
  },
  getTeamMemberById: async (id: number) => {
    return await prisma.teamMember.findUnique({
      where: { id },
    });
  },
  createTeamMember: async (member: Omit<TeamMember, 'id'>) => {
    return await prisma.teamMember.create({
      data: member,
    });
  },
  updateTeamMember: async (id: number, data: Partial<TeamMember>) => {
    return await prisma.teamMember.update({
      where: { id },
      data,
    });
  },
  deleteTeamMember: async (id: number) => {
    return await prisma.teamMember.delete({
      where: { id },
    });
  },

  // Services
  getServices: async () => {
    return await prisma.service.findMany();
  },
  getServiceById: async (id: number) => {
    return await prisma.service.findUnique({
      where: { id },
    });
  },
  createService: async (service: Omit<Service, 'id'>) => {
    return await prisma.service.create({
      data: service,
    });
  },
  updateService: async (id: number, data: Partial<Service>) => {
    return await prisma.service.update({
      where: { id },
      data,
    });
  },
  deleteService: async (id: number) => {
    return await prisma.service.delete({
      where: { id },
    });
  },
  
  // Settings
  getSettings: async () => {
    return await prisma.setting.findMany();
  },
  getSettingsByCategory: async (category: string) => {
    return await prisma.setting.findMany({
      where: { category },
    });
  },
  getSetting: async (key: string) => {
    const setting = await prisma.setting.findUnique({
      where: { key },
    });
    return setting;
  },
  createSetting: async (setting: Omit<Setting, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await prisma.setting.create({
      data: setting,
    });
  },
  updateSetting: async (key: string, value: string) => {
    return await prisma.setting.update({
      where: { key },
      data: { value },
    });
  },
  upsertSetting: async (key: string, value: string, category: string = 'general') => {
    return await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value, category },
    });
  },
  deleteSetting: async (key: string) => {
    return await prisma.setting.delete({
      where: { key },
    });
  },

  // About
  getAbout: async () => {
    // Get the first about record or create a default one if none exists
    const about = await prisma.about.findFirst();
    
    if (!about) {
      return await prisma.about.create({
        data: {
          title: "About Our Company",
          description: "Founded in 2010, our IT company has been at the forefront of technological innovation, helping businesses of all sizes transform their digital presence and operations.",
          imageUrl: "/placeholder.svg?height=600&width=600",
          features: [
            "Over 10 years of industry experience",
            "Team of 50+ skilled professionals",
            "Successfully delivered 200+ projects",
            "Partnerships with leading technology providers"
          ],
          buttonText: "Learn More",
          buttonUrl: "/about"
        }
      });
    }
    
    return about;
  },
  updateAbout: async (data: Partial<Omit<About, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const about = await prisma.about.findFirst();
    
    if (about) {
      return await prisma.about.update({
        where: { id: about.id },
        data
      });
    } else {
      return await prisma.about.create({
        data: {
          title: data.title || "About Our Company",
          description: data.description || "Founded in 2010, our IT company has been at the forefront of technological innovation.",
          imageUrl: data.imageUrl || "/placeholder.svg?height=600&width=600",
          features: data.features || [],
          buttonText: data.buttonText || "Learn More",
          buttonUrl: data.buttonUrl || "/about"
        }
      });
    }
  },

  // Portfolio
  getPortfolioItems: async () => {
    return await prisma.portfolio.findMany({
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' }
      ]
    });
  },
  getFeaturedPortfolioItems: async (limit: number = 3) => {
    return await prisma.portfolio.findMany({
      where: { featured: true },
      orderBy: { createdAt: 'desc' },
      take: limit
    });
  },
  getPortfolioItemById: async (id: number) => {
    return await prisma.portfolio.findUnique({
      where: { id }
    });
  },
  createPortfolioItem: async (item: Omit<Portfolio, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await prisma.portfolio.create({
      data: item
    });
  },
  updatePortfolioItem: async (id: number, data: Partial<Omit<Portfolio, 'id' | 'createdAt' | 'updatedAt'>>) => {
    return await prisma.portfolio.update({
      where: { id },
      data
    });
  },
  deletePortfolioItem: async (id: number) => {
    return await prisma.portfolio.delete({
      where: { id }
    });
  },
};
