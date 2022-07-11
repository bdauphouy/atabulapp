import { createContext } from 'react'

const honors = [
  {
    title: 'Cité au Michelin',
    tag: {
      type: 'michelin',
      number: 1,
    },
  },
  {
    title: 'Michelin',
    tag: {
      type: 'michelin',
      number: 1,
    },
  },
  {
    title: 'Michelin',
    tag: {
      type: 'michelin',
      number: 2,
    },
  },
  {
    title: 'Michelin',
    tag: {
      type: 'michelin',
      number: 3,
    },
  },
  {
    title: 'Etoile verte',
    tag: {
      type: 'etoile-verte',
      number: 1,
    },
  },
  {
    title: 'Big Gourmand',
    tag: {
      type: 'bib-gourmand',
      number: 1,
    },
  },
]

export const HonorsContext = createContext(honors)

export const HonorsContextProvider = ({ children }) => {
  return (
    <HonorsContext.Provider value={honors}>{children}</HonorsContext.Provider>
  )
}
