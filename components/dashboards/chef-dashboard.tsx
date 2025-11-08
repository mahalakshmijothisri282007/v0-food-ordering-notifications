"use client"

import { Clock, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const ORDERS = [
  { id: "ORD-001", items: "Biryani x2", status: "preparing", time: "5 mins" },
  { id: "ORD-002", items: "Dosa x1, Chai x2", status: "ready", time: "Ready" },
  { id: "ORD-003", items: "Butter Chicken x1", status: "pending", time: "10 mins" },
]

export function ChefDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={AlertCircle} label="Pending Orders" value="3" color="orange" />
        <StatCard icon={Clock} label="Preparing" value="2" color="blue" />
        <StatCard icon={CheckCircle2} label="Ready" value="1" color="green" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Order Queue</h2>
        <div className="space-y-4">
          {ORDERS.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  )
}

function OrderCard({ order }: { order: (typeof ORDERS)[0] }) {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    preparing: "bg-blue-100 text-blue-800",
    ready: "bg-green-100 text-green-800",
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
      <div className="flex-1">
        <p className="font-semibold text-foreground">{order.id}</p>
        <p className="text-sm text-muted-foreground">{order.items}</p>
      </div>
      <div className="flex items-center gap-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${statusColors[order.status as keyof typeof statusColors]}`}
        >
          {order.status}
        </span>
        <Button size="sm">{order.status === "ready" ? "Mark Delivered" : "Start Cooking"}</Button>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  const colorMap = {
    orange: "bg-orange-100 text-orange-600",
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 flex items-start gap-4">
      <div className={`p-3 rounded-lg ${colorMap[color as keyof typeof colorMap]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  )
}
