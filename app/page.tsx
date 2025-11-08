"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useNotifications } from "@/context/notification-context"
import { NotificationCenter } from "@/components/notification-center"
import { MenuItemCard } from "@/components/menu-item-card"
import { redirect } from "next/navigation"

const MENU_ITEMS = [
  {
    id: 1,
    name: "Biryani",
    description: "Aromatic rice with spiced meat",
    price: 120,
    category: "Rice",
  },
  {
    id: 2,
    name: "Samosas",
    description: "Crispy pastry with vegetable filling",
    price: 30,
    category: "Snacks",
  },
  {
    id: 3,
    name: "Dosa",
    description: "Crispy crepe with potato filling",
    price: 60,
    category: "South Indian",
  },
  {
    id: 4,
    name: "Butter Chicken",
    description: "Tender chicken in creamy tomato sauce",
    price: 150,
    category: "Curry",
  },
  {
    id: 5,
    name: "Naan",
    description: "Fluffy Indian bread",
    price: 40,
    category: "Bread",
  },
  {
    id: 6,
    name: "Chai",
    description: "Traditional Indian tea",
    price: 20,
    category: "Beverages",
  },
  {
    id: 7,
    name: "Chole Bhature",
    description: "Chickpeas with fried bread",
    price: 80,
    category: "North Indian",
  },
  {
    id: 8,
    name: "Idli",
    description: "Steamed rice cake",
    price: 40,
    category: "South Indian",
  },
  {
    id: 9,
    name: "Paneer Tikka",
    description: "Grilled cottage cheese cubes",
    price: 100,
    category: "Appetizer",
  },
]

export default function Home() {
  redirect("/login")
}

function MenuPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground text-balance">Food Menu</h2>
        <p className="text-muted-foreground mt-2">Browse and order your favorite meals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MENU_ITEMS.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

function NotificationsPage() {
  return <NotificationCenter />
}

function MenuItemCard_Old({ item }: { item: (typeof MENU_ITEMS)[0] }) {
  const [quantity, setQuantity] = useState(1)
  const { addNotification } = useNotifications()

  const handleOrder = () => {
    const notification = {
      type: "order_confirmed" as const,
      title: `${item.name} ordered`,
      message: `Your order of ${quantity}x ${item.name} has been placed`,
      amount: item.price * quantity,
      orderId: `ORD-${Date.now()}`,
      priority: "medium" as const,
    }
    addNotification(notification)
    setQuantity(1)
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors">
      <div className="w-full h-48 bg-muted flex items-center justify-center text-muted-foreground">
        <img
          src={`/.jpg?height=192&width=400&query=${item.name}`}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-foreground">{item.name}</h3>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-bold text-foreground">₹{item.price}</p>
          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{item.category}</span>
        </div>

        <div className="flex gap-2">
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 hover:bg-secondary transition-colors"
            >
              −
            </button>
            <span className="px-3 py-2 border-x border-border">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 hover:bg-secondary transition-colors"
            >
              +
            </button>
          </div>

          <Button onClick={handleOrder} className="flex-1">
            Order
          </Button>
        </div>
      </div>
    </div>
  )
}
