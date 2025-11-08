"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export interface Notification {
  id: string
  type:
    | "order_confirmed"
    | "payment_success"
    | "order_preparing"
    | "order_ready"
    | "out_for_delivery"
    | "delivered"
    | "order_cancelled"
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: "high" | "medium" | "low"
  orderId?: string
  amount?: number
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  deleteNotification: (id: string) => void
  clearAll: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "NTF001",
      type: "order_confirmed",
      title: "Order Confirmed",
      message: "Your order #ORD987 has been successfully placed and is being prepared.",
      timestamp: new Date("2025-11-08T15:06:00Z"),
      read: false,
      priority: "high",
      orderId: "ORD987",
      amount: 15.11,
    },
    {
      id: "NTF002",
      type: "payment_success",
      title: "Payment Received",
      message: "Payment of $15.11 for order #ORD987 has been successfully processed.",
      timestamp: new Date("2025-11-08T15:05:00Z"),
      read: false,
      priority: "high",
      orderId: "ORD987",
      amount: 15.11,
    },
    {
      id: "NTF003",
      type: "order_preparing",
      title: "Preparing Your Order",
      message: "Your order #ORD987 is now being prepared in the kitchen. Expected time: 20 minutes.",
      timestamp: new Date("2025-11-08T14:50:00Z"),
      read: true,
      priority: "medium",
      orderId: "ORD987",
    },
    {
      id: "NTF004",
      type: "order_ready",
      title: "Order Ready for Pickup",
      message: "Your order #ORD987 is ready for pickup or out for delivery!",
      timestamp: new Date("2025-11-08T14:30:00Z"),
      read: true,
      priority: "medium",
      orderId: "ORD987",
    },
  ])

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: `NTF${Date.now().toString().slice(-6)}`,
      timestamp: new Date(),
      read: false,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, deleteNotification, clearAll }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider")
  }
  return context
}
