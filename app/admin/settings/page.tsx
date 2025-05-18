"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

// Define form schemas
const generalSettingsSchema = z.object({
	site_title: z.string().min(1, "Site title is required"),
	site_description: z.string().min(1, "Site description is required"),
	contact_email: z.string().email("Invalid email address"),
	contact_phone: z.string().optional(),
	contact_address: z.string().optional(),
	footer_text: z.string().optional(),
});

const seoSettingsSchema = z.object({
	meta_title: z.string().min(1, "Meta title is required"),
	meta_description: z.string().min(1, "Meta description is required"),
	og_image: z.string().optional(),
	twitter_handle: z.string().optional(),
	google_analytics_id: z.string().optional(),
	index_site: z.boolean().default(true),
});

const appearanceSettingsSchema = z.object({
	primary_color: z.string().min(1, "Primary color is required"),
	secondary_color: z.string().optional(),
	font_family: z.string().min(1, "Font family is required"),
	logo_url: z.string().optional(),
	favicon_url: z.string().optional(),
	hero_title: z.string().optional(),
	hero_subtitle: z.string().optional(),
	hero_background: z.string().optional(),
});

const socialSettingsSchema = z.object({
	facebook_url: z.string().optional(),
	twitter_url: z.string().optional(),
	instagram_url: z.string().optional(),
	linkedin_url: z.string().optional(),
	youtube_url: z.string().optional(),
});

const visibilitySettingsSchema = z.object({
	show_hero_section: z.boolean().default(true),
	show_stats_section: z.boolean().default(true),
	show_services_section: z.boolean().default(true),
	show_tech_stack_section: z.boolean().default(true),
	show_about_section: z.boolean().default(true),
	show_journey_section: z.boolean().default(true),
	show_portfolio_section: z.boolean().default(true),
	show_testimonials_section: z.boolean().default(true),
	show_team_section: z.boolean().default(true),
	show_blog_section: z.boolean().default(true),
	show_contact_section: z.boolean().default(true),
	show_cta_section: z.boolean().default(true),
});

const footerSettingsSchema = z.object({
	footer_company_name: z.string().min(1, "Company name is required"),
	footer_description: z.string().min(1, "Description is required"),
	footer_services_links: z.string().min(1, "Services links are required"),
	footer_company_links: z.string().min(1, "Company links are required"),
	footer_social_links: z.string().min(1, "Social links are required"),
	footer_copyright_text: z.string().min(1, "Copyright text is required"),
});

type GeneralSettingsValues = z.infer<typeof generalSettingsSchema>;
type SeoSettingsValues = z.infer<typeof seoSettingsSchema>;
type AppearanceSettingsValues = z.infer<typeof appearanceSettingsSchema>;
type SocialSettingsValues = z.infer<typeof socialSettingsSchema>;
type VisibilitySettingsValues = z.infer<typeof visibilitySettingsSchema>;
type FooterSettingsValues = z.infer<typeof footerSettingsSchema>;

export default function SettingsPage() {
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);

	// General settings form
	const generalForm = useForm<GeneralSettingsValues>({
		resolver: zodResolver(generalSettingsSchema),
		defaultValues: {
			site_title: "IT Company CMS",
			site_description:
				"Providing innovative IT solutions to businesses worldwide",
			contact_email: "info@example.com",
			contact_phone: "+1 (555) 123-4567",
			contact_address: "123 Tech Street, Silicon Valley, CA 94043",
			footer_text: "© 2023 IT Company CMS. All rights reserved.",
		},
	});

	// SEO settings form
	const seoForm = useForm<SeoSettingsValues>({
		resolver: zodResolver(seoSettingsSchema),
		defaultValues: {
			meta_title: "IT Company CMS - Innovative IT Solutions",
			meta_description:
				"Providing innovative IT solutions to businesses worldwide. Expert services in web development, cloud solutions, and digital transformation.",
			og_image: "/og-image.jpg",
			twitter_handle: "@itcompanycms",
			google_analytics_id: "UA-XXXXXXXXX-X",
			index_site: true,
		},
	});

	// Appearance settings form
	const appearanceForm = useForm<AppearanceSettingsValues>({
		resolver: zodResolver(appearanceSettingsSchema),
		defaultValues: {
			primary_color: "#0ea5e9",
			secondary_color: "#6366f1",
			font_family: "Inter",
			logo_url: "/logo.svg",
			favicon_url: "/favicon.ico",
			hero_title: "Innovative IT Solutions",
			hero_subtitle:
				"Transforming ideas into powerful digital experiences with cutting-edge technology",
			hero_background: "/digital-waves.gif",
		},
	});

	// Social settings form
	const socialForm = useForm<SocialSettingsValues>({
		resolver: zodResolver(socialSettingsSchema),
		defaultValues: {
			facebook_url: "https://facebook.com/itcompanycms",
			twitter_url: "https://twitter.com/itcompanycms",
			instagram_url: "https://instagram.com/itcompanycms",
			linkedin_url: "https://linkedin.com/company/itcompanycms",
			youtube_url: "https://youtube.com/c/itcompanycms",
		},
	});

	// Visibility settings form
	const visibilityForm = useForm<VisibilitySettingsValues>({
		resolver: zodResolver(visibilitySettingsSchema),
		defaultValues: {
			show_hero_section: true,
			show_stats_section: true,
			show_services_section: true,
			show_tech_stack_section: true,
			show_about_section: true,
			show_journey_section: true,
			show_portfolio_section: true,
			show_testimonials_section: true,
			show_team_section: true,
			show_blog_section: true,
			show_contact_section: true,
			show_cta_section: true,
		},
	});

	// Footer settings form
	const footerForm = useForm<FooterSettingsValues>({
		resolver: zodResolver(footerSettingsSchema),
		defaultValues: {
			footer_company_name: "Tech Company",
			footer_description:
				"Providing innovative IT solutions to businesses worldwide since 2010.",
			footer_services_links: JSON.stringify(
				[
					{ label: "Web Development", url: "#" },
					{ label: "UI/UX Design", url: "#" },
					{ label: "Cloud Solutions", url: "#" },
					{ label: "Digital Marketing", url: "#" },
				],
				null,
				2,
			),
			footer_company_links: JSON.stringify(
				[
					{ label: "About Us", url: "#" },
					{ label: "Our Team", url: "#" },
					{ label: "Careers", url: "#" },
					{ label: "Contact", url: "#" },
				],
				null,
				2,
			),
			footer_social_links: JSON.stringify(
				[
					{ label: "LinkedIn", url: "#" },
					{ label: "Twitter", url: "#" },
					{ label: "GitHub", url: "#" },
					{ label: "Instagram", url: "#" },
				],
				null,
				2,
			),
			footer_copyright_text: "© 2024 Tech Company. All rights reserved.",
		},
	});

	useEffect(() => {
		const fetchSettings = async () => {
			try {
				// Fetch general settings
				const settingsRes = await fetch("/api/settings");
				if (!settingsRes.ok) throw new Error("Failed to fetch settings");
				const settingsData = await settingsRes.json();

				if (settingsData.success) {
					const settings = settingsData.data.reduce(
						(
							acc: Record<string, string>,
							setting: { key: string; value: string },
						) => {
							acc[setting.key] = setting.value;
							return acc;
						},
						{},
					);

					// Update general form
					generalForm.reset({
						site_title: settings.site_title || "IT Company CMS",
						site_description:
							settings.site_description ||
							"Providing innovative IT solutions to businesses worldwide",
						contact_email: settings.contact_email || "info@example.com",
						contact_phone: settings.contact_phone || "+1 (555) 123-4567",
						contact_address:
							settings.contact_address ||
							"123 Tech Street, Silicon Valley, CA 94043",
						footer_text:
							settings.footer_text ||
							"© 2023 IT Company CMS. All rights reserved.",
					});

					// Update SEO form
					seoForm.reset({
						meta_title:
							settings.meta_title || "IT Company CMS - Innovative IT Solutions",
						meta_description:
							settings.meta_description ||
							"Providing innovative IT solutions to businesses worldwide. Expert services in web development, cloud solutions, and digital transformation.",
						og_image: settings.og_image || "/og-image.jpg",
						twitter_handle: settings.twitter_handle || "@itcompanycms",
						google_analytics_id:
							settings.google_analytics_id || "UA-XXXXXXXXX-X",
						index_site: settings.index_site !== "false",
					});

					// Update appearance form
					appearanceForm.reset({
						primary_color: settings.primary_color || "#0ea5e9",
						secondary_color: settings.secondary_color || "#6366f1",
						font_family: settings.font_family || "Inter",
						logo_url: settings.logo_url || "/logo.svg",
						favicon_url: settings.favicon_url || "/favicon.ico",
						hero_title: settings.hero_title || "Innovative IT Solutions",
						hero_subtitle:
							settings.hero_subtitle ||
							"Transforming ideas into powerful digital experiences with cutting-edge technology",
						hero_background: settings.hero_background || "/digital-waves.gif",
					});

					// Update social form
					socialForm.reset({
						facebook_url:
							settings.facebook_url || "https://facebook.com/itcompanycms",
						twitter_url:
							settings.twitter_url || "https://twitter.com/itcompanycms",
						instagram_url:
							settings.instagram_url || "https://instagram.com/itcompanycms",
						linkedin_url:
							settings.linkedin_url ||
							"https://linkedin.com/company/itcompanycms",
						youtube_url:
							settings.youtube_url || "https://youtube.com/c/itcompanycms",
					});

					// Update footer form
					footerForm.reset({
						footer_company_name: settings.footer_company_name || "Tech Company",
						footer_description:
							settings.footer_description ||
							"Providing innovative IT solutions to businesses worldwide since 2010.",
						footer_services_links:
							settings.footer_services_links ||
							JSON.stringify(
								[
									{ label: "Web Development", url: "#" },
									{ label: "UI/UX Design", url: "#" },
									{ label: "Cloud Solutions", url: "#" },
									{ label: "Digital Marketing", url: "#" },
								],
								null,
								2,
							),
						footer_company_links:
							settings.footer_company_links ||
							JSON.stringify(
								[
									{ label: "About Us", url: "#" },
									{ label: "Our Team", url: "#" },
									{ label: "Careers", url: "#" },
									{ label: "Contact", url: "#" },
								],
								null,
								2,
							),
						footer_social_links:
							settings.footer_social_links ||
							JSON.stringify(
								[
									{ label: "LinkedIn", url: "#" },
									{ label: "Twitter", url: "#" },
									{ label: "GitHub", url: "#" },
									{ label: "Instagram", url: "#" },
								],
								null,
								2,
							),
						footer_copyright_text:
							settings.footer_copyright_text ||
							"© 2024 Tech Company. All rights reserved.",
					});
				}

				// Fetch section visibility settings
				const visibilityRes = await fetch("/api/section-visibility");
				if (!visibilityRes.ok)
					throw new Error("Failed to fetch section visibility");
				const visibilityData = await visibilityRes.json();

				if (visibilityData.success) {
					const sections = visibilityData.data.reduce(
						(
							acc: Record<string, boolean>,
							section: { sectionId: string; isVisible: boolean },
						) => {
							acc[`show_${section.sectionId}_section`] = section.isVisible;
							return acc;
						},
						{},
					);

					// Update visibility form with defaults for any missing sections
					visibilityForm.reset({
						show_hero_section: sections.show_hero_section ?? true,
						show_stats_section: sections.show_stats_section ?? true,
						show_services_section: sections.show_services_section ?? true,
						show_tech_stack_section: sections.show_tech_stack_section ?? true,
						show_about_section: sections.show_about_section ?? true,
						show_journey_section: sections.show_journey_section ?? true,
						show_portfolio_section: sections.show_portfolio_section ?? true,
						show_testimonials_section:
							sections.show_testimonials_section ?? true,
						show_team_section: sections.show_team_section ?? true,
						show_blog_section: sections.show_blog_section ?? true,
						show_contact_section: sections.show_contact_section ?? true,
						show_cta_section: sections.show_cta_section ?? true,
					});
				}
			} catch (error: unknown) {
				console.error("Error fetching settings:", error);
				toast({
					title: "Error",
					description: "Failed to load settings. Using default values.",
					variant: "destructive",
				});
			}
		};

		fetchSettings();
	}, [
		generalForm,
		seoForm,
		appearanceForm,
		socialForm,
		visibilityForm,
		footerForm,
		toast,
	]);

	const saveSettings = async (
		category: string,
		data: Record<string, string | boolean>,
	) => {
		setIsLoading(true);

		try {
			// Convert data object to array of settings
			const settingsArray = Object.entries(data).map(([key, value]) => ({
				key,
				value: typeof value === "boolean" ? value.toString() : value,
				category,
			}));

			const res = await fetch("/api/settings", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ settings: settingsArray }),
			});

			if (!res.ok) throw new Error("Failed to save settings");

			const responseData = await res.json();
			if (responseData.success) {
				toast({
					title: "Success",
					description: "Settings saved successfully",
				});
			} else {
				throw new Error(responseData.message || "Failed to save settings");
			}
		} catch (error) {
			console.error("Error saving settings:", error);
			toast({
				title: "Error",
				description: "Failed to save settings. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const onGeneralSubmit = (data: GeneralSettingsValues) => {
		saveSettings("general", data);
	};

	const onSeoSubmit = (data: SeoSettingsValues) => {
		saveSettings("seo", data);
	};

	const onAppearanceSubmit = (data: AppearanceSettingsValues) => {
		saveSettings("appearance", data);
	};

	const onSocialSubmit = (data: SocialSettingsValues) => {
		saveSettings("social", data);
	};

	const onVisibilitySubmit = (data: VisibilitySettingsValues) => {
		setIsLoading(true);

		// Convert form data to section visibility updates
		const sectionUpdates = Object.entries(data).map(([key, value]) => {
			const sectionId = key.replace("show_", "").replace("_section", "");
			return {
				sectionId,
				name: sectionId
					.split("_")
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" "),
				isVisible: value,
				description: getSectionDescription(sectionId),
			};
		});

		// Update each section's visibility
		Promise.all(
			sectionUpdates.map((section) =>
				fetch("/api/section-visibility", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(section),
					credentials: "include",
				}).then(async (res) => {
					if (!res.ok) {
						const errorData = await res.json();
						throw new Error(
							`Failed to update ${section.name} visibility: ${
								errorData.error || res.statusText
							}`,
						);
					}
					return res.json();
				}),
			),
		)
			.then(() => {
				toast({
					title: "Success",
					description: "Section visibility settings saved successfully",
				});
			})
			.catch((error: unknown) => {
				console.error("Error saving section visibility:", error);
				toast({
					title: "Error",
					description:
						error instanceof Error
							? error.message
							: "Failed to save section visibility settings. Please try again.",
					variant: "destructive",
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const onFooterSubmit = (data: FooterSettingsValues) => {
		saveSettings("footer", data);
	};

	// Helper function to get section descriptions
	const getSectionDescription = (sectionId: string): string => {
		const descriptions: Record<string, string> = {
			hero: "The main banner at the top of your homepage",
			stats: "Key metrics and statistics about your business",
			services: "The services your company offers",
			tech_stack: "Technologies and tools your company uses",
			about: "Information about your company",
			journey: "Timeline of your company's history",
			portfolio: "Showcase of your projects and work",
			testimonials: "Client reviews and feedback",
			team: "Information about your team members",
			blog: "Latest articles and news",
			contact: "Contact form and information",
			cta: "Call-to-action parallax section",
		};
		return descriptions[sectionId] || "";
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold tracking-tight">Settings</h1>
			</div>

			<Tabs defaultValue="general" className="space-y-4">
				<TabsList className="grid w-full grid-cols-6">
					<TabsTrigger value="general">General</TabsTrigger>
					<TabsTrigger value="seo">SEO</TabsTrigger>
					<TabsTrigger value="appearance">Appearance</TabsTrigger>
					<TabsTrigger value="social">Social</TabsTrigger>
					<TabsTrigger value="footer">Footer</TabsTrigger>
					<TabsTrigger value="visibility">Visibility</TabsTrigger>
				</TabsList>

				{/* General Settings */}
				<TabsContent value="general">
					<Card>
						<CardHeader>
							<CardTitle>General Settings</CardTitle>
							<CardDescription>
								Manage your website's basic information
							</CardDescription>
						</CardHeader>
						<Form {...generalForm}>
							<form onSubmit={generalForm.handleSubmit(onGeneralSubmit)}>
								<CardContent className="space-y-4">
									<FormField
										control={generalForm.control}
										name="site_title"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Site Title</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													The name of your website that appears in the browser
													tab
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={generalForm.control}
										name="site_description"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Site Description</FormLabel>
												<FormControl>
													<Textarea {...field} />
												</FormControl>
												<FormDescription>
													A brief description of your website
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={generalForm.control}
										name="contact_email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Contact Email</FormLabel>
												<FormControl>
													<Input {...field} type="email" />
												</FormControl>
												<FormDescription>
													The primary email address for contact inquiries
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={generalForm.control}
										name="contact_phone"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Contact Phone</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													The primary phone number for contact inquiries
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={generalForm.control}
										name="contact_address"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Contact Address</FormLabel>
												<FormControl>
													<Textarea {...field} />
												</FormControl>
												<FormDescription>Your business address</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={generalForm.control}
										name="footer_text"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Footer Text</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													Text that appears in the footer of your website
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
								<CardFooter>
									<Button type="submit" disabled={isLoading}>
										{isLoading ? (
											<>
												<span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent" />
												Saving...
											</>
										) : (
											<>
												<Save className="mr-2 h-4 w-4" />
												Save Changes
											</>
										)}
									</Button>
								</CardFooter>
							</form>
						</Form>
					</Card>
				</TabsContent>

				{/* SEO Settings */}
				<TabsContent value="seo">
					<Card>
						<CardHeader>
							<CardTitle>SEO Settings</CardTitle>
							<CardDescription>
								Optimize your website for search engines
							</CardDescription>
						</CardHeader>
						<Form {...seoForm}>
							<form onSubmit={seoForm.handleSubmit(onSeoSubmit)}>
								<CardContent className="space-y-4">
									<FormField
										control={seoForm.control}
										name="meta_title"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Meta Title</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													The title that appears in search engine results
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={seoForm.control}
										name="meta_description"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Meta Description</FormLabel>
												<FormControl>
													<Textarea {...field} />
												</FormControl>
												<FormDescription>
													A brief description that appears in search engine
													results
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={seoForm.control}
										name="og_image"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Open Graph Image URL</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													The image that appears when your site is shared on
													social media
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={seoForm.control}
										name="twitter_handle"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Twitter Handle</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													Your Twitter username (e.g., @example)
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={seoForm.control}
										name="google_analytics_id"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Google Analytics ID</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													Your Google Analytics tracking ID
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={seoForm.control}
										name="index_site"
										render={({ field }) => (
											<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
												<div className="space-y-0.5">
													<FormLabel className="text-base">
														Allow Search Engines to Index Site
													</FormLabel>
													<FormDescription>
														If disabled, search engines will be asked not to
														index your site
													</FormDescription>
												</div>
												<FormControl>
													<Switch
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</CardContent>
								<CardFooter>
									<Button type="submit" disabled={isLoading}>
										{isLoading ? (
											<>
												<span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent" />
												Saving...
											</>
										) : (
											<>
												<Save className="mr-2 h-4 w-4" />
												Save Changes
											</>
										)}
									</Button>
								</CardFooter>
							</form>
						</Form>
					</Card>
				</TabsContent>

				{/* Appearance Settings */}
				<TabsContent value="appearance">
					<Card>
						<CardHeader>
							<CardTitle>Appearance Settings</CardTitle>
							<CardDescription>
								Customize the look and feel of your website
							</CardDescription>
						</CardHeader>
						<Form {...appearanceForm}>
							<form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)}>
								<CardContent className="space-y-4">
									<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
										<FormField
											control={appearanceForm.control}
											name="primary_color"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Primary Color</FormLabel>
													<div className="flex items-center gap-2">
														<div
															className="h-8 w-8 rounded-full border"
															style={{ backgroundColor: field.value }}
														></div>
														<FormControl>
															<Input {...field} type="text" />
														</FormControl>
													</div>
													<FormDescription>
														The main color used throughout your site
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={appearanceForm.control}
											name="secondary_color"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Secondary Color</FormLabel>
													<div className="flex items-center gap-2">
														<div
															className="h-8 w-8 rounded-full border"
															style={{ backgroundColor: field.value }}
														></div>
														<FormControl>
															<Input {...field} type="text" />
														</FormControl>
													</div>
													<FormDescription>
														The secondary color used for accents
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<FormField
										control={appearanceForm.control}
										name="font_family"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Font Family</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select a font" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="Inter">Inter</SelectItem>
														<SelectItem value="Roboto">Roboto</SelectItem>
														<SelectItem value="Open Sans">Open Sans</SelectItem>
														<SelectItem value="Lato">Lato</SelectItem>
														<SelectItem value="Montserrat">
															Montserrat
														</SelectItem>
														<SelectItem value="Poppins">Poppins</SelectItem>
													</SelectContent>
												</Select>
												<FormDescription>
													The primary font used throughout your site
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={appearanceForm.control}
										name="logo_url"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Logo URL</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													The URL to your site logo image
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={appearanceForm.control}
										name="favicon_url"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Favicon URL</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													The URL to your site favicon
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={appearanceForm.control}
										name="hero_title"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Hero Title</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													The main heading on your homepage
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={appearanceForm.control}
										name="hero_subtitle"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Hero Subtitle</FormLabel>
												<FormControl>
													<Textarea {...field} />
												</FormControl>
												<FormDescription>
													The subheading on your homepage
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={appearanceForm.control}
										name="hero_background"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Hero Background URL</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													The URL to the background image for your hero section
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
								<CardFooter>
									<Button type="submit" disabled={isLoading}>
										{isLoading ? (
											<>
												<span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent" />
												Saving...
											</>
										) : (
											<>
												<Save className="mr-2 h-4 w-4" />
												Save Changes
											</>
										)}
									</Button>
								</CardFooter>
							</form>
						</Form>
					</Card>
				</TabsContent>

				{/* Social Media Settings */}
				<TabsContent value="social">
					<Card>
						<CardHeader>
							<CardTitle>Social Media Settings</CardTitle>
							<CardDescription>
								Connect your website to your social media profiles
							</CardDescription>
						</CardHeader>
						<Form {...socialForm}>
							<form onSubmit={socialForm.handleSubmit(onSocialSubmit)}>
								<CardContent className="space-y-4">
									<FormField
										control={socialForm.control}
										name="facebook_url"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Facebook URL</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													Your Facebook page URL
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={socialForm.control}
										name="twitter_url"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Twitter URL</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													Your Twitter profile URL
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={socialForm.control}
										name="instagram_url"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Instagram URL</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													Your Instagram profile URL
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={socialForm.control}
										name="linkedin_url"
										render={({ field }) => (
											<FormItem>
												<FormLabel>LinkedIn URL</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													Your LinkedIn profile or company page URL
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={socialForm.control}
										name="youtube_url"
										render={({ field }) => (
											<FormItem>
												<FormLabel>YouTube URL</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													Your YouTube channel URL
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
								<CardFooter>
									<Button type="submit" disabled={isLoading}>
										{isLoading ? (
											<>
												<span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent" />
												Saving...
											</>
										) : (
											<>
												<Save className="mr-2 h-4 w-4" />
												Save Changes
											</>
										)}
									</Button>
								</CardFooter>
							</form>
						</Form>
					</Card>
				</TabsContent>

				{/* Footer Settings */}
				<TabsContent value="footer">
					<Card>
						<Form {...footerForm}>
							<form onSubmit={footerForm.handleSubmit(onFooterSubmit)}>
								<CardHeader>
									<CardTitle>Footer Settings</CardTitle>
									<CardDescription>
										Customize your website's footer content and links.
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-6">
									<FormField
										control={footerForm.control}
										name="footer_company_name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Company Name</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													The name that appears in the footer
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={footerForm.control}
										name="footer_description"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Company Description</FormLabel>
												<FormControl>
													<Textarea {...field} />
												</FormControl>
												<FormDescription>
													A brief description of your company
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={footerForm.control}
										name="footer_services_links"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Services Links</FormLabel>
												<FormControl>
													<Textarea {...field} rows={8} />
												</FormControl>
												<FormDescription>
													JSON array of service links. Format: [{"{"} "label":
													"Service Name", "url": "/service-url" {"}"}]
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={footerForm.control}
										name="footer_company_links"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Company Links</FormLabel>
												<FormControl>
													<Textarea {...field} rows={8} />
												</FormControl>
												<FormDescription>
													JSON array of company links. Format: [{"{"} "label":
													"Link Name", "url": "/page-url" {"}"}]
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={footerForm.control}
										name="footer_social_links"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Social Links</FormLabel>
												<FormControl>
													<Textarea {...field} rows={8} />
												</FormControl>
												<FormDescription>
													JSON array of social media links. Format: [{"{"}{" "}
													"label": "Platform", "url": "https://..." {"}"}]
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={footerForm.control}
										name="footer_copyright_text"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Copyright Text</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													Copyright notice text that appears at the bottom of
													the footer
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
								<CardFooter>
									<Button type="submit" disabled={isLoading}>
										{isLoading ? (
											<>
												<span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent" />
												Saving...
											</>
										) : (
											<>
												<Save className="mr-2 h-4 w-4" />
												Save Changes
											</>
										)}
									</Button>
								</CardFooter>
							</form>
						</Form>
					</Card>
				</TabsContent>

				{/* Section Visibility Settings */}
				<TabsContent value="visibility">
					<Card>
						<CardHeader>
							<CardTitle>Section Visibility Settings</CardTitle>
							<CardDescription>
								Control which sections are visible on your website
							</CardDescription>
						</CardHeader>
						<Form {...visibilityForm}>
							<form onSubmit={visibilityForm.handleSubmit(onVisibilitySubmit)}>
								<CardContent className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<FormField
											control={visibilityForm.control}
											name="show_hero_section"
											render={({ field }) => (
												<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
													<div className="space-y-0.5">
														<FormLabel className="text-base">
															Hero Section
														</FormLabel>
														<FormDescription>
															The main banner at the top of your homepage
														</FormDescription>
													</div>
													<FormControl>
														<Switch
															checked={field.value}
															onCheckedChange={field.onChange}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
										<FormField
											control={visibilityForm.control}
											name="show_stats_section"
											render={({ field }) => (
												<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
													<div className="space-y-0.5">
														<FormLabel className="text-base">
															Stats Section
														</FormLabel>
														<FormDescription>
															Key metrics and statistics about your business
														</FormDescription>
													</div>
													<FormControl>
														<Switch
															checked={field.value}
															onCheckedChange={field.onChange}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
										<FormField
											control={visibilityForm.control}
											name="show_services_section"
											render={({ field }) => (
												<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
													<div className="space-y-0.5">
														<FormLabel className="text-base">
															Services Section
														</FormLabel>
														<FormDescription>
															The services your company offers
														</FormDescription>
													</div>
													<FormControl>
														<Switch
															checked={field.value}
															onCheckedChange={field.onChange}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
										<FormField
											control={visibilityForm.control}
											name="show_tech_stack_section"
											render={({ field }) => (
												<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
													<div className="space-y-0.5">
														<FormLabel className="text-base">
															Tech Stack Section
														</FormLabel>
														<FormDescription>
															Technologies and tools your company uses
														</FormDescription>
													</div>
													<FormControl>
														<Switch
															checked={field.value}
															onCheckedChange={field.onChange}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
										<FormField
											control={visibilityForm.control}
											name="show_about_section"
											render={({ field }) => (
												<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
													<div className="space-y-0.5">
														<FormLabel className="text-base">
															About Section
														</FormLabel>
														<FormDescription>
															Information about your company
														</FormDescription>
													</div>
													<FormControl>
														<Switch
															checked={field.value}
															onCheckedChange={field.onChange}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
										<FormField
											control={visibilityForm.control}
											name="show_journey_section"
											render={({ field }) => (
												<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
													<div className="space-y-0.5">
														<FormLabel className="text-base">
															Journey Section
														</FormLabel>
														<FormDescription>
															Timeline of your company's history
														</FormDescription>
													</div>
													<FormControl>
														<Switch
															checked={field.value}
															onCheckedChange={field.onChange}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
										<FormField
											control={visibilityForm.control}
											name="show_portfolio_section"
											render={({ field }) => (
												<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
													<div className="space-y-0.5">
														<FormLabel className="text-base">
															Portfolio Section
														</FormLabel>
														<FormDescription>
															Showcase of your projects and work
														</FormDescription>
													</div>
													<FormControl>
														<Switch
															checked={field.value}
															onCheckedChange={field.onChange}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
										<FormField
											control={visibilityForm.control}
											name="show_testimonials_section"
											render={({ field }) => (
												<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
													<div className="space-y-0.5">
														<FormLabel className="text-base">
															Testimonials Section
														</FormLabel>
														<FormDescription>
															Client reviews and feedback
														</FormDescription>
													</div>
													<FormControl>
														<Switch
															checked={field.value}
															onCheckedChange={field.onChange}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
										<FormField
											control={visibilityForm.control}
											name="show_team_section"
											render={({ field }) => (
												<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
													<div className="space-y-0.5">
														<FormLabel className="text-base">
															Team Section
														</FormLabel>
														<FormDescription>
															Information about your team members
														</FormDescription>
													</div>
													<FormControl>
														<Switch
															checked={field.value}
															onCheckedChange={field.onChange}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
										<FormField
											control={visibilityForm.control}
											name="show_blog_section"
											render={({ field }) => (
												<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
													<div className="space-y-0.5">
														<FormLabel className="text-base">
															Blog Section
														</FormLabel>
														<FormDescription>
															Latest articles and news
														</FormDescription>
													</div>
													<FormControl>
														<Switch
															checked={field.value}
															onCheckedChange={field.onChange}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
										<FormField
											control={visibilityForm.control}
											name="show_contact_section"
											render={({ field }) => (
												<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
													<div className="space-y-0.5">
														<FormLabel className="text-base">
															Contact Section
														</FormLabel>
														<FormDescription>
															Contact form and information
														</FormDescription>
													</div>
													<FormControl>
														<Switch
															checked={field.value}
															onCheckedChange={field.onChange}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
										<FormField
											control={visibilityForm.control}
											name="show_cta_section"
											render={({ field }) => (
												<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
													<div className="space-y-0.5">
														<FormLabel className="text-base">
															CTA Section
														</FormLabel>
														<FormDescription>
															Call-to-action parallax section
														</FormDescription>
													</div>
													<FormControl>
														<Switch
															checked={field.value}
															onCheckedChange={field.onChange}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>
								</CardContent>
								<CardFooter>
									<Button type="submit" disabled={isLoading}>
										{isLoading ? (
											<>
												<span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent" />
												Saving...
											</>
										) : (
											<>
												<Save className="mr-2 h-4 w-4" />
												Save Changes
											</>
										)}
									</Button>
								</CardFooter>
							</form>
						</Form>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
