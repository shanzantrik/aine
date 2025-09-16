import { createClient } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  GraduationCap,
  Package,
  FileText,
  Download,
  Plus
} from 'lucide-react'

export default async function FinancePage() {
  const supabase = await createClient()

  // Fetch financial data
  const [
    { count: totalStudents },
    { data: recentFees },
    { data: recentExpenses }
  ] = await Promise.all([
    supabase.from('students').select('*', { count: 'exact', head: true }),
    supabase.from('fees').select('*').order('created_at', { ascending: false }).limit(5),
    supabase.from('expenses').select('*').order('created_at', { ascending: false }).limit(5)
  ])

  const totalFees = recentFees?.reduce((sum, fee) => sum + fee.amount, 0) || 0
  const totalExpenses = recentExpenses?.reduce((sum, expense) => sum + expense.amount, 0) || 0
  const netIncome = totalFees - totalExpenses

  const financialStats = [
    {
      name: 'Total Revenue',
      value: `₹${totalFees.toLocaleString()}`,
      change: '+12%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Total Expenses',
      value: `₹${totalExpenses.toLocaleString()}`,
      change: '+8%',
      changeType: 'negative',
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      name: 'Net Income',
      value: `₹${netIncome.toLocaleString()}`,
      change: '+15%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Active Students',
      value: totalStudents?.toString() || '0',
      change: '+5%',
      changeType: 'positive',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Finance Management</h1>
          <p className="mt-2 text-gray-600">
            Manage fees, expenses, and financial reports
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {financialStats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Fee Management</CardTitle>
            <CardDescription>
              Manage student fees and collections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <DollarSign className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-medium">Collect Fees</h3>
                <p className="text-sm text-gray-600">Record fee payment</p>
              </button>
              <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <FileText className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-medium">Generate Receipt</h3>
                <p className="text-sm text-gray-600">Create fee receipt</p>
              </button>
              <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="h-8 w-8 text-purple-600 mb-2" />
                <h3 className="font-medium">Fee Reports</h3>
                <p className="text-sm text-gray-600">View fee analytics</p>
              </button>
              <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <TrendingUp className="h-8 w-8 text-yellow-600 mb-2" />
                <h3 className="font-medium">Outstanding</h3>
                <p className="text-sm text-gray-600">Pending payments</p>
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Management</CardTitle>
            <CardDescription>
              Track and manage institute expenses
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <Package className="h-8 w-8 text-orange-600 mb-2" />
                <h3 className="font-medium">Add Expense</h3>
                <p className="text-sm text-gray-600">Record new expense</p>
              </button>
              <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <FileText className="h-8 w-8 text-red-600 mb-2" />
                <h3 className="font-medium">Expense Report</h3>
                <p className="text-sm text-gray-600">View expense details</p>
              </button>
              <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <TrendingDown className="h-8 w-8 text-pink-600 mb-2" />
                <h3 className="font-medium">Budget Analysis</h3>
                <p className="text-sm text-gray-600">Compare with budget</p>
              </button>
              <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <GraduationCap className="h-8 w-8 text-indigo-600 mb-2" />
                <h3 className="font-medium">Department Wise</h3>
                <p className="text-sm text-gray-600">Expense by department</p>
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Salary Management</CardTitle>
            <CardDescription>
              Process faculty and staff salaries
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <GraduationCap className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-medium">Process Salary</h3>
                <p className="text-sm text-gray-600">Monthly payroll</p>
              </button>
              <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <FileText className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-medium">Salary Slips</h3>
                <p className="text-sm text-gray-600">Generate payslips</p>
              </button>
              <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
                <h3 className="font-medium">Salary Report</h3>
                <p className="text-sm text-gray-600">Salary analytics</p>
              </button>
              <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <DollarSign className="h-8 w-8 text-yellow-600 mb-2" />
                <h3 className="font-medium">Deductions</h3>
                <p className="text-sm text-gray-600">Manage deductions</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Fee Collections</CardTitle>
            <CardDescription>
              Latest fee payments received
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFees?.map((fee) => (
                <div key={fee.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Student Fee</p>
                    <p className="text-sm text-gray-600">
                      {new Date(fee.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">
                      +₹{fee.amount.toLocaleString()}
                    </p>
                    <Badge variant={fee.paid ? "success" : "warning"}>
                      {fee.paid ? "Paid" : "Pending"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
            <CardDescription>
              Latest expenses recorded
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentExpenses?.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-gray-600">
                      {expense.category} • {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">
                      -₹{expense.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
