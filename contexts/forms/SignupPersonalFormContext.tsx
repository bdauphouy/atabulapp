import { ISignupPersonalFormContext } from '@/lib/interfaces'
import { createContext } from 'react'

export const SignupPersonalFormContext =
  createContext<ISignupPersonalFormContext>(null)

export const SignupPersonalFormContextProvider = ({ children }) => {
  const data = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    workStatus: null,
    birthDate: '',
    city: '',
    isLoading: false,
  }

  return (
    <SignupPersonalFormContext.Provider value={data}>
      {children}
    </SignupPersonalFormContext.Provider>
  )
}
