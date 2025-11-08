"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useCart } from "@/context/cart-context"
import { useNotifications } from "@/context/notification-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, LogOut, ShoppingCart, User, Mail } from "lucide-react"

const MENU_ITEMS = [
  { id: "1", name: "Chicken Biryani", price: 200, image: "/flavorful-biryani.png" },
  { id: "2", name: "Samosa", price: 30, image: "/crispy-golden-samosas.png" },
  { id: "3", name: "Butter Chicken", price: 250, image: "/butter-chicken.png" },
  { id: "4", name: "Dosa", price: 80, image: "/crispy-dosa.png" },
  { id: "5", name: "Garlic Naan", price: 50, image: "/naan-bread.png" },
  { id: "6", name: "Paneer Tikka", price: 180, image: "/paneer-tikka.png" },
  { id: "7", name: "Masala Dosa", price: 100, image: "/masala-dosa.png" },
  { id: "8", name: "Tandoori Chicken", price: 220, image: "/tandoori-chicken.png" },
  { id: "9", name: "Chole Bhature", price: 120, image: "/chole-bhature.jpg" },
  { id: "10", name: "Idli", price: 40, image: "/fluffy-idli.png" },
  { id: "11", name: "Vada Pav", size: 60, image: "/vada-pav.png" },
  { id: "12", name: "Pulao", price: 150, image: "/pulao.jpg" },
]

export default function UserDashboard() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { cartItems, addToCart, totalPrice } = useCart()
  const { notifications } = useNotifications()
  const [showCart, setShowCart] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      {/* Header */}
      <div className="bg-purple-950/50 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🍽️ MEC Food Ordering System
            </h1>
            <p className="text-xs text-purple-300">Delicious food at your doorstep</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative p-2 rounded-lg bg-purple-700/40 hover:bg-purple-600/40 text-purple-200 transition"
            >
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 w-6 h-6 bg-pink-500 rounded-full text-white text-xs flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button
              onClick={() => router.push("/orders")}
              className="relative p-2 rounded-lg bg-purple-700/40 hover:bg-purple-600/40 text-purple-200 transition"
            >
              <Bell size={24} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="p-2 rounded-lg bg-purple-700/40 hover:bg-purple-600/40 text-purple-200 transition"
              >
                <User size={24} />
              </button>
              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-purple-900/95 border border-purple-500/30 rounded-lg shadow-lg p-4 backdrop-blur">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-purple-500/20">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Profile</p>
                      <p className="text-xs text-purple-300 flex items-center gap-1">
                        <Mail size={12} />
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button className="w-full text-left px-3 py-2 text-purple-200 hover:bg-purple-700/40 rounded transition text-sm">
                      View Profile
                    </button>
                    <button className="w-full text-left px-3 py-2 text-purple-200 hover:bg-purple-700/40 rounded transition text-sm">
                      My Orders
                    </button>
                    <button className="w-full text-left px-3 py-2 text-purple-200 hover:bg-purple-700/40 rounded transition text-sm">
                      Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-red-400 hover:bg-purple-700/40 rounded transition text-sm border-t border-purple-500/20 mt-2 pt-2"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="text-purple-200 mb-8">
          <p className="text-lg">
            Welcome, <span className="font-semibold text-purple-300">{user?.email}</span>
          </p>
        </div>

        <Card className="bg-gradient-to-r from-purple-800/40 to-indigo-800/40 border-purple-500/30 mb-8 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Add Your Favorite Meals</h3>
                <p className="text-purple-200">Explore our delicious menu and add items to your cart below</p>
              </div>
              <div className="text-4xl">🍴</div>
            </div>
          </CardContent>
        </Card>

        {showCart && cartItems.length > 0 ? (
          <Card className="bg-purple-900/40 border-purple-500/30 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Your Cart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-purple-200">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t border-purple-500/20 pt-4 flex justify-between text-purple-300 font-semibold">
                  <span>Total:</span>
                  <span>₹{totalPrice}</span>
                </div>
                <Button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MENU_ITEMS.map((item) => (
            <Card key={item.id} className="bg-purple-900/40 border-purple-500/30 hover:border-purple-400/60 transition">
              <div className="relative h-40 bg-gradient-to-br from-purple-700 to-indigo-700 rounded-t-lg overflow-hidden">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <CardContent className="pt-4">
                <h3 className="font-semibold text-white mb-2">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-pink-400 font-bold">₹{item.price}</span>
                  <Button
                    onClick={() =>
                      addToCart({ id: item.id, name: item.name, price: item.price, quantity: 1, image: item.image })
                    }
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
