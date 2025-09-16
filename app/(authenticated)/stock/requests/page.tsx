'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Package, Search, Filter, Plus, Eye, CheckCircle, XCircle, Clock, User } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'

export default function StockRequestsPage() {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const requestsData = [
    {
      id: '1',
      requestNo: 'REQ001',
      requestedBy: 'Dr. Sarah Johnson',
      department: 'Medical-Surgical Nursing',
      itemName: 'Surgical Gloves',
      quantity: 100,
      unit: 'pairs',
      purpose: 'Clinical Practice',
      requestDate: '2024-01-15',
      status: 'pending',
      approvedBy: '-',
      approvedDate: '-'
    },
    {
      id: '2',
      requestNo: 'REQ002',
      requestedBy: 'Prof. Michael Chen',
      department: 'Community Health Nursing',
      itemName: 'First Aid Kits',
      quantity: 20,
      unit: 'kits',
      purpose: 'Community Outreach',
      requestDate: '2024-01-12',
      status: 'approved',
      approvedBy: 'Admin',
      approvedDate: '2024-01-13'
    },
    {
      id: '3',
      requestNo: 'REQ003',
      requestedBy: 'Dr. Priya Sharma',
      department: 'Obstetrics & Gynecological Nursing',
      itemName: 'Microscope Slides',
      quantity: 50,
      unit: 'pieces',
      purpose: 'Laboratory Work',
      requestDate: '2024-01-10',
      status: 'rejected',
      approvedBy: 'Admin',
      approvedDate: '2024-01-11'
    }
  ]

  const filteredData = requestsData.filter(request => {
    const matchesSearch = request.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requestNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || request.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalRequests = requestsData.length
  const pendingRequests = requestsData.filter(req => req.status === 'pending').length
  const approvedRequests = requestsData.filter(req => req.status === 'approved').length
  const rejectedRequests = requestsData.filter(req => req.status === 'rejected').length

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'secondary',
      approved: 'default',
      rejected: 'destructive'
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'default'}>
        {status}
      </Badge>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Stock Requests</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage and track stock requisition requests
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>

      {/* Request Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Requests</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{totalRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Pending</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{pendingRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Approved</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{approvedRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Rejected</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{rejectedRequests}</p>
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
                  placeholder="Search requests..."
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
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardHeader>
          <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Stock Requests</CardTitle>
          <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            All stock requisition requests and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className={theme === 'dark' ? 'border-gray-700' : ''}>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Request No.</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Requested By</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Department</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Item</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Quantity</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Purpose</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Request Date</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Status</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((request) => (
                  <TableRow key={request.id} className={theme === 'dark' ? 'border-gray-700' : ''}>
                    <TableCell className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>
                      {request.requestNo}
                    </TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{request.requestedBy}</span>
                      </div>
                    </TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{request.department}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{request.itemName}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>
                      <div className="flex items-center space-x-1">
                        <span>{request.quantity}</span>
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>({request.unit})</span>
                      </div>
                    </TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{request.purpose}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{request.requestDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(request.status)}
                        {getStatusBadge(request.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {request.status === 'pending' && (
                          <>
                            <Button variant="outline" size="sm" className="text-green-600">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
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
