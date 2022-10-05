import { IUserContext } from '@/lib/interfaces'
import useLocalstorage from '@/lib/hooks/useLocalStorage'
import { createContext } from 'react'

export const UserContext = createContext<IUserContext>(null)

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useLocalstorage('user', null)

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
