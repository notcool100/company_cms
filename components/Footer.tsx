import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

interface FooterLink {
	label: string;
	url: string;
}

interface FooterSection {
	title: string;
	links: FooterLink[];
}

interface FooterProps {
	companyName: string;
	description: string;
	sections: FooterSection[];
	socialLinks: FooterLink[];
	copyrightText: string;
}

async function getFooterData() {
	// Disable caching for this component
	noStore();

	const settings = await prisma.setting.findMany({
		where: {
			category: "footer",
		},
	});

	console.log("Raw settings from database:", settings);

	const settingsMap = settings.reduce<Record<string, string>>(
		(acc, setting) => {
			acc[setting.key] = setting.value;
			return acc;
		},
		{},
	);

	console.log("Settings map:", settingsMap);

	// Only use default values if the settings don't exist in the database
	const companyName = settingsMap.footer_company_name;
	const description = settingsMap.footer_description;
	const servicesLinks = settingsMap.footer_services_links;
	const companyLinks = settingsMap.footer_company_links;
	const socialLinks = settingsMap.footer_social_links;
	const copyrightText = settingsMap.footer_copyright_text;

	const footerData = {
		companyName: companyName || "Tech Company",
		description:
			description ||
			"Providing innovative IT solutions to businesses worldwide since 2010.",
		sections: [
			{
				title: "Services",
				links: servicesLinks ? JSON.parse(servicesLinks) : [],
			},
			{
				title: "Company",
				links: companyLinks ? JSON.parse(companyLinks) : [],
			},
		],
		socialLinks: socialLinks ? JSON.parse(socialLinks) : [],
		copyrightText: copyrightText || "© 2024 Tech Company. All rights reserved.",
	};

	console.log("Final footer data:", footerData);
	return footerData;
}

export default async function Footer() {
	const footerData = await getFooterData();

	return (
		<footer className="bg-gray-900 text-white py-12">
			<div className="container px-4 md:px-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Company Info */}
					<div>
						<h3 className="text-xl font-bold mb-4">{footerData.companyName}</h3>
						<p className="text-gray-400">{footerData.description}</p>
					</div>

					{/* Dynamic Sections */}
					{footerData.sections.map((section) => (
						<div key={section.title}>
							<h3 className="text-xl font-bold mb-4">{section.title}</h3>
							<ul className="space-y-2 text-gray-400">
								{section.links.map((link: { url: string; label: string }) => (
									<li key={link.url}>
										<Link
											href={link.url}
											className="hover:text-white transition-colors"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}

					{/* Social Links */}
					<div>
						<h3 className="text-xl font-bold mb-4">Connect</h3>
						<ul className="space-y-2 text-gray-400">
							{footerData.socialLinks.map(
								(link: { url: string; label: string }) => (
									<li key={link.url}>
										<Link
											href={link.url}
											className="hover:text-white transition-colors"
										>
											{link.label}
										</Link>
									</li>
								),
							)}
						</ul>
					</div>
				</div>

				{/* Copyright */}
				<div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
					<p>{footerData.copyrightText}</p>
				</div>
			</div>
		</footer>
	);
}
