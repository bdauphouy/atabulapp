import { IAddRegularOfferFormContext } from '@/lib/interfaces'
import { createContext, useState } from 'react'

export const AddRegularOfferFormContext =
  createContext<IAddRegularOfferFormContext>(null)

export const AddRegularOfferFormContextProvider = ({ children }) => {
  const [offerDays, setOfferDays] = useState([])
  const [concernedMeal, setConcernedMeal] = useState()
  const [withDrinks, setWithDrinks] = useState()
  const [numberOfBeneficiaries, setNumberOfBeneficiaries] = useState([])
  const [discount, setDiscount] = useState()
  const [hasReachedConfirmation, setHasReachedConfirmation] = useState(false)

  return (
    <AddRegularOfferFormContext.Provider
      value={{
        offerDays,
        setOfferDays,
        concernedMeal,
        setConcernedMeal,
        withDrinks,
        setWithDrinks,
        numberOfBeneficiaries,
        setNumberOfBeneficiaries,
        discount,
        setDiscount,
        hasReachedConfirmation,
        setHasReachedConfirmation,
      }}
    >
      {children}
    </AddRegularOfferFormContext.Provider>
  )
}
