"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShoppingCart, Clock, CheckCircle2, AlertCircle, Sparkles } from "lucide-react"
import { MenuItemCard } from "@/components/menu-item-card"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"

const MENU_ITEMS = [
  {
    id: 1,
    name: "Biryani",
    description: "Aromatic rice with spiced meat",
    price: 120,
    category: "Rice",
    image: "/flavorful-biryani.png",
  },
  {
    id: 2,
    name: "Samosas",
    description: "Crispy pastry with vegetable filling",
    price: 30,
    category: "Snacks",
    image: "/crispy-samosas.png",
  },
  {
    id: 3,
    name: "Dosa",
    description: "Crispy crepe with potato filling",
    price: 60,
    category: "South Indian",
    image: "/crispy-dosa.png",
  },
  {
    id: 4,
    name: "Butter Chicken",
    description: "Tender chicken in creamy tomato sauce",
    price: 150,
    category: "Curry",
    image: "/butter-chicken.jpg",
  },
  {
    id: 5,
    name: "Naan",
    description: "Fluffy Indian bread",
    price: 40,
    category: "Bread",
    image: "/naan-bread.png",
  },
  {
    id: 6,
    name: "Chai",
    description: "Traditional Indian tea",
    price: 20,
    category: "Beverages",
    image: "/chai.jpg",
  },
]

export function UserDashboard() {
  const [orders, setOrders] = useState<any[]>([])
  const router = useRouter()
  const { cartItems, total } = useCart()

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600/10 to-indigo-600/10 border border-purple-200/50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            MEC Canteen
          </h1>
        </div>
        <p className="text-muted-foreground">Welcome! Order your favorite meals</p>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={ShoppingCart}
          label="Total Orders"
          value={orders.length.toString()}
          color="from-purple-600 to-indigo-600"
        />
        <StatCard icon={Clock} label="Pending" value="2" color="from-orange-500 to-red-500" />
        <StatCard icon={CheckCircle2} label="Completed" value="5" color="from-green-500 to-emerald-500" />
        <StatCard icon={AlertCircle} label="Ready for Pickup" value="1" color="from-blue-500 to-cyan-500" />
      </div>

      {/* Menu Section */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <span className="w-1.5 h-8 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full"></span>
          Order Food
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MENU_ITEMS.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Cart Summary Section */}
      {cartItems.length > 0 && (
        <div className="sticky bottom-6 right-6">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-primary-foreground rounded-xl p-6 shadow-2xl max-w-sm border border-purple-400/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <span className="font-semibold">Cart Items: {cartItems.length}</span>
              </div>
              <span className="text-3xl font-bold">₹{total.toFixed(2)}</span>
            </div>
            <Button
              onClick={() => router.push("/checkout")}
              className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold"
            >
              Go to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 flex items-start gap-4 hover:shadow-lg transition-shadow">
      <div className={`p-3 bg-gradient-to-br ${color} rounded-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          {value}
        </p>
      </div>
    </div>
  )
}
