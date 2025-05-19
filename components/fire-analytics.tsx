"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, Calendar } from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "@/components/ui/chart"

// Mock data for charts
const temperatureData = [
  { date: "Jun 1", value: 75 },
  { date: "Jun 5", value: 78 },
  { date: "Jun 10", value: 82 },
  { date: "Jun 15", value: 85 },
  { date: "Jun 20", value: 89 },
  { date: "Jun 25", value: 92 },
  { date: "Jun 30", value: 95 },
  { date: "Jul 5", value: 98 },
  { date: "Jul 10", value: 102 },
  { date: "Jul 15", value: 99 },
]

const humidityData = [
  { date: "Jun 1", value: 65 },
  { date: "Jun 5", value: 60 },
  { date: "Jun 10", value: 55 },
  { date: "Jun 15", value: 50 },
  { date: "Jun 20", value: 45 },
  { date: "Jun 25", value: 40 },
  { date: "Jun 30", value: 35 },
  { date: "Jul 5", value: 30 },
  { date: "Jul 10", value: 25 },
  { date: "Jul 15", value: 20 },
]

const windSpeedData = [
  { date: "Jun 1", value: 5 },
  { date: "Jun 5", value: 7 },
  { date: "Jun 10", value: 8 },
  { date: "Jun 15", value: 10 },
  { date: "Jun 20", value: 12 },
  { date: "Jun 25", value: 15 },
  { date: "Jun 30", value: 18 },
  { date: "Jul 5", value: 20 },
  { date: "Jul 10", value: 22 },
  { date: "Jul 15", value: 25 },
]

const riskIndexData = [
  { date: "Jun 1", value: 20 },
  { date: "Jun 5", value: 25 },
  { date: "Jun 10", value: 30 },
  { date: "Jun 15", value: 40 },
  { date: "Jun 20", value: 50 },
  { date: "Jun 25", value: 60 },
  { date: "Jun 30", value: 70 },
  { date: "Jul 5", value: 80 },
  { date: "Jul 10", value: 90 },
  { date: "Jul 15", value: 85 },
]

const predictionData = [
  { region: "Region A", probability: 85 },
  { region: "Region B", probability: 70 },
  { region: "Region C", probability: 60 },
  { region: "Region D", probability: 45 },
  { region: "Region E", probability: 30 },
]

export function FireAnalytics() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Fire Analytics</CardTitle>
            <CardDescription>Environmental factors and risk assessment</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="environmental">
          <TabsList className="mb-4">
            <TabsTrigger value="environmental">Environmental</TabsTrigger>
            <TabsTrigger value="risk">Risk Index</TabsTrigger>
            <TabsTrigger value="prediction">Prediction</TabsTrigger>
          </TabsList>

          <TabsContent value="environmental" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Temperature (°F)</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={temperatureData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Humidity (%)</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={humidityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Wind Speed (mph)</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={windSpeedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="risk">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={riskIndexData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <defs>
                    <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#f97316"
                    fillOpacity={1}
                    fill="url(#riskGradient)"
                    name="Fire Risk Index"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {[20, 40, 60, 80, 100].map((value, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="h-2 w-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${
                        value <= 20
                          ? "#22c55e"
                          : value <= 40
                            ? "#84cc16"
                            : value <= 60
                              ? "#eab308"
                              : value <= 80
                                ? "#f97316"
                                : "#ef4444"
                      }, ${
                        value <= 20
                          ? "#22c55e"
                          : value <= 40
                            ? "#84cc16"
                            : value <= 60
                              ? "#eab308"
                              : value <= 80
                                ? "#f97316"
                                : "#ef4444"
                      })`,
                    }}
                  />
                  <span className="mt-1 text-xs">{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="prediction">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={predictionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis label={{ value: "Probability (%)", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="probability" name="Fire Prediction Probability" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                AI model confidence: <span className="font-medium text-orange-500">87%</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Based on current environmental conditions, Region A has the highest probability of fire occurrence in
                the next 24 hours.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
