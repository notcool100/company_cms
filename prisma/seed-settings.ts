import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// Delete existing settings to avoid duplicates
	await prisma.setting.deleteMany({});

	// General settings
	const generalSettings = [
		{ key: "site_title", value: "IT Company CMS", category: "general" },
		{
			key: "site_description",
			value: "A modern IT company website built with Next.js",
			category: "general",
		},
		{ key: "contact_email", value: "info@itcompany.com", category: "general" },
		{ key: "contact_phone", value: "+1 (555) 123-4567", category: "general" },
		{
			key: "contact_address",
			value: "123 Tech Street, Silicon Valley, CA 94043",
			category: "general",
		},
	];

	// Hero section settings
	const heroSettings = [
		{ key: "hero_title", value: "Innovative IT Solutions", category: "hero" },
		{
			key: "hero_subtitle",
			value:
				"Transforming ideas into powerful digital experiences with cutting-edge technology",
			category: "hero",
		},
		{ key: "hero_cta_text", value: "Our Services", category: "hero" },
		{ key: "hero_cta_link", value: "#services", category: "hero" },
	];

	// Social media settings
	const socialSettings = [
		{
			key: "social_facebook",
			value: "https://facebook.com/itcompany",
			category: "social",
		},
		{
			key: "social_twitter",
			value: "https://twitter.com/itcompany",
			category: "social",
		},
		{
			key: "social_linkedin",
			value: "https://linkedin.com/company/itcompany",
			category: "social",
		},
		{
			key: "social_instagram",
			value: "https://instagram.com/itcompany",
			category: "social",
		},
	];

	// Footer settings
	const footerSettings = [
		{ key: "footer_company_name", value: "Tech Company", category: "footer" },
		{
			key: "footer_description",
			value:
				"Providing innovative IT solutions to businesses worldwide since 2010.",
			category: "footer",
		},
		{
			key: "footer_services_links",
			value: JSON.stringify([
				{ label: "Web Development", url: "#" },
				{ label: "UI/UX Design", url: "#" },
				{ label: "Cloud Solutions", url: "#" },
				{ label: "Digital Marketing", url: "#" },
			]),
			category: "footer",
		},
		{
			key: "footer_company_links",
			value: JSON.stringify([
				{ label: "About Us", url: "#" },
				{ label: "Our Team", url: "#" },
				{ label: "Careers", url: "#" },
				{ label: "Contact", url: "#" },
			]),
			category: "footer",
		},
		{
			key: "footer_social_links",
			value: JSON.stringify([
				{ label: "LinkedIn", url: "#" },
				{ label: "Twitter", url: "#" },
				{ label: "GitHub", url: "#" },
				{ label: "Instagram", url: "#" },
			]),
			category: "footer",
		},
		{
			key: "footer_copyright_text",
			value: "© 2024 Tech Company. All rights reserved.",
			category: "footer",
		},
	];

	// Combine all settings
	const allSettings = [
		...generalSettings,
		...heroSettings,
		...socialSettings,
		...footerSettings,
	];

	// Create settings
	for (const setting of allSettings) {
		await prisma.setting.create({
			data: setting,
		});
	}

	console.log("Settings seeded successfully!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
