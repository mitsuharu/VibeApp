import type React from 'react'
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'
import type { AuthState, AuthStep } from '../types/auth'
import {
  generateLoginKey,
  getRandomColleague,
  getRandomTopic,
} from '../utils/mockData'

const initialState: AuthState = {
  username: '',
  currentColleague: null,
  currentTopic: null,
  isAuthenticated: false,
  loginKey: null,
}

interface AuthContextType {
  authState: AuthState
  currentStep: AuthStep
  setUsername: (username: string) => void
  startChallenge: () => void
  proceedToPassword: () => void
  rejectChallenge: () => void
  authenticatePassword: (password: string) => void
  reset: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState)
  const [currentStep, setCurrentStep] = useState<AuthStep>('username')

  const setUsername = useCallback((username: string) => {
    setAuthState((prev) => ({ ...prev, username }))
  }, [])

  const startChallenge = useCallback(() => {
    const colleague = getRandomColleague()
    const topic = getRandomTopic()

    setAuthState((prev) => ({
      ...prev,
      currentColleague: colleague,
      currentTopic: topic,
    }))
    setCurrentStep('challenge')
  }, [])

  const proceedToPassword = useCallback(() => {
    setCurrentStep('password')
  }, [])

  const rejectChallenge = useCallback(() => {
    const colleague = getRandomColleague()
    const topic = getRandomTopic()

    setAuthState((prev) => ({
      ...prev,
      currentColleague: colleague,
      currentTopic: topic,
    }))
    setCurrentStep('challenge')
  }, [])

  const authenticatePassword = useCallback((_password: string) => {
    const loginKey = generateLoginKey()

    setAuthState((prev) => ({
      ...prev,
      isAuthenticated: true,
      loginKey,
    }))
    setCurrentStep('success')
  }, [])

  const reset = useCallback(() => {
    setAuthState(initialState)
    setCurrentStep('username')
  }, [])

  const value: AuthContextType = {
    authState,
    currentStep,
    setUsername,
    startChallenge,
    proceedToPassword,
    rejectChallenge,
    authenticatePassword,
    reset,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
