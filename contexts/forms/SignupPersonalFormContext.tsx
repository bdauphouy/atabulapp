import { ISignupPersonalFormContext } from '@/lib/interfaces'
import { createContext, useState } from 'react'

export const SignupPersonalFormContext =
  createContext<ISignupPersonalFormContext>(null)

export const SignupPersonalFormContextProvider = ({ children }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    workStatus: null,
    birthDate: '',
    city: '',
    isLoading: false,
  })

  return (
    <SignupPersonalFormContext.Provider value={{ ...data, setData }}>
      {children}
    </SignupPersonalFormContext.Provider>
  )
}
