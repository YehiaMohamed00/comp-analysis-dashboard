'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Search, ShoppingCart, Package, DollarSign, TrendingUp, Filter, Moon, Sun, Bell, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { DropResult } from 'react-beautiful-dnd'

// Add an interface for the product data
interface ProductData {
  [key: string]: string;  // This allows string indexing
}

// Simulated data fetching function with error handling and data cleaning
const fetchData = async () => {
  try {
    const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fotoexpress_products_all-y0qIH3js3uvvfdXPxVA1VWc0dLw51n.csv')
    const text = await response.text()
    const rows = text.split('\n').map(row => row.split(','))
    const headers = rows[0]
    const data = rows.slice(1).map(row => {
      const obj: ProductData = {}  // Type the object
      headers.forEach((header, index) => {
        obj[header] = row[index] || '' // Now TypeScript knows obj can be indexed with strings
      })
      return obj
    }).filter(item => item['Product Name'] && item['Current Price']) // Filter out items without name or price
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

// Simulated competitor data
const competitorData = [
  { name: 'Your Store', price: 100, market_share: 30 },
  { name: 'Competitor A', price: 95, market_share: 25 },
  { name: 'Competitor B', price: 105, market_share: 20 },
  { name: 'Competitor C', price: 98, market_share: 15 },
  { name: 'Competitor D', price: 92, market_share: 10 },
]

// Simulated demand prediction data
const demandPredictionData = [
  { month: 'Jan', demand: 100, supply: 90 },
  { month: 'Feb', demand: 120, supply: 100 },
  { month: 'Mar', demand: 140, supply: 130 },
  { month: 'Apr', demand: 160, supply: 140 },
  { month: 'May', demand: 180, supply: 160 },
  { month: 'Jun', demand: 200, supply: 180 },
  { month: 'Jul', demand: 220, supply: 200 },
  { month: 'Aug', demand: 240, supply: 220 },
]

// Simulated analytics data
const analyticsData = [
  { date: '2023-01-01', sales: 1000, visitors: 5000, conversion_rate: 20 },
  { date: '2023-02-01', sales: 1200, visitors: 5500, conversion_rate: 21.8 },
  { date: '2023-03-01', sales: 1100, visitors: 5200, conversion_rate: 21.2 },
  { date: '2023-04-01', sales: 1300, visitors: 6000, conversion_rate: 21.7 },
  { date: '2023-05-01', sales: 1400, visitors: 6200, conversion_rate: 22.6 },
  { date: '2023-06-01', sales: 1600, visitors: 6800, conversion_rate: 23.5 },
  { date: '2023-07-01', sales: 1800, visitors: 7200, conversion_rate: 25 },
  { date: '2023-08-01', sales: 2000, visitors: 7800, conversion_rate: 25.6 },
]

// Simulated reports data
const reportsData = [
  { id: 1, name: 'Monthly Sales Report', date: '2023-08-31', status: 'Completed' },
  { id: 2, name: 'Quarterly Performance Review', date: '2023-09-30', status: 'Pending' },
  { id: 3, name: 'Inventory Status Report', date: '2023-09-05', status: 'In Progress' },
  { id: 4, name: 'Customer Satisfaction Survey', date: '2023-09-10', status: 'Scheduled' },
  { id: 5, name: 'Product Performance Analysis', date: '2023-09-15', status: 'Scheduled' },
  { id: 6, name: 'Market Trend Report', date: '2023-08-25', status: 'Completed' },
]

// Simulated notifications data
const notificationsData = [
  { id: 1, message: 'New order received for Camera X', time: '5 minutes ago' },
  { id: 2, name: 'Canon EOS R5', message: 'Product is low in stock', time: '1 hour ago' },
  { id: 3, message: 'Monthly sales report is ready', time: '1 day ago' },
  { id: 4, message: 'New feature: AI-powered pricing suggestions', time: '2 days ago' },
  { id: 5, message: 'Competitor price alert for Sony A7 III', time: '3 days ago' },
  { id: 6, message: 'Customer review alert: 5-star rating received', time: '4 days ago' },
]

export function DashboardComponent() {
  const [data, setData] = useState<ProductData[]>([])
  const [filteredData, setFilteredData] = useState<ProductData[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [darkMode, setDarkMode] = useState(false)
  const [widgets, setWidgets] = useState(['priceDistribution', 'categoryDistribution', 'competitorInsights', 'demandPrediction'])

  useEffect(() => {
    fetchData().then(setData)
  }, [])

  useEffect(() => {
    const filtered = data.filter(item => 
      (selectedCategory === 'All' || item.Category === selectedCategory) &&
      item['Product Name'].toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredData(filtered)
  }, [data, searchTerm, selectedCategory])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const categories = ['All', ...Array.from(new Set(data.map(item => item.Category).filter(Boolean)))]

  const categoryData = categories.slice(1).map(category => ({
    name: category,
    value: data.filter(item => item.Category === category).length
  }))

  const priceRanges = [
    { range: '0-1000', count: 0 },
    { range: '1001-5000', count: 0 },
    { range: '5001-10000', count: 0 },
    { range: '10001+', count: 0 },
  ]

  filteredData.forEach(item => {
    const price = parseFloat(item['Current Price'].replace('EGP', '').replace(',', ''))
    if (price <= 1000) priceRanges[0].count++
    else if (price <= 5000) priceRanges[1].count++
    else if (price <= 10000) priceRanges[2].count++
    else priceRanges[3].count++
  })

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const newWidgets = Array.from(widgets)
    const [reorderedItem] = newWidgets.splice(result.source.index, 1)
    newWidgets.splice(result.destination.index, 0, reorderedItem)
    setWidgets(newWidgets)
  }

  const renderWidget = (widget: string) => {
    switch (widget) {
      case 'priceDistribution':
        return (
          <Card className="w-full h-full">
            <CardHeader className="flex-none">
              <CardTitle>Product Price Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <ChartContainer
                config={{
                  range: {
                    label: 'Price Range',
                    color: 'hsl(var(--chart-1))',
                  },
                  count: {
                    label: 'Number of Products',
                    color: 'hsl(var(--chart-2))',
                  },
                }}
                className="w-full h-[300px] min-h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={priceRanges}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="count" fill="var(--color-count)" name="Number of Products" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        )
      case 'categoryDistribution':
        return (
          <Card className="w-full h-full">
            <CardHeader className="flex-none">
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>
                Product distribution across categories
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ChartContainer
                config={{
                  value: {
                    label: 'Number of Products',
                    color: 'hsl(var(--chart-1))',
                  },
                }}
                className="w-full h-[300px] min-h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        )
      case 'competitorInsights':
        return (
          <Card className="w-full h-full">
            <CardHeader className="flex-none">
              <CardTitle>Competitor Insights</CardTitle>
              <CardDescription>
                Price and market share comparison
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ChartContainer
                config={{
                  price: {
                    label: 'Price',
                    color: 'hsl(var(--chart-1))',
                  },
                  market_share: {
                    label: 'Market Share (%)',
                    color: 'hsl(var(--chart-2))',
                  },
                }}
                className="w-full h-[300px] min-h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={competitorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="price" fill="var(--color-price)" name="Price" />
                    <Bar yAxisId="right" dataKey="market_share" fill="var(--color-market_share)" name="Market Share (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        )
      case 'demandPrediction':
        return (
          <Card className="w-full h-full">
            <CardHeader className="flex-none">
              <CardTitle>Demand vs Supply Prediction</CardTitle>
              <CardDescription>
                Forecast for the next 8 months
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ChartContainer
                config={{
                  demand: {
                    label: 'Predicted Demand',
                    color: 'hsl(var(--chart-1))',
                  },
                  supply: {
                    label: 'Predicted Supply',
                    color: 'hsl(var(--chart-2))',
                  },
                }}
                className="w-full h-[300px] min-h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={demandPredictionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area type="monotone" dataKey="demand" stackId="1" stroke="var(--color-demand)" fill="var(--color-demand)" fillOpacity={0.5} name="Predicted Demand" />
                    <Area type="monotone" dataKey="supply" stackId="2" stroke="var(--color-supply)" fill="var(--color-supply)" fillOpacity={0.5} name="Predicted Supply" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className={`flex-1 space-y-8 p-8 pt-6 ${darkMode ? 'dark' : ''}`}>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Switch
            checked={darkMode}
            onCheckedChange={setDarkMode}
            className="mr-2"
          />
          {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{filteredData.length}</div>
                <p className="text-xs text-muted-foreground">
                  +2.5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Price</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  EGP {(filteredData.reduce((acc, item) => acc + parseFloat(item['Current Price'].replace('EGP', '').replace(',', '')), 0) / filteredData.length || 0).toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +4.75% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
                <Filter className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{categories.length - 1}</div>
                <p className="text-xs text-muted-foreground">
                  +2 new categories
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Selling Category</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{categoryData.sort((a, b) => b.value - a.value)[0]?.name || 'N/A'}</div>
                <p className="text-xs text-muted-foreground">
                  +19% increase in sales
                </p>
              </CardContent>
            </Card>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="widgets" direction="vertical">
              {(provided) => (
                <div 
                  {...provided.droppableProps} 
                  ref={provided.innerRef} 
                  className="grid gap-6 md:grid-cols-2 auto-rows-fr"
                >
                  {widgets.map((widget, index) => (
                    <Draggable key={widget} draggableId={widget} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="min-h-[400px]"
                        >
                          {renderWidget(widget)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Products</CardTitle>
                <CardDescription>
                  You have {filteredData.length} total products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {filteredData.slice(0, 5).map((product, index) => (
                    <div key={index} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={product['Product Image URL']} alt={product['Product Name']} />
                        <AvatarFallback>{product['Product Name']?.charAt(0) || 'P'}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{product['Product Name'] || 'Unnamed Product'}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.Category || 'Uncategorized'}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        {product['Current Price'] || 'N/A'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Categories</CardTitle>
                <CardDescription>
                  Categories with the most products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {categoryData.sort((a, b) => b.value - a.value).slice(0, 5).map((category, index) => (
                    <div key={index} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{category.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{category.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {category.value} products
                        </p>
                      </div>
                      <div className="ml-auto">
                        <Badge>{((category.value / data.length) * 100).toFixed(1)}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">EGP 45,231.89</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.24%</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                  +2.1% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">EGP 189.43</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                  -4.5% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Sales and Visitors Analytics</CardTitle>
              <CardDescription>Monthly sales and visitor data for the past 8 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  sales: {
                    label: 'Sales',
                    color: 'hsl(var(--chart-1))',
                  },
                  visitors: {
                    label: 'Visitors',
                    color: 'hsl(var(--chart-2))',
                  },
                  conversion_rate: {
                    label: 'Conversion Rate',
                    color: 'hsl(var(--chart-3))',
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="sales" stroke="var(--color-sales)" name="Sales" />
                    <Line yAxisId="right" type="monotone" dataKey="visitors" stroke="var(--color-visitors)" name="Visitors" />
                    <Line yAxisId="right" type="monotone" dataKey="conversion_rate" stroke="var(--color-conversion_rate)" name="Conversion Rate (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Overview of your latest reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {reportsData.map((report) => (
                  <div key={report.id} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{report.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{report.name}</p>
                      <p className="text-sm text-muted-foreground">{report.date}</p>
                    </div>
                    <div className="ml-auto">
                      <Badge variant={report.status === 'Completed' ? 'default' : 'secondary'}>{report.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Stay updated with the latest alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {notificationsData.map((notification) => (
                  <div key={notification.id} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback><Bell className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{notification.message}</p>
                      <p className="text-sm text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button>
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>
    </div>
  )
}