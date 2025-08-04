import { type ReactNode, useState } from 'react'
import { AuthContext, type AuthContextType } from '@/hooks/useAuth'
import type { User } from '@/types'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const generateLoginKey = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const login = (userData: User) => {
    const userWithKey = {
      ...userData,
      loginKey: generateLoginKey(),
    }
    setUser(userWithKey)
  }

  const logout = () => {
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    generateLoginKey,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
