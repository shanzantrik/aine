import { createClient } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Package,
  Plus,
  Search,
  Filter,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react'

export default async function StockPage() {
  const supabase = await createClient()

  // Fetch stock data
  const [
    { data: stockItems },
    { data: requisitions },
    { count: lowStockCount }
  ] = await Promise.all([
    supabase.from('stock_items').select('*').order('created_at', { ascending: false }),
    supabase.from('requisitions').select('*').order('created_at', { ascending: false }).limit(5),
    supabase.from('stock_items').select('*', { count: 'exact', head: true }).lt('qty_available', 10)
  ])

  const totalItems = stockItems?.length || 0
  const totalValue = stockItems?.reduce((sum, item) => sum + (item.qty_available * item.unit_price), 0) || 0
  const pendingRequisitions = requisitions?.filter(req => req.status === 'pending').length || 0

  const stockStats = [
    {
      name: 'Total Items',
      value: totalItems.toString(),
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Total Value',
      value: `₹${totalValue.toLocaleString()}`,
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Low Stock Items',
      value: lowStockCount?.toString() || '0',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      name: 'Pending Requests',
      value: pendingRequisitions.toString(),
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ]

  const getStockStatus = (qty: number) => {
    if (qty === 0) return { status: 'Out of Stock', variant: 'destructive' as const }
    if (qty < 10) return { status: 'Low Stock', variant: 'warning' as const }
    return { status: 'In Stock', variant: 'success' as const }
  }

  const getRequisitionStatus = (status: string) => {
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

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Stock Management</h1>
          <p className="mt-2 text-gray-600">
            Manage inventory, requisitions, and stock levels
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Stock Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stockStats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common stock management tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <Package className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-medium">Add Stock Item</h3>
              <p className="text-sm text-gray-600">Register new item</p>
            </button>
            <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-medium">Create Requisition</h3>
              <p className="text-sm text-gray-600">Request materials</p>
            </button>
            <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <CheckCircle className="h-8 w-8 text-purple-600 mb-2" />
              <h3 className="font-medium">Issue Stock</h3>
              <p className="text-sm text-gray-600">Process requisitions</p>
            </button>
            <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <AlertTriangle className="h-8 w-8 text-red-600 mb-2" />
              <h3 className="font-medium">Low Stock Alert</h3>
              <p className="text-sm text-gray-600">View critical items</p>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Stock Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Register</CardTitle>
          <CardDescription>
            Complete inventory of all items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stockItems?.map((item) => {
                  const stockStatus = getStockStatus(item.qty_available)
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.name}
                      </TableCell>
                      <TableCell>
                        {item.description || 'N/A'}
                      </TableCell>
                      <TableCell>
                        {item.qty_available}
                      </TableCell>
                      <TableCell>
                        ₹{item.unit_price.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        ₹{(item.qty_available * item.unit_price).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={stockStatus.variant}>
                          {stockStatus.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Requisitions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Requisitions</CardTitle>
          <CardDescription>
            Latest material requisition requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requisitions?.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium">
                      Item #{req.item_id}
                    </TableCell>
                    <TableCell>
                      {req.qty}
                    </TableCell>
                    <TableCell>
                      User #{req.requester_id}
                    </TableCell>
                    <TableCell>
                      {new Date(req.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {getRequisitionStatus(req.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        {req.status === 'pending' && (
                          <Button variant="outline" size="sm">
                            Approve
                          </Button>
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
