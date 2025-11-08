"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/auth-context"
import type { UserRole } from "@/context/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<UserRole>("user")
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    try {
      await login(email, password, selectedRole)
      router.push("/dashboard")
    } catch (err) {
      setError("Login failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-xl p-8 shadow-2xl backdrop-blur-sm">
          <div className="mb-2 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg mb-4">
              <span className="text-white font-bold text-lg">🍽️</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center text-foreground mb-1">MEC Canteen</h1>
          <p className="text-center text-muted-foreground mb-8 text-sm">Food Ordering System</p>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-foreground">Select Role</label>
              <div className="grid grid-cols-3 gap-2">
                {(["user", "chef", "manager"] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`py-2 px-3 rounded-lg font-medium text-sm transition-all capitalize ${
                      selectedRole === role
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-primary-foreground shadow-lg scale-105"
                        : "bg-secondary/50 text-secondary-foreground hover:bg-secondary border border-border"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-foreground">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-secondary/30 rounded-lg text-xs text-muted-foreground border border-secondary/50">
            <p className="font-semibold mb-2 text-foreground">Demo Credentials:</p>
            <p>Email: demo@mec.edu</p>
            <p>Password: demo123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
