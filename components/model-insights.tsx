"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, ThermometerSun, Wind, Droplets } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function ModelInsights() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>AI Model Insights</CardTitle>
            <CardDescription>Real-time fire risk assessment</CardDescription>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
            <Brain className="h-4 w-4 text-orange-500" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-3">
            <h3 className="font-semibold">Current Assessment</h3>
            <p className="mt-2 text-sm">
              <span className="font-medium text-red-500">High fire risk detected</span> in Northern California within
              the next 6 hours. Immediate monitoring recommended.
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Confidence</span>
              <span className="text-sm font-medium">89%</span>
            </div>
            <Progress value={89} className="mt-1" />

            {/* Added satellite image */}
            <div className="mt-3 rounded-md overflow-hidden">
              <img
                src="/placeholder.svg?height=200&width=400&text=Northern+California+Fire+Risk+Area"
                alt="Northern California Fire Risk Area"
                className="w-full h-auto"
              />
              <p className="mt-1 text-xs text-muted-foreground">Satellite image of high-risk area</p>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Contributing Factors</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-md border p-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                    <ThermometerSun className="h-4 w-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Temperature</p>
                    <p className="text-xs text-muted-foreground">102°F (38.9°C)</p>
                  </div>
                </div>
                <Badge className="bg-red-500">Critical</Badge>
              </div>

              <div className="flex items-center justify-between rounded-md border p-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
                    <Droplets className="h-4 w-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Humidity</p>
                    <p className="text-xs text-muted-foreground">15% (Very Low)</p>
                  </div>
                </div>
                <Badge className="bg-orange-500">High Risk</Badge>
              </div>

              <div className="flex items-center justify-between rounded-md border p-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
                    <Wind className="h-4 w-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Wind Speed</p>
                    <p className="text-xs text-muted-foreground">25 mph (40 km/h)</p>
                  </div>
                </div>
                <Badge className="bg-orange-500">High Risk</Badge>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-3">
            <h3 className="font-semibold">Recommended Actions</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-red-500"></span>
                <span>Deploy monitoring teams to Northern California region</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-red-500"></span>
                <span>Alert local fire departments and emergency services</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-orange-500"></span>
                <span>Prepare evacuation plans for nearby communities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-orange-500"></span>
                <span>Increase satellite monitoring frequency to 15-minute intervals</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
