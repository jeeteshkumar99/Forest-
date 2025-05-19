"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Layers, ZoomIn, ZoomOut } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock data for fire incidents
const fireIncidents = [
  {
    id: 1,
    lat: 34.05,
    lng: -118.25,
    severity: "high",
    timestamp: "2023-07-15T14:30:00Z",
    region: "Los Angeles County",
    confidence: 0.89,
  },
  {
    id: 2,
    lat: 37.77,
    lng: -122.42,
    severity: "moderate",
    timestamp: "2023-07-15T12:15:00Z",
    region: "San Francisco Bay Area",
    confidence: 0.76,
  },
  {
    id: 3,
    lat: 39.74,
    lng: -104.99,
    severity: "low",
    timestamp: "2023-07-15T10:45:00Z",
    region: "Denver Metro",
    confidence: 0.65,
  },
]

// Declare google variable
declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export function FireMapDashboard() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedFire, setSelectedFire] = useState<(typeof fireIncidents)[0] | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [googleMap, setGoogleMap] = useState<any>(null)
  const [mapType, setMapType] = useState<string>("satellite")
  const scriptId = "google-maps-script"

  // useEffect(() => {
  //   // Check if script already exists
  //   if (document.getElementById(scriptId)) {
  //     if (window.google && window.google.maps) {
  //       initializeMap()
  //     }
  //     return
  //   }

  //   // Define the initialization function in the window scope
  //   window.initMap = initializeMap

  //   // Load Google Maps API script
  //   const script = document.createElement("script")
  //   script.id = scriptId
  //   script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap`
  //   script.async = true
  //   script.defer = true
  //   document.head.appendChild(script)

  //   return () => {
  //     // Clean up the global function
  //     delete window.initMap

  //     // We don't remove the script on cleanup to avoid the error
  //     // The script will be reused if the component remounts
  //   }
  // }, [])

  // // Initialize Google Map
  // function initializeMap() {
  //   if (mapRef.current && !googleMap && window.google) {
  //     try {
  //       const map = new window.google.maps.Map(mapRef.current, {
  //         center: { lat: 37.7749, lng: -122.4194 }, // San Francisco
  //         zoom: 6,
  //         mapTypeId: window.google.maps.MapTypeId.SATELLITE,
  //         mapTypeControl: false,
  //         streetViewControl: false,
  //         fullscreenControl: false,
  //       })

  //       setGoogleMap(map)
  //       setMapLoaded(true)

  //       // Add fire markers
  //       fireIncidents.forEach((fire) => {
  //         const markerColor =
  //           fire.severity === "high" ? "#ef4444" : fire.severity === "moderate" ? "#f97316" : "#eab308"

  //         const marker = new window.google.maps.Marker({
  //           position: { lat: fire.lat, lng: fire.lng },
  //           map: map,
  //           icon: {
  //             path: window.google.maps.SymbolPath.CIRCLE,
  //             fillColor: markerColor,
  //             fillOpacity: 0.8,
  //             strokeWeight: 2,
  //             strokeColor: "#ffffff",
  //             scale: 10,
  //           },
  //           title: `Fire in ${fire.region}`,
  //         })

  //         // Add click event to marker
  //         marker.addListener("click", () => {
  //           setSelectedFire(fire)
  //         })
  //       })
  //     } catch (error) {
  //       console.error("Error initializing map:", error)
  //     }
  //   }
  // }

  // Handle map type change
  const handleMapTypeChange = (value: string) => {
    setMapType(value)
    if (googleMap && window.google) {
      switch (value) {
        case "satellite":
          googleMap.setMapTypeId(window.google.maps.MapTypeId.SATELLITE)
          break
        case "terrain":
          googleMap.setMapTypeId(window.google.maps.MapTypeId.TERRAIN)
          break
        case "hybrid":
          googleMap.setMapTypeId(window.google.maps.MapTypeId.HYBRID)
          break
        default:
          googleMap.setMapTypeId(window.google.maps.MapTypeId.SATELLITE)
      }
    }
  }

  // Handle zoom controls
  const handleZoomIn = () => {
    if (googleMap) {
      googleMap.setZoom(googleMap.getZoom() + 1)
    }
  }

  const handleZoomOut = () => {
    if (googleMap) {
      googleMap.setZoom(googleMap.getZoom() - 1)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500"
      case "moderate":
        return "bg-orange-400"
      case "low":
        return "bg-yellow-300"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <Card className="h-[500px]">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Fire Map Dashboard</CardTitle>
            <CardDescription>Real-time fire monitoring across regions</CardDescription>
          </div>
          <div className="flex gap-2">
            <Tabs defaultValue="satellite" value={mapType} onValueChange={handleMapTypeChange}>
              <TabsList>
                <TabsTrigger value="satellite">Satellite</TabsTrigger>
                <TabsTrigger value="terrain">Terrain</TabsTrigger>
                <TabsTrigger value="hybrid">Hybrid</TabsTrigger>
              </TabsList>
            </Tabs>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Layers className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Show Fire Zones</DropdownMenuItem>
                <DropdownMenuItem>Show Risk Areas</DropdownMenuItem>
                <DropdownMenuItem>Show Weather</DropdownMenuItem>
                <DropdownMenuItem>Show Vegetation</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative h-[calc(100%-5rem)]">
        <div ref={mapRef} className="relative h-full w-full rounded-md overflow-hidden">
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
                <p className="text-sm text-muted-foreground">Loading map data...</p>
              </div>
            </div>
          )}

          {/* Map controls */}
          <div className="absolute right-4 top-4 flex flex-col gap-2 z-10">
            <Button variant="secondary" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
          </div>

          {/* Fire incident dialog */}
          {selectedFire && (
            <Dialog open={!!selectedFire} onOpenChange={(open) => !open && setSelectedFire(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    Fire Incident - {selectedFire.region}
                    <Badge className={getSeverityColor(selectedFire.severity)}>
                      {selectedFire.severity.toUpperCase()}
                    </Badge>
                  </DialogTitle>
                  <DialogDescription>Detected on {new Date(selectedFire.timestamp).toLocaleString()}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Coordinates</p>
                      <p className="text-sm">
                        {selectedFire.lat.toFixed(4)}, {selectedFire.lng.toFixed(4)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Confidence</p>
                      <p className="text-sm">{(selectedFire.confidence * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <p className="text-sm">Active - Monitoring</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Recommended Action</p>
                    <p className="text-sm">
                      {selectedFire.severity === "high"
                        ? "Immediate evacuation of surrounding areas required."
                        : selectedFire.severity === "moderate"
                          ? "Prepare for possible evacuation. Monitor situation closely."
                          : "Monitor situation. No immediate action required."}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Satellite Image</p>
                    <div className="mt-2 h-40 rounded-md overflow-hidden">
                      <img
                        src={`/placeholder.svg?height=300&width=500&text=Satellite+Image+of+${selectedFire.region}`}
                        alt={`Satellite view of fire in ${selectedFire.region}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Dispatch Team</Button>
                  <Button variant="destructive">Send Alert</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 rounded-md bg-background/90 p-2 shadow-md z-10">
            <p className="text-xs font-medium mb-1">Fire Severity</p>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <span className="text-xs">High</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-orange-400"></div>
                <span className="text-xs">Moderate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-yellow-300"></div>
                <span className="text-xs">Low</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
