'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DollarSign, Calendar, Download, Search, Filter, Plus, Eye } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'

export default function SalaryPage() {
  const { theme } = useTheme()
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  const [searchTerm, setSearchTerm] = useState('')

  const salaryData = [
    {
      id: '1',
      employeeId: 'EMP001',
      name: 'Dr. Sarah Johnson',
      designation: 'Professor',
      basicSalary: 50000,
      allowances: 15000,
      deductions: 5000,
      netSalary: 60000,
      status: 'paid',
      payDate: '2024-01-31'
    },
    {
      id: '2',
      employeeId: 'EMP002',
      name: 'Prof. Michael Chen',
      designation: 'Associate Professor',
      basicSalary: 45000,
      allowances: 12000,
      deductions: 4500,
      netSalary: 52500,
      status: 'paid',
      payDate: '2024-01-31'
    },
    {
      id: '3',
      employeeId: 'EMP003',
      name: 'Dr. Priya Sharma',
      designation: 'Assistant Professor',
      basicSalary: 40000,
      allowances: 10000,
      deductions: 4000,
      netSalary: 46000,
      status: 'pending',
      payDate: '-'
    }
  ]

  const filteredData = salaryData.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalSalary = salaryData.reduce((sum, emp) => sum + emp.netSalary, 0)
  const paidCount = salaryData.filter(emp => emp.status === 'paid').length
  const pendingCount = salaryData.filter(emp => emp.status === 'pending').length

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Salary Management</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage faculty and staff salary payments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Process Salary
          </Button>
        </div>
      </div>

      {/* Salary Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Salary</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>₹{totalSalary.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Paid</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{paidCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Pending</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>This Month</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{selectedMonth}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-48"
              />
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Salary Table */}
      <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardHeader>
          <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Salary Records - {selectedMonth}</CardTitle>
          <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Monthly salary payments and records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className={theme === 'dark' ? 'border-gray-700' : ''}>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Employee ID</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Name</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Designation</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Basic Salary</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Allowances</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Deductions</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Net Salary</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Status</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((employee) => (
                  <TableRow key={employee.id} className={theme === 'dark' ? 'border-gray-700' : ''}>
                    <TableCell className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>
                      {employee.employeeId}
                    </TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{employee.name}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{employee.designation}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>₹{employee.basicSalary.toLocaleString()}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>₹{employee.allowances.toLocaleString()}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>₹{employee.deductions.toLocaleString()}</TableCell>
                    <TableCell className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>₹{employee.netSalary.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={employee.status === 'paid' ? 'default' : 'secondary'}
                      >
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
