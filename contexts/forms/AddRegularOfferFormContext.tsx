import useLocalStorage from '@/lib/hooks/useLocalStorage'
import { IAddRegularOfferFormContext } from '@/lib/interfaces'
import { createContext } from 'react'

export const AddRegularOfferFormContext =
  createContext<IAddRegularOfferFormContext>(null)

export const AddRegularOfferFormContextProvider = ({ children }) => {
  const [data, setData, removeData] = useLocalStorage(
    'add-regular-offer-form-data',
    {
      offerDays: [],
      concernedMeal: null,
      withDrinks: null,
      numberOfBeneficiaries: [],
      discount: null,
      hasReachedConfirmation: false,
    },
  )

  return (
    <AddRegularOfferFormContext.Provider
      value={{ ...data, setData, removeData }}
    >
      {children}
    </AddRegularOfferFormContext.Provider>
  )
}
