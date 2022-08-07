import { SearchContext } from '@/contexts/SearchContext'
import { useContext } from 'react'

const Results = () => {
  const { location } = useContext(SearchContext)

  return (
    <div>
      <h1>Resultats</h1>
      <pre>{JSON.stringify({ location })}</pre>
    </div>
  )
}

export default Results
