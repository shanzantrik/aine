'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Eye, Edit, Trash2, Plus, Filter } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'

export default function StudentRecordsPage() {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const students = [
    {
      id: '1',
      admissionNo: 'ADM001',
      name: 'Priya Sharma',
      course: 'B.Sc. Nursing',
      year: 2024,
      status: 'active',
      email: 'priya@example.com',
      phone: '+91 9876543210'
    },
    {
      id: '2',
      admissionNo: 'ADM002',
      name: 'Rajesh Kumar',
      course: 'GNM',
      year: 2024,
      status: 'active',
      email: 'rajesh@example.com',
      phone: '+91 9876543211'
    },
    {
      id: '3',
      admissionNo: 'ADM003',
      name: 'Anita Singh',
      course: 'Post Basic B.Sc. Nursing',
      year: 2024,
      status: 'graduated',
      email: 'anita@example.com',
      phone: '+91 9876543212'
    }
  ]

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || student.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Student Records</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage and view all student records
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Search and Filter */}
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
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="graduated">Graduated</option>
                <option value="suspended">Suspended</option>
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardHeader>
          <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Student Records</CardTitle>
          <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Complete list of all students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className={theme === 'dark' ? 'border-gray-700' : ''}>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Admission No.</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Name</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Course</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Year</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Status</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Contact</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className={theme === 'dark' ? 'border-gray-700' : ''}>
                    <TableCell className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>
                      {student.admissionNo}
                    </TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{student.name}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{student.course}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{student.year}</TableCell>
                    <TableCell>
                      <Badge
                        variant={student.status === 'active' ? 'default' : student.status === 'graduated' ? 'secondary' : 'destructive'}
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>
                      <div className="text-sm">
                        <div>{student.email}</div>
                        <div className="text-gray-500">{student.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
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
