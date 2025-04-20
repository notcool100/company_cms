"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

// Define form schemas
const generalSettingsSchema = z.object({
  site_title: z.string().min(1, "Site title is required"),
  site_description: z.string().min(1, "Site description is required"),
  contact_email: z.string().email("Invalid email address"),
  contact_phone: z.string().optional(),
  contact_address: z.string().optional(),
  footer_text: z.string().optional(),
})

const seoSettingsSchema = z.object({
  meta_title: z.string().min(1, "Meta title is required"),
  meta_description: z.string().min(1, "Meta description is required"),
  og_image: z.string().optional(),
  twitter_handle: z.string().optional(),
  google_analytics_id: z.string().optional(),
  index_site: z.boolean().default(true),
})

const appearanceSettingsSchema = z.object({
  primary_color: z.string().min(1, "Primary color is required"),
  secondary_color: z.string().optional(),
  font_family: z.string().min(1, "Font family is required"),
  logo_url: z.string().optional(),
  favicon_url: z.string().optional(),
  hero_title: z.string().optional(),
  hero_subtitle: z.string().optional(),
  hero_background: z.string().optional(),
})

const socialSettingsSchema = z.object({
  facebook_url: z.string().optional(),
  twitter_url: z.string().optional(),
  instagram_url: z.string().optional(),
  linkedin_url: z.string().optional(),
  youtube_url: z.string().optional(),
})

type GeneralSettingsValues = z.infer<typeof generalSettingsSchema>
type SeoSettingsValues = z.infer<typeof seoSettingsSchema>
type AppearanceSettingsValues = z.infer<typeof appearanceSettingsSchema>
type SocialSettingsValues = z.infer<typeof socialSettingsSchema>

export default function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // General settings form
  const generalForm = useForm<GeneralSettingsValues>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      site_title: "IT Company CMS",
      site_description: "Providing innovative IT solutions to businesses worldwide",
      contact_email: "info@example.com",
      contact_phone: "+1 (555) 123-4567",
      contact_address: "123 Tech Street, Silicon Valley, CA 94043",
      footer_text: "© 2023 IT Company CMS. All rights reserved.",
    },
  })

  // SEO settings form
  const seoForm = useForm<SeoSettingsValues>({
    resolver: zodResolver(seoSettingsSchema),
    defaultValues: {
      meta_title: "IT Company CMS - Innovative IT Solutions",
      meta_description: "Providing innovative IT solutions to businesses worldwide. Expert services in web development, cloud solutions, and digital transformation.",
      og_image: "/og-image.jpg",
      twitter_handle: "@itcompanycms",
      google_analytics_id: "UA-XXXXXXXXX-X",
      index_site: true,
    },
  })

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
      hero_subtitle: "Transforming ideas into powerful digital experiences with cutting-edge technology",
      hero_background: "/digital-waves.gif",
    },
  })

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
  })

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings")
        if (!res.ok) throw new Error("Failed to fetch settings")
        
        const data = await res.json()
        if (data.success) {
          // Group settings by category and update forms
          const settings = data.data.reduce((acc: any, setting: any) => {
            acc[setting.key] = setting.value
            return acc
          }, {})
          
          // Update general form
          generalForm.reset({
            site_title: settings.site_title || generalForm.getValues().site_title,
            site_description: settings.site_description || generalForm.getValues().site_description,
            contact_email: settings.contact_email || generalForm.getValues().contact_email,
            contact_phone: settings.contact_phone || generalForm.getValues().contact_phone,
            contact_address: settings.contact_address || generalForm.getValues().contact_address,
            footer_text: settings.footer_text || generalForm.getValues().footer_text,
          })
          
          // Update SEO form
          seoForm.reset({
            meta_title: settings.meta_title || seoForm.getValues().meta_title,
            meta_description: settings.meta_description || seoForm.getValues().meta_description,
            og_image: settings.og_image || seoForm.getValues().og_image,
            twitter_handle: settings.twitter_handle || seoForm.getValues().twitter_handle,
            google_analytics_id: settings.google_analytics_id || seoForm.getValues().google_analytics_id,
            index_site: settings.index_site === "false" ? false : true,
          })
          
          // Update appearance form
          appearanceForm.reset({
            primary_color: settings.primary_color || appearanceForm.getValues().primary_color,
            secondary_color: settings.secondary_color || appearanceForm.getValues().secondary_color,
            font_family: settings.font_family || appearanceForm.getValues().font_family,
            logo_url: settings.logo_url || appearanceForm.getValues().logo_url,
            favicon_url: settings.favicon_url || appearanceForm.getValues().favicon_url,
            hero_title: settings.hero_title || appearanceForm.getValues().hero_title,
            hero_subtitle: settings.hero_subtitle || appearanceForm.getValues().hero_subtitle,
            hero_background: settings.hero_background || appearanceForm.getValues().hero_background,
          })
          
          // Update social form
          socialForm.reset({
            facebook_url: settings.facebook_url || socialForm.getValues().facebook_url,
            twitter_url: settings.twitter_url || socialForm.getValues().twitter_url,
            instagram_url: settings.instagram_url || socialForm.getValues().instagram_url,
            linkedin_url: settings.linkedin_url || socialForm.getValues().linkedin_url,
            youtube_url: settings.youtube_url || socialForm.getValues().youtube_url,
          })
        }
      } catch (error) {
        console.error("Error fetching settings:", error)
        toast({
          title: "Error",
          description: "Failed to load settings. Using default values.",
          variant: "destructive",
        })
      }
    }

    fetchSettings()
  }, [generalForm, seoForm, appearanceForm, socialForm, toast])

  const saveSettings = async (category: string, data: any) => {
    setIsLoading(true)
    
    try {
      // Convert data object to array of settings
      const settingsArray = Object.entries(data).map(([key, value]) => ({
        key,
        value: typeof value === "boolean" ? value.toString() : value,
        category,
      }))
      
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ settings: settingsArray }),
      })
      
      if (!res.ok) throw new Error("Failed to save settings")
      
      const responseData = await res.json()
      if (responseData.success) {
        toast({
          title: "Success",
          description: "Settings saved successfully",
        })
      } else {
        throw new Error(responseData.message || "Failed to save settings")
      }
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onGeneralSubmit = (data: GeneralSettingsValues) => {
    saveSettings("general", data)
  }

  const onSeoSubmit = (data: SeoSettingsValues) => {
    saveSettings("seo", data)
  }

  const onAppearanceSubmit = (data: AppearanceSettingsValues) => {
    saveSettings("appearance", data)
  }

  const onSocialSubmit = (data: SocialSettingsValues) => {
    saveSettings("social", data)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your website's basic information</CardDescription>
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
                          The name of your website that appears in the browser tab
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
                        <FormDescription>
                          Your business address
                        </FormDescription>
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
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
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
              <CardDescription>Optimize your website for search engines</CardDescription>
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
                          A brief description that appears in search engine results
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
                          The image that appears when your site is shared on social media
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
                          <FormLabel className="text-base">Allow Search Engines to Index Site</FormLabel>
                          <FormDescription>
                            If disabled, search engines will be asked not to index your site
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
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
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
              <CardDescription>Customize the look and feel of your website</CardDescription>
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                            <SelectItem value="Montserrat">Montserrat</SelectItem>
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
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
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
              <CardDescription>Connect your website to your social media profiles</CardDescription>
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
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
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
  )
}