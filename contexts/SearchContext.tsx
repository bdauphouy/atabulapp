import { ISearchForm } from '@/lib/interfaces'
import { createContext, Dispatch, SetStateAction, useState } from 'react'

interface ISearchContext extends ISearchForm {
  setLocation?: Dispatch<SetStateAction<string>>
  setPeriod?: Dispatch<SetStateAction<string>>
  setNumberOfPersons?: Dispatch<SetStateAction<number>>
  setHonors?: Dispatch<SetStateAction<(string | boolean)[]>>
  setIsLastMinute?: Dispatch<SetStateAction<boolean>>
}

export const SearchContext = createContext<ISearchContext>({})

export const SearchContextProvider = ({ children }) => {
  const [location, setLocation] = useState()
  const [period, setPeriod] = useState()
  const [numberOfPersons, setNumberOfPersons] = useState()
  const [honors, setHonors] = useState([])
  const [isLastMinute, setIsLastMinute] = useState(false)

  return (
    <SearchContext.Provider
      value={{
        location,
        period,
        numberOfPersons,
        honors,
        isLastMinute,
        setLocation,
        setPeriod,
        setNumberOfPersons,
        setHonors,
        setIsLastMinute,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
