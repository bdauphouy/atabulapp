import Button from '@/components/shared/Button'
import SearchTag from '@/components/shared/SearchTag'
import { SearchContext } from '@/contexts/SearchContext'
import { useRouter } from 'next/router'
import
  {
    Dispatch, FormEvent, SetStateAction,
    useContext,
    useEffect,
    useRef
  } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import Result from './Result'

type SearchPage = {
  setSearchPageOpen: Dispatch<SetStateAction<boolean>>
}

const SearchPage = ({ setSearchPageOpen }) => {
  const inputRef = useRef<HTMLInputElement>()

  const { setLocation, location } = useContext(SearchContext)

  const router = useRouter()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    router.push('/mobile/resultats')
    setLocation(inputRef.current.value)
  }

  const handleCancel = () => {
    setSearchPageOpen(false)
    setLocation('')
  }

  return (
    <div className="fixed z-50 h-screen w-full bg-white px-5 pt-5">
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
        <Result withUnderline>Paris, 11eme</Result>
        <Result withUnderline>Paris, 12eme</Result>
        <Result>Paris, 13eme</Result>
      </div>
    </div>
  )
}

export default SearchPage
