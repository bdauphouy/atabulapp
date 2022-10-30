import useLocalStorage from '@/lib/hooks/useLocalStorage'
import { ISignupPersonalFormContext } from '@/lib/interfaces'
import { createContext } from 'react'

export const SignupPersonalFormContext =
  createContext<ISignupPersonalFormContext>(null)

export const SignupPersonalFormContextProvider = ({ children }) => {
  const [data, setData, removeData] = useLocalStorage(
    'signup-personal-form-data',
    {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      workStatus: null,
      birthDate: '',
      city: '',
      isLoading: false,
    },
  )

  return (
    <SignupPersonalFormContext.Provider
      value={{ ...data, setData, removeData }}
    >
      {children}
    </SignupPersonalFormContext.Provider>
  )
}
