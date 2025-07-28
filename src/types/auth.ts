export interface Colleague {
  id: string
  name: string
  department: string
  password: string
}

export interface Topic {
  id: string
  content: string
}

export interface AuthState {
  username: string
  currentColleague: Colleague | null
  currentTopic: Topic | null
  isAuthenticated: boolean
  loginKey: string | null
}

export type AuthStep = 'username' | 'challenge' | 'password' | 'success'
