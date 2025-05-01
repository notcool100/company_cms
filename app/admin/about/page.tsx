"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { 
  Save, 
  Loader2,
  Plus,
  X,
  AlertTriangle,
  ImageIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import AdminLayout from "@/components/admin-layout"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import MediaSelector from "@/components/media-selector"

// Define the about schema
const aboutSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  imageUrl: z.string().min(1, { message: "Image URL is required" }),
  features: z.array(z.string()).min(1, { message: "At least one feature is required" }),
  buttonText: z.string().min(1, { message: "Button text is required" }),
  buttonUrl: z.string().min(1, { message: "Button URL is required" }),
})

type About = z.infer<typeof aboutSchema> & {
  id: number
  createdAt?: string
  updatedAt?: string
}

export default function AboutPage() {
  const [about, setAbout] = useState<About | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [features, setFeatures] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState("")
  const router = useRouter()
  const { toast } = useToast()
  
  // Form
  const form = useForm<z.infer<typeof aboutSchema>>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      features: [],
      buttonText: "Learn More",
      buttonUrl: "/about",
    },
  })
  
  // Fetch about data
  const fetchAbout = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch("/api/about")
      const data = await response.json()
      
      if (data.success) {
        setAbout(data.data)
        setFeatures(data.data.features || [])
        
        // Set form values
        form.reset({
          title: data.data.title,
          description: data.data.description,
          imageUrl: data.data.imageUrl,
          features: data.data.features,
          buttonText: data.data.buttonText,
          buttonUrl: data.data.buttonUrl,
        })
      } else {
        setError(data.error || "Failed to fetch about data")
      }
    } catch (error) {
      setError("An error occurred while fetching about data")
    } finally {
      setIsLoading(false)
    }
  }
  
  // Update about data
  const updateAbout = async (data: z.infer<typeof aboutSchema>) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/about", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          features: features,
        }),
      })
      
      const responseData = await response.json()
      
      if (responseData.success) {
        toast({
          title: "About section updated",
          description: "The about section has been updated successfully.",
        })
        setAbout(responseData.data)
      } else {
        toast({
          title: "Error",
          description: responseData.error || "Failed to update about section",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating the about section",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Add feature
  const addFeature = () => {
    if (newFeature.trim() === "") return
    
    setFeatures([...features, newFeature.trim()])
    setNewFeature("")
  }
  
  // Remove feature
  const removeFeature = (index: number) => {
    const updatedFeatures = [...features]
    updatedFeatures.splice(index, 1)
    setFeatures(updatedFeatures)
  }
  
  // Handle form submission
  const onSubmit = (data: z.infer<typeof aboutSchema>) => {
    // Include the current features in the data
    updateAbout({
      ...data,
      features: features,
    })
  }
  
  // Load about data on component mount
  useEffect(() => {
    fetchAbout()
  }, [])
  
  // Update form when features change
  useEffect(() => {
    form.setValue("features", features)
  }, [features, form])
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">About Section</h1>
          <p className="text-muted-foreground">
            Manage the about section displayed on your website
          </p>
        </div>
        
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {isLoading ? (
          <div className="flex h-[200px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">About Section Preview</CardTitle>
                <CardDescription>
                  This is how the about section will appear on your website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {about?.imageUrl ? (
                  <div className="relative aspect-video overflow-hidden rounded-lg border">
                    <Image
                      src={about.imageUrl}
                      alt={about.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center rounded-lg border bg-muted">
                    <ImageIcon className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}
                
                <div>
                  <h3 className="text-xl font-bold text-foreground">{about?.title}</h3>
                  <p className="mt-2 text-muted-foreground">{about?.description}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Features:</h4>
                  <ul className="ml-6 list-disc space-y-1">
                    {about?.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <Button size="sm" variant="outline">
                    {about?.buttonText}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Edit About Section</CardTitle>
                <CardDescription>
                  Update the content of your about section
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="About Our Company" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Founded in 2010, our IT company has been at the forefront of technological innovation..." 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>About Section Image</FormLabel>
                          <FormControl>
                            <MediaSelector
                              {...field}
                              placeholder="Select or upload about section image"
                              description="Upload or select an image for the about section"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div>
                      <FormLabel>Features</FormLabel>
                      <div className="mt-2 space-y-2">
                        {features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input value={feature} readOnly />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFeature(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        
                        <div className="flex items-center gap-2">
                          <Input
                            placeholder="Add a new feature..."
                            value={newFeature}
                            onChange={(e) => setNewFeature(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault()
                                addFeature()
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={addFeature}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {form.formState.errors.features && (
                          <p className="text-sm font-medium text-destructive">
                            {form.formState.errors.features.message}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="buttonText"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Button Text</FormLabel>
                            <FormControl>
                              <Input placeholder="Learn More" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="buttonUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Button URL</FormLabel>
                            <FormControl>
                              <Input placeholder="/about" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}