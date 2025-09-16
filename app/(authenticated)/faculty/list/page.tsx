'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Eye, Edit, Trash2, Plus, Filter, GraduationCap } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'

export default function FacultyListPage() {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')

  const faculty = [
    {
      id: '1',
      employeeId: 'EMP001',
      name: 'Dr. Sarah Johnson',
      designation: 'Professor',
      department: 'Medical-Surgical Nursing',
      qualification: 'M.Sc. Nursing, Ph.D.',
      experience: '15 years',
      status: 'active',
      email: 'sarah@aine.org.in',
      phone: '+91 9876543210',
      salary: '₹75,000'
    },
    {
      id: '2',
      employeeId: 'EMP002',
      name: 'Prof. Michael Chen',
      designation: 'Associate Professor',
      department: 'Community Health Nursing',
      qualification: 'M.Sc. Nursing',
      experience: '12 years',
      status: 'active',
      email: 'michael@aine.org.in',
      phone: '+91 9876543211',
      salary: '₹65,000'
    },
    {
      id: '3',
      employeeId: 'EMP003',
      name: 'Dr. Priya Sharma',
      designation: 'Assistant Professor',
      department: 'Obstetrics & Gynecological Nursing',
      qualification: 'M.Sc. Nursing, Ph.D.',
      experience: '8 years',
      status: 'on-leave',
      email: 'priya@aine.org.in',
      phone: '+91 9876543212',
      salary: '₹55,000'
    }
  ]

  const filteredFaculty = faculty.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterDepartment === 'all' || member.department === filterDepartment
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Faculty List</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage and view all faculty members
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Faculty
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
                  placeholder="Search faculty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className={`px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              >
                <option value="all">All Departments</option>
                <option value="Medical-Surgical Nursing">Medical-Surgical Nursing</option>
                <option value="Community Health Nursing">Community Health Nursing</option>
                <option value="Obstetrics & Gynecological Nursing">Obstetrics & Gynecological Nursing</option>
                <option value="Child Health Nursing">Child Health Nursing</option>
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Faculty Table */}
      <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardHeader>
          <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Faculty Members</CardTitle>
          <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Complete list of all faculty members
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
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Department</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Qualification</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Experience</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Status</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFaculty.map((member) => (
                  <TableRow key={member.id} className={theme === 'dark' ? 'border-gray-700' : ''}>
                    <TableCell className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>
                      {member.employeeId}
                    </TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <GraduationCap className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            {member.salary}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{member.designation}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{member.department}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{member.qualification}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{member.experience}</TableCell>
                    <TableCell>
                      <Badge
                        variant={member.status === 'active' ? 'default' : member.status === 'on-leave' ? 'secondary' : 'destructive'}
                      >
                        {member.status}
                      </Badge>
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
