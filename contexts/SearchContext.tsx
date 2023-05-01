import { ISearchForm } from '@/lib/interfaces'
import { createContext, Dispatch, SetStateAction, useState } from 'react'

type Filters = {
  honors: string[]
  meals: string[]
  typesOfCuisine: string[]
  dates: string[]
}

interface ISearchContext extends ISearchForm {
  setLocation?: Dispatch<SetStateAction<string>>
  setPeriod?: Dispatch<SetStateAction<string>>
  setNumberOfPersons?: Dispatch<SetStateAction<number>>
  setIsLastMinute?: Dispatch<SetStateAction<boolean>>
  hasSearched?: boolean
  setHasSearched?: Dispatch<SetStateAction<boolean>>
  filters?: Filters
  setFilters?: Dispatch<SetStateAction<Filters>>
}

export const SearchContext = createContext<ISearchContext>({})

export const SearchContextProvider = ({ children }) => {
  const [location, setLocation] = useState()
  const [period, setPeriod] = useState()
  const [numberOfPersons, setNumberOfPersons] = useState()
  const [isLastMinute, setIsLastMinute] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [filters, setFilters] = useState({
    honors: [],
    meals: [],
    typesOfCuisine: [],
    dates: [],
  })

  return (
    <SearchContext.Provider
      value={{
        location,
        period,
        numberOfPersons,
        isLastMinute,
        setLocation,
        setPeriod,
        setNumberOfPersons,
        setIsLastMinute,
        hasSearched,
        setHasSearched,
        filters,
        setFilters,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
