import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Code, Database, Globe, Layers, Mail, MessageSquare, Phone } from "lucide-react";
import { Button } from "../components/ui/button";
import HeroSection from "../components/hero-section";
import WaterEffect from "../components/water-effect";
import ServiceCard from "../components/service-card";
import PortfolioItem from "../components/portfolio-item";
import ContactForm from "../components/contact-form";
import ParticleBackground from "../components/particle-background";
import AnimatedText from "../components/animated-text";
import ScrollReveal from "../components/scroll-reveal";
import CursorEffect from "../components/cursor-effect";
import FloatingNavigation from "../components/floating-navigation";
import TestimonialCarousel from "../components/testimonial-carousel";
import StatsSection from "../components/stats-section";
import Timeline from "../components/timeline";
import TeamMemberCard from "../components/team-member-card";
import ParallaxSection from "../components/parallax-section";
import BlogCard from "../components/blog-card";
import Floating3DObjects from "../components/floating-3d-objects";

async function fetchServices() {
  const res = await fetch('http://localhost:3003/api/services', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch services');
  }
  return res.json();
}

async function fetchTeamMembers() {
  const res = await fetch('http://localhost:3003/api/team-members', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch team members');
  }
  return res.json();
}

export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export default async function Home() {
  const services: Service[] = await fetchServices();
  const teamMembers: TeamMember[] = await fetchTeamMembers();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Custom cursor effect */}
      <CursorEffect />

      {/* Floating navigation */}
      <FloatingNavigation />
      <HeroSection />

      {/* Hero Section with Water Effect and Particles */}
    

      {/* Stats Section */}
      <StatsSection />

      {/* Services Section */}
      <section className="py-20 bg-white" id="services">
        <div className="container px-4 md:px-6">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Our Services</h2>
              <p className="text-muted-foreground max-w-[700px]">
                We offer a comprehensive range of IT services to help your business thrive in the digital landscape
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: Service, index: number) => (
              <ServiceCard
                key={service.id}
                icon={<Code className="h-10 w-10" />}
                title={service.title}
                description={service.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3D Objects Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Our Technology Stack</h2>
              <p className="text-muted-foreground max-w-[700px]">
                We leverage cutting-edge technologies to build powerful, scalable, and future-proof solutions
              </p>
            </div>
          </ScrollReveal>

          <Floating3DObjects />
        </div>
      </section>

      {/* About Section with Reflection */}
      <section className="py-20 bg-white" id="about">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="IT Team"
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
                <div className="absolute -bottom-10 left-0 right-0 mx-auto w-[90%] h-20 bg-gradient-to-b from-black/20 to-transparent blur-md transform rotate-180 rounded-lg"></div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="flex flex-col space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">About Our Company</h2>
                <p className="text-muted-foreground">
                  Founded in 2010, our IT company has been at the forefront of technological innovation, helping
                  businesses of all sizes transform their digital presence and operations.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Over 10 years of industry experience</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Team of 50+ skilled professionals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Successfully delivered 200+ projects</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Partnerships with leading technology providers</span>
                  </li>
                </ul>
                <Button className="w-fit mt-4">Learn More About Us</Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Our Journey</h2>
              <p className="text-muted-foreground max-w-[700px]">
                From humble beginnings to industry leadership, explore the key milestones in our company's history
              </p>
            </div>
          </ScrollReveal>

          <Timeline />
        </div>
      </section>

      {/* Parallax CTA Section */}
      <ParallaxSection
        title="Ready to Transform Your Digital Presence?"
        subtitle="Let's collaborate to create innovative solutions that drive your business forward."
        buttonText="Get Started Today"
        buttonLink="#contact"
      />

      {/* Portfolio Section */}
      <section className="py-20 bg-white" id="portfolio">
        <div className="container px-4 md:px-6">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Our Portfolio</h2>
              <p className="text-muted-foreground max-w-[700px]">
                Explore our recent projects and see how we've helped our clients achieve their goals
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PortfolioItem
              image="/placeholder.svg?height=400&width=600"
              title="E-commerce Platform"
              category="Web Development"
              description="A fully responsive e-commerce platform with integrated payment gateway and inventory management."
              index={0}
            />
            <PortfolioItem
              image="/placeholder.svg?height=400&width=600"
              title="Financial Dashboard"
              category="UI/UX Design"
              description="An intuitive financial dashboard for a leading fintech company, providing real-time data visualization."
              index={1}
            />
            <PortfolioItem
              image="/placeholder.svg?height=400&width=600"
              title="Healthcare App"
              category="Mobile Development"
              description="A mobile application for a healthcare provider, enabling patients to book appointments and access medical records."
              index={2}
            />
          </div>
          <div className="flex justify-center mt-10">
            <Button variant="outline">View All Projects</Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">What Our Clients Say</h2>
              <p className="text-muted-foreground max-w-[700px]">
                Don't just take our word for it - hear from some of our satisfied clients
              </p>
            </div>
          </ScrollReveal>

          <TestimonialCarousel />
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-[700px]">
                Our talented professionals are the heart of our company and the driving force behind our success
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member: TeamMember, index: number) => (
              <TeamMemberCard
                key={member.id}
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.imageUrl}
                socialLinks={{}}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Latest Insights</h2>
              <p className="text-muted-foreground max-w-[700px]">
                Stay updated with our latest articles, news, and industry insights
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BlogCard
              title="The Future of AI in Business Applications"
              excerpt="Explore how artificial intelligence is transforming business operations and creating new opportunities."
              image="/placeholder.svg?height=340&width=600"
              date="May 15, 2023"
              readTime="5 min read"
              category="Technology"
              slug="ai-business-applications"
              index={0}
            />
            <BlogCard
              title="Building Scalable Web Applications with Next.js"
              excerpt="Learn how to leverage Next.js to create high-performance, scalable web applications."
              image="/placeholder.svg?height=340&width=600"
              date="April 28, 2023"
              readTime="8 min read"
              category="Development"
              slug="scalable-nextjs-applications"
              index={1}
            />
            <BlogCard
              title="UX Design Trends to Watch in 2023"
              excerpt="Discover the latest user experience design trends that are shaping the digital landscape."
              image="/placeholder.svg?height=340&width=600"
              date="April 10, 2023"
              readTime="6 min read"
              category="Design"
              slug="ux-design-trends-2023"
              index={2}
            />
          </div>

          <div className="flex justify-center mt-10">
            <Button variant="outline">View All Articles</Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white" id="contact">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10">
            <ScrollReveal direction="left">
              <div className="flex flex-col space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Get In Touch</h2>
                <p className="text-muted-foreground">
                  Have a project in mind or want to learn more about our services? Contact us today and let's discuss
                  how we can help you achieve your goals.
                </p>
                <div className="space-y-4 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p className="text-muted-foreground">info@techcompany.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Tech Company</h3>
              <p className="text-gray-400">Providing innovative IT solutions to businesses worldwide since 2010.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    UI/UX Design
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Cloud Solutions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Digital Marketing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 Tech Company. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
