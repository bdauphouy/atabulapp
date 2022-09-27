import { IUserContext } from '@/lib/interfaces'
import useLocalstorage from '@rooks/use-localstorage'
import { createContext } from 'react'

export const UserContext = createContext<IUserContext>(null)

export const UserContextProvider = ({ children }) => {
  const [user, setUser, removeUser] = useLocalstorage('user', '{}')

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        removeUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
