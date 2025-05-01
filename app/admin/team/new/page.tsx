"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import MediaSelector from "@/components/media-selector"

// Define form schema
const teamMemberFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  bio: z.string().min(1, "Bio is required"),
  imageUrl: z.string().min(1, "Image URL is required"),
})

type TeamMemberFormValues = z.infer<typeof teamMemberFormSchema>

export default function NewTeamMemberPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  // Initialize form with default values
  const form = useForm<TeamMemberFormValues>({
    resolver: zodResolver(teamMemberFormSchema),
    defaultValues: {
      name: "",
      role: "",
      bio: "",
      imageUrl: "",
    },
  })

  // Handle form submission
  const onSubmit = async (data: TeamMemberFormValues) => {
    setIsSubmitting(true)
    
    try {
      const res = await fetch("/api/team-members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Failed to create team member")
      }
      
      const responseData = await res.json()
      
      if (responseData.success) {
        toast({
          title: "Success",
          description: "Team member created successfully",
        })
        router.push("/admin/team")
      } else {
        throw new Error(responseData.message || "Failed to create team member")
      }
    } catch (error) {
      console.error("Error creating team member:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create team member",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle image URL change to update preview
  const handleImageUrlChange = (url: string) => {
    form.setValue("imageUrl", url)
    setPreviewImage(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/admin/team")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Add Team Member</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Member Details</CardTitle>
          <CardDescription>Add a new team member to your website</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Enter team member's name" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Enter team member's role" 
                          />
                        </FormControl>
                        <FormDescription>
                          E.g., CEO, Developer, Designer, etc.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team Member Image</FormLabel>
                        <FormControl>
                          <MediaSelector
                            {...field}
                            onChange={(url) => handleImageUrlChange(url)}
                            placeholder="Select or upload team member image"
                            description="Upload or select an image for this team member"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="relative aspect-square w-full max-w-[250px] overflow-hidden rounded-lg border bg-muted">
                    {previewImage ? (
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="h-full w-full object-cover"
                        onError={() => {
                          setPreviewImage("/placeholder.svg?height=250&width=250")
                          form.setValue("imageUrl", "/placeholder.svg?height=250&width=250")
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        <span>Image Preview</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Recommended size: 500x500 pixels
                  </p>
                </div>
              </div>
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Enter team member's bio" 
                        className="min-h-[150px]"
                      />
                    </FormControl>
                    <FormDescription>
                      A brief description of the team member's background and expertise
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => router.push("/admin/team")}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Add Team Member
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}