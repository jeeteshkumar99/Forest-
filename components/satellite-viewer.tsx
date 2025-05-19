"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, Upload, ZoomIn, ZoomOut, RotateCw, Layers, Calendar, Satellite } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample satellite images
const satelliteImages = {
  modis: "/placeholder.svg?height=1000&width=1000&text=MODIS+Satellite+Image",
  sentinel: "/placeholder.svg?height=1000&width=1000&text=Sentinel-2+Satellite+Image",
  landsat: "/placeholder.svg?height=1000&width=1000&text=Landsat+Satellite+Image",
}

// Sample analysis images
const analysisImages = {
  vegetation: "/placeholder.svg?height=400&width=600&text=Vegetation+Analysis",
  thermal: "/placeholder.svg?height=400&width=600&text=Thermal+Analysis",
}

export function SatelliteViewer() {
  const [activeSource, setActiveSource] = useState("modis")
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [overlay, setOverlay] = useState("none")

  const handleZoomIn = () => {
    if (zoom < 2) setZoom(zoom + 0.2)
  }

  const handleZoomOut = () => {
    if (zoom > 0.6) setZoom(zoom - 0.2)
  }

  const handleRotate = () => {
    setRotation((rotation + 90) % 360)
  }

  const getSourceName = (source: string) => {
    switch (source) {
      case "modis":
        return "MODIS"
      case "sentinel":
        return "Sentinel-2"
      case "landsat":
        return "Landsat"
      default:
        return "Unknown"
    }
  }

  const getOverlayStyle = (overlay: string) => {
    switch (overlay) {
      case "vegetation":
        return {
          backgroundImage: "linear-gradient(rgba(0, 255, 0, 0.3), rgba(0, 255, 0, 0.3))",
        }
      case "heatmap":
        return {
          backgroundImage: "linear-gradient(rgba(255, 0, 0, 0.3), rgba(255, 0, 0, 0.3))",
        }
      case "risk":
        return {
          backgroundImage: "linear-gradient(rgba(255, 165, 0, 0.3), rgba(255, 165, 0, 0.3))",
        }
      default:
        return {}
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Satellite Image Viewer</CardTitle>
              <CardDescription>View and analyze satellite imagery</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Select Date
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Export as PNG</DropdownMenuItem>
                  <DropdownMenuItem>Export as JPEG</DropdownMenuItem>
                  <DropdownMenuItem>Export as TIFF</DropdownMenuItem>
                  <DropdownMenuItem>Export Raw Data</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="viewer" className="space-y-4">
            <TabsList>
              <TabsTrigger value="viewer">Image Viewer</TabsTrigger>
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="viewer" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label>Source:</Label>
                  <Select value={activeSource} onValueChange={setActiveSource}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modis">MODIS</SelectItem>
                      <SelectItem value="sentinel">Sentinel-2</SelectItem>
                      <SelectItem value="landsat">Landsat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Label>Overlay:</Label>
                  <Select value={overlay} onValueChange={setOverlay}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select overlay" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="vegetation">Vegetation Index</SelectItem>
                      <SelectItem value="heatmap">Heat Map</SelectItem>
                      <SelectItem value="risk">Risk Zones</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="relative h-[500px] w-full overflow-hidden rounded-lg border bg-slate-900">
                <div
                  className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
                  style={{
                    transform: `scale(${zoom}) rotate(${rotation}deg)`,
                  }}
                >
                  {/* Satellite image */}
                  <img
                    src={satelliteImages[activeSource as keyof typeof satelliteImages] || "/placeholder.svg"}
                    alt={`${getSourceName(activeSource)} satellite image`}
                    className="h-full w-full object-cover"
                  />

                  {/* Overlay */}
                  {overlay !== "none" && <div className="absolute inset-0" style={getOverlayStyle(overlay)}></div>}
                </div>

                {/* Image info overlay */}
                <div className="absolute bottom-4 left-4 rounded-md bg-background/90 p-2 text-xs">
                  <p className="font-medium">{getSourceName(activeSource)} Satellite</p>
                  <p className="text-muted-foreground">Captured: July 15, 2023</p>
                  <p className="text-muted-foreground">Region: Northern California</p>
                </div>

                {/* Controls */}
                <div className="absolute right-4 top-4 flex flex-col gap-2">
                  <Button variant="secondary" size="icon" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="icon" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="icon" onClick={handleRotate}>
                    <RotateCw className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="icon">
                    <Layers className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="upload">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
                      <Satellite className="h-10 w-10 text-orange-500" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-medium">Upload Satellite Image</h3>
                      <p className="text-sm text-muted-foreground">
                        Upload satellite imagery for AI-powered fire risk analysis
                      </p>
                    </div>
                    <div className="flex w-full max-w-sm flex-col gap-4">
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="image-source">Image Source</Label>
                        <Select defaultValue="modis">
                          <SelectTrigger>
                            <SelectValue placeholder="Select source" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="modis">MODIS</SelectItem>
                            <SelectItem value="sentinel">Sentinel-2</SelectItem>
                            <SelectItem value="landsat">Landsat</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="region">Region</Label>
                        <Input id="region" placeholder="e.g., Northern California" />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="date">Capture Date</Label>
                        <Input id="date" type="date" />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="file">Image File</Label>
                        <div className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-input bg-background p-4 text-sm">
                          <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                          <p className="text-muted-foreground">Drag and drop or click to upload</p>
                          <p className="text-xs text-muted-foreground">Supports TIFF, JPEG, PNG (max 100MB)</p>
                          <input id="file" type="file" className="hidden" />
                        </div>
                      </div>
                      <Button className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload for Analysis
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Vegetation Analysis</CardTitle>
                    <CardDescription>NDVI (Normalized Difference Vegetation Index)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full rounded-md bg-slate-900 overflow-hidden">
                      <img
                        src={analysisImages.vegetation || "/placeholder.svg"}
                        alt="Vegetation analysis"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mt-4">
                      <p className="text-sm">
                        <span className="font-medium">Analysis:</span> Low vegetation density detected in highlighted
                        areas, indicating high fire susceptibility.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Thermal Analysis</CardTitle>
                    <CardDescription>Surface temperature distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full rounded-md bg-slate-900 overflow-hidden">
                      <img
                        src={analysisImages.thermal || "/placeholder.svg"}
                        alt="Thermal analysis"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mt-4">
                      <p className="text-sm">
                        <span className="font-medium">Analysis:</span> Elevated surface temperatures detected in red
                        zones, exceeding seasonal averages by 15°F.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
