"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, File, Image, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

interface FileWithPreview extends File {
  id: string
  preview?: string
  uploadProgress?: number
  error?: string
}

export default function UploadMediaPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    
    const selectedFiles = Array.from(e.target.files)
    const newFiles = selectedFiles.map(file => {
      // Create a unique ID for each file
      const fileWithId = file as FileWithPreview
      fileWithId.id = crypto.randomUUID()
      fileWithId.uploadProgress = 0
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        fileWithId.preview = URL.createObjectURL(file)
      }
      
      return fileWithId
    })
    
    setFiles(prev => [...prev, ...newFiles])
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Remove a file from the list
  const removeFile = (id: string) => {
    setFiles(prev => {
      const updatedFiles = prev.filter(file => file.id !== id)
      
      // Revoke object URL for the removed file to free memory
      const fileToRemove = prev.find(file => file.id === id)
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      
      return updatedFiles
    })
  }

  // Handle file upload
  const handleUpload = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload",
        variant: "destructive",
      })
      return
    }
    
    setIsUploading(true)
    
    try {
      // Upload each file
      const uploadPromises = files.map(async (file, index) => {
        // Create a new FormData instance for each file
        const formData = new FormData()
        formData.append('file', file)
        
        try {
          // Simulate upload progress
          const simulateProgress = () => {
            let progress = 0
            const interval = setInterval(() => {
              progress += Math.floor(Math.random() * 10) + 1
              if (progress >= 100) {
                progress = 100
                clearInterval(interval)
              }
              
              setFiles(prev => 
                prev.map(f => 
                  f.id === file.id 
                    ? { ...f, uploadProgress: progress } 
                    : f
                )
              )
            }, 200)
            
            return interval
          }
          
          const progressInterval = simulateProgress()
          
          // In a real implementation, you would upload to your API
          // const response = await fetch('/api/media/upload', {
          //   method: 'POST',
          //   body: formData,
          // })
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000))
          
          clearInterval(progressInterval)
          
          // Set progress to 100% when done
          setFiles(prev => 
            prev.map(f => 
              f.id === file.id 
                ? { ...f, uploadProgress: 100 } 
                : f
            )
          )
          
          return {
            success: true,
            file,
            data: {
              id: crypto.randomUUID(),
              name: file.name,
              type: file.type,
              url: file.preview || '/placeholder.svg',
              size: `${(file.size / 1024).toFixed(2)} KB`,
              dimensions: file.type.startsWith('image/') ? '1920x1080' : undefined,
            }
          }
        } catch (error) {
          console.error(`Error uploading ${file.name}:`, error)
          
          // Mark file as failed
          setFiles(prev => 
            prev.map(f => 
              f.id === file.id 
                ? { ...f, error: 'Upload failed', uploadProgress: 0 } 
                : f
            )
          )
          
          return {
            success: false,
            file,
            error: error instanceof Error ? error.message : 'Upload failed'
          }
        }
      })
      
      const results = await Promise.all(uploadPromises)
      
      // Count successful uploads
      const successCount = results.filter(result => result.success).length
      
      if (successCount > 0) {
        toast({
          title: "Upload Complete",
          description: `Successfully uploaded ${successCount} of ${files.length} files`,
        })
        
        // Wait a moment to show 100% progress before redirecting
        setTimeout(() => {
          router.push('/admin/media')
        }, 1000)
      } else {
        toast({
          title: "Upload Failed",
          description: "Failed to upload files. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error during upload:", error)
      toast({
        title: "Upload Error",
        description: "An unexpected error occurred during upload",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  // Get file icon based on type
  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="h-6 w-6" />
    }
    return <File className="h-6 w-6" />
  }

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/admin/media")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Upload Media</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
          <CardDescription>Upload images and other media files to your library</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Drop zone */}
          <div 
            className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 p-12 text-center"
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.stopPropagation()
              
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                const droppedFiles = Array.from(e.dataTransfer.files)
                const newFiles = droppedFiles.map(file => {
                  const fileWithId = file as FileWithPreview
                  fileWithId.id = crypto.randomUUID()
                  fileWithId.uploadProgress = 0
                  
                  if (file.type.startsWith('image/')) {
                    fileWithId.preview = URL.createObjectURL(file)
                  }
                  
                  return fileWithId
                })
                
                setFiles(prev => [...prev, ...newFiles])
              }
            }}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="rounded-full bg-primary/10 p-4">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Drag and drop files here</h3>
                <p className="text-sm text-muted-foreground">
                  or click to browse from your computer
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                Choose Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
                disabled={isUploading}
              />
              <p className="text-xs text-muted-foreground">
                Supported formats: JPG, PNG, GIF, SVG, PDF, DOCX, XLSX, MP4, MP3
              </p>
            </div>
          </div>

          {/* Selected files list */}
          {files.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Selected Files ({files.length})</h3>
              <div className="space-y-2">
                {files.map((file) => (
                  <div 
                    key={file.id} 
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                        {file.preview ? (
                          <img 
                            src={file.preview} 
                            alt={file.name} 
                            className="h-full w-full rounded object-cover" 
                          />
                        ) : (
                          getFileIcon(file)
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {file.uploadProgress !== undefined && file.uploadProgress > 0 && (
                        <div className="w-24">
                          <Progress value={file.uploadProgress} className="h-2" />
                        </div>
                      )}
                      {file.error && (
                        <span className="text-xs text-destructive">{file.error}</span>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeFile(file.id)}
                        disabled={isUploading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => router.push("/admin/media")}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={files.length === 0 || isUploading}
          >
            {isUploading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload {files.length > 0 ? `(${files.length})` : ''}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}