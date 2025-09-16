'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BarChart3, Download, DollarSign, TrendingUp, TrendingDown, Calendar, Users, GraduationCap } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'

export default function FinancialReportsPage() {
  const { theme } = useTheme()
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedPeriod, setSelectedPeriod] = useState('monthly')

  const financialData = {
    totalRevenue: 2500000,
    totalExpenses: 1800000,
    netProfit: 700000,
    monthlyRevenue: [
      { month: 'Jan', revenue: 200000, expenses: 150000 },
      { month: 'Feb', revenue: 220000, expenses: 160000 },
      { month: 'Mar', revenue: 250000, expenses: 170000 },
      { month: 'Apr', revenue: 230000, expenses: 165000 },
      { month: 'May', revenue: 240000, expenses: 175000 },
      { month: 'Jun', revenue: 260000, expenses: 180000 }
    ],
    revenueSources: {
      'Student Fees': 1800000,
      'Government Grants': 400000,
      'Donations': 200000,
      'Other Income': 100000
    },
    expenseCategories: {
      'Faculty Salaries': 1000000,
      'Infrastructure': 300000,
      'Equipment & Supplies': 200000,
      'Administrative': 150000,
      'Utilities': 100000,
      'Other Expenses': 50000
    }
  }

  const monthlyData = financialData.monthlyRevenue

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Financial Reports</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Comprehensive financial analytics and reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button>
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex gap-4">
              <div>
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className={`px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                >
                  <option value={2024}>2024</option>
                  <option value={2023}>2023</option>
                  <option value={2022}>2022</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Period
                </label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className={`px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Revenue</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  ₹{financialData.totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Expenses</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  ₹{financialData.totalExpenses.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Net Profit</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  ₹{financialData.netProfit.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Revenue Chart */}
      <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardHeader>
          <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Monthly Revenue vs Expenses</CardTitle>
          <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Revenue and expense trends for {selectedYear}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map((data) => (
              <div key={data.month} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{data.month}</span>
                  <div className="flex space-x-4 text-sm">
                    <span className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>
                      Revenue: ₹{data.revenue.toLocaleString()}
                    </span>
                    <span className={theme === 'dark' ? 'text-red-400' : 'text-red-600'}>
                      Expenses: ₹{data.expenses.toLocaleString()}
                    </span>
                    <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>
                      Profit: ₹{(data.revenue - data.expenses).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="flex h-2 rounded-full">
                    <div
                      className="bg-green-500"
                      style={{ width: `${(data.revenue / Math.max(...monthlyData.map(d => d.revenue))) * 100}%` }}
                    ></div>
                    <div
                      className="bg-red-500"
                      style={{ width: `${(data.expenses / Math.max(...monthlyData.map(d => d.revenue))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Sources and Expense Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardHeader>
            <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Revenue Sources</CardTitle>
            <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Breakdown of revenue by source
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(financialData.revenueSources).map(([source, amount]) => (
                <div key={source} className="flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{source}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(amount / financialData.totalRevenue) * 100}%` }}
                      ></div>
                    </div>
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      ₹{amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardHeader>
            <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Expense Categories</CardTitle>
            <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Breakdown of expenses by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(financialData.expenseCategories).map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{category}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${(amount / financialData.totalExpenses) * 100}%` }}
                      ></div>
                    </div>
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      ₹{amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Summary Table */}
      <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardHeader>
          <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Financial Summary</CardTitle>
          <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Key financial metrics and indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className={theme === 'dark' ? 'border-gray-700' : ''}>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Metric</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Amount</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Percentage</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className={theme === 'dark' ? 'border-gray-700' : ''}>
                  <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>Total Revenue</TableCell>
                  <TableCell className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>
                    ₹{financialData.totalRevenue.toLocaleString()}
                  </TableCell>
                  <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>100%</TableCell>
                  <TableCell>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +12%
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className={theme === 'dark' ? 'border-gray-700' : ''}>
                  <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>Total Expenses</TableCell>
                  <TableCell className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>
                    ₹{financialData.totalExpenses.toLocaleString()}
                  </TableCell>
                  <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>
                    {((financialData.totalExpenses / financialData.totalRevenue) * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-red-600">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      +8%
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className={theme === 'dark' ? 'border-gray-700' : ''}>
                  <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>Net Profit</TableCell>
                  <TableCell className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>
                    ₹{financialData.netProfit.toLocaleString()}
                  </TableCell>
                  <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>
                    {((financialData.netProfit / financialData.totalRevenue) * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +15%
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
