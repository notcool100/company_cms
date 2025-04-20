"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { BarChart3, FileText, Home, ImageIcon, LayoutDashboard, LogOut, Settings, Users } from "lucide-react"

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
    <div className="flex min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-gray-200 bg-white shadow-sm md:flex">
        <div className="flex h-14 items-center border-b border-gray-200 px-4">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-gray-900">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white">CM</span>
            <span>IT CMS</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          <Link
            href="/admin"
            className="flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
          >
            <LayoutDashboard className="mr-3 h-5 w-5 text-gray-500" />
            Dashboard
          </Link>
          <Link
            href="/admin/pages"
            className="flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            <FileText className="mr-3 h-5 w-5 text-gray-400" />
            Pages
          </Link>
          <Link
            href="/admin/media"
            className="flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            <ImageIcon className="mr-3 h-5 w-5 text-gray-400" />
            Media
          </Link>
          <Link
            href="/admin/team"
            className="flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            <Users className="mr-3 h-5 w-5 text-gray-400" />
            Team
          </Link>
          <Link
            href="/admin/analytics"
            className="flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            <BarChart3 className="mr-3 h-5 w-5 text-gray-400" />
            Analytics
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            <Settings className="mr-3 h-5 w-5 text-gray-400" />
            Settings
          </Link>
          <div className="pt-4">
            <div className="space-y-1">
              <Link
                href="/"
                className="flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <Home className="mr-3 h-5 w-5 text-gray-400" />
                View Site
              </Link>
              <button 
                onClick={handleLogout}
                className="flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <LogOut className="mr-3 h-5 w-5 text-gray-400" />
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
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleMobileMenu}></div>
          <div className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white">
            <div className="flex h-14 items-center border-b border-gray-200 px-4">
              <Link href="/admin" className="flex items-center gap-2 font-bold text-gray-900">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white">CM</span>
                <span>IT CMS</span>
              </Link>
              <button
                className="ml-auto rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-600"
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
            <nav className="flex-1 space-y-1 px-2 py-4">
              <Link
                href="/admin"
                className="flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                onClick={toggleMobileMenu}
              >
                <LayoutDashboard className="mr-3 h-5 w-5 text-gray-500" />
                Dashboard
              </Link>
              <Link
                href="/admin/pages"
                className="flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                onClick={toggleMobileMenu}
              >
                <FileText className="mr-3 h-5 w-5 text-gray-400" />
                Pages
              </Link>
              <Link
                href="/admin/media"
                className="flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                onClick={toggleMobileMenu}
              >
                <ImageIcon className="mr-3 h-5 w-5 text-gray-400" />
                Media
              </Link>
              <Link
                href="/admin/team"
                className="flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                onClick={toggleMobileMenu}
              >
                <Users className="mr-3 h-5 w-5 text-gray-400" />
                Team
              </Link>
              <Link
                href="/admin/analytics"
                className="flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                onClick={toggleMobileMenu}
              >
                <BarChart3 className="mr-3 h-5 w-5 text-gray-400" />
                Analytics
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                onClick={toggleMobileMenu}
              >
                <Settings className="mr-3 h-5 w-5 text-gray-400" />
                Settings
              </Link>
              <div className="pt-4">
                <div className="space-y-1">
                  <Link
                    href="/"
                    className="flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    onClick={toggleMobileMenu}
                  >
                    <Home className="mr-3 h-5 w-5 text-gray-400" />
                    View Site
                  </Link>
                  <button 
                    onClick={() => {
                      toggleMobileMenu();
                      handleLogout();
                    }}
                    className="flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                    Logout
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col md:pl-64">
        <header className="sticky top-0 z-10 flex h-14 items-center border-b border-gray-200 bg-white px-4 shadow-sm">
          <button 
            onClick={toggleMobileMenu}
            className="mr-4 rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-600 md:hidden"
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
              <h1 className="text-lg font-medium text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-600 text-white">
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

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
