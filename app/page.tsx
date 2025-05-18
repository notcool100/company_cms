import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
	ArrowRight,
	CheckCircle,
	Code,
	Database,
	Globe,
	Layers,
	Mail,
	MessageSquare,
	Phone,
} from "lucide-react";
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
import SectionVisibilityWrapper from "@/components/section-visibility-wrapper";
import Footer from "@/components/Footer";
import { unstable_noStore as noStore } from "next/cache";

// Move interfaces before the fetch functions
export interface Service {
	id: number;
	title: string;
	description: string;
	icon: string;
}

export interface TeamMember {
	id: number;
	name: string;
	role: string;
	bio: string;
	imageUrl: string;
}

export interface About {
	id: number;
	title: string;
	description: string;
	imageUrl: string;
	features: string[];
	buttonText: string;
	buttonUrl: string;
}

export interface PortfolioItemType {
	id: number;
	title: string;
	category: string;
	description: string;
	imageUrl: string;
	projectUrl?: string;
	featured: boolean;
}

async function fetchServices() {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL || ""}/api/services`,
		{ cache: "no-store" },
	);
	if (!res.ok) {
		throw new Error("Failed to fetch services");
	}
	const response = await res.json();
	return response.success ? response.data : [];
}

async function fetchTeamMembers() {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL || ""}/api/team-members`,
		{ cache: "no-store" },
	);
	if (!res.ok) {
		throw new Error("Failed to fetch team members");
	}
	const response = await res.json();
	return response.success ? response.data : [];
}

async function fetchAbout() {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL || ""}/api/about`,
		{ cache: "no-store" },
	);
	if (!res.ok) {
		throw new Error("Failed to fetch about section");
	}
	const response = await res.json();
	return response.success ? response.data : null;
}

async function fetchPortfolioItems() {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL || ""}/api/portfolio?featured=true&limit=3`,
		{ cache: "no-store" },
	);
	if (!res.ok) {
		throw new Error("Failed to fetch portfolio items");
	}
	const response = await res.json();
	return response.success ? response.data : [];
}

export default async function Home() {
	// Disable caching for this page
	noStore();

	const services: Service[] = await fetchServices();
	const teamMembers: TeamMember[] = await fetchTeamMembers();
	const about: About = await fetchAbout();
	const portfolioItems: PortfolioItemType[] = await fetchPortfolioItems();

	return (
		<div className="min-h-screen flex flex-col">
			{/* Custom cursor effect */}
			<CursorEffect />

			{/* Floating navigation */}
			<FloatingNavigation />

			{/* Hero Section */}
			<SectionVisibilityWrapper sectionId="hero">
				<HeroSection />
			</SectionVisibilityWrapper>

			{/* Stats Section */}
			<SectionVisibilityWrapper sectionId="stats">
				<StatsSection />
			</SectionVisibilityWrapper>

			{/* Services Section */}
			<SectionVisibilityWrapper sectionId="services">
				<section className="py-20 bg-white" id="services">
					<div className="container px-4 md:px-6">
						<ScrollReveal>
							<div className="flex flex-col items-center text-center space-y-4 mb-12">
								<h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
									Our Services
								</h2>
								<p className="text-muted-foreground max-w-[700px]">
									We offer a comprehensive range of IT services to help your
									business thrive in the digital landscape
								</p>
							</div>
						</ScrollReveal>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{services.map((service: Service) => (
								<ServiceCard
									key={service.id}
									iconName={service.icon}
									title={service.title}
									description={service.description}
								/>
							))}
						</div>
					</div>
				</section>
			</SectionVisibilityWrapper>

			{/* 3D Objects Showcase */}
			<SectionVisibilityWrapper sectionId="tech-stack">
				<section className="py-20 bg-gray-50">
					<div className="container px-4 md:px-6">
						<ScrollReveal>
							<div className="flex flex-col items-center text-center space-y-4 mb-12">
								<h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
									Our Technology Stack
								</h2>
								<p className="text-muted-foreground max-w-[700px]">
									We leverage cutting-edge technologies to build powerful,
									scalable, and future-proof solutions
								</p>
							</div>
						</ScrollReveal>

						<Floating3DObjects />
					</div>
				</section>
			</SectionVisibilityWrapper>

			{/* About Section with Reflection */}
			<SectionVisibilityWrapper sectionId="about">
				<section className="py-20 bg-white" id="about">
					<div className="container px-4 md:px-6">
						<div className="grid md:grid-cols-2 gap-10 items-center">
							<ScrollReveal direction="left">
								<div className="relative">
									<div className="rounded-lg overflow-hidden">
										<Image
											src={about.imageUrl}
											alt={about.title}
											width={600}
											height={600}
											className="w-full h-auto object-cover rounded-lg"
										/>
									</div>
									<div className="absolute -bottom-10 left-0 right-0 mx-auto w-[90%] h-20 bg-gradient-to-b from-black/20 to-transparent blur-md transform rotate-180 rounded-lg" />
								</div>
							</ScrollReveal>
							<ScrollReveal direction="right">
								<div className="flex flex-col space-y-4">
									<h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
										{about.title}
									</h2>
									<p className="text-muted-foreground">{about.description}</p>
									<ul className="space-y-2">
										{about.features.map((feature) => (
											<li key={feature} className="flex items-center gap-2">
												<CheckCircle className="h-5 w-5 text-primary" />
												<span>{feature}</span>
											</li>
										))}
									</ul>
									<Button className="w-fit mt-4" asChild>
										<Link href={about.buttonUrl}>{about.buttonText}</Link>
									</Button>
								</div>
							</ScrollReveal>
						</div>
					</div>
				</section>
			</SectionVisibilityWrapper>

			{/* Timeline Section */}
			<SectionVisibilityWrapper sectionId="journey">
				<section className="py-20 bg-gray-50">
					<div className="container px-4 md:px-6">
						<ScrollReveal>
							<div className="flex flex-col items-center text-center space-y-4 mb-16">
								<h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
									Our Journey
								</h2>
								<p className="text-muted-foreground max-w-[700px]">
									From humble beginnings to industry leadership, explore the key
									milestones in our company's history
								</p>
							</div>
						</ScrollReveal>

						<Timeline />
					</div>
				</section>
			</SectionVisibilityWrapper>

			{/* Parallax CTA Section */}
			<SectionVisibilityWrapper sectionId="cta">
				<ParallaxSection
					title="Ready to Transform Your Digital Presence?"
					subtitle="Let's collaborate to create innovative solutions that drive your business forward."
					buttonText="Get Started Today"
					buttonLink="#contact"
				/>
			</SectionVisibilityWrapper>

			{/* Portfolio Section */}
			<SectionVisibilityWrapper sectionId="portfolio">
				<section className="py-20 bg-white" id="portfolio">
					<div className="container px-4 md:px-6">
						<ScrollReveal>
							<div className="flex flex-col items-center text-center space-y-4 mb-12">
								<h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
									Our Portfolio
								</h2>
								<p className="text-muted-foreground max-w-[700px]">
									Explore our recent projects and see how we've helped our
									clients achieve their goals
								</p>
							</div>
						</ScrollReveal>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{portfolioItems.map((item) => (
								<PortfolioItem
									key={item.id}
									image={item.imageUrl}
									title={item.title}
									category={item.category}
									description={item.description}
									projectUrl={item.projectUrl}
								/>
							))}
						</div>
						<div className="flex justify-center mt-10">
							<Button variant="outline" asChild>
								<Link href="/portfolio">View All Projects</Link>
							</Button>
						</div>
					</div>
				</section>
			</SectionVisibilityWrapper>

			{/* Testimonials Section */}
			<SectionVisibilityWrapper sectionId="testimonials">
				<section className="py-20 bg-gray-50">
					<div className="container px-4 md:px-6">
						<ScrollReveal>
							<div className="flex flex-col items-center text-center space-y-4 mb-12">
								<h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
									What Our Clients Say
								</h2>
								<p className="text-muted-foreground max-w-[700px]">
									Don't just take our word for it - hear from some of our
									satisfied clients
								</p>
							</div>
						</ScrollReveal>

						<TestimonialCarousel />
					</div>
				</section>
			</SectionVisibilityWrapper>

			{/* Team Section */}
			<SectionVisibilityWrapper sectionId="team">
				<section className="py-20 bg-white">
					<div className="container px-4 md:px-6">
						<ScrollReveal>
							<div className="flex flex-col items-center text-center space-y-4 mb-12">
								<h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
									Meet Our Team
								</h2>
								<p className="text-muted-foreground max-w-[700px]">
									Our talented professionals are the heart of our company and
									the driving force behind our success
								</p>
							</div>
						</ScrollReveal>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{teamMembers.map((member: TeamMember) => (
								<TeamMemberCard
									key={member.id}
									name={member.name}
									role={member.role}
									bio={member.bio}
									image={member.imageUrl}
									socialLinks={{}}
								/>
							))}
						</div>
					</div>
				</section>
			</SectionVisibilityWrapper>

			{/* Blog Section */}
			<SectionVisibilityWrapper sectionId="blog">
				<section className="py-20 bg-gray-50">
					<div className="container px-4 md:px-6">
						<ScrollReveal>
							<div className="flex flex-col items-center text-center space-y-4 mb-12">
								<h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
									Latest Insights
								</h2>
								<p className="text-muted-foreground max-w-[700px]">
									Stay updated with our latest articles, news, and industry
									insights
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
							/>
							<BlogCard
								title="Building Scalable Web Applications with Next.js"
								excerpt="Learn how to leverage Next.js to create high-performance, scalable web applications."
								image="/placeholder.svg?height=340&width=600"
								date="April 28, 2023"
								readTime="8 min read"
								category="Development"
								slug="scalable-nextjs-applications"
							/>
							<BlogCard
								title="UX Design Trends to Watch in 2023"
								excerpt="Discover the latest user experience design trends that are shaping the digital landscape."
								image="/placeholder.svg?height=340&width=600"
								date="April 10, 2023"
								readTime="6 min read"
								category="Design"
								slug="ux-design-trends-2023"
							/>
						</div>

						<div className="flex justify-center mt-10">
							<Button variant="outline" asChild>
								<Link href="/blog">View All Articles</Link>
							</Button>
						</div>
					</div>
				</section>
			</SectionVisibilityWrapper>

			{/* Contact Section */}
			<SectionVisibilityWrapper sectionId="contact">
				<section className="py-20 bg-white" id="contact">
					<div className="container px-4 md:px-6">
						<div className="grid md:grid-cols-2 gap-10">
							<ScrollReveal direction="left">
								<div className="flex flex-col space-y-4">
									<h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
										Get In Touch
									</h2>
									<p className="text-muted-foreground">
										Have a project in mind or want to learn more about our
										services? Contact us today and let's discuss how we can help
										you achieve your goals.
									</p>
									<div className="space-y-4 mt-6">
										<div className="flex items-center gap-3">
											<div className="bg-primary/10 p-3 rounded-full">
												<Mail className="h-6 w-6 text-primary" />
											</div>
											<div>
												<p className="font-medium">Email Us</p>
												<p className="text-muted-foreground">
													info@techcompany.com
												</p>
											</div>
										</div>
										<div className="flex items-center gap-3">
											<div className="bg-primary/10 p-3 rounded-full">
												<Phone className="h-6 w-6 text-primary" />
											</div>
											<div>
												<p className="font-medium">Call Us</p>
												<p className="text-muted-foreground">
													+1 (555) 123-4567
												</p>
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
			</SectionVisibilityWrapper>

			{/* Footer */}
			<Footer />
		</div>
	);
}
