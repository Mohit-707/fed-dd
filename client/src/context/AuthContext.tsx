import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { AuthContextType, AuthState, LoginRequest, RegisterRequest, User } from '../types/auth'
import apiService from '../services/api'

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        loading: true,
      }
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      }
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = async (data: LoginRequest) => {
    dispatch({ type: 'AUTH_START' })
    try {
      const response = await apiService.login(data)
      if (response.success && response.data) {
        dispatch({ type: 'AUTH_SUCCESS', payload: response.data as User })
        return response
      } else {
        dispatch({ type: 'AUTH_FAILURE' })
        return response
      }
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE' })
      throw error
    }
  }

  const register = async (data: RegisterRequest) => {
    dispatch({ type: 'AUTH_START' })
    try {
      const response = await apiService.register(data)
      if (response.success && response.data) {
        dispatch({ type: 'AUTH_SUCCESS', payload: response.data as User })
        return response
      } else {
        dispatch({ type: 'AUTH_FAILURE' })
        return response
      }
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE' })
      throw error
    }
  }

  const logout = async () => {
    try {
      await apiService.logout()
      dispatch({ type: 'LOGOUT' })
    } catch (error) {
      console.error('Logout error:', error)
      // Force logout even if API call fails
      dispatch({ type: 'LOGOUT' })
    }
  }

  const checkAuth = async () => {
    dispatch({ type: 'AUTH_START' })
    try {
      const response = await apiService.checkAuth()
      if (response.success && response.data?.authenticated && response.data.user) {
        dispatch({ type: 'AUTH_SUCCESS', payload: response.data.user })
      } else {
        dispatch({ type: 'AUTH_FAILURE' })
      }
    } catch (error) {
      console.error('Auth check error:', error)
      dispatch({ type: 'AUTH_FAILURE' })
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const value: AuthContextType = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    login,
    register,
    logout,
    checkAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}