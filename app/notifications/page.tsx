import { DashboardHeader } from "@/components/dashboard-header"
import { NotificationCenter } from "@/components/notification-center"

export default function NotificationsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="container mx-auto p-4">
        <NotificationCenter />
      </div>
    </div>
  )
}
