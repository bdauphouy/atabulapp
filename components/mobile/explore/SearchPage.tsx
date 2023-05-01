import Button from '@/components/shared/Button'
import SearchTag from '@/components/shared/SearchTag'
import { SearchContext } from '@/contexts/SearchContext'
import api from '@/lib/api'
import { useRouter } from 'next/router'
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { RiSearchLine } from 'react-icons/ri'
import Result from './Result'

type SearchPage = {
  setSearchPageOpen: Dispatch<SetStateAction<boolean>>
  onSearch?: () => void
}

const SearchPage = ({ setSearchPageOpen, onSearch = () => {} }) => {
  const inputRef = useRef<HTMLInputElement>()

  const { setLocation, location } = useContext(SearchContext)

  const router = useRouter()

  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    router.push('/mobile/resultats')
    setLocation(inputRef.current.value)
    setSearchPageOpen(false)
    onSearch()
  }

  const handleCancel = () => {
    setLocation('')
    setSearchPageOpen(false)
  }

  const handleAutocomplete = async (e: FormEvent) => {
    const query = (e.target as HTMLInputElement).value
    if (query?.length > 2) {
      const data = await api.getAutocompleteSuggestions(query)
      setSuggestions(data.suggestions)
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    inputRef.current.value = suggestion
    setSuggestions([suggestion])
  }

  return (
    <div className="fixed z-[100] h-screen w-full bg-white px-5 pt-5">
      <header className="mb-6 flex gap-3">
        <form className="w-full" action="" onSubmit={handleSubmit}>
          <label className="flex max-w-3xl flex-1 items-center gap-6 overflow-hidden rounded-full bg-alto/30 pl-6">
            <RiSearchLine className="text-gray" size={20} />
            <input
              ref={inputRef}
              type="text"
              title="Search"
              placeholder="Recherche"
              defaultValue={location}
              onInput={handleAutocomplete}
              className="h-full w-full bg-[transparent] py-3.5 pr-6 text-lg text-black outline-none"
            />
          </label>
        </form>
        <Button variant="tertiary" onClick={handleCancel}>
          Annuler
        </Button>
      </header>
      <SearchTag type="near">A proximité</SearchTag>
      <div className="mt-6">
        <h3 className="text-lg font-bold text-black">Résultats</h3>
        {suggestions.length > 0 ? (
          <ul>
            {suggestions.map((suggestion, i) => {
              return (
                <li key={i} onClick={() => handleSuggestionClick(suggestion)}>
                  <Result withUnderline>{suggestion}</Result>
                </li>
              )
            })}
          </ul>
        ) : (
          <Result withUnderline>Aucun résultat</Result>
        )}
      </div>
    </div>
  )
}

export default SearchPage
