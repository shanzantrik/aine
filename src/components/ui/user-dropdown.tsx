'use client'

import { useState, useRef, useEffect } from 'react'
import { User, Settings, LogOut, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface UserDropdownProps {
  user: {
    name: string
    role: string
    designation?: string
  }
  onLogout: () => void
  onThemeToggle: () => void
  isDarkMode: boolean
}

export function UserDropdown({ user, onLogout, onThemeToggle, isDarkMode }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    onLogout()
    setIsOpen(false)
  }

  const handleThemeToggle = () => {
    onThemeToggle()
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
      >
        <div className={`h-8 w-8 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'} rounded-full flex items-center justify-center`}>
          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="hidden md:block text-left">
          <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</p>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.designation || user.role}</p>
        </div>
      </Button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-48 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50`}>
          <div className="py-1">
            {/* User Info */}
            <div className={`px-4 py-2 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.designation || user.role}</p>
            </div>

            {/* Profile */}
            <button
              onClick={() => setIsOpen(false)}
              className={`flex items-center w-full px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <User className="mr-3 h-4 w-4" />
              Profile
            </button>

            {/* Settings */}
            <button
              onClick={() => setIsOpen(false)}
              className={`flex items-center w-full px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </button>

            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className={`flex items-center w-full px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              {isDarkMode ? (
                <Sun className="mr-3 h-4 w-4" />
              ) : (
                <Moon className="mr-3 h-4 w-4" />
              )}
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className={`flex items-center w-full px-4 py-2 text-sm ${isDarkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'}`}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
