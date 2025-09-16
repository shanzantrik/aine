'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Package, Search, Filter, Plus, Eye, Edit, AlertTriangle, CheckCircle } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'

export default function InventoryPage() {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  const inventoryData = [
    {
      id: '1',
      itemCode: 'MED001',
      name: 'Surgical Gloves',
      category: 'Medical Supplies',
      quantity: 500,
      minQuantity: 100,
      unit: 'pairs',
      unitPrice: 25,
      totalValue: 12500,
      supplier: 'MedSupply Co.',
      lastUpdated: '2024-01-15',
      status: 'in-stock'
    },
    {
      id: '2',
      itemCode: 'MED002',
      name: 'Syringes 5ml',
      category: 'Medical Supplies',
      quantity: 50,
      minQuantity: 100,
      unit: 'pieces',
      unitPrice: 15,
      totalValue: 750,
      supplier: 'HealthCare Ltd.',
      lastUpdated: '2024-01-10',
      status: 'low-stock'
    },
    {
      id: '3',
      itemCode: 'LAB001',
      name: 'Microscope Slides',
      category: 'Laboratory Equipment',
      quantity: 200,
      minQuantity: 50,
      unit: 'pieces',
      unitPrice: 5,
      totalValue: 1000,
      supplier: 'LabTech Inc.',
      lastUpdated: '2024-01-12',
      status: 'in-stock'
    },
    {
      id: '4',
      itemCode: 'BOOK001',
      name: 'Nursing Fundamentals',
      category: 'Books & Materials',
      quantity: 0,
      minQuantity: 20,
      unit: 'copies',
      unitPrice: 500,
      totalValue: 0,
      supplier: 'EduBooks',
      lastUpdated: '2024-01-05',
      status: 'out-of-stock'
    }
  ]

  const filteredData = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCategory === 'all' || item.category === filterCategory
    return matchesSearch && matchesFilter
  })

  const totalItems = inventoryData.length
  const inStockItems = inventoryData.filter(item => item.status === 'in-stock').length
  const lowStockItems = inventoryData.filter(item => item.status === 'low-stock').length
  const outOfStockItems = inventoryData.filter(item => item.status === 'out-of-stock').length

  const getStatusBadge = (status: string) => {
    const variants = {
      'in-stock': 'default',
      'low-stock': 'secondary',
      'out-of-stock': 'destructive'
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'default'}>
        {status.replace('-', ' ')}
      </Badge>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'low-stock':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'out-of-stock':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Inventory Management</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Track and manage institute inventory and supplies
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Inventory Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Items</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{totalItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>In Stock</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{inStockItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Low Stock</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{lowStockItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Out of Stock</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{outOfStockItems}</p>
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
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className={`px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              >
                <option value="all">All Categories</option>
                <option value="Medical Supplies">Medical Supplies</option>
                <option value="Laboratory Equipment">Laboratory Equipment</option>
                <option value="Books & Materials">Books & Materials</option>
                <option value="Stationery">Stationery</option>
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardHeader>
          <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Inventory Items</CardTitle>
          <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Complete inventory list with stock levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className={theme === 'dark' ? 'border-gray-700' : ''}>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Item Code</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Name</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Category</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Quantity</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Min Qty</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Unit Price</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Total Value</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Status</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : ''}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id} className={theme === 'dark' ? 'border-gray-700' : ''}>
                    <TableCell className={`font-medium ${theme === 'dark' ? 'text-white' : ''}`}>
                      {item.itemCode}
                    </TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{item.name}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{item.category}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>
                      <div className="flex items-center space-x-2">
                        <span>{item.quantity}</span>
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>({item.unit})</span>
                      </div>
                    </TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>{item.minQuantity}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>₹{item.unitPrice}</TableCell>
                    <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>₹{item.totalValue.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(item.status)}
                        {getStatusBadge(item.status)}
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
