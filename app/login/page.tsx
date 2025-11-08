"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<"user" | "chef" | "manager">("user")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login(selectedRole, email)
    router.push("/dashboard")
  }

  const demoCredentials: Record<string, string> = {
    user: "user@mec.college",
    chef: "chef@mec.college",
    manager: "manager@mec.college",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="absolute top-8 left-8 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent mb-2">
          MEC Food Ordering System
        </h2>
        <p className="text-purple-200 text-sm md:text-base">Delicious Food, Fast Delivery</p>
      </div>

      <Card className="w-full max-w-md bg-white/10 border-purple-500/30 backdrop-blur-xl relative z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            MEC Food Order
          </CardTitle>
          <CardDescription className="text-purple-200">Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-purple-200">Select Role</label>
              <div className="grid grid-cols-3 gap-2">
                {(["user", "chef", "manager"] as const).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`py-2 px-3 rounded-lg font-medium transition ${
                      selectedRole === role
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "bg-purple-700/40 text-purple-200 hover:bg-purple-600/40"
                    }`}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-200">Email</label>
              <Input
                type="email"
                placeholder={demoCredentials[selectedRole]}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-purple-700/40 border-purple-500/30 text-white placeholder:text-purple-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-200">Password</label>
              <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-purple-700/40 border-purple-500/30 text-white placeholder:text-purple-300"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
            >
              Login
            </Button>

            <div className="text-center text-sm text-purple-300">Demo: {demoCredentials[selectedRole]} / password</div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
