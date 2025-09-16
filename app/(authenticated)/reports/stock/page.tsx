'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Package, Download, AlertTriangle, CheckCircle } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'

export default function StockReportsPage() {
  const { theme } = useTheme()
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  const [selectedCategory, setSelectedCategory] = useState('all')

  const stockStats = {
    totalItems: 150,
    inStockItems: 120,
    lowStockItems: 20,
    outOfStockItems: 10,
    totalValue: 2500000,
    monthlyConsumption: [
      { month: 'Jan', consumed: 500, received: 600 },
      { month: 'Feb', consumed: 450, received: 500 },
      { month: 'Mar', consumed: 520, received: 550 },
      { month: 'Apr', consumed: 480, received: 520 },
      { month: 'May', consumed: 510, received: 480 },
      { month: 'Jun', consumed: 490, received: 510 }
    ],
    categoryDistribution: {
      'Medical Supplies': 60,
      'Laboratory Equipment': 40,
      'Books & Materials': 30,
      'Stationery': 20
    },
    topConsumedItems: [
      { name: 'Surgical Gloves', category: 'Medical Supplies', consumed: 1200, unit: 'pairs' },
      { name: 'Syringes 5ml', category: 'Medical Supplies', consumed: 800, unit: 'pieces' },
      { name: 'Microscope Slides', category: 'Laboratory Equipment', consumed: 600, unit: 'pieces' },
      { name: 'Nursing Fundamentals', category: 'Books & Materials', consumed: 50, unit: 'copies' },
      { name: 'A4 Paper', category: 'Stationery', consumed: 200, unit: 'reams' }
    ]
  }

  const monthlyData = stockStats.monthlyConsumption

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Stock Reports</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Comprehensive stock analytics and inventory reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button>
            <Package className="h-4 w-4 mr-2" />
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
                  Month
                </label>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className={`px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                >
                  <option value="all">All Categories</option>
                  <option value="Medical Supplies">Medical Supplies</option>
                  <option value="Laboratory Equipment">Laboratory Equipment</option>
                  <option value="Books & Materials">Books & Materials</option>
                  <option value="Stationery">Stationery</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stock Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Items</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stockStats.totalItems}</p>
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
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stockStats.inStockItems}</p>
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
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stockStats.lowStockItems}</p>
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
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stockStats.outOfStockItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Consumption Chart */}
      <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardHeader>
          <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Monthly Consumption vs Received</CardTitle>
          <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Stock consumption and replenishment trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map((data) => (
              <div key={data.month} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{data.month}</span>
                  <div className="flex space-x-4 text-sm">
                    <span className={theme === 'dark' ? 'text-red-400' : 'text-red-600'}>
                      Consumed: {data.consumed}
                    </span>
                    <span className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>
                      Received: {data.received}
                    </span>
                    <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>
                      Net: {data.received - data.consumed}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="flex h-2 rounded-full">
                    <div
                      className="bg-red-500"
                      style={{ width: `${(data.consumed / Math.max(...monthlyData.map(d => d.consumed))) * 100}%` }}
                    ></div>
                    <div
                      className="bg-green-500"
                      style={{ width: `${(data.received / Math.max(...monthlyData.map(d => d.consumed))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Distribution and Top Consumed Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardHeader>
            <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Category Distribution</CardTitle>
            <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Items distribution across categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(stockStats.categoryDistribution).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{category}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(count / stockStats.totalItems) * 100}%` }}
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
            <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Top Consumed Items</CardTitle>
            <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Most frequently consumed items
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stockStats.topConsumedItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.name}</span>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{item.category}</div>
                  </div>
                  <div className="text-right">
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.consumed}</span>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{item.unit}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Value Summary */}
      <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardHeader>
          <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Stock Value Summary</CardTitle>
          <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Total inventory value and financial metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                ₹{stockStats.totalValue.toLocaleString()}
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Inventory Value</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                ₹{Math.round(stockStats.totalValue / stockStats.totalItems).toLocaleString()}
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Average Item Value</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {((stockStats.inStockItems / stockStats.totalItems) * 100).toFixed(1)}%
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Stock Availability</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
