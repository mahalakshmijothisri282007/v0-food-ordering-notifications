"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type UserRole = "user" | "chef" | "manager"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true)
    try {
      // Simulate login - in production, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newUser: User = {
        id: `${Date.now()}`,
        name: email.split("@")[0],
        email,
        role,
      }
      setUser(newUser)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
