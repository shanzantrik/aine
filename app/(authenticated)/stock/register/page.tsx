'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Package, Search, Filter, Plus, Eye, Edit, Trash2, User, Building } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'

export default function StockRegisterPage() {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const registerData = [
    {
      id: '1',
      transactionId: 'TXN001',
      type: 'in',
      itemName: 'Surgical Gloves',
      quantity: 100,
      unit: 'pairs',
      unitPrice: 25,
      totalValue: 2500,
      supplier: 'MedSupply Co.',
      receivedBy: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: '2',
      transactionId: 'TXN002',
      type: 'out',
      itemName: 'Syringes 5ml',
      quantity: 50,
      unit: 'pieces',
      unitPrice: 15,
      totalValue: 750,
      department: 'Medical-Surgical Nursing',
      issuedBy: 'Prof. Michael Chen',
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: '3',
      transactionId: 'TXN003',
      type: 'in',
      itemName: 'Microscope Slides',
      quantity: 200,
      unit: 'pieces',
      unitPrice: 5,
      totalValue: 1000,
      supplier: 'LabTech Inc.',
      receivedBy: 'Dr. Priya Sharma',
      date: '2024-01-12',
      status: 'pending'
    },
    {
      id: '4',
      transactionId: 'TXN004',
      type: 'out',
      itemName: 'Nursing Fundamentals',
      quantity: 10,
      unit: 'copies',
      unitPrice: 500,
      totalValue: 5000,
      department: 'Community Health Nursing',
      issuedBy: 'Prof. Michael Chen',
      date: '2024-01-10',
      status: 'completed'
    }
  ]

  const filteredData = registerData.filter(transaction => {
    const matchesSearch = transaction.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.supplier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.department?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || transaction.type === filterType
    return matchesSearch && matchesFilter
  })

  const totalIn = registerData.filter(t => t.type === 'in').reduce((sum, t) => sum + t.totalValue, 0)
  const totalOut = registerData.filter(t => t.type === 'out').reduce((sum, t) => sum + t.totalValue, 0)
  const netValue = totalIn - totalOut

  const getTypeBadge = (type: string) => {
    return (
      <Badge variant={type === 'in' ? 'default' : 'secondary'}>
        {type === 'in' ? 'In' : 'Out'}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'default',
      pending: 'secondary',
      cancelled: 'destructive'
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
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Stock Register</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Track all stock transactions and movements
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Transaction
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total In</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  ₹{totalIn.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Out</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  ₹{totalOut.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Net Value</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  ₹{netValue.toLocaleString()}
                </p>
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
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className={`px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              >
                <option value="all">All Types</option>
                <option value="in">Stock In</option>
                <option value="out">Stock Out</option>
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardHeader>
          <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Stock Transactions</CardTitle>
          <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Complete record of all stock movements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className={theme === 'dark' ? 'border-gray-700' : ''}>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Transaction ID</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Type</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Item</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Quantity</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Unit Price</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Total Value</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Source/Destination</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Date</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Status</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((transaction) => (
                  <TableRow key={transaction.id} className={theme === 'dark' ? 'border-gray-700' : ''}>
                    <TableCell className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>
                      {transaction.transactionId}
                    </TableCell>
                    <TableCell>
                      {getTypeBadge(transaction.type)}
                    </TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{transaction.itemName}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>
                      <div className="flex items-center space-x-1">
                        <span>{transaction.quantity}</span>
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>({transaction.unit})</span>
                      </div>
                    </TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>₹{transaction.unitPrice}</TableCell>
                    <TableCell className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>₹{transaction.totalValue.toLocaleString()}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>
                      <div className="flex items-center space-x-2">
                        {transaction.type === 'in' ? (
                          <>
                            <Building className="h-4 w-4 text-gray-400" />
                            <span>{transaction.supplier}</span>
                          </>
                        ) : (
                          <>
                            <User className="h-4 w-4 text-gray-400" />
                            <span>{transaction.department}</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{transaction.date}</TableCell>
                    <TableCell>
                      {getStatusBadge(transaction.status)}
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
