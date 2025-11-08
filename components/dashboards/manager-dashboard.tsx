"use client"

import { TrendingUp, Users, DollarSign, Package } from "lucide-react"

export function ManagerDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Total Orders" value="127" color="blue" />
        <StatCard icon={DollarSign} label="Revenue" value="₹15,240" color="green" />
        <StatCard icon={Users} label="Active Users" value="45" color="purple" />
        <StatCard icon={TrendingUp} label="Growth" value="+12%" color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top Selling Items</h3>
          <div className="space-y-3">
            {["Biryani", "Butter Chicken", "Dosa", "Naan"].map((item) => (
              <div key={item} className="flex justify-between items-center pb-2 border-b border-border last:border-b-0">
                <span className="text-foreground">{item}</span>
                <span className="font-semibold text-primary">28 orders</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              "Order #ORD-127 completed",
              "User registered: student123",
              "Payment received: ₹450",
              "Inventory updated",
            ].map((activity) => (
              <p key={activity} className="text-sm text-muted-foreground border-b border-border pb-2 last:border-b-0">
                {activity}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
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
