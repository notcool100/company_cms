"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { 
  Plus, 
  Search,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import MediaGrid from "@/components/media-grid"
import MediaUploadForm from "@/components/media-upload-form"
import AdminLayout from "@/components/admin-layout"

export interface MediaItem {
  id: number
  name: string
  description: string | null
  type: string
  mimeType: string
  url: string
  size: number
  dimensions: string | null
  alt: string | null
  tags: string | null
  uploadedBy: number | null
  createdAt: string
  updatedAt: string
  user: {
    id: number
    name: string | null
    email: string
  } | null
}

export default function MediaPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  
  const [isLoading, setIsLoading] = useState(true)
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [filteredItems, setFilteredItems] = useState<MediaItem[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  
  // Fetch media items
  const fetchMedia = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/media")
      const data = await response.json()
      
      if (data.success) {
        setMediaItems(data.data)
        setFilteredItems(data.data)
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to fetch media",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch media",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  // Delete media item
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/media/${id}`, {
        method: "DELETE",
      })
      
      const data = await response.json()
      
      if (data.success) {
        toast({
          title: "Success",
          description: "Media deleted successfully",
        })
        
        // Update state
        setMediaItems(mediaItems.filter(item => item.id !== id))
        setFilteredItems(filteredItems.filter(item => item.id !== id))
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to delete media",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete media",
        variant: "destructive",
      })
    }
  }
  
  // Handle search and filtering
  useEffect(() => {
    if (searchQuery.trim() === "" && activeTab === "all") {
      setFilteredItems(mediaItems)
    } else {
      let filtered = mediaItems
      
      // Filter by type if not "all"
      if (activeTab !== "all") {
        filtered = filtered.filter(item => item.type === activeTab)
      }
      
      // Filter by search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase()
        filtered = filtered.filter(
          item =>
            item.name.toLowerCase().includes(query) ||
            (item.description && item.description.toLowerCase().includes(query)) ||
            (item.tags && item.tags.toLowerCase().includes(query))
        )
      }
      
      setFilteredItems(filtered)
    }
  }, [searchQuery, activeTab, mediaItems])
  
  // Initial fetch
  useEffect(() => {
    if (session) {
      fetchMedia()
    }
  }, [session])
  
  // Handle upload success
  const handleUploadSuccess = (newMedia: MediaItem) => {
    setMediaItems([newMedia, ...mediaItems])
    setShowUploadDialog(false)
    toast({
      title: "Success",
      description: "Media uploaded successfully",
    })
  }
  
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Media Library</h1>
            <p className="text-muted-foreground">
              Manage your images, videos, and other media files
            </p>
          </div>
          <Button onClick={() => setShowUploadDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Upload Media
          </Button>
        </div>
        
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search media..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="image">Images</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
              <TabsTrigger value="document">Documents</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {filteredItems.length === 0 ? (
          <div className="flex h-[50vh] flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center">
            <div className="rounded-full bg-muted p-3">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No media found</h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery || activeTab !== "all"
                ? "Try adjusting your search or filter to find what you're looking for."
                : "Upload media to get started."}
            </p>
            <Button 
              variant="outline" 
              className="mt-2"
              onClick={() => setShowUploadDialog(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Upload Media
            </Button>
          </div>
        ) : (
          <MediaGrid items={filteredItems} onDelete={handleDelete} />
        )}
      </div>
      
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Media</DialogTitle>
          </DialogHeader>
          <MediaUploadForm 
            onSuccess={handleUploadSuccess} 
            onCancel={() => setShowUploadDialog(false)} 
          />
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}