"use client"

import { useState } from "react"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { 
  Copy, 
  Download, 
  FileText, 
  Image as ImageIcon, 
  MoreHorizontal, 
  Music, 
  Trash, 
  Video,
  File
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Helper function to format file size
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' bytes';
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  else return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

// Helper function to get icon based on file type
function getFileIcon(type: string) {
  switch (type) {
    case 'image':
      return <ImageIcon className="h-6 w-6" />;
    case 'video':
      return <Video className="h-6 w-6" />;
    case 'audio':
      return <Music className="h-6 w-6" />;
    case 'document':
      return <FileText className="h-6 w-6" />;
    default:
      return <File className="h-6 w-6" />;
  }
}

interface MediaItem {
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

interface MediaGridProps {
  items: MediaItem[]
  onDelete: (id: number) => void
}

export default function MediaGrid({ items, onDelete }: MediaGridProps) {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(`${window.location.origin}${url}`)
  }
  
  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
  const handleShowDetails = (item: MediaItem) => {
    setSelectedItem(item)
    setShowDetailsDialog(true)
  }
  
  const handleDeleteClick = (item: MediaItem) => {
    setSelectedItem(item)
    setShowDeleteDialog(true)
  }
  
  const confirmDelete = () => {
    if (selectedItem) {
      onDelete(selectedItem.id)
      setShowDeleteDialog(false)
    }
  }
  
  return (
    <>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div 
              className="aspect-square relative bg-muted cursor-pointer"
              onClick={() => handleShowDetails(item)}
            >
              {item.type === 'image' ? (
                <img 
                  src={item.url} 
                  alt={item.alt || item.name} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  {getFileIcon(item.type)}
                </div>
              )}
              <div className="absolute right-2 top-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full bg-black/50 p-0 text-white">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleDownload(item.url, item.name)}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleCopyUrl(item.url)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy URL
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShowDetails(item)}>
                      <FileText className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => handleDeleteClick(item)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardContent className="p-3">
              <div className="truncate text-sm font-medium">{item.name}</div>
              <div className="text-xs text-muted-foreground">
                {formatFileSize(item.size)} • {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Media Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        {selectedItem && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{selectedItem.name}</DialogTitle>
              <DialogDescription>
                Uploaded {formatDistanceToNow(new Date(selectedItem.createdAt), { addSuffix: true })}
                {selectedItem.user && ` by ${selectedItem.user.name || selectedItem.user.email}`}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4">
              <div className="rounded-md border overflow-hidden bg-muted">
                {selectedItem.type === 'image' ? (
                  <img 
                    src={selectedItem.url} 
                    alt={selectedItem.alt || selectedItem.name} 
                    className="max-h-[300px] w-full object-contain"
                  />
                ) : (
                  <div className="flex h-[200px] w-full items-center justify-center">
                    {getFileIcon(selectedItem.type)}
                  </div>
                )}
              </div>
              
              <div className="grid gap-2">
                {selectedItem.description && (
                  <div>
                    <h4 className="text-sm font-medium">Description</h4>
                    <p className="text-sm text-muted-foreground">{selectedItem.description}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium">Type</h4>
                    <p className="text-sm text-muted-foreground capitalize">{selectedItem.type}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Size</h4>
                    <p className="text-sm text-muted-foreground">{formatFileSize(selectedItem.size)}</p>
                  </div>
                </div>
                
                {selectedItem.dimensions && (
                  <div>
                    <h4 className="text-sm font-medium">Dimensions</h4>
                    <p className="text-sm text-muted-foreground">{selectedItem.dimensions}</p>
                  </div>
                )}
                
                {selectedItem.alt && (
                  <div>
                    <h4 className="text-sm font-medium">Alt Text</h4>
                    <p className="text-sm text-muted-foreground">{selectedItem.alt}</p>
                  </div>
                )}
                
                {selectedItem.tags && (
                  <div>
                    <h4 className="text-sm font-medium">Tags</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedItem.tags.split(',').map((tag, index) => (
                        <Badge key={index} variant="secondary">{tag.trim()}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium">URL</h4>
                  <div className="flex items-center gap-2">
                    <code className="rounded bg-muted px-1 py-0.5 text-xs">
                      {selectedItem.url}
                    </code>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => handleCopyUrl(selectedItem.url)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy URL</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => handleDownload(selectedItem.url, selectedItem.name)}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setShowDetailsDialog(false)
                  handleDeleteClick(selectedItem)
                }}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        {selectedItem && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Media</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{selectedItem.name}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}