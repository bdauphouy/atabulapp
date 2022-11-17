import { IAddLastMinuteOfferFormContext } from '@/lib/interfaces'
import { createContext, useState } from 'react'

export const AddLastMinuteOfferFormContext =
  createContext<IAddLastMinuteOfferFormContext>(null)

export const AddLastMinuteOfferFormContextProvider = ({ children }) => {
  const [data, setData] = useState({
    offerDay: null,
    concernedMeal: null,
    withDrinks: null,
    numberOfBeneficiaries: [],
    discount: null,
    hasReachedConfirmation: false,
  })

  return (
    <AddLastMinuteOfferFormContext.Provider value={{ ...data, setData }}>
      {children}
    </AddLastMinuteOfferFormContext.Provider>
  )
}
