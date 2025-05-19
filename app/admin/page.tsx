import { DashboardHeader } from "@/components/dashboard-header"
import { AdminPanel } from "@/components/admin-panel"

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="container mx-auto p-4">
        <AdminPanel />
      </div>
    </div>
  )
}


