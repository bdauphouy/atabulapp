import { createContext } from 'react'

const honors = [
  {
    title: 'Sélection Michelin',
    tag: {
      type: 'michelin',
      number: 0,
    },
  },
  {
    title: 'Michelin 1',
    tag: {
      type: 'michelin',
      number: 1,
    },
  },
  {
    title: 'Michelin 2',
    tag: {
      type: 'michelin',
      number: 2,
    },
  },
  {
    title: 'Michelin 3',
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
    title: 'Bib Gourmand',
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
