"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Upload, Image, File, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import MediaUploadForm from "@/components/media-upload-form"
import { MediaItem } from "@/app/admin/media/page"

interface MediaSelectorProps {
  value: string
  onChange: (url: string) => void
  onBlur?: () => void
  id?: string
  name?: string
  placeholder?: string
  label?: string
  description?: string
  error?: string
}

export default function MediaSelector({
  value,
  onChange,
  onBlur,
  id,
  name,
  placeholder = "Enter image URL or select from media library",
  label,
  description,
  error,
}: MediaSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("browse")
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredItems, setFilteredItems] = useState<MediaItem[]>([])
  const [selectedMediaType, setSelectedMediaType] = useState<string>("all")
  const { toast } = useToast()

  // Fetch media items when the dialog is opened
  useEffect(() => {
    if (isOpen && activeTab === "browse") {
      fetchMedia()
    }
  }, [isOpen, activeTab])

  // Filter media items based on search query and selected type
  useEffect(() => {
    if (mediaItems.length > 0) {
      let filtered = mediaItems
      
      // Filter by type if not "all"
      if (selectedMediaType !== "all") {
        filtered = filtered.filter(item => item.type === selectedMediaType)
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
  }, [searchQuery, selectedMediaType, mediaItems])

  // Fetch media items from the API
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

  // Handle media item selection
  const handleSelectMedia = (url: string) => {
    onChange(url)
    setIsOpen(false)
  }

  // Handle upload success
  const handleUploadSuccess = (newMedia: MediaItem) => {
    setMediaItems([newMedia, ...mediaItems])
    handleSelectMedia(newMedia.url)
    setActiveTab("browse")
    toast({
      title: "Success",
      description: "Media uploaded successfully",
    })
  }

  // Clear the selected media
  const handleClearMedia = () => {
    onChange("")
  }

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            id={id}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder}
            className={error ? "border-destructive" : ""}
          />
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full p-0"
              onClick={handleClearMedia}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" size="icon">
              <Image className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Select Media</DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="browse" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="browse">Browse Media</TabsTrigger>
                <TabsTrigger value="upload">Upload New</TabsTrigger>
              </TabsList>
              
              <TabsContent value="browse" className="space-y-4">
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
                  <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setSelectedMediaType}>
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="image">Images</TabsTrigger>
                      <TabsTrigger value="document">Documents</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                {isLoading ? (
                  <div className="flex h-[300px] items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                  </div>
                ) : filteredItems.length === 0 ? (
                  <div className="flex h-[300px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center">
                    <div className="rounded-full bg-muted p-3">
                      <Search className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">No media found</h3>
                    <p className="text-sm text-muted-foreground">
                      {searchQuery || selectedMediaType !== "all"
                        ? "Try adjusting your search or filter to find what you're looking for."
                        : "Upload media to get started."}
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => setActiveTab("upload")}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Media
                    </Button>
                  </div>
                ) : (
                  <div className="grid max-h-[400px] grid-cols-2 gap-4 overflow-y-auto p-1 md:grid-cols-3 lg:grid-cols-4">
                    {filteredItems.map((item) => (
                      <div
                        key={item.id}
                        className="group relative cursor-pointer overflow-hidden rounded-lg border bg-background transition-colors hover:bg-accent"
                        onClick={() => handleSelectMedia(item.url)}
                      >
                        {item.type === "image" ? (
                          <div className="aspect-square">
                            <img
                              src={item.url}
                              alt={item.alt || item.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=200"
                              }}
                            />
                          </div>
                        ) : (
                          <div className="flex aspect-square items-center justify-center bg-muted">
                            <File className="h-10 w-10 text-muted-foreground" />
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                          <Button variant="secondary" size="sm">
                            Select
                          </Button>
                        </div>
                        <div className="p-2">
                          <p className="truncate text-sm font-medium">{item.name}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="upload">
                <MediaUploadForm 
                  onSuccess={handleUploadSuccess} 
                  onCancel={() => setActiveTab("browse")} 
                />
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
      
      {value && value.startsWith("http") && (
        <div className="mt-2 max-w-[200px] overflow-hidden rounded-md border">
          <img
            src={value}
            alt="Preview"
            className="h-auto w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=200"
            }}
          />
        </div>
      )}
      
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}