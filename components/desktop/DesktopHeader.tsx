import { SearchContext } from '@/contexts/SearchContext'
import { ISearchForm } from '@/lib/interfaces'
import Cookie from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RiCompassDiscoverLine, RiUser6Line } from 'react-icons/ri'
import Button from '../shared/Button'
import RecentSearches from './RecentSearches'
import DesktopHeaderSearchDropdown from './DesktopHeaderSearchDropdown'
import api from '@/lib/api'
import { RestaurantsContext } from '@/contexts/RestaurantsContext'

const DesktopHeader = () => {
  const {
    setLocation,
    setPeriod,
    setNumberOfPersons,
    setHasSearched,
    ...searchData
  } = useContext(SearchContext)

  const { setRestaurants } = useContext(RestaurantsContext)

  const [isRecentSearchesOpen, setIsRecentSearchesOpen] = useState(false)

  const [suggestions, setSuggestions] = useState([])

  const { register, handleSubmit, setValue, getValues } = useForm<ISearchForm>({
    defaultValues: {
      location: searchData.location,
      period: searchData.period,
      numberOfPersons: searchData.numberOfPersons,
    },
  })

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
    setValue('location', suggestion)
    setSuggestions([])
  }

  const handleLocationFocus = () => {
    setIsRecentSearchesOpen(true)
    handleAutocomplete({
      target: { value: getValues().location },
    } as unknown as ChangeEvent)
  }

  const onSubmit: SubmitHandler<ISearchForm> = async ({
    location: loc,
    period,
    numberOfPersons,
  }) => {
    setLocation(loc)
    setPeriod(period)
    setNumberOfPersons(numberOfPersons)
    setIsRecentSearchesOpen(false)

    const { restaurants } = await api.searchRestaurants({
      place: loc,
      lowerDate: '2021-10-01',
      upperDate: '2021-10-02',
      limit: 20,
      skip: 0,
    })

    setRestaurants(restaurants)
    setSuggestions([])
    setHasSearched(true)
  }

  // const onSubmit: SubmitHandler<ISearchForm> = async data => {
  //   console.log(data)
  // }

  const router = useRouter()

  return (
    <div className="fixed z-50 w-full">
      <header className="flex flex-col flex-wrap items-start justify-between gap-6 border-b-[1px] border-solid border-alto/60 bg-white p-6 pb-3 md:flex-row md:items-center xl:px-32">
        <Link href="/">
          <div className="bg relative h-14 w-24">
            <Image
              src="/images/full-logo.svg"
              alt="Logo d'Atabulapp"
              layout="fill"
            />
          </div>
        </Link>
        <form
          className="relative flex w-full flex-col items-start gap-4 md:w-auto md:flex-row"
          id="search-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          {suggestions.length > 0 && (
            <DesktopHeaderSearchDropdown
              suggestions={suggestions}
              onSuggestionClick={handleSuggestionClick}
            />
          )}
          <div className="flex w-full flex-col gap-4 rounded-md bg-alto/30 p-2 md:flex-row md:gap-0 md:rounded-full">
            <input
              type="text"
              className="border-solid border-white bg-[transparent] py-1 px-2 text-base text-black outline-none md:border-r-2"
              name="location"
              {...register('location')}
              placeholder="Localisation"
              autoComplete="off"
              onClick={() => setIsRecentSearchesOpen(true)}
              onFocus={handleLocationFocus}
              onInput={handleAutocomplete}
            />
            <input
              type="text"
              className="border-solid border-white bg-[transparent] py-1 px-2 text-base text-black outline-none md:border-r-2"
              name="months"
              {...register('period')}
              placeholder="Période"
              autoComplete="off"
              onFocus={() => setSuggestions([])}
            />
            <input
              type="text"
              className="bg-[transparent] px-2 py-1 text-base text-black outline-none"
              name="numberOfPersons"
              {...register('numberOfPersons')}
              placeholder="Nombre de personnes"
              autoComplete="off"
              onFocus={() => setSuggestions([])}
            />
          </div>
          <Button variant="primary" isSubmit form="search-form">
            Chercher
          </Button>
        </form>
        <Button
          variant="primary"
          onClick={() =>
            router.push(
              `/compte/${
                Cookie.get('accountType') === 'personal'
                  ? 'personnel/informations-personnelles'
                  : 'restaurant/informations-restaurant'
              }`,
            )
          }
        >
          <RiUser6Line />
          Profil
        </Button>
      </header>
      {isRecentSearchesOpen && (
        <RecentSearches onClickOutside={() => setIsRecentSearchesOpen(false)} />
      )}
    </div>
  )
}

export default DesktopHeader
