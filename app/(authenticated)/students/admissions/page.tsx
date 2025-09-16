'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Eye, Edit, CheckCircle, BookOpen, Users, DollarSign } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { courses, Course } from '@/data/courses'
import { useTheme } from '@/contexts/theme-context'

export default function AdmissionsPage() {
  const { theme } = useTheme()
  const [showForm, setShowForm] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    course_id: '',
    year: new Date().getFullYear(),
    email: '',
    phone: '',
    address: '',
    father_name: '',
    mother_name: '',
    previous_education: '',
    blood_group: '',
    emergency_contact: '',
    qualification: '',
    marks: '',
    experience: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Generate admission number
    const admissionNo = `ADM${Date.now()}`

    try {
      const { data, error } = await supabase
        .from('students')
        .insert([{
          admission_no: admissionNo,
          name: formData.name,
          dob: formData.dob,
          course_id: formData.course_id,
          year: formData.year,
          fees_status: 'pending'
        }])

      if (error) {
        console.error('Error creating student:', error)
      } else {
        console.log('Student created successfully:', data)
        setShowForm(false)
        setFormData({
          name: '',
          dob: '',
          course_id: '',
          year: new Date().getFullYear(),
          email: '',
          phone: '',
          address: '',
          father_name: '',
          mother_name: '',
          previous_education: '',
          blood_group: '',
          emergency_contact: '',
          qualification: '',
          marks: '',
          experience: ''
        })
      }
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }

  const admissionSteps = [
    { id: 1, name: 'Application', status: 'completed' },
    { id: 2, name: 'Document Verification', status: 'completed' },
    { id: 3, name: 'Fee Payment', status: 'in_progress' },
    { id: 4, name: 'Enrollment', status: 'pending' }
  ]

  const handleCourseSelect = (courseId: string) => {
    const course = courses.find(c => c.id === courseId)
    setSelectedCourse(course || null)
    setFormData({...formData, course_id: courseId})
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Student Admissions</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage student admission process and applications for AINE
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Admission
        </Button>
      </div>

      {/* Available Courses */}
      <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardHeader>
          <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Available Courses</CardTitle>
          <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Choose from our comprehensive nursing programs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className={`p-6 rounded-lg border-2 ${theme === 'dark' ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'} hover:border-blue-500 transition-colors cursor-pointer`}
                   onClick={() => handleCourseSelect(course.id)}>
                <div className="flex items-center mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{course.name}</h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{course.duration}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 text-green-600 mr-2" />
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{course.seats} seats available</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <DollarSign className="h-4 w-4 text-yellow-600 mr-2" />
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>₹{course.applicationFee} application fee</span>
                  </div>
                </div>
                <div className="text-sm">
                  <p className={`font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Key Eligibility:</p>
                  <ul className={`space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {course.eligibility.slice(0, 2).map((req, index) => (
                      <li key={index} className="text-xs">• {req}</li>
                    ))}
                    {course.eligibility.length > 2 && (
                      <li className="text-xs text-blue-600">+ {course.eligibility.length - 2} more requirements</li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Steps Navigation */}
      <Card>
        <CardHeader>
          <CardTitle>Admission Process Steps</CardTitle>
          <CardDescription>
            Track the progress of admission applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {admissionSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step.status === 'completed' ? 'bg-green-500 text-white' :
                    step.status === 'in_progress' ? 'bg-blue-500 text-white' :
                    'bg-gray-300 text-gray-600'
                  }`}>
                    {step.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : step.status === 'in_progress' ? (
                      <span className="text-sm font-medium">{step.id}</span>
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    {step.name}
                  </span>
                </div>
                {index < admissionSteps.length - 1 && (
                  <div className="flex-1 h-0.5 bg-gray-300 mx-4" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Admission Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardHeader>
              <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>New Student Admission</CardTitle>
              <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Fill in the student details for admission
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Full Name *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Date of Birth *
                    </label>
                    <Input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({...formData, dob: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Course *
                    </label>
                    <select
                      value={formData.course_id}
                      onChange={(e) => handleCourseSelect(e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                      required
                    >
                      <option value="">Select Course</option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.name} ({course.duration})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Academic Year *
                    </label>
                    <Input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Phone
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                </div>

                {/* Course Eligibility Display */}
                {selectedCourse && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Course Eligibility Requirements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-blue-800 mb-2">Eligibility Criteria:</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          {selectedCourse.eligibility.map((req, index) => (
                            <li key={index}>• {req}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800 mb-2">Course Details:</h4>
                        <div className="text-sm text-blue-700 space-y-1">
                          <p><strong>Duration:</strong> {selectedCourse.duration}</p>
                          <p><strong>Seats:</strong> {selectedCourse.seats}</p>
                          <p><strong>Application Fee:</strong> ₹{selectedCourse.applicationFee}</p>
                          {selectedCourse.ageLimit && <p><strong>Age Limit:</strong> {selectedCourse.ageLimit}</p>}
                          {selectedCourse.experienceRequired && <p><strong>Experience:</strong> {selectedCourse.experienceRequired}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Qualification *
                    </label>
                    <select
                      value={formData.qualification}
                      onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                      required
                    >
                      <option value="">Select Qualification</option>
                      <option value="10+2">10+2 (Higher Secondary)</option>
                      <option value="GNM">GNM (General Nursing and Midwifery)</option>
                      <option value="B.Sc. Nursing">B.Sc. Nursing</option>
                      <option value="Post Basic B.Sc. Nursing">Post Basic B.Sc. Nursing</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Marks Obtained (%) *
                    </label>
                    <Input
                      type="number"
                      value={formData.marks}
                      onChange={(e) => setFormData({...formData, marks: e.target.value})}
                      placeholder="Enter percentage"
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Father&apos;s Name
                    </label>
                    <Input
                      value={formData.father_name}
                      onChange={(e) => setFormData({...formData, father_name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Mother&apos;s Name
                    </label>
                    <Input
                      value={formData.mother_name}
                      onChange={(e) => setFormData({...formData, mother_name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Previous Education
                    </label>
                    <Input
                      value={formData.previous_education}
                      onChange={(e) => setFormData({...formData, previous_education: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Blood Group
                    </label>
                    <select
                      value={formData.blood_group}
                      onChange={(e) => setFormData({...formData, blood_group: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  {selectedCourse?.experienceRequired && (
                    <div>
                      <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                        Clinical Experience (Years)
                      </label>
                      <Input
                        type="number"
                        value={formData.experience}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                        placeholder="Enter years of experience"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Create Admission
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Admissions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Admissions</CardTitle>
          <CardDescription>
            Latest student admission applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Admission No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">ADM001</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>B.Sc Nursing</TableCell>
                  <TableCell>2024-01-15</TableCell>
                  <TableCell>
                    <Badge variant="warning">Under Review</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
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
