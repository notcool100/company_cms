"use client"

import { useState } from "react"
import { Copy, Download, MoreHorizontal, Plus, Trash, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample media data
const mediaItems = [
  {
    id: 1,
    name: "hero-image.jpg",
    type: "image",
    size: "1.2 MB",
    dimensions: "1920x1080",
    uploadedAt: "2023-04-12",
    url: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "team-photo.jpg",
    type: "image",
    size: "0.8 MB",
    dimensions: "1200x800",
    uploadedAt: "2023-04-10",
    url: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "product-demo.mp4",
    type: "video",
    size: "8.5 MB",
    dimensions: "1920x1080",
    uploadedAt: "2023-04-08",
    url: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "company-logo.png",
    type: "image",
    size: "0.3 MB",
    dimensions: "512x512",
    uploadedAt: "2023-04-05",
    url: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    name: "brochure.pdf",
    type: "document",
    size: "2.1 MB",
    dimensions: "-",
    uploadedAt: "2023-04-01",
    url: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    name: "service-icon.svg",
    type: "image",
    size: "0.1 MB",
    dimensions: "64x64",
    uploadedAt: "2023-03-28",
    url: "/placeholder.svg?height=200&width=300",
  },
]

export default function MediaPage() {
  const [view, setView] = useState<"grid" | "list">("grid")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Media Library</h1>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Files
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Media</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button
              variant={view === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("grid")}
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Grid view</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
            </Button>
            <Button
              variant={view === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("list")}
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">List view</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <line x1="8" x2="21" y1="6" y2="6" />
                <line x1="8" x2="21" y1="12" y2="12" />
                <line x1="8" x2="21" y1="18" y2="18" />
                <line x1="3" x2="3" y1="6" y2="6" />
                <line x1="3" x2="3" y1="12" y2="12" />
                <line x1="3" x2="3" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
        <TabsContent value="all" className="mt-6">
          {view === "grid" ? (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {mediaItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-square relative bg-muted">
                    <img src={item.url || "/placeholder.svg"} alt={item.name} className="h-full w-full object-cover" />
                    <div className="absolute right-2 top-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full bg-black/50 p-0 text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy URL
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <div className="truncate text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.size}</div>
                  </CardContent>
                </Card>
              ))}
              <Card className="flex aspect-square flex-col items-center justify-center border-dashed">
                <div className="flex flex-col items-center justify-center gap-1 p-4 text-center">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                  <div className="text-sm font-medium">Upload New</div>
                </div>
              </Card>
            </div>
          ) : (
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 pl-4 pr-3 text-left text-xs font-medium text-muted-foreground">Name</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">Type</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">Size</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">Dimensions</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">Uploaded</th>
                    <th className="px-3 py-3 text-right text-xs font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mediaItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded bg-muted">
                            <img
                              src={item.url || "/placeholder.svg"}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="font-medium">{item.name}</div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm">{item.type}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm">{item.size}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm">{item.dimensions}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm">{item.uploadedAt}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-right text-sm">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Copy URL
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
        <TabsContent value="images" className="mt-6">
          {/* Similar content for images tab */}
          <div className="rounded-md border p-8 text-center">
            <p className="text-sm text-muted-foreground">Filtered view for images would appear here</p>
          </div>
        </TabsContent>
        <TabsContent value="videos" className="mt-6">
          {/* Similar content for videos tab */}
          <div className="rounded-md border p-8 text-center">
            <p className="text-sm text-muted-foreground">Filtered view for videos would appear here</p>
          </div>
        </TabsContent>
        <TabsContent value="documents" className="mt-6">
          {/* Similar content for documents tab */}
          <div className="rounded-md border p-8 text-center">
            <p className="text-sm text-muted-foreground">Filtered view for documents would appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
