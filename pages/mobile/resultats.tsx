import SearchPage from '@/components/mobile/explore/SearchPage'
import RestaurantCard from '@/components/shared/RestaurantCard'
import { SearchContext } from '@/contexts/SearchContext'
import { ISearchForm } from '@/lib/interfaces'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RiArrowLeftSLine, RiMenu2Fill } from 'react-icons/ri'

const Results = () => {
  const { setLocation, setPeriod, setNumberOfPersons, ...searchData } =
    useContext(SearchContext)

  const [isSearchPageOpen, setIsSearchPageOpen] = useState(false)

  const { register, handleSubmit } = useForm<ISearchForm>({
    defaultValues: {
      location: searchData.location,
      period: searchData.period,
      numberOfPersons: searchData.numberOfPersons,
    },
  })

  const onSubmit: SubmitHandler<ISearchForm> = ({
    location,
    period,
    numberOfPersons,
  }) => {
    setLocation(location)
    setPeriod(period)
    setNumberOfPersons(numberOfPersons)
  }

  return (
    <>
      {isSearchPageOpen && (
        <SearchPage setSearchPageOpen={setIsSearchPageOpen} />
      )}
      <header className="fixed w-full bg-white p-5">
        <form
          className="flex w-full items-center gap-4"
          id="search-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <RiArrowLeftSLine className="min-w-[30px] text-black" size={30} />
          <div className="flex w-full rounded-full bg-alto/30 p-2">
            <input
              type="text"
              className="w-32 flex-1 border-r-2 border-solid border-white bg-[transparent] py-1 px-2 text-lg text-black outline-none"
              {...register('location')}
              placeholder="Localisation"
              onFocus={() => setIsSearchPageOpen(true)}
            />
            <input
              type="text"
              className="w-32 flex-1 bg-[transparent] py-1 px-2 text-lg text-black outline-none"
              {...register('period')}
              placeholder="Période"
            />
          </div>
        </form>
      </header>
      <main className="h-screen">
        <div className="flex h-full flex-col items-center justify-end gap-5 bg-red-100 p-5">
          <Link href="/mobile/restaurants/1" className="w-full">
            <RestaurantCard
              thumbnail="/images/restaurant-card-thumbnail.png"
              name="La Meurice Alain Ducasse"
              typesOfCooking={['Cuisine créative']}
              location="PARIS (75001)"
              tags={[
                { name: 'michelin', level: 2 },
                { name: 'etoile-verte', level: 1 },
              ]}
              isCertified
              promotion={30}
              size="sm"
              isResult
            />
          </Link>
          <button className="flex items-center gap-4 rounded-full bg-white/80 px-6 py-2 text-base text-black">
            <RiMenu2Fill />
            Liste
          </button>
        </div>
      </main>
    </>
  )
}

export default Results
