"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  Edit, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Trash2, 
  UserPlus 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog"

interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  imageUrl: string
}

export default function TeamPage() {
  const router = useRouter()
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteMemberId, setDeleteMemberId] = useState<number | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const res = await fetch("/api/team-members")
        if (!res.ok) throw new Error("Failed to fetch team members")
        const data = await res.json()
        if (data.success) {
          setTeamMembers(data.data)
        } else {
          // If API fails, use sample data
          setTeamMembers([
            {
              id: 1,
              name: "John Doe",
              role: "CEO & Founder",
              bio: "John has over 15 years of experience in the IT industry and founded the company in 2010.",
              imageUrl: "/placeholder.svg?height=200&width=200"
            },
            {
              id: 2,
              name: "Jane Smith",
              role: "CTO",
              bio: "Jane leads our technical team and has expertise in cloud architecture and software development.",
              imageUrl: "/placeholder.svg?height=200&width=200"
            },
            {
              id: 3,
              name: "Michael Johnson",
              role: "Lead Developer",
              bio: "Michael specializes in frontend development and has worked on numerous high-profile projects.",
              imageUrl: "/placeholder.svg?height=200&width=200"
            },
            {
              id: 4,
              name: "Sarah Williams",
              role: "UX Designer",
              bio: "Sarah creates intuitive user experiences and has a background in graphic design.",
              imageUrl: "/placeholder.svg?height=200&width=200"
            },
            {
              id: 5,
              name: "David Brown",
              role: "Project Manager",
              bio: "David ensures our projects are delivered on time and within budget.",
              imageUrl: "/placeholder.svg?height=200&width=200"
            }
          ])
        }
      } catch (error) {
        console.error("Error fetching team members:", error)
        // Fallback to sample data
        setTeamMembers([
          {
            id: 1,
            name: "John Doe",
            role: "CEO & Founder",
            bio: "John has over 15 years of experience in the IT industry and founded the company in 2010.",
            imageUrl: "/placeholder.svg?height=200&width=200"
          },
          {
            id: 2,
            name: "Jane Smith",
            role: "CTO",
            bio: "Jane leads our technical team and has expertise in cloud architecture and software development.",
            imageUrl: "/placeholder.svg?height=200&width=200"
          },
          {
            id: 3,
            name: "Michael Johnson",
            role: "Lead Developer",
            bio: "Michael specializes in frontend development and has worked on numerous high-profile projects.",
            imageUrl: "/placeholder.svg?height=200&width=200"
          },
          {
            id: 4,
            name: "Sarah Williams",
            role: "UX Designer",
            bio: "Sarah creates intuitive user experiences and has a background in graphic design.",
            imageUrl: "/placeholder.svg?height=200&width=200"
          },
          {
            id: 5,
            name: "David Brown",
            role: "Project Manager",
            bio: "David ensures our projects are delivered on time and within budget.",
            imageUrl: "/placeholder.svg?height=200&width=200"
          }
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  const handleDeleteClick = (id: number) => {
    setDeleteMemberId(id)
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = async () => {
    if (deleteMemberId) {
      try {
        const res = await fetch(`/api/team-members/${deleteMemberId}`, {
          method: "DELETE",
        })
        
        if (!res.ok) throw new Error("Failed to delete team member")
        
        const data = await res.json()
        if (data.success) {
          setTeamMembers(teamMembers.filter(member => member.id !== deleteMemberId))
        }
      } catch (error) {
        console.error("Error deleting team member:", error)
      }
    }
    setShowDeleteDialog(false)
    setDeleteMemberId(null)
  }

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false)
    setDeleteMemberId(null)
  }

  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
        <Button onClick={() => router.push("/admin/team/new")}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Team</CardTitle>
          <CardDescription>Add, edit, and manage your team members displayed on the website.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search team members..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
              <span className="ml-2">Loading team members...</span>
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <UserPlus className="h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-medium">No team members found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchQuery ? "Try a different search term" : "Get started by adding a team member"}
              </p>
              {!searchQuery && (
                <Button className="mt-4" onClick={() => router.push("/admin/team/new")}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Team Member
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMembers.map((member) => (
                <Card key={member.id} className="overflow-hidden">
                  <div className="aspect-square relative bg-muted">
                    <img 
                      src={member.imageUrl} 
                      alt={member.name} 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg?height=200&width=200";
                      }}
                    />
                    <div className="absolute right-2 top-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full bg-black/50 p-0 text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/admin/team/${member.id}`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteClick(member.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <p className="mt-2 text-sm line-clamp-3">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the team member from the website.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}