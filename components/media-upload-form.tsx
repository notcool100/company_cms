"use client"

import { useState, useRef } from "react"
import { Loader2, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { MediaItem } from "@/app/admin/media/page"

interface MediaUploadFormProps {
  onSuccess: (media: MediaItem) => void
  onCancel?: () => void
}

export default function MediaUploadForm({ onSuccess, onCancel }: MediaUploadFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [description, setDescription] = useState("")
  const [alt, setAlt] = useState("")
  const [tags, setTags] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      
      // Create preview for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreview(e.target?.result as string)
        }
        reader.readAsDataURL(selectedFile)
      } else {
        setPreview(null)
      }
    }
  }
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      setFile(droppedFile)
      
      // Create preview for images
      if (droppedFile.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreview(e.target?.result as string)
        }
        reader.readAsDataURL(droppedFile)
      } else {
        setPreview(null)
      }
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      })
      return
    }
    
    setIsUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      if (description) {
        formData.append('description', description)
      }
      
      if (alt) {
        formData.append('alt', alt)
      }
      
      if (tags) {
        formData.append('tags', tags)
      }
      
      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      })
      
      const data = await response.json()
      
      if (data.success) {
        toast({
          title: "Success",
          description: "File uploaded successfully",
        })
        onSuccess(data.data)
        resetForm()
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to upload file",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }
  
  const resetForm = () => {
    setFile(null)
    setPreview(null)
    setDescription("")
    setAlt("")
    setTags("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }
  
  const handleCancel = () => {
    resetForm()
    if (onCancel) {
      onCancel()
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div 
        className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
        
        {preview ? (
          <div className="relative">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-[200px] mx-auto object-contain"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-0 right-0 h-6 w-6 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                resetForm()
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : file ? (
          <div className="py-4">
            <p className="text-sm font-medium">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {file.type} • {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        ) : (
          <div className="py-8">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
            <p className="mt-2 text-sm font-medium">Drag and drop a file or click to browse</p>
            <p className="text-xs text-muted-foreground">
              Supports images, videos, documents, and audio files
            </p>
          </div>
        )}
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          placeholder="Enter a description for this file"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="alt">Alt Text (optional)</Label>
        <Input
          id="alt"
          placeholder="Alternative text for accessibility"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="tags">Tags (optional)</Label>
        <Input
          id="tags"
          placeholder="Comma-separated tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isUploading || !file}>
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </>
          )}
        </Button>
      </div>
    </form>
  )
}