"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Loader2,
  Search,
  AlertCircle
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { AlertTriangle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

// Define the service schema
const serviceSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  icon: z.string().min(1, { message: "Icon is required" }),
})

type Service = z.infer<typeof serviceSchema> & {
  id: number
  createdAt?: string
  updatedAt?: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  
  // Create form
  const createForm = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      description: "",
      icon: "",
    },
  })
  
  // Edit form
  const editForm = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      description: "",
      icon: "",
    },
  })
  
  // Fetch services
  const fetchServices = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch("/api/services")
      const data = await response.json()
      
      if (data.success) {
        setServices(data.data)
      } else {
        setError(data.error || "Failed to fetch services")
      }
    } catch (error) {
      setError("An error occurred while fetching services")
    } finally {
      setIsLoading(false)
    }
  }
  
  // Create service
  const createService = async (data: z.infer<typeof serviceSchema>) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      
      const responseData = await response.json()
      
      if (responseData.success) {
        toast({
          title: "Service created",
          description: "The service has been created successfully.",
        })
        setShowCreateDialog(false)
        createForm.reset()
        fetchServices()
      } else {
        toast({
          title: "Error",
          description: responseData.error || "Failed to create service",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while creating the service",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Update service
  const updateService = async (data: z.infer<typeof serviceSchema>) => {
    if (!selectedService) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`/api/services/${selectedService.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      
      const responseData = await response.json()
      
      if (responseData.success) {
        toast({
          title: "Service updated",
          description: "The service has been updated successfully.",
        })
        setShowEditDialog(false)
        editForm.reset()
        fetchServices()
      } else {
        toast({
          title: "Error",
          description: responseData.error || "Failed to update service",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating the service",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Delete service
  const deleteService = async () => {
    if (!selectedService) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`/api/services/${selectedService.id}`, {
        method: "DELETE",
      })
      
      const data = await response.json()
      
      if (data.success) {
        toast({
          title: "Service deleted",
          description: "The service has been deleted successfully.",
        })
        setShowDeleteDialog(false)
        fetchServices()
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to delete service",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while deleting the service",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Handle edit button click
  const handleEditClick = (service: Service) => {
    setSelectedService(service)
    editForm.reset({
      title: service.title,
      description: service.description,
      icon: service.icon,
    })
    setShowEditDialog(true)
  }
  
  // Handle delete button click
  const handleDeleteClick = (service: Service) => {
    setSelectedService(service)
    setShowDeleteDialog(true)
  }
  
  // Load services on component mount
  useEffect(() => {
    fetchServices()
  }, [])
  
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Services</h1>
            <p className="mt-1 text-gray-500">
              Manage the services displayed on your website
            </p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)} className="shadow-sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </div>
        
        {error && (
          <Alert variant="destructive" className="animate-fade-in-up">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {isLoading ? (
          <div className="flex h-[300px] items-center justify-center">
            <div className="loader"></div>
          </div>
        ) : services.length === 0 ? (
          <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-gray-200 p-8 text-center bg-white shadow-sm">
            <div className="rounded-full bg-gray-100 p-4">
              <AlertCircle className="h-6 w-6 text-gray-500" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No services found</h3>
            <p className="mt-2 text-sm text-gray-500">
              You haven't created any services yet. Add one to get started.
            </p>
            <Button onClick={() => setShowCreateDialog(true)} className="mt-6 shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.id} className="overflow-hidden border-0 shadow-md bg-white">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full bg-blue-50 p-2.5 text-blue-600 shadow-sm">
                        {/* Render icon based on service.icon */}
                        <span className="text-xl">{service.icon}</span>
                      </div>
                      <CardTitle className="text-gray-900">{service.title}</CardTitle>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(service)}
                        className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-red-50 hover:text-red-600 transition-colors"
                        onClick={() => handleDeleteClick(service)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-5 bg-white">
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* Create Service Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="bg-white">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-gray-900">Add Service</DialogTitle>
            <DialogDescription className="text-gray-600">
              Add a new service to display on your website.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...createForm}>
            <form onSubmit={createForm.handleSubmit(createService)} className="space-y-5 py-4">
              <FormField
                control={createForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Web Development" {...field} className="shadow-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={createForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="We create responsive websites that help your business grow..." 
                        {...field} 
                        className="shadow-sm min-h-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={createForm.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <Input placeholder="🌐" {...field} className="shadow-sm" />
                    </FormControl>
                    <FormDescription>
                      Enter an emoji or icon code to represent this service.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreateDialog(false)
                    createForm.reset()
                  }}
                  className="shadow-sm"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="shadow-sm">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Service"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Service Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Update the details of this service.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(updateService)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter an emoji or icon code to represent this service.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowEditDialog(false)
                    editForm.reset()
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Service Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Service</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this service? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedService && (
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <h4 className="font-medium">{selectedService.title}</h4>
                <p className="text-sm text-muted-foreground">{selectedService.description}</p>
              </div>
              
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={deleteService}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Service"
                  )}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}