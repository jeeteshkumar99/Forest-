"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Filter, AlertTriangle, Mail, MessageSquare, Bell } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for notifications
const notificationsData = [
  {
    id: 1,
    type: "alert",
    title: "High Risk Fire Alert",
    message: "High risk fire conditions detected in Northern California region.",
    time: "15 min ago",
    status: "sent",
    recipients: "Fire Departments, Emergency Services",
    priority: "high",
  },
  {
    id: 2,
    type: "alert",
    title: "Moderate Risk Alert",
    message: "Moderate fire risk detected in Southern Oregon region.",
    time: "45 min ago",
    status: "sent",
    recipients: "Regional Monitoring Teams",
    priority: "medium",
  },
  {
    id: 3,
    type: "update",
    title: "Satellite Data Update",
    message: "New satellite imagery available for Western Colorado region.",
    time: "1 hour ago",
    status: "sent",
    recipients: "Analysis Team",
    priority: "low",
  },
  {
    id: 4,
    type: "alert",
    title: "Evacuation Recommendation",
    message: "Recommending evacuation preparations for communities near Redding, CA.",
    time: "2 hours ago",
    status: "pending",
    recipients: "Local Authorities, Emergency Services",
    priority: "high",
  },
  {
    id: 5,
    type: "system",
    title: "System Maintenance",
    message: "Scheduled maintenance for satellite data processing system.",
    time: "3 hours ago",
    status: "sent",
    recipients: "All Users",
    priority: "low",
  },
  {
    id: 6,
    type: "alert",
    title: "Weather Warning",
    message: "Extreme heat and wind conditions forecasted for next 48 hours in Arizona.",
    time: "4 hours ago",
    status: "failed",
    recipients: "Regional Monitoring Teams, Fire Departments",
    priority: "medium",
  },
]

export function NotificationCenter() {
  const [notifications, setNotifications] = useState(notificationsData)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-green-500">Sent</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-500">High</Badge>
      case "medium":
        return <Badge className="bg-orange-400">Medium</Badge>
      case "low":
        return <Badge className="bg-blue-500">Low</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "update":
        return <Bell className="h-4 w-4 text-blue-500" />
      case "system":
        return <Bell className="h-4 w-4 text-gray-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Alert Notification Center</CardTitle>
              <CardDescription>Manage and monitor system notifications and alerts</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Email Settings
              </Button>
              <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                SMS Settings
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All Notifications</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search notifications..." className="pl-8" />
            </div>

            <TabsContent value="all">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Type</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notifications.map((notification) => (
                      <TableRow key={notification.id}>
                        <TableCell>
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                            {getTypeIcon(notification.type)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{notification.title}</p>
                            <p className="text-xs text-muted-foreground">{notification.message}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-xs">{notification.recipients}</p>
                        </TableCell>
                        <TableCell>{notification.time}</TableCell>
                        <TableCell>{getPriorityBadge(notification.priority)}</TableCell>
                        <TableCell>{getStatusBadge(notification.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="alerts">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Type</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notifications
                      .filter((notification) => notification.type === "alert")
                      .map((notification) => (
                        <TableRow key={notification.id}>
                          <TableCell>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                              {getTypeIcon(notification.type)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{notification.title}</p>
                              <p className="text-xs text-muted-foreground">{notification.message}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-xs">{notification.recipients}</p>
                          </TableCell>
                          <TableCell>{notification.time}</TableCell>
                          <TableCell>{getPriorityBadge(notification.priority)}</TableCell>
                          <TableCell>{getStatusBadge(notification.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="system">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Type</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notifications
                      .filter((notification) => notification.type === "system" || notification.type === "update")
                      .map((notification) => (
                        <TableRow key={notification.id}>
                          <TableCell>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                              {getTypeIcon(notification.type)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{notification.title}</p>
                              <p className="text-xs text-muted-foreground">{notification.message}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-xs">{notification.recipients}</p>
                          </TableCell>
                          <TableCell>{notification.time}</TableCell>
                          <TableCell>{getPriorityBadge(notification.priority)}</TableCell>
                          <TableCell>{getStatusBadge(notification.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Create New Alert</CardTitle>
          <CardDescription>Send a new alert notification to recipients</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Alert Title</Label>
                <Input id="title" placeholder="Enter alert title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Alert Message</Label>
              <textarea
                id="message"
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter detailed alert message"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipients">Recipients</Label>
              <Select defaultValue="fire">
                <SelectTrigger>
                  <SelectValue placeholder="Select recipients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fire">Fire Departments</SelectItem>
                  <SelectItem value="emergency">Emergency Services</SelectItem>
                  <SelectItem value="monitoring">Monitoring Teams</SelectItem>
                  <SelectItem value="all">All Users</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="channels">Notification Channels</Label>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
                <Button variant="outline" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  SMS
                </Button>
                <Button variant="outline" className="gap-2">
                  <Bell className="h-4 w-4" />
                  App Notification
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Send Alert</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
