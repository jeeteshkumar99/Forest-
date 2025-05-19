import { DashboardHeader } from "@/components/dashboard-header"
import { SatelliteViewer } from "@/components/satellite-viewer"

export default function SatelliteViewerPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="container mx-auto p-4">
        <SatelliteViewer />
      </div>
    </div>
  )
}
