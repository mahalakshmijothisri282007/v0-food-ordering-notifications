"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useNotifications } from "@/context/notification-context"
import { useAuth } from "@/context/auth-context"
import { ShoppingCart, Smartphone, MapPin, Wallet } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { cartItems, total, clearCart } = useCart()
  const { addNotification } = useNotifications()
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "gpay">("upi")
  const [upiId, setUpiId] = useState("")
  const [googlePayId, setGooglePayId] = useState("")
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")

  if (!user || user.role !== "user") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Please log in as a user to checkout</p>
          <Button onClick={() => router.push("/login")}>Go to Login</Button>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">Your cart is empty</p>
          <Button onClick={() => router.push("/dashboard")}>Continue Shopping</Button>
        </div>
      </div>
    )
  }

  const handlePayment = async () => {
    if (!deliveryAddress.trim()) {
      alert("Please enter a delivery address")
      return
    }

    if (paymentMethod === "upi" && !upiId.trim()) {
      alert("Please enter your UPI ID")
      return
    }
    if (paymentMethod === "gpay" && !googlePayId.trim()) {
      alert("Please enter your Google Pay ID/Phone number")
      return
    }

    setPaymentStatus("processing")

    // Simulate payment processing
    setTimeout(() => {
      const orderId = `ORD-${Date.now()}`
      const paymentMethodLabel = paymentMethod === "upi" ? "UPI" : "Google Pay"
      const paymentId = paymentMethod === "upi" ? upiId : googlePayId

      // Add order confirmation notification
      addNotification({
        type: "order_confirmed",
        title: "Order Placed Successfully",
        message: `Your order #${orderId} has been confirmed. We're preparing your food!`,
        amount: total,
        orderId,
        priority: "high",
      })

      // Add payment success notification
      addNotification({
        type: "payment_success",
        title: "Payment Successful",
        message: `Payment of ₹${total.toFixed(2)} received via ${paymentMethodLabel} (${paymentId})`,
        amount: total,
        orderId,
        priority: "high",
      })

      setPaymentStatus("success")
      clearCart()

      // Redirect to orders after 2 seconds
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">Order Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center pb-2 border-b border-border">
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-foreground">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="pt-4 border-t-2 border-border">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-foreground">Total:</span>
                  <span className="text-2xl font-bold text-primary">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Delivery & Payment</h2>

            {/* Delivery Address */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <MapPin className="w-4 h-4" />
                Delivery Address
              </label>
              <textarea
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter your delivery address..."
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
                disabled={paymentStatus === "processing"}
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Select Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                {/* UPI Option */}
                <button
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === "upi"
                      ? "border-blue-600 bg-blue-50"
                      : "border-border bg-background hover:border-blue-400"
                  }`}
                  disabled={paymentStatus === "processing"}
                >
                  <Smartphone
                    className={`w-6 h-6 mx-auto mb-2 ${paymentMethod === "upi" ? "text-blue-600" : "text-muted-foreground"}`}
                  />
                  <p
                    className={`font-semibold text-sm ${paymentMethod === "upi" ? "text-blue-600" : "text-foreground"}`}
                  >
                    UPI
                  </p>
                </button>

                {/* Google Pay Option */}
                <button
                  onClick={() => setPaymentMethod("gpay")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === "gpay"
                      ? "border-blue-600 bg-blue-50"
                      : "border-border bg-background hover:border-blue-400"
                  }`}
                  disabled={paymentStatus === "processing"}
                >
                  <Wallet
                    className={`w-6 h-6 mx-auto mb-2 ${paymentMethod === "gpay" ? "text-blue-600" : "text-muted-foreground"}`}
                  />
                  <p
                    className={`font-semibold text-sm ${paymentMethod === "gpay" ? "text-blue-600" : "text-foreground"}`}
                  >
                    Google Pay
                  </p>
                </button>
              </div>
            </div>

            {/* UPI Payment Form */}
            {paymentMethod === "upi" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">Pay with UPI</h3>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-blue-900">UPI ID (e.g., username@upi)</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className="w-full p-3 border border-blue-200 rounded-lg bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={paymentStatus === "processing"}
                  />
                </div>

                <div className="mt-4 p-3 bg-blue-100 rounded border border-blue-300 text-sm text-blue-900">
                  <p className="font-medium mb-1">Demo Mode</p>
                  <p>Try UPI ID: user@upi</p>
                </div>
              </div>
            )}

            {/* Google Pay Form */}
            {paymentMethod === "gpay" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Wallet className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">Pay with Google Pay</h3>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-blue-900">Phone Number or Email</label>
                  <input
                    type="text"
                    value={googlePayId}
                    onChange={(e) => setGooglePayId(e.target.value)}
                    placeholder="9876543210 or email@gmail.com"
                    className="w-full p-3 border border-blue-200 rounded-lg bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={paymentStatus === "processing"}
                  />
                </div>

                <div className="mt-4 p-3 bg-blue-100 rounded border border-blue-300 text-sm text-blue-900">
                  <p className="font-medium mb-1">Demo Mode</p>
                  <p>Try Phone: 9876543210</p>
                </div>
              </div>
            )}

            {/* Payment Status Messages */}
            {paymentStatus === "success" && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-900 font-medium">Payment Successful!</p>
                <p className="text-sm text-green-800">Your order is being prepared...</p>
              </div>
            )}

            {paymentStatus === "processing" && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-900 font-medium">Processing Payment...</p>
                <p className="text-sm text-blue-800">Please wait while we process your payment</p>
              </div>
            )}

            {/* Payment Button */}
            <Button
              onClick={handlePayment}
              disabled={paymentStatus === "processing"}
              className="w-full py-3 text-lg font-semibold"
            >
              {paymentStatus === "processing" ? "Processing..." : `Pay ₹${total.toFixed(2)}`}
            </Button>

            <Button
              variant="outline"
              onClick={() => router.push("/dashboard")}
              disabled={paymentStatus === "processing"}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
