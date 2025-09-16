'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Users,
  GraduationCap,
  DollarSign,
  Package,
  FileText,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/theme-context'

interface SidebarProps {
  user: {
    role: string
  }
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    roles: ['admin', 'principal', 'faculty', 'accountant', 'clerk', 'student']
  },
  {
    name: 'Students',
    href: '/students',
    icon: Users,
    roles: ['admin', 'principal', 'faculty'],
    subItems: [
      { name: 'Admissions', href: '/students/admissions' },
      { name: 'Records', href: '/students/records' },
      { name: 'Attendance', href: '/students/attendance' },
    ]
  },
  {
    name: 'Faculty',
    href: '/faculty',
    icon: GraduationCap,
    roles: ['admin', 'principal'],
    subItems: [
      { name: 'Faculty List', href: '/faculty/list' },
      { name: 'Leave Management', href: '/faculty/leaves' },
      { name: 'Workload', href: '/faculty/workload' },
    ]
  },
  {
    name: 'Finance',
    href: '/finance',
    icon: DollarSign,
    roles: ['admin', 'principal', 'accountant'],
    subItems: [
      { name: 'Salary', href: '/finance/salary' },
      { name: 'Fees', href: '/finance/fees' },
      { name: 'Expenses', href: '/finance/expenses' },
    ]
  },
  {
    name: 'Stock',
    href: '/stock',
    icon: Package,
    roles: ['admin', 'principal', 'clerk'],
    subItems: [
      { name: 'Stock Register', href: '/stock/register' },
      { name: 'Requisitions', href: '/stock/requisitions' },
      { name: 'Items', href: '/stock/items' },
    ]
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: BarChart3,
    roles: ['admin', 'principal'],
    subItems: [
      { name: 'Student Reports', href: '/reports/students' },
      { name: 'Financial Reports', href: '/reports/financial' },
      { name: 'Stock Reports', href: '/reports/stock' },
    ]
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['admin']
  },
]

export function Sidebar({ user }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()
  const { theme } = useTheme()

  const filteredNavigation = navigation.filter(item =>
    item.roles.includes(user.role)
  )

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev =>
      prev.includes(itemName)
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

  return (
    <div className={`flex flex-col w-64 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-r ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} h-full`}>
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>AINE</span>
          </div>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href ||
              (item.subItems && item.subItems.some(subItem => pathname === subItem.href))
            const isExpanded = expandedItems.includes(item.name)

            return (
              <div key={item.name}>
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                      isActive
                        ? theme === 'dark'
                          ? 'bg-blue-900 text-blue-300'
                          : 'bg-blue-100 text-blue-700'
                        : theme === 'dark'
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                  {item.subItems && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`ml-auto p-1 ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                      onClick={() => toggleExpanded(item.name)}
                    >
                      {isExpanded ? (
                        <ChevronDown className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                      ) : (
                        <ChevronRight className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                      )}
                    </Button>
                  )}
                </div>
                {item.subItems && isExpanded && (
                  <div className="ml-8 space-y-1">
                    {item.subItems.map((subItem) => {
                      const isSubActive = pathname === subItem.href
                      return (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                            isSubActive
                              ? theme === 'dark'
                                ? 'bg-blue-800 text-blue-200'
                                : 'bg-blue-50 text-blue-700'
                              : theme === 'dark'
                                ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
