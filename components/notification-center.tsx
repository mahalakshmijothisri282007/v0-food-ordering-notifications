"use client"

import { Bell, X, Trash2, CheckCircle, CreditCard, Clock, Truck, Package } from "lucide-react"
import { useNotifications } from "@/context/notification-context"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const typeConfig = {
  order_confirmed: {
    icon: CheckCircle,
    color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    label: "Order Confirmed",
  },
  payment_success: {
    icon: CreditCard,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    label: "Payment",
  },
  order_preparing: {
    icon: Clock,
    color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    label: "Preparing",
  },
  order_ready: {
    icon: Package,
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    label: "Ready",
  },
  out_for_delivery: {
    icon: Truck,
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    label: "In Transit",
  },
  delivered: {
    icon: CheckCircle,
    color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    label: "Delivered",
  },
  order_cancelled: { icon: X, color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300", label: "Cancelled" },
}

export function NotificationCenter() {
  const { notifications, markAsRead, deleteNotification, clearAll } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="w-full">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Food Order Notifications</h1>
            <p className="text-sm text-muted-foreground">Track your orders in real-time</p>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 bg-destructive text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-96 bg-card border border-border rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h2 className="font-semibold text-foreground">Recent Notifications</h2>
                  {notifications.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs">
                      Clear all
                    </Button>
                  )}
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No notifications yet</p>
                    </div>
                  ) : (
                    notifications.map((notif) => {
                      const TypeIcon = typeConfig[notif.type].icon
                      return (
                        <div
                          key={notif.id}
                          className={`p-4 border-b border-border hover:bg-secondary transition-colors cursor-pointer ${
                            !notif.read ? "bg-secondary/50" : ""
                          }`}
                          onClick={() => markAsRead(notif.id)}
                        >
                          <div className="flex gap-3">
                            <div className={`p-2 rounded-lg ${typeConfig[notif.type].color}`}>
                              <TypeIcon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <p className="font-semibold text-foreground text-sm">{notif.title}</p>
                                  <p className="text-sm text-muted-foreground line-clamp-2">{notif.message}</p>
                                  {notif.amount && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Amount: ${notif.amount.toFixed(2)}
                                    </p>
                                  )}
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    deleteNotification(notif.id)
                                  }}
                                  className="text-muted-foreground hover:text-destructive mt-1"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">{formatTime(notif.timestamp)}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Notifications</p>
                <p className="text-3xl font-bold text-foreground mt-2">{notifications.length}</p>
              </div>
              <Bell className="w-8 h-8 text-muted-foreground opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unread</p>
                <p className="text-3xl font-bold text-foreground mt-2">{unreadCount}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-destructive opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Orders Confirmed</p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {notifications.filter((n) => n.type === "order_confirmed").length}
                </p>
              </div>
              <Package className="w-8 h-8 text-muted-foreground opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Payments Processed</p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {notifications.filter((n) => n.type === "payment_success").length}
                </p>
              </div>
              <CreditCard className="w-8 h-8 text-muted-foreground opacity-50" />
            </div>
          </Card>
        </div>

        {/* Notifications List */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">All Notifications</h2>
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No notifications to display</p>
              </Card>
            ) : (
              notifications.map((notif) => {
                const TypeIcon = typeConfig[notif.type].icon
                return (
                  <Card key={notif.id} className="p-4 hover:border-primary transition-colors">
                    <div className="flex gap-4">
                      <div className={`p-3 rounded-lg h-fit ${typeConfig[notif.type].color}`}>
                        <TypeIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold text-foreground">{notif.title}</h3>
                              {notif.orderId && (
                                <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                                  {notif.orderId}
                                </span>
                              )}
                              {notif.priority === "high" && (
                                <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs rounded-full">
                                  High Priority
                                </span>
                              )}
                              {!notif.read && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">{notif.message}</p>
                            {notif.amount && (
                              <p className="text-sm font-semibold text-foreground mt-2">
                                Amount: ${notif.amount.toFixed(2)}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground mt-2">{formatTime(notif.timestamp)}</p>
                          </div>
                          <button
                            onClick={() => deleteNotification(notif.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function formatTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return "just now"
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString()
}
