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
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-500">Welcome back! Here's an overview of your website.</p>
        </div>
        <Button onClick={() => router.push('/admin/pages/new')} className="shadow-sm">
          <Plus className="mr-2 h-4 w-4" />
          New Page
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-white border-0">
            <CardTitle className="text-sm font-medium text-gray-900">Total Pages</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent className="bg-white">
            {isLoading ? (
              <div className="h-8 w-16 animate-pulse rounded bg-gray-100"></div>
            ) : (
              <>
                <div className="stat-value">{stats.totalPages}</div>
                <p className="stat-label">+2 from last month</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-white border-0">
            <CardTitle className="text-sm font-medium text-gray-900">Media Files</CardTitle>
            <ImageIcon className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent className="bg-white">
            {isLoading ? (
              <div className="h-8 w-16 animate-pulse rounded bg-gray-100"></div>
            ) : (
              <>
                <div className="stat-value">{stats.totalMedia}</div>
                <p className="stat-label">+8 from last month</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-white border-0">
            <CardTitle className="text-sm font-medium text-gray-900">Team Members</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent className="bg-white">
            {isLoading ? (
              <div className="h-8 w-16 animate-pulse rounded bg-gray-100"></div>
            ) : (
              <>
                <div className="stat-value">{stats.totalTeamMembers}</div>
                <p className="stat-label">No change</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-white border-0">
            <CardTitle className="text-sm font-medium text-gray-900">Page Views</CardTitle>
            <BarChart3 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent className="bg-white">
            {isLoading ? (
              <div className="h-8 w-16 animate-pulse rounded bg-gray-100"></div>
            ) : (
              <>
                <div className="stat-value">{stats.pageViews.toLocaleString()}</div>
                <p className="stat-label">+14% from last month</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="overflow-hidden border-0 shadow-md bg-white">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
          <CardTitle className="text-gray-900">Recent Activity</CardTitle>
          <CardDescription className="text-gray-600">Latest updates and changes</CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-9 w-9 animate-pulse rounded-full bg-gray-100"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100"></div>
                    <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100"></div>
                  </div>
                  <div className="h-8 w-16 animate-pulse rounded bg-gray-100"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${getActivityBgColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500">
                      {formatRelativeTime(activity.timestamp)} by {activity.user}
                    </p>
                  </div>
                  {activity.link && (
                    <Button variant="outline" size="sm" asChild className="shadow-sm hover:shadow">
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
      <Card className="overflow-hidden border-0 shadow-md bg-white">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
          <CardTitle className="text-gray-900">Quick Actions</CardTitle>
          <CardDescription className="text-gray-600">Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/admin/pages/new" className="transition-transform duration-200 hover:scale-105">
              <div className="flex h-28 flex-col items-center justify-center rounded-lg border border-gray-200 p-4 text-center hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow transition-all">
                <FileText className="mb-3 h-6 w-6 text-blue-500" />
                <p className="text-sm font-medium text-gray-900">Create Page</p>
              </div>
            </Link>
            <Link href="/admin/media/upload" className="transition-transform duration-200 hover:scale-105">
              <div className="flex h-28 flex-col items-center justify-center rounded-lg border border-gray-200 p-4 text-center hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow transition-all">
                <ImageIcon className="mb-3 h-6 w-6 text-purple-500" />
                <p className="text-sm font-medium text-gray-900">Upload Media</p>
              </div>
            </Link>
            <Link href="/admin/team/new" className="transition-transform duration-200 hover:scale-105">
              <div className="flex h-28 flex-col items-center justify-center rounded-lg border border-gray-200 p-4 text-center hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow transition-all">
                <UserPlus className="mb-3 h-6 w-6 text-green-500" />
                <p className="text-sm font-medium text-gray-900">Add Team Member</p>
              </div>
            </Link>
            <Link href="/admin/settings" className="transition-transform duration-200 hover:scale-105">
              <div className="flex h-28 flex-col items-center justify-center rounded-lg border border-gray-200 p-4 text-center hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow transition-all">
                <Settings className="mb-3 h-6 w-6 text-amber-500" />
                <p className="text-sm font-medium text-gray-900">Site Settings</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
