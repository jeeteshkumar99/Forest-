import { DashboardHeader } from "@/components/dashboard-header"
import { FireMapDashboard } from "@/components/fire-map-dashboard"
import { FireAnalytics } from "@/components/fire-analytics"
import { RiskZoneAlerts } from "@/components/risk-zone-alerts"
import { ModelInsights } from "@/components/model-insights"
import { FireImageGallery } from "@/components/fire-image-gallery"

export default function Home() {
  
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <FireMapDashboard />
        </div>
        <div className="lg:col-span-1">
          <ModelInsights />
        </div>
        <div className="lg:col-span-2">
          <FireAnalytics />
        </div>
        <div className="lg:col-span-1">
          <RiskZoneAlerts />
        </div>
        <div className="lg:col-span-3">
          <FireImageGallery />
        </div>
      </div>
    </div>
  )
}


