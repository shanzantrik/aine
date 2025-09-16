import { createClient } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  BarChart3,
  FileText,
  Download,
  Users,
  DollarSign,
  Package,
  TrendingUp,
  Calendar,
  Filter
} from 'lucide-react'

export default async function ReportsPage() {
  const supabase = await createClient()

  // Fetch data for reports
  const [
    { count: totalStudents },
    { data: recentFees },
    { data: recentExpenses },
    { data: stockItems }
  ] = await Promise.all([
    supabase.from('students').select('*', { count: 'exact', head: true }),
    supabase.from('fees').select('*').order('created_at', { ascending: false }).limit(10),
    supabase.from('expenses').select('*').order('created_at', { ascending: false }).limit(10),
    supabase.from('stock_items').select('*').order('created_at', { ascending: false }).limit(10)
  ])

  const totalFees = recentFees?.reduce((sum, fee) => sum + fee.amount, 0) || 0
  const totalStockValue = stockItems?.reduce((sum, item) => sum + (item.qty_available * item.unit_price), 0) || 0

  const reportCategories = [
    {
      name: 'Student Reports',
      description: 'Academic and attendance reports',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      reports: [
        { name: 'Student List', description: 'Complete student directory' },
        { name: 'Attendance Report', description: 'Daily/monthly attendance' },
        { name: 'Academic Performance', description: 'Marks and grades' },
        { name: 'Cumulative Records', description: 'Complete student history' }
      ]
    },
    {
      name: 'Financial Reports',
      description: 'Revenue and expense analysis',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      reports: [
        { name: 'Fee Collection', description: 'Student fee payments' },
        { name: 'Expense Report', description: 'Institute expenses' },
        { name: 'Salary Report', description: 'Faculty salary details' },
        { name: 'Profit & Loss', description: 'Financial summary' }
      ]
    },
    {
      name: 'Stock Reports',
      description: 'Inventory and requisition reports',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      reports: [
        { name: 'Stock Register', description: 'Complete inventory list' },
        { name: 'Low Stock Alert', description: 'Items below threshold' },
        { name: 'Requisition Report', description: 'Material requests' },
        { name: 'Usage Report', description: 'Item consumption' }
      ]
    },
    {
      name: 'Administrative Reports',
      description: 'Leave and administrative data',
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      reports: [
        { name: 'Leave Report', description: 'Faculty leave statistics' },
        { name: 'Faculty Workload', description: 'Teaching assignments' },
        { name: 'Department Report', description: 'Department-wise data' },
        { name: 'Audit Trail', description: 'System activity log' }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="mt-2 text-gray-600">
            Generate comprehensive reports and analytics
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter Reports
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-semibold text-gray-900">{totalStudents || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">₹{totalFees.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Stock Value</p>
                <p className="text-2xl font-semibold text-gray-900">₹{totalStockValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-orange-100">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                <p className="text-2xl font-semibold text-gray-900">+12%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {reportCategories.map((category) => (
          <Card key={category.name}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${category.bgColor}`}>
                  <category.icon className={`h-6 w-6 ${category.color}`} />
                </div>
                <div>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.reports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <h4 className="font-medium text-gray-900">{report.name}</h4>
                      <p className="text-sm text-gray-600">{report.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reports</CardTitle>
          <CardDescription>
            Generate commonly used reports instantly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="font-medium">Monthly Summary</h3>
                  <p className="text-sm text-gray-600">Current month overview</p>
                </div>
              </div>
            </button>
            <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-medium">Attendance Chart</h3>
                  <p className="text-sm text-gray-600">Visual attendance data</p>
                </div>
              </div>
            </button>
            <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div>
                  <h3 className="font-medium">Performance Trends</h3>
                  <p className="text-sm text-gray-600">Academic performance</p>
                </div>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
