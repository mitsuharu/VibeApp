import { createContext, useContext } from 'react'
import type { User } from '@/types'

export interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  generateLoginKey: () => string
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthはAuthProviderの中で使用してください')
  }
  return context
}
