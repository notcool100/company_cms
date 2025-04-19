// This is a mock database for demonstration purposes
// In a real application, you would use a real database like PostgreSQL, MySQL, or MongoDB

interface Page {
  id: number
  title: string
  slug: string
  content: string
  status: "Published" | "Draft"
  createdAt: string
  updatedAt: string
}

interface Media {
  id: number
  name: string
  type: string
  url: string
  size: string
  dimensions?: string
  createdAt: string
}

interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  imageUrl: string
}

interface Service {
  id: number
  title: string
  description: string
  icon: string
}

// Mock data
const pages: Page[] = [
  {
    id: 1,
    title: "Home",
    slug: "/",
    content: "Welcome to our IT company website.",
    status: "Published",
    createdAt: "2023-04-01T12:00:00Z",
    updatedAt: "2023-04-12T15:30:00Z",
  },
  {
    id: 2,
    title: "About Us",
    slug: "/about",
    content: "Learn more about our company and team.",
    status: "Published",
    createdAt: "2023-04-02T10:15:00Z",
    updatedAt: "2023-04-10T09:45:00Z",
  },
  {
    id: 3,
    title: "Services",
    slug: "/services",
    content: "Explore our range of IT services.",
    status: "Published",
    createdAt: "2023-04-03T14:20:00Z",
    updatedAt: "2023-04-08T11:10:00Z",
  },
  {
    id: 4,
    title: "Contact",
    slug: "/contact",
    content: "Get in touch with our team.",
    status: "Draft",
    createdAt: "2023-04-04T09:30:00Z",
    updatedAt: "2023-04-05T16:40:00Z",
  },
  {
    id: 5,
    title: "Blog",
    slug: "/blog",
    content: "Read our latest articles and updates.",
    status: "Published",
    createdAt: "2023-04-01T08:00:00Z",
    updatedAt: "2023-04-01T08:00:00Z",
  },
]

const media: Media[] = [
  {
    id: 1,
    name: "hero-image.jpg",
    type: "image",
    url: "/placeholder.svg?height=200&width=300",
    size: "1.2 MB",
    dimensions: "1920x1080",
    createdAt: "2023-04-12T14:30:00Z",
  },
  {
    id: 2,
    name: "team-photo.jpg",
    type: "image",
    url: "/placeholder.svg?height=200&width=300",
    size: "0.8 MB",
    dimensions: "1200x800",
    createdAt: "2023-04-10T11:20:00Z",
  },
  {
    id: 3,
    name: "product-demo.mp4",
    type: "video",
    url: "/placeholder.svg?height=200&width=300",
    size: "8.5 MB",
    dimensions: "1920x1080",
    createdAt: "2023-04-08T09:15:00Z",
  },
  {
    id: 4,
    name: "company-logo.png",
    type: "image",
    url: "/placeholder.svg?height=200&width=300",
    size: "0.3 MB",
    dimensions: "512x512",
    createdAt: "2023-04-05T16:40:00Z",
  },
  {
    id: 5,
    name: "brochure.pdf",
    type: "document",
    url: "/placeholder.svg?height=200&width=300",
    size: "2.1 MB",
    createdAt: "2023-04-01T10:05:00Z",
  },
  {
    id: 6,
    name: "service-icon.svg",
    type: "image",
    url: "/placeholder.svg?height=200&width=300",
    size: "0.1 MB",
    dimensions: "64x64",
    createdAt: "2023-03-28T13:50:00Z",
  },
]

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "John Smith",
    role: "CEO",
    bio: "John has over 15 years of experience in the IT industry.",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "CTO",
    bio: "Sarah leads our technical team and oversees all development projects.",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Lead Developer",
    bio: "Michael specializes in full-stack development and cloud architecture.",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "UX Designer",
    bio: "Emily creates intuitive and engaging user experiences for our clients.",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "David Wilson",
    role: "Project Manager",
    bio: "David ensures our projects are delivered on time and within budget.",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Lisa Chen",
    role: "Marketing Director",
    bio: "Lisa develops our marketing strategies and manages client relationships.",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
]

const services: Service[] = [
  {
    id: 1,
    title: "Custom Software Development",
    description: "Tailored software solutions designed to address your specific business challenges and requirements.",
    icon: "Code",
  },
  {
    id: 2,
    title: "Web Application Development",
    description: "Responsive and scalable web applications built with the latest technologies and frameworks.",
    icon: "Globe",
  },
  {
    id: 3,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android devices.",
    icon: "Smartphone",
  },
  {
    id: 4,
    title: "Cloud Solutions",
    description: "Secure and scalable cloud infrastructure and migration services.",
    icon: "Cloud",
  },
  {
    id: 5,
    title: "IT Consulting",
    description: "Strategic technology consulting to help your business grow and innovate.",
    icon: "Lightbulb",
  },
  {
    id: 6,
    title: "Cybersecurity",
    description: "Comprehensive security solutions to protect your business from threats.",
    icon: "Shield",
  },
]

// Mock database functions
export const db = {
  // Pages
  getPages: () => pages,
  getPageById: (id: number) => pages.find((page) => page.id === id),
  getPageBySlug: (slug: string) => pages.find((page) => page.slug === slug),
  createPage: (page: Omit<Page, "id" | "createdAt" | "updatedAt">) => {
    const newPage = {
      ...page,
      id: pages.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    pages.push(newPage as Page)
    return newPage
  },
  updatePage: (id: number, data: Partial<Page>) => {
    const index = pages.findIndex((page) => page.id === id)
    if (index !== -1) {
      pages[index] = {
        ...pages[index],
        ...data,
        updatedAt: new Date().toISOString(),
      }
      return pages[index]
    }
    return null
  },
  deletePage: (id: number) => {
    const index = pages.findIndex((page) => page.id === id)
    if (index !== -1) {
      const deletedPage = pages[index]
      pages.splice(index, 1)
      return deletedPage
    }
    return null
  },

  // Media
  getMedia: () => media,
  getMediaById: (id: number) => media.find((item) => item.id === id),
  createMedia: (item: Omit<Media, "id" | "createdAt">) => {
    const newMedia = {
      ...item,
      id: media.length + 1,
      createdAt: new Date().toISOString(),
    }
    media.push(newMedia as Media)
    return newMedia
  },
  deleteMedia: (id: number) => {
    const index = media.findIndex((item) => item.id === id)
    if (index !== -1) {
      const deletedMedia = media[index]
      media.splice(index, 1)
      return deletedMedia
    }
    return null
  },

  // Team Members
  getTeamMembers: () => teamMembers,
  getTeamMemberById: (id: number) => teamMembers.find((member) => member.id === id),
  createTeamMember: (member: Omit<TeamMember, "id">) => {
    const newMember = {
      ...member,
      id: teamMembers.length + 1,
    }
    teamMembers.push(newMember as TeamMember)
    return newMember
  },
  updateTeamMember: (id: number, data: Partial<TeamMember>) => {
    const index = teamMembers.findIndex((member) => member.id === id)
    if (index !== -1) {
      teamMembers[index] = {
        ...teamMembers[index],
        ...data,
      }
      return teamMembers[index]
    }
    return null
  },
  deleteTeamMember: (id: number) => {
    const index = teamMembers.findIndex((member) => member.id === id)
    if (index !== -1) {
      const deletedMember = teamMembers[index]
      teamMembers.splice(index, 1)
      return deletedMember
    }
    return null
  },

  // Services
  getServices: () => services,
  getServiceById: (id: number) => services.find((service) => service.id === id),
  createService: (service: Omit<Service, "id">) => {
    const newService = {
      ...service,
      id: services.length + 1,
    }
    services.push(newService as Service)
    return newService
  },
  updateService: (id: number, data: Partial<Service>) => {
    const index = services.findIndex((service) => service.id === id)
    if (index !== -1) {
      services[index] = {
        ...services[index],
        ...data,
      }
      return services[index]
    }
    return null
  },
  deleteService: (id: number) => {
    const index = services.findIndex((service) => service.id === id)
    if (index !== -1) {
      const deletedService = services[index]
      services.splice(index, 1)
      return deletedService
    }
    return null
  },
}
