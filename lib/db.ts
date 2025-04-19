import { PrismaClient, Status } from '@prisma/client';

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
  createPage: async (page: Omit<any, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await prisma.page.create({
      data: {
        ...page,
        status: page.status as Status,
      },
    });
  },
  updatePage: async (id: number, data: Partial<any>) => {
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
    return await prisma.media.findMany();
  },
  getMediaById: async (id: number) => {
    return await prisma.media.findUnique({
      where: { id },
    });
  },
  createMedia: async (item: Omit<any, 'id' | 'createdAt'>) => {
    return await prisma.media.create({
      data: item,
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
  createTeamMember: async (member: Omit<any, 'id'>) => {
    return await prisma.teamMember.create({
      data: member,
    });
  },
  updateTeamMember: async (id: number, data: Partial<any>) => {
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
  createService: async (service: Omit<any, 'id'>) => {
    return await prisma.service.create({
      data: service,
    });
  },
  updateService: async (id: number, data: Partial<any>) => {
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
};
