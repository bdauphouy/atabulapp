import { ISearchForm } from '@/lib/interfaces'
import { createContext, Dispatch, SetStateAction, useState } from 'react'

interface ISearchContext extends ISearchForm {
  setLocation?: Dispatch<SetStateAction<string>>
  setPeriod?: Dispatch<SetStateAction<string>>
  setNumberOfPersons?: Dispatch<SetStateAction<string>>
}

export const SearchContext = createContext<ISearchContext>({})

export const SearchContextProvider = ({ children }) => {
  const [location, setLocation] = useState()
  const [period, setPeriod] = useState()
  const [numberOfPersons, setNumberOfPersons] = useState()

  return (
    <SearchContext.Provider
      value={{
        location,
        period,
        numberOfPersons,
        setLocation,
        setPeriod,
        setNumberOfPersons,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
