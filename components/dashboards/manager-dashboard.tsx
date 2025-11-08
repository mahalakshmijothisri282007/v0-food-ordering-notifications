"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, BarChart3 } from "lucide-react"

export default function ManagerDashboard() {
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header */}
      <div className="bg-purple-950/50 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2 text-purple-400">
            <BarChart3 size={28} />
            Manager Dashboard
          </h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-purple-200 mb-8">
          <p className="text-lg">
            Logged in as: <span className="font-semibold text-purple-300">{user?.email}</span>
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Orders", value: "142", color: "from-purple-500 to-pink-500" },
            { label: "Revenue", value: "₹28,400", color: "from-blue-500 to-cyan-500" },
            { label: "Active Users", value: "45", color: "from-green-500 to-emerald-500" },
            { label: "Avg Order Value", value: "₹200", color: "from-orange-500 to-red-500" },
          ].map((stat, i) => (
            <Card key={i} className="bg-purple-900/40 border-purple-500/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} opacity-20`}></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-purple-900/40 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white">Top Selling Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Biryani", sales: "45", revenue: "₹9,000" },
                { name: "Butter Chicken", sales: "38", revenue: "₹9,500" },
                { name: "Tandoori Chicken", sales: "32", revenue: "₹7,040" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-3 border-b border-purple-500/20 last:border-0"
                >
                  <span className="text-purple-200">{item.name}</span>
                  <div className="flex gap-8">
                    <span className="text-pink-400">{item.sales} sold</span>
                    <span className="text-purple-300">{item.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
