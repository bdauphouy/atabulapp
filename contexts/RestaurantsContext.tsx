import { createContext, Dispatch, SetStateAction, useState } from 'react'

interface IRestaurantsContext {
  restaurants: any[]
  setRestaurants: Dispatch<SetStateAction<any[]>>
}

export const RestaurantsContext = createContext<IRestaurantsContext>({
  restaurants: [],
  setRestaurants: () => {},
})

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([])

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  )
}
