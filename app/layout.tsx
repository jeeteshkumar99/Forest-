import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

import AuthGuard from "@/components/AuthGuard"


  

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Forest Fire Monitoring Dashboard",
  description: "Real-time forest fire monitoring powered by satellite imagery and AI predictions",
    generator: 'v0.dev'
}



export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SidebarProvider>
            <AuthGuard>
              <div>
                
              </div>
            </AuthGuard>
            <div className="flex min-h-screen">
              <DashboardSidebar />
              <main className="flex-1 overflow-x-hidden">{children}</main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



