'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Users,
  GraduationCap,
  DollarSign,
  Package,
  TrendingUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const { theme } = useTheme()
  const [stats, setStats] = useState({
    studentCount: 0,
    facultyCount: 0,
    pendingLeaves: 0,
    lowStockItems: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { count: studentCount },
          { count: facultyCount },
          { count: pendingLeaves },
          { count: lowStockItems }
        ] = await Promise.all([
          supabase.from('students').select('*', { count: 'exact', head: true }),
          supabase.from('faculty').select('*', { count: 'exact', head: true }),
          supabase.from('leaves').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('stock_items').select('*', { count: 'exact', head: true }).lt('qty_available', 10)
        ])

        setStats({
          studentCount: studentCount || 0,
          facultyCount: facultyCount || 0,
          pendingLeaves: pendingLeaves || 0,
          lowStockItems: lowStockItems || 0
        })
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const statsData = [
    {
      name: 'Total Students',
      value: stats.studentCount,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Faculty Members',
      value: stats.facultyCount,
      icon: GraduationCap,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Pending Leaves',
      value: stats.pendingLeaves,
      icon: AlertCircle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      name: 'Low Stock Items',
      value: stats.lowStockItems,
      icon: Package,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ]

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className={`text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
            Dashboard
          </h1>
          <p className={`mt-2 text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Loading...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className={`mt-2 text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Welcome to the Nursing Institute Management System
        </p>
      </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat) => (
            <div key={stat.name} className="stats-card card-hover">
              <div className="flex items-center">
                <div className={`p-4 rounded-2xl ${stat.bgColor} shadow-lg`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{stat.name}</p>
                  <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions and recent activity */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Quick Actions */}
          <div className="stats-card">
            <div className="mb-6">
              <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>Quick Actions</h3>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Common tasks and shortcuts
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className={`p-6 text-left border-2 ${theme === 'dark' ? 'border-gray-600 hover:border-blue-400 hover:bg-gray-700' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'} rounded-xl transition-all duration-300 transform hover:scale-105`}>
                <Users className="h-10 w-10 text-blue-600 mb-3" />
                <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Add Student</h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>New admission</p>
              </button>
              <button className={`p-6 text-left border-2 ${theme === 'dark' ? 'border-gray-600 hover:border-green-400 hover:bg-gray-700' : 'border-gray-200 hover:border-green-300 hover:bg-green-50'} rounded-xl transition-all duration-300 transform hover:scale-105`}>
                <GraduationCap className="h-10 w-10 text-green-600 mb-3" />
                <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Mark Attendance</h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Daily attendance</p>
              </button>
              <button className={`p-6 text-left border-2 ${theme === 'dark' ? 'border-gray-600 hover:border-yellow-400 hover:bg-gray-700' : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'} rounded-xl transition-all duration-300 transform hover:scale-105`}>
                <DollarSign className="h-10 w-10 text-yellow-600 mb-3" />
                <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Process Salary</h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Monthly payroll</p>
              </button>
              <button className={`p-6 text-left border-2 ${theme === 'dark' ? 'border-gray-600 hover:border-purple-400 hover:bg-gray-700' : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'} rounded-xl transition-all duration-300 transform hover:scale-105`}>
                <Package className="h-10 w-10 text-purple-600 mb-3" />
                <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Stock Request</h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Material requisition</p>
              </button>
            </div>
          </div>

        {/* Recent Activity */}
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardHeader>
            <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Recent Activity</CardTitle>
            <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Latest updates and notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    New student admission completed
                  </p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Leave application pending approval
                  </p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Monthly fee collection report generated
                  </p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
    </div>
  )
}
