'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Plus, CheckCircle, XCircle, Clock, Calendar } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useTheme } from '@/contexts/theme-context'

interface LeaveApplication {
  id: string
  faculty_id: string
  date_from: string
  date_to: string
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  substitute_id: string | null
  created_at: string
  faculty: {
    name: string
    designation: string
  }
}

export default function LeaveManagementPage() {
  const { theme } = useTheme()
  const [leaves, setLeaves] = useState<LeaveApplication[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    date_from: '',
    date_to: '',
    reason: '',
    substitute_id: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaves()
  }, [])

  const fetchLeaves = async () => {
    try {
      const { data, error } = await supabase
        .from('leaves')
        .select(`
          *,
          faculty:faculty_id (
            name,
            designation
          )
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching leaves:', error)
      } else {
        setLeaves(data || [])
      }
    } catch (err) {
      console.error('Unexpected error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const { data, error } = await supabase
        .from('leaves')
        .insert([{
          faculty_id: 'current-user-id', // This should be the actual current user ID
          date_from: formData.date_from,
          date_to: formData.date_to,
          reason: formData.reason,
          substitute_id: formData.substitute_id || null,
          status: 'pending'
        }])

      if (error) {
        console.error('Error creating leave application:', error)
      } else {
        console.log('Leave application created successfully:', data)
        setShowForm(false)
        setFormData({
          date_from: '',
          date_to: '',
          reason: '',
          substitute_id: ''
        })
        fetchLeaves()
      }
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }

  const handleApprove = async (leaveId: string) => {
    try {
      const { error } = await supabase
        .from('leaves')
        .update({ status: 'approved' })
        .eq('id', leaveId)

      if (error) {
        console.error('Error approving leave:', error)
      } else {
        fetchLeaves()
      }
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }

  const handleReject = async (leaveId: string) => {
    try {
      const { error } = await supabase
        .from('leaves')
        .update({ status: 'rejected' })
        .eq('id', leaveId)

      if (error) {
        console.error('Error rejecting leave:', error)
      } else {
        fetchLeaves()
      }
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Approved</Badge>
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>
      case 'pending':
        return <Badge variant="warning">Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Leave Management</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage faculty leave applications and approvals
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Apply for Leave
        </Button>
      </div>

      {/* Leave Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className={`w-full max-w-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardHeader>
              <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Apply for Leave</CardTitle>
              <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Submit your leave application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    From Date *
                  </label>
                  <Input
                    type="date"
                    value={formData.date_from}
                    onChange={(e) => setFormData({...formData, date_from: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    To Date *
                  </label>
                  <Input
                    type="date"
                    value={formData.date_to}
                    onChange={(e) => setFormData({...formData, date_to: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Reason *
                  </label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Substitute (Optional)
                  </label>
                  <Input
                    value={formData.substitute_id}
                    onChange={(e) => setFormData({...formData, substitute_id: e.target.value})}
                    placeholder="Substitute faculty name"
                  />
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
                    Submit Application
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Leave Applications Table */}
      <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardHeader>
          <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Leave Applications</CardTitle>
          <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            All leave applications and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className={theme === 'dark' ? 'border-gray-700' : ''}>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Faculty</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Designation</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Leave Period</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Reason</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Status</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Applied Date</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaves.map((leave) => (
                  <TableRow key={leave.id} className={theme === 'dark' ? 'border-gray-700' : ''}>
                    <TableCell className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>
                      {leave.faculty?.name || 'N/A'}
                    </TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>
                      {leave.faculty?.designation || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : ''}`}>
                          {new Date(leave.date_from).toLocaleDateString()} - {new Date(leave.date_to).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className={`max-w-xs truncate ${theme === 'dark' ? 'text-gray-300' : ''}`}>
                      {leave.reason}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(leave.status)}
                        {getStatusBadge(leave.status)}
                      </div>
                    </TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>
                      {new Date(leave.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {leave.status === 'pending' && (
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApprove(leave.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReject(leave.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
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
