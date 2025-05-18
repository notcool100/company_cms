import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	console.log("Checking footer settings...");

	// Get all footer settings
	const footerSettings = await prisma.setting.findMany({
		where: {
			category: "footer",
		},
	});

	console.log("Current footer settings:", footerSettings);

	if (footerSettings.length === 0) {
		console.log("No footer settings found. Creating default settings...");

		const defaultSettings = [
			{
				key: "footer_company_name",
				value: "Tech Company",
				category: "footer",
			},
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

		// Create settings
		for (const setting of defaultSettings) {
			await prisma.setting.create({
				data: setting,
			});
		}

		console.log("Default footer settings created successfully!");
	} else {
		console.log("Footer settings already exist.");
	}
}

main()
	.catch((e) => {
		console.error("Error:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
