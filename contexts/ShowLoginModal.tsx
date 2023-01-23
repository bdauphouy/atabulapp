import { IShowLoginModalContext } from '@/lib/interfaces'
import { createContext, useState } from 'react'

export const ShowLoginModal = createContext<IShowLoginModalContext>(null)

export const ShowLoginModalProvider = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false)

  return (
    <ShowLoginModal.Provider
      value={{
        showLoginModal,
        setShowLoginModal,
      }}
    >
      {children}
    </ShowLoginModal.Provider>
  )
}
