"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { UserDashboard } from "@/components/dashboards/user-dashboard"
import { ChefDashboard } from "@/components/dashboards/chef-dashboard"
import { ManagerDashboard } from "@/components/dashboards/manager-dashboard"

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  if (!user) {
    router.push("/login")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">MEC Canteen</h1>
            <p className="text-sm text-muted-foreground">
              Welcome, <span className="font-semibold">{user.name}</span> ({user.role})
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {user.role === "user" && <UserDashboard />}
        {user.role === "chef" && <ChefDashboard />}
        {user.role === "manager" && <ManagerDashboard />}
      </main>
    </div>
  )
}
