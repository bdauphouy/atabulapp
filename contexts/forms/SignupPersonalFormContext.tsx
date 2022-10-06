import { ISignupPersonalFormContext } from '@/lib/interfaces'
import { createContext, useState } from 'react'

export const SignupPersonalFormContext =
  createContext<ISignupPersonalFormContext>(null)

export const SignupPersonalFormContextProvider = ({ children }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [workStatus, setWorkStatus] = useState(null)
  const [birthDate, setBirthDate] = useState('')
  const [city, setCity] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  return (
    <SignupPersonalFormContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        workStatus,
        setWorkStatus,
        birthDate,
        setBirthDate,
        city,
        setCity,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </SignupPersonalFormContext.Provider>
  )
}
