'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Calendar, CheckCircle, XCircle, Clock, Users, Search } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'

export default function AttendancePage() {
  const { theme } = useTheme()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [searchTerm, setSearchTerm] = useState('')

  const attendanceData = [
    {
      id: '1',
      studentId: 'ADM001',
      name: 'Priya Sharma',
      course: 'B.Sc. Nursing',
      year: 2024,
      status: 'present',
      timeIn: '09:00 AM',
      timeOut: '05:00 PM'
    },
    {
      id: '2',
      studentId: 'ADM002',
      name: 'Rajesh Kumar',
      course: 'GNM',
      year: 2024,
      status: 'absent',
      timeIn: '-',
      timeOut: '-'
    },
    {
      id: '3',
      studentId: 'ADM003',
      name: 'Anita Singh',
      course: 'Post Basic B.Sc. Nursing',
      year: 2024,
      status: 'late',
      timeIn: '09:30 AM',
      timeOut: '05:00 PM'
    }
  ]

  const filteredData = attendanceData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'late':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      present: 'default',
      absent: 'destructive',
      late: 'secondary'
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
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Student Attendance</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Track and manage student attendance
          </p>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          Mark Attendance
        </Button>
      </div>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Students</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>150</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Present Today</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>120</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Absent Today</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>25</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Late Today</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Date and Search */}
      <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-48"
              />
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Today
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardHeader>
          <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Attendance for {selectedDate}</CardTitle>
          <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Daily attendance record
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className={theme === 'dark' ? 'border-gray-700' : ''}>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Student ID</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Name</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Course</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Status</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Time In</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Time Out</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((student) => (
                  <TableRow key={student.id} className={theme === 'dark' ? 'border-gray-700' : ''}>
                    <TableCell className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>
                      {student.studentId}
                    </TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{student.name}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{student.course}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(student.status)}
                        {getStatusBadge(student.status)}
                      </div>
                    </TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{student.timeIn}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{student.timeOut}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
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
