"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useNotifications } from "@/context/notification-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, ChefHat } from "lucide-react"

const SAMPLE_ORDERS = [
  { id: "#001", items: "Biryani x2, Naan x1", status: "pending", time: "5 mins" },
  { id: "#002", items: "Butter Chicken x1, Dosa x2", status: "preparing", time: "15 mins" },
  { id: "#003", items: "Samosa x3", status: "preparing", time: "8 mins" },
]

export default function ChefDashboard() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { addNotification } = useNotifications()
  const [orders, setOrders] = useState(SAMPLE_ORDERS)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const markReady = (orderId: string) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: "ready" } : order)))
    addNotification({
      type: "order_ready",
      title: "Order Ready!",
      message: `Order ${orderId} is ready for pickup`,
      orderNumber: orderId,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header */}
      <div className="bg-purple-950/50 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2 text-purple-400">
            <ChefHat size={28} />
            Chef Dashboard
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

        <div className="grid gap-6">
          {orders.map((order) => (
            <Card key={order.id} className="bg-purple-900/40 border-purple-500/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">{order.id}</CardTitle>
                    <CardDescription className="text-purple-300">{order.items}</CardDescription>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full font-semibold ${
                      order.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : order.status === "preparing"
                          ? "bg-blue-500/20 text-blue-300"
                          : "bg-green-500/20 text-green-300"
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-purple-300">Time: {order.time}</span>
                  {order.status !== "ready" && (
                    <Button
                      onClick={() => markReady(order.id)}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    >
                      Mark Ready
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
