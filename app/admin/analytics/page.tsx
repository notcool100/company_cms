"use client"

import { useState } from "react"
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"

// Sample data for analytics
const pageViewsData = [
  { name: "Jan", views: 1200 },
  { name: "Feb", views: 1900 },
  { name: "Mar", views: 2400 },
  { name: "Apr", views: 1800 },
  { name: "May", views: 2800 },
  { name: "Jun", views: 3200 },
  { name: "Jul", views: 3800 },
  { name: "Aug", views: 4200 },
  { name: "Sep", views: 3600 },
  { name: "Oct", views: 4800 },
  { name: "Nov", views: 5200 },
  { name: "Dec", views: 4500 },
]

const visitorSourceData = [
  { name: "Direct", value: 40 },
  { name: "Organic Search", value: 30 },
  { name: "Social Media", value: 20 },
  { name: "Referral", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const popularPagesData = [
  { name: "Home", views: 3200 },
  { name: "About", views: 1800 },
  { name: "Services", views: 1400 },
  { name: "Contact", views: 1100 },
  { name: "Blog", views: 900 },
]

const deviceData = [
  { name: "Desktop", value: 55 },
  { name: "Mobile", value: 40 },
  { name: "Tablet", value: 5 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("year")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last 7 days</SelectItem>
            <SelectItem value="month">Last 30 days</SelectItem>
            <SelectItem value="quarter">Last 90 days</SelectItem>
            <SelectItem value="year">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35,687</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+12.5%</span> from previous period
            </p>
            <div className="mt-4 h-[40px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pageViewsData.slice(-6)}>
                  <Line type="monotone" dataKey="views" stroke="#0ea5e9" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18,392</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+8.2%</span> from previous period
            </p>
            <div className="mt-4 h-[40px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pageViewsData.slice(-6).map(item => ({ name: item.name, visitors: Math.floor(item.views * 0.6) }))}>
                  <Line type="monotone" dataKey="visitors" stroke="#8884d8" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2m 45s</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500">-3.1%</span> from previous period
            </p>
            <div className="mt-4 h-[40px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { name: "Jul", duration: 2.1 },
                  { name: "Aug", duration: 2.3 },
                  { name: "Sep", duration: 2.8 },
                  { name: "Oct", duration: 2.5 },
                  { name: "Nov", duration: 2.9 },
                  { name: "Dec", duration: 2.75 },
                ]}>
                  <Line type="monotone" dataKey="duration" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42.3%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">-2.7%</span> from previous period
            </p>
            <div className="mt-4 h-[40px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { name: "Jul", rate: 45 },
                  { name: "Aug", rate: 48 },
                  { name: "Sep", rate: 46 },
                  { name: "Oct", rate: 44 },
                  { name: "Nov", rate: 43 },
                  { name: "Dec", rate: 42.3 },
                ]}>
                  <Line type="monotone" dataKey="rate" stroke="#f43f5e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="traffic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
        </TabsList>
        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Page Views Over Time</CardTitle>
              <CardDescription>Total page views across your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={pageViewsData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="views" stroke="#0ea5e9" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your visitors are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={visitorSourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {visitorSourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Referrers</CardTitle>
                <CardDescription>Websites sending traffic to you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "google.com", visits: 1245, change: "+12.3%" },
                    { name: "facebook.com", visits: 864, change: "+5.7%" },
                    { name: "twitter.com", visits: 432, change: "+2.1%" },
                    { name: "linkedin.com", visits: 287, change: "+8.4%" },
                    { name: "instagram.com", visits: 198, change: "+15.2%" },
                  ].map((referrer) => (
                    <div key={referrer.name} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{referrer.name}</div>
                        <div className="text-sm text-muted-foreground">{referrer.visits} visits</div>
                      </div>
                      <div className="text-green-500 text-sm">{referrer.change}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Popular Pages</CardTitle>
              <CardDescription>Most viewed pages on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={popularPagesData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="views" fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Content Engagement</CardTitle>
                <CardDescription>Average time spent on each page</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Home", time: "1m 45s", change: "+5.2%" },
                    { name: "About", time: "2m 30s", change: "+8.7%" },
                    { name: "Services", time: "3m 15s", change: "+12.3%" },
                    { name: "Blog", time: "4m 20s", change: "+15.1%" },
                    { name: "Contact", time: "1m 10s", change: "-2.3%" },
                  ].map((page) => (
                    <div key={page.name} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{page.name}</div>
                        <div className="text-sm text-muted-foreground">{page.time} avg. time</div>
                      </div>
                      <div className={page.change.startsWith("+") ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
                        {page.change}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Exit Pages</CardTitle>
                <CardDescription>Pages where visitors leave your site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Contact", exits: 845, rate: "28.4%" },
                    { name: "Services", exits: 632, rate: "21.2%" },
                    { name: "About", exits: 521, rate: "17.5%" },
                    { name: "Home", exits: 498, rate: "16.7%" },
                    { name: "Blog", exits: 483, rate: "16.2%" },
                  ].map((page) => (
                    <div key={page.name} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{page.name}</div>
                        <div className="text-sm text-muted-foreground">{page.exits} exits</div>
                      </div>
                      <div className="text-sm">{page.rate}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="devices" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Device Types</CardTitle>
                <CardDescription>What devices visitors use to access your site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Browsers</CardTitle>
                <CardDescription>Most common browsers used by visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Chrome", users: 65 },
                        { name: "Safari", users: 18 },
                        { name: "Firefox", users: 8 },
                        { name: "Edge", users: 7 },
                        { name: "Others", users: 2 },
                      ]}
                      layout="vertical"
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="users" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Screen Sizes</CardTitle>
              <CardDescription>Common screen resolutions of your visitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { resolution: "1920x1080", percentage: 32, count: 5872 },
                  { resolution: "1366x768", percentage: 24, count: 4416 },
                  { resolution: "360x640", percentage: 18, count: 3312 },
                  { resolution: "414x896", percentage: 12, count: 2208 },
                  { resolution: "1536x864", percentage: 8, count: 1472 },
                  { resolution: "Others", percentage: 6, count: 1104 },
                ].map((item) => (
                  <div key={item.resolution} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{item.resolution}</div>
                        <div className="text-sm text-muted-foreground">({item.count} visitors)</div>
                      </div>
                      <div className="text-sm">{item.percentage}%</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}