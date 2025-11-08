"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  image?: string
}

export function MenuItemCard({ item }: { item: MenuItem }) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const handleOrder = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
    })
    setQuantity(1)
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors">
      <div className="w-full h-48 bg-muted flex items-center justify-center text-muted-foreground overflow-hidden">
        <img
          src={item.image || `/placeholder.jpg?height=192&width=400&query=${item.name}`}
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
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
