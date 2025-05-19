"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, CheckCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for alerts
const alertsData = [
  {
    id: 1,
    location: "Northern California",
    coordinates: "38.8375° N, 120.8958° W",
    time: "15 min ago",
    riskLevel: "high",
    status: "active",
  },
  {
    id: 2,
    location: "Southern Oregon",
    coordinates: "42.3265° N, 122.8756° W",
    time: "45 min ago",
    riskLevel: "moderate",
    status: "active",
  },
  {
    id: 3,
    location: "Eastern Washington",
    coordinates: "47.7511° N, 120.7401° W",
    time: "1 hour ago",
    riskLevel: "high",
    status: "active",
  },
  {
    id: 4,
    location: "Central Arizona",
    coordinates: "34.5400° N, 112.4685° W",
    time: "2 hours ago",
    riskLevel: "low",
    status: "resolved",
  },
  {
    id: 5,
    location: "Western Colorado",
    coordinates: "39.1130° N, 108.5449° W",
    time: "3 hours ago",
    riskLevel: "moderate",
    status: "resolved",
  },
]

export function RiskZoneAlerts() {
  const [alerts, setAlerts] = useState(alertsData)

  const resolveAlert = (id: number) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, status: "resolved" } : alert)))
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "high":
        return <Badge className="bg-red-500">High</Badge>
      case "moderate":
        return <Badge className="bg-orange-400">Moderate</Badge>
      case "low":
        return <Badge className="bg-yellow-300 text-yellow-800">Low</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Risk Zone Alerts</CardTitle>
            <CardDescription>Active and recent fire risk alerts</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Alerts</DropdownMenuItem>
              <DropdownMenuItem>High Risk Only</DropdownMenuItem>
              <DropdownMenuItem>Active Alerts</DropdownMenuItem>
              <DropdownMenuItem>Resolved Alerts</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search by location..." className="pl-8" />
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{alert.location}</p>
                      <p className="text-xs text-muted-foreground">{alert.coordinates}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getRiskBadge(alert.riskLevel)}</TableCell>
                  <TableCell>{alert.time}</TableCell>
                  <TableCell>
                    {alert.status === "active" ? (
                      <div className="flex items-center">
                        <span className="mr-2 h-2 w-2 rounded-full bg-red-500"></span>
                        <span>Active</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                        <span>Resolved</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {alert.status === "active" ? (
                      <Button variant="outline" size="sm" onClick={() => resolveAlert(alert.id)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Resolve
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" disabled>
                        Resolved
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
