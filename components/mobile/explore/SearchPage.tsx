import Button from '@/components/shared/Button'
import { SearchContext } from '@/contexts/SearchContext'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useContext, useEffect, useRef } from 'react'
import { RiNavigationLine, RiSearchLine } from 'react-icons/ri'
import Result from './Result'

type SearchPage = {
  setSearchPageOpen: Dispatch<SetStateAction<boolean>>
}

const SearchPage = ({ setSearchPageOpen }) => {
  const inputRef = useRef<HTMLInputElement>()

  const { setLocation } = useContext(SearchContext)

  const router = useRouter()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleSubmit = () => {
    router.push('/mobile/resultats')
    setLocation(inputRef.current.value)
    setSearchPageOpen(false)
  }

  return (
    <div className="fixed z-50 h-screen w-full bg-white px-5 pt-5">
      <header className="flex gap-3">
        <form className="w-full" action="" onSubmit={handleSubmit}>
          <label className="flex max-w-3xl flex-1 items-center gap-6 overflow-hidden rounded-full bg-alto/30 pl-6">
            <RiSearchLine className="text-gray" size={20} />
            <input
              ref={inputRef}
              type="text"
              title="Search"
              placeholder="Recherche"
              className="h-full w-full bg-[transparent] py-3.5 pr-6 text-lg text-black outline-none"
            />
          </label>
        </form>
        <Button variant="tertiary" onClick={() => setSearchPageOpen(false)}>
          Annuler
        </Button>
      </header>
      <div className="mt-6 flex cursor-pointer items-center gap-4 text-lg font-medium text-black">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-solid border-scarlet pt-0.5 pr-0.5">
          <RiNavigationLine size={30} className="rotate-90 text-scarlet" />
        </div>
        A proximité
      </div>
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
