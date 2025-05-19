"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, UserPlus, Settings, User, Clock, CheckCircle, XCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for users
const usersData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    role: "admin",
    status: "active",
    lastActive: "5 min ago",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "analyst",
    status: "active",
    lastActive: "1 hour ago",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "field_agent",
    status: "active",
    lastActive: "3 hours ago",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "analyst",
    status: "inactive",
    lastActive: "2 days ago",
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    role: "viewer",
    status: "active",
    lastActive: "Just now",
  },
]

// Mock data for activity logs
const activityLogsData = [
  {
    id: 1,
    user: "John Smith",
    action: "Sent high risk alert",
    target: "Northern California region",
    time: "5 min ago",
    status: "success",
  },
  {
    id: 2,
    user: "Sarah Johnson",
    action: "Updated risk assessment",
    target: "Southern Oregon region",
    time: "15 min ago",
    status: "success",
  },
  {
    id: 3,
    user: "System",
    action: "Scheduled maintenance",
    target: "Satellite data processing",
    time: "1 hour ago",
    status: "pending",
  },
  {
    id: 4,
    user: "Michael Brown",
    action: "Uploaded new satellite image",
    target: "Western Colorado region",
    time: "2 hours ago",
    status: "success",
  },
  {
    id: 5,
    user: "Emily Davis",
    action: "Failed login attempt",
    target: "Account security",
    time: "3 hours ago",
    status: "failed",
  },
]

export function AdminPanel() {
  const [users, setUsers] = useState(usersData)
  const [activityLogs, setActivityLogs] = useState(activityLogsData)

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-500">Admin</Badge>
      case "analyst":
        return <Badge className="bg-blue-500">Analyst</Badge>
      case "field_agent":
        return <Badge className="bg-green-500">Field Agent</Badge>
      case "viewer":
        return <Badge className="bg-gray-500">Viewer</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getActivityStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Admin Panel</CardTitle>
              <CardDescription>Manage users, roles, and system settings</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="users" className="space-y-4">
            <TabsList>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="activity">Activity Logs</TabsTrigger>
              <TabsTrigger value="settings">System Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search users..." className="pl-8" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="analyst">Analyst</SelectItem>
                      <SelectItem value="field_agent">Field Agent</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                                <User className="h-4 w-4" />
                              </div>
                              <span>{user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{getRoleBadge(user.role)}</TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell>{user.lastActive}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Actions
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit User</DropdownMenuItem>
                                <DropdownMenuItem>Change Role</DropdownMenuItem>
                                <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500">Deactivate User</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search activity logs..." className="pl-8" />
                  </div>
                  <Button variant="outline">Export Logs</Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Target</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activityLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>{log.user}</TableCell>
                          <TableCell>{log.action}</TableCell>
                          <TableCell>{log.target}</TableCell>
                          <TableCell>{log.time}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {getActivityStatusIcon(log.status)}
                              <span className="capitalize">{log.status}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">System Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="alert-threshold">Alert Threshold</Label>
                          <Select defaultValue="medium">
                            <SelectTrigger>
                              <SelectValue placeholder="Select threshold" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low (More Alerts)</SelectItem>
                              <SelectItem value="medium">Medium (Balanced)</SelectItem>
                              <SelectItem value="high">High (Critical Alerts Only)</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground">
                            Sets the sensitivity threshold for generating fire risk alerts
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="data-refresh">Data Refresh Rate</Label>
                          <Select defaultValue="30">
                            <SelectTrigger>
                              <SelectValue placeholder="Select refresh rate" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="15">Every 15 minutes</SelectItem>
                              <SelectItem value="30">Every 30 minutes</SelectItem>
                              <SelectItem value="60">Every hour</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground">
                            How often the system fetches new satellite data
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="retention">Data Retention Period</Label>
                          <Select defaultValue="90">
                            <SelectTrigger>
                              <SelectValue placeholder="Select retention period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30">30 days</SelectItem>
                              <SelectItem value="90">90 days</SelectItem>
                              <SelectItem value="180">180 days</SelectItem>
                              <SelectItem value="365">1 year</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground">
                            How long historical data is stored before archiving
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Notification Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <Select defaultValue="all">
                            <SelectTrigger>
                              <SelectValue placeholder="Select email settings" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Alerts</SelectItem>
                              <SelectItem value="high">High Priority Only</SelectItem>
                              <SelectItem value="none">Disabled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="sms-notifications">SMS Notifications</Label>
                          <Select defaultValue="high">
                            <SelectTrigger>
                              <SelectValue placeholder="Select SMS settings" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Alerts</SelectItem>
                              <SelectItem value="high">High Priority Only</SelectItem>
                              <SelectItem value="none">Disabled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="notification-schedule">Quiet Hours</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label htmlFor="start-time" className="text-xs">
                                Start
                              </Label>
                              <Input id="start-time" type="time" defaultValue="22:00" />
                            </div>
                            <div>
                              <Label htmlFor="end-time" className="text-xs">
                                End
                              </Label>
                              <Input id="end-time" type="time" defaultValue="06:00" />
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Only high priority alerts will be sent during quiet hours
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">API Access</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">API Key</p>
                          <p className="text-xs text-muted-foreground">
                            Use this key to access the Forest Fire Monitoring API
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input value="••••••••••••••••••••••••••••••" className="w-[300px]" readOnly />
                          <Button variant="outline" size="sm">
                            Reveal
                          </Button>
                          <Button variant="outline" size="sm">
                            Regenerate
                          </Button>
                        </div>
                      </div>

                      <div className="rounded-md border p-3">
                        <p className="text-sm font-medium">API Endpoints</p>
                        <div className="mt-2 space-y-1 text-sm">
                          <p>
                            <code className="rounded bg-muted px-1">GET /api/fires</code> - Get all active fires
                          </p>
                          <p>
                            <code className="rounded bg-muted px-1">GET /api/risks</code> - Get risk assessment data
                          </p>
                          <p>
                            <code className="rounded bg-muted px-1">POST /api/alerts</code> - Create a new alert
                          </p>
                        </div>
                        <div className="mt-2">
                          <Button variant="link" className="h-auto p-0 text-sm">
                            View API Documentation
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Settings</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
