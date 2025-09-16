'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Calendar, Clock, BookOpen, Users, Search, Filter } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'

export default function FacultyWorkloadPage() {
  const { theme } = useTheme()
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  const [searchTerm, setSearchTerm] = useState('')

  const workloadData = [
    {
      id: '1',
      facultyId: 'EMP001',
      name: 'Dr. Sarah Johnson',
      department: 'Medical-Surgical Nursing',
      totalHours: 40,
      theoryHours: 20,
      practicalHours: 20,
      subjects: ['Medical-Surgical Nursing I', 'Medical-Surgical Nursing II'],
      classes: 8,
      status: 'normal'
    },
    {
      id: '2',
      facultyId: 'EMP002',
      name: 'Prof. Michael Chen',
      department: 'Community Health Nursing',
      totalHours: 45,
      theoryHours: 25,
      practicalHours: 20,
      subjects: ['Community Health Nursing', 'Public Health'],
      classes: 10,
      status: 'overloaded'
    },
    {
      id: '3',
      facultyId: 'EMP003',
      name: 'Dr. Priya Sharma',
      department: 'Obstetrics & Gynecological Nursing',
      totalHours: 35,
      theoryHours: 15,
      practicalHours: 20,
      subjects: ['Obstetrics Nursing', 'Gynecological Nursing'],
      classes: 7,
      status: 'underloaded'
    }
  ]

  const filteredData = workloadData.filter(faculty =>
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.facultyId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    const variants = {
      normal: 'default',
      overloaded: 'destructive',
      underloaded: 'secondary'
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'default'}>
        {status}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Faculty Workload</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Track and manage faculty teaching workload
          </p>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Workload Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Faculty</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>25</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Normal Load</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>18</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Overloaded</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Underloaded</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>2</p>
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
                <input
                  type="text"
                  placeholder="Search faculty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className={`px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workload Table */}
      <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardHeader>
          <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Faculty Workload - {selectedMonth}</CardTitle>
          <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Teaching hours and workload distribution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className={theme === 'dark' ? 'border-gray-700' : ''}>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Faculty ID</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Name</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Department</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Total Hours</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Theory</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Practical</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Classes</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((faculty) => (
                  <TableRow key={faculty.id} className={theme === 'dark' ? 'border-gray-700' : ''}>
                    <TableCell className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>
                      {faculty.facultyId}
                    </TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{faculty.name}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{faculty.department}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>
                      <div className="font-medium">{faculty.totalHours}h</div>
                    </TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{faculty.theoryHours}h</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{faculty.practicalHours}h</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{faculty.classes}</TableCell>
                    <TableCell>
                      {getStatusBadge(faculty.status)}
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
