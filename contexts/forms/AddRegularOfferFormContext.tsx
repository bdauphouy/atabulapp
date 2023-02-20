import { IAddRegularOfferFormContext } from '@/lib/interfaces'
import { createContext, useState } from 'react'

export const AddRegularOfferFormContext =
  createContext<IAddRegularOfferFormContext>(null)

export const AddRegularOfferFormContextProvider = ({ children }) => {
  const [data, setData] = useState({
    offerDays: [],
    concernedMeal: null,
    withDrink: null,
    numberOfBeneficiaries: [],
    discount: null,
    hasReachedConfirmation: false,
  })

  return (
    <AddRegularOfferFormContext.Provider value={{ ...data, setData }}>
      {children}
    </AddRegularOfferFormContext.Provider>
  )
}
