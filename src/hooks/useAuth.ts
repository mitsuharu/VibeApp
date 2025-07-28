import { useCallback, useState } from 'react'
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

export const useAuth = () => {
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

  return {
    authState,
    currentStep,
    setUsername,
    startChallenge,
    proceedToPassword,
    rejectChallenge,
    authenticatePassword,
    reset,
  }
}
