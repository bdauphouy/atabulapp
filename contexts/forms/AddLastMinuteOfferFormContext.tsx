import useLocalStorage from '@/lib/hooks/useLocalStorage'
import { IAddLastMinuteOfferFormContext } from '@/lib/interfaces'
import { createContext } from 'react'

export const AddLastMinuteOfferFormContext =
  createContext<IAddLastMinuteOfferFormContext>(null)

export const AddLastMinuteOfferFormContextProvider = ({ children }) => {
  const [data, setData, removeData] = useLocalStorage(
    'add-last-minute-offer-form-data',
    {
      offerDay: null,
      concernedMeal: null,
      withDrinks: null,
      numberOfBeneficiaries: [],
      discount: null,
      hasReachedConfirmation: false,
    },
  )

  return (
    <AddLastMinuteOfferFormContext.Provider
      value={{ ...data, setData, removeData }}
    >
      {children}
    </AddLastMinuteOfferFormContext.Provider>
  )
}
