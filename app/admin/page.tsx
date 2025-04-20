"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  BarChart3, 
  Edit, 
  FileText, 
  ImageIcon, 
  Plus, 
  Settings, 
  UserPlus, 
  Users 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"

interface DashboardStats {
  totalPages: number
  totalMedia: number
  totalTeamMembers: number
  pageViews: number
}

interface Activity {
  id: string
  type: 'edit' | 'add' | 'upload'
  description: string
  timestamp: string
  user: string
  link?: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const { data: session } = useSession()
  const { toast } = useToast()
  const [stats, setStats] = useState<DashboardStats>({
    totalPages: 0,
    totalMedia: 0,
    totalTeamMembers: 0,
    pageViews: 0
  })
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true)
      try {
        // In a real implementation, you would fetch this data from your API
        // const res = await fetch('/api/dashboard')
        // const data = await res.json()
        
        // Simulate API response with sample data
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Sample stats
        setStats({
          totalPages: 12,
          totalMedia: 48,
          totalTeamMembers: 6,
          pageViews: 2845
        })
        
        // Sample activities
        setActivities([
          {
            id: '1',
            type: 'edit',
            description: 'Home page updated',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
            user: session?.user?.name || 'Admin',
            link: '/admin/pages/1'
          },
          {
            id: '2',
            type: 'add',
            description: 'New team member added',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
            user: session?.user?.name || 'Admin',
            link: '/admin/team'
          },
          {
            id: '3',
            type: 'upload',
            description: '5 new images uploaded',
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
            user: 'Editor',
            link: '/admin/media'
          }
        ])
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data',
          variant: 'destructive'
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchDashboardData()
  }, [session, toast])

  // Format relative time
  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSecs = Math.floor(diffMs / 1000)
    const diffMins = Math.floor(diffSecs / 60)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)
    
    if (diffDays > 0) {
      return diffDays === 1 ? 'Yesterday' : `${diffDays} days ago`
    }
    if (diffHours > 0) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
    }
    if (diffMins > 0) {
      return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`
    }
    return 'Just now'
  }

  // Get activity icon based on type
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'edit':
        return <Edit className="h-4 w-4" />
      case 'add':
        return <Plus className="h-4 w-4" />
      case 'upload':
        return <ImageIcon className="h-4 w-4" />
      default:
        return <Edit className="h-4 w-4" />
    }
  }

  // Get activity background color based on type
  const getActivityBgColor = (type: Activity['type']) => {
    switch (type) {
      case 'edit':
        return 'bg-blue-100 text-blue-600'
      case 'add':
        return 'bg-green-100 text-green-600'
      case 'upload':
        return 'bg-amber-100 text-amber-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Button onClick={() => router.push('/admin/pages/new')}>
          <Plus className="mr-2 h-4 w-4" />
          New Page
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
            ) : (
              <>
                <div className="text-2xl font-bold">{stats.totalPages}</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Media Files</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
            ) : (
              <>
                <div className="text-2xl font-bold">{stats.totalMedia}</div>
                <p className="text-xs text-muted-foreground">+8 from last month</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
            ) : (
              <>
                <div className="text-2xl font-bold">{stats.totalTeamMembers}</div>
                <p className="text-xs text-muted-foreground">No change</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
            ) : (
              <>
                <div className="text-2xl font-bold">{stats.pageViews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+14% from last month</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="transition-all duration-200 hover:shadow-md">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and changes</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-9 w-9 animate-pulse rounded-full bg-muted"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
                    <div className="h-3 w-1/2 animate-pulse rounded bg-muted"></div>
                  </div>
                  <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full ${getActivityBgColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatRelativeTime(activity.timestamp)} by {activity.user}
                    </p>
                  </div>
                  {activity.link && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={activity.link}>View</Link>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="transition-all duration-200 hover:shadow-md">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/admin/pages/new" className="transition-transform duration-200 hover:scale-105">
              <div className="flex h-24 flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center hover:bg-muted">
                <FileText className="mb-2 h-5 w-5 text-muted-foreground" />
                <p className="text-sm font-medium">Create Page</p>
              </div>
            </Link>
            <Link href="/admin/media/upload" className="transition-transform duration-200 hover:scale-105">
              <div className="flex h-24 flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center hover:bg-muted">
                <ImageIcon className="mb-2 h-5 w-5 text-muted-foreground" />
                <p className="text-sm font-medium">Upload Media</p>
              </div>
            </Link>
            <Link href="/admin/team/new" className="transition-transform duration-200 hover:scale-105">
              <div className="flex h-24 flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center hover:bg-muted">
                <UserPlus className="mb-2 h-5 w-5 text-muted-foreground" />
                <p className="text-sm font-medium">Add Team Member</p>
              </div>
            </Link>
            <Link href="/admin/settings" className="transition-transform duration-200 hover:scale-105">
              <div className="flex h-24 flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center hover:bg-muted">
                <Settings className="mb-2 h-5 w-5 text-muted-foreground" />
                <p className="text-sm font-medium">Site Settings</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
