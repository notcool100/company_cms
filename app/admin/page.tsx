import Link from "next/link"
import { BarChart3, Edit, FileText, ImageIcon, Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Page
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Media Files</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">+8 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">No change</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,845</div>
            <p className="text-xs text-muted-foreground">+14% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Edit className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Home page updated</p>
                <p className="text-xs text-muted-foreground">2 hours ago by Admin</p>
              </div>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Plus className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">New team member added</p>
                <p className="text-xs text-muted-foreground">Yesterday by Admin</p>
              </div>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <ImageIcon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">5 new images uploaded</p>
                <p className="text-xs text-muted-foreground">3 days ago by Editor</p>
              </div>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/admin/pages/new">
              <div className="flex h-24 flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center hover:bg-muted">
                <FileText className="mb-2 h-5 w-5 text-muted-foreground" />
                <p className="text-sm font-medium">Create Page</p>
              </div>
            </Link>
            <Link href="/admin/media/upload">
              <div className="flex h-24 flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center hover:bg-muted">
                <ImageIcon className="mb-2 h-5 w-5 text-muted-foreground" />
                <p className="text-sm font-medium">Upload Media</p>
              </div>
            </Link>
            <Link href="/admin/team/invite">
              <div className="flex h-24 flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center hover:bg-muted">
                <Users className="mb-2 h-5 w-5 text-muted-foreground" />
                <p className="text-sm font-medium">Invite User</p>
              </div>
            </Link>
            <Link href="/admin/analytics">
              <div className="flex h-24 flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center hover:bg-muted">
                <BarChart3 className="mb-2 h-5 w-5 text-muted-foreground" />
                <p className="text-sm font-medium">View Analytics</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
