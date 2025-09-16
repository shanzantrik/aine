'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BarChart3, Download, Users, GraduationCap } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'

export default function StudentReportsPage() {
  const { theme } = useTheme()
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedCourse, setSelectedCourse] = useState('all')

  const studentStats = {
    totalStudents: 150,
    newAdmissions: 25,
    graduated: 20,
    activeStudents: 105,
    courseDistribution: {
      'B.Sc. Nursing': 80,
      'GNM': 40,
      'Post Basic B.Sc. Nursing': 20,
      'M.Sc. Nursing': 10
    },
    genderDistribution: {
      'Female': 120,
      'Male': 30
    }
  }


  const topPerformers = [
    { name: 'Priya Sharma', course: 'B.Sc. Nursing', year: 2024, gpa: 9.2, rank: 1 },
    { name: 'Rajesh Kumar', course: 'B.Sc. Nursing', year: 2024, gpa: 9.0, rank: 2 },
    { name: 'Anita Singh', course: 'Post Basic B.Sc. Nursing', year: 2024, gpa: 8.8, rank: 3 },
    { name: 'Suresh Patel', course: 'GNM', year: 2024, gpa: 8.6, rank: 4 },
    { name: 'Meera Joshi', course: 'B.Sc. Nursing', year: 2024, gpa: 8.4, rank: 5 }
  ]

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Student Reports</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Comprehensive student analytics and reports
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
                  Academic Year
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
                  Course
                </label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className={`px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                >
                  <option value="all">All Courses</option>
                  <option value="B.Sc. Nursing">B.Sc. Nursing</option>
                  <option value="GNM">GNM</option>
                  <option value="Post Basic B.Sc. Nursing">Post Basic B.Sc. Nursing</option>
                  <option value="M.Sc. Nursing">M.Sc. Nursing</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Students</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{studentStats.totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>New Admissions</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{studentStats.newAdmissions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Graduated</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{studentStats.graduated}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Active Students</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{studentStats.activeStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardHeader>
            <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Course Distribution</CardTitle>
            <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Student distribution across different courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(studentStats.courseDistribution).map(([course, count]) => (
                <div key={course} className="flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{course}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(count / studentStats.totalStudents) * 100}%` }}
                      ></div>
                    </div>
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardHeader>
            <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Gender Distribution</CardTitle>
            <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Student gender distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(studentStats.genderDistribution).map(([gender, count]) => (
                <div key={gender} className="flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{gender}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${gender === 'Female' ? 'bg-pink-600' : 'bg-blue-600'}`}
                        style={{ width: `${(count / studentStats.totalStudents) * 100}%` }}
                      ></div>
                    </div>
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardHeader>
          <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Top Performers</CardTitle>
          <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Students with highest academic performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className={theme === 'dark' ? 'border-gray-700' : ''}>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Rank</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Name</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Course</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Year</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>GPA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPerformers.map((student) => (
                  <TableRow key={student.rank} className={theme === 'dark' ? 'border-gray-700' : ''}>
                    <TableCell className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>
                      <Badge variant={student.rank <= 3 ? 'default' : 'secondary'}>
                        #{student.rank}
                      </Badge>
                    </TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{student.name}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{student.course}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{student.year}</TableCell>
                    <TableCell className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>{student.gpa}</TableCell>
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
