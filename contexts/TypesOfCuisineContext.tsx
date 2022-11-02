import { createContext } from 'react'

const typesOfCuisine = [
  'Cuisine moderne',
  'Cuisine traditionnelle',
  'Poissons et fruits de mer',
  'Fast Good',
  'Cuisine française',
  'Cuisine italienne',
  'Cuisine japonaise',
  'Cuisine méditerranéenne',
  'Cuisine chinoise',
  'Chuisine coréenne',
  'Cuisine péruvienne',
  'Cuisine thaïlandaise',
  'Cuisine asiatique',
  "Cuisine d'Amérique latine",
  'Cuisine espagnole',
  'Cuisine portugaise',
  'Cuisine nordique',
  "Cuisine d'Europe centrale",
  'Cuisine du Maghreb',
  'Cuisine africaine',
  'Cuisine indienne',
]

export const TypesOfCuisineContext = createContext(typesOfCuisine)

export const TypesOfCuisineContextProvider = ({ children }) => {
  return (
    <TypesOfCuisineContext.Provider value={typesOfCuisine}>
      {children}
    </TypesOfCuisineContext.Provider>
  )
}
