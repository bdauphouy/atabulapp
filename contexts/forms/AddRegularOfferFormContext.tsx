import { IAddRegularOfferFormContext } from '@/lib/interfaces'
import { createContext } from 'react'

export const AddRegularOfferFormContext =
  createContext<IAddRegularOfferFormContext>(null)

export const AddRegularOfferFormContextProvider = ({ children }) => {
  const data = {
    offerDays: [],
    concernedMeal: null,
    withDrinks: null,
    numberOfBeneficiaries: [],
    discount: null,
    hasReachedConfirmation: false,
  }

  return (
    <AddRegularOfferFormContext.Provider value={data}>
      {children}
    </AddRegularOfferFormContext.Provider>
  )
}
