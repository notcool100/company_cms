"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { 
  BarChart3, 
  FileText, 
  Home, 
  ImageIcon, 
  LayoutDashboard, 
  LogOut, 
  Settings, 
  Users,
  Info,
  Briefcase,
  Layers
} from "lucide-react"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Redirect to login if not authenticated
  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }
  
  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push("/login")
  }
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }
  
  return (
    <div className="flex min-h-screen bg-white admin-layout light">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-gray-200 bg-white shadow-lg md:flex admin-sidebar transition-all duration-300">
        <div className="flex h-16 items-center border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600 px-4">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white bg-opacity-20 text-white backdrop-blur-sm">CM</span>
            <span className="text-lg tracking-tight">IT CMS</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-6">
          <Link
            href="/admin"
            className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <LayoutDashboard className="mr-3 h-5 w-5 text-blue-500" />
            Dashboard
          </Link>
         
         
          <Link
            href="/admin/team"
            className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <Users className="mr-3 h-5 w-5 text-gray-500" />
            Team
          </Link>
          <Link
            href="/admin/about"
            className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <Info className="mr-3 h-5 w-5 text-gray-500" />
            About
          </Link>
          <Link
            href="/admin/portfolio"
            className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <Briefcase className="mr-3 h-5 w-5 text-gray-500" />
            Portfolio
          </Link>
          <Link
            href="/admin/services"
            className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <Layers className="mr-3 h-5 w-5 text-gray-500" />
            Services
          </Link>
          <Link
            href="/admin/analytics"
            className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <BarChart3 className="mr-3 h-5 w-5 text-gray-500" />
            Analytics
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <Settings className="mr-3 h-5 w-5 text-gray-500" />
            Settings
          </Link>
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="space-y-1">
              <Link
                href="/"
                className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
              >
                <Home className="mr-3 h-5 w-5 text-gray-500" />
                View Site
              </Link>
              <button 
                onClick={handleLogout}
                className="flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="mr-3 h-5 w-5 text-gray-500" />
                Logout
              </button>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 backdrop-blur-sm transition-opacity" onClick={toggleMobileMenu}></div>
          <div className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white shadow-xl admin-sidebar transition-transform duration-300">
            <div className="flex h-16 items-center border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600 px-4">
              <Link href="/admin" className="flex items-center gap-2 font-bold text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white bg-opacity-20 text-white backdrop-blur-sm">CM</span>
                <span className="text-lg tracking-tight">IT CMS</span>
              </Link>
              <button
                className="ml-auto rounded-md p-1 text-white hover:bg-white hover:bg-opacity-10"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Close sidebar</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
              <Link
                href="/admin"
                className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
                onClick={toggleMobileMenu}
              >
                <LayoutDashboard className="mr-3 h-5 w-5 text-blue-500" />
                Dashboard
              </Link>
              <Link
                href="/admin/pages"
                className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
                onClick={toggleMobileMenu}
              >
                <FileText className="mr-3 h-5 w-5 text-gray-500" />
                Pages
              </Link>
              <Link
                href="/admin/media"
                className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
                onClick={toggleMobileMenu}
              >
                <ImageIcon className="mr-3 h-5 w-5 text-gray-500" />
                Media
              </Link>
              <Link
                href="/admin/team"
                className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
                onClick={toggleMobileMenu}
              >
                <Users className="mr-3 h-5 w-5 text-gray-500" />
                Team
              </Link>
              <Link
                href="/admin/about"
                className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
                onClick={toggleMobileMenu}
              >
                <Info className="mr-3 h-5 w-5 text-gray-500" />
                About
              </Link>
              <Link
                href="/admin/portfolio"
                className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
                onClick={toggleMobileMenu}
              >
                <Briefcase className="mr-3 h-5 w-5 text-gray-500" />
                Portfolio
              </Link>
              <Link
                href="/admin/services"
                className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
                onClick={toggleMobileMenu}
              >
                <Layers className="mr-3 h-5 w-5 text-gray-500" />
                Services
              </Link>
              <Link
                href="/admin/analytics"
                className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
                onClick={toggleMobileMenu}
              >
                <BarChart3 className="mr-3 h-5 w-5 text-gray-500" />
                Analytics
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
                onClick={toggleMobileMenu}
              >
                <Settings className="mr-3 h-5 w-5 text-gray-500" />
                Settings
              </Link>
              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="space-y-1">
                  <Link
                    href="/"
                    className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
                    onClick={toggleMobileMenu}
                  >
                    <Home className="mr-3 h-5 w-5 text-gray-500" />
                    View Site
                  </Link>
                  <button 
                    onClick={() => {
                      toggleMobileMenu();
                      handleLogout();
                    }}
                    className="flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <LogOut className="mr-3 h-5 w-5 text-gray-500" />
                    Logout
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col md:pl-64">
        <header className="sticky top-0 z-10 flex h-16 items-center border-b border-gray-200 bg-white px-6 shadow-sm">
          <button 
            onClick={toggleMobileMenu}
            className="mr-4 rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 md:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
                  <span className="flex h-full w-full items-center justify-center text-sm font-medium">
                    {session?.user?.name?.[0] || session?.user?.email?.[0] || 'U'}
                  </span>
                </div>
                <span className="hidden text-sm font-medium text-gray-700 md:inline-block">
                  {session?.user?.name || session?.user?.email || 'User'}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 admin-content bg-white text-gray-900">{children}</main>
      </div>
    </div>
  )
}
