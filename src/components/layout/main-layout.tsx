'use client'

import { useState } from 'react'
import { Footer } from './footer'
import { Sidebar } from './sidebar'
import { UserDropdown } from '@/components/ui/user-dropdown'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface MainLayoutProps {
  children: React.ReactNode
  user: {
    name: string
    role: string
    designation?: string
  }
}

export function MainLayout({ children, user }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className={`h-screen flex overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <Sidebar user={user} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <Sidebar user={user} />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Header */}
        <div className={`relative z-10 flex-shrink-0 flex h-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
          <Button
            variant="ghost"
            size="icon"
            className={`px-4 border-r ${theme === 'dark' ? 'border-gray-700 text-gray-300 hover:text-white' : 'border-gray-200 text-gray-500 hover:text-gray-700'} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden`}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className={`h-6 w-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`} />
          </Button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className={`relative w-full ${theme === 'dark' ? 'text-gray-400 focus-within:text-gray-300' : 'text-gray-400 focus-within:text-gray-600'}`}>
                  <div className="flex items-center h-16">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">A</span>
                      </div>
                      <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>AINE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <UserDropdown
                user={user}
                onLogout={handleLogout}
                onThemeToggle={toggleTheme}
                isDarkMode={theme === 'dark'}
              />
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
