import Section from '@/components/home/Section'
import MobileLayout from '@/components/layouts/mobile/MobileLayout'
import RestaurantCard from '@/components/shared/RestaurantCard'
import { SearchContext } from '@/contexts/SearchContext'
import { ISearchForm } from '@/lib/interfaces'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RiArrowLeftSLine, RiMenu2Fill } from 'react-icons/ri'

const Results = () => {
  const { setLocation, setPeriod, setNumberOfPersons, ...searchData } =
    useContext(SearchContext)

  const [isSearchPageOpen, setIsSearchPageOpen] = useState(false)
  const [isOnTheMap, setIsOnTheMap] = useState(true)

  const { register, handleSubmit } = useForm<ISearchForm>({
    defaultValues: {
      location: searchData.location,
      period: searchData.period,
      numberOfPersons: searchData.numberOfPersons,
    },
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<ISearchForm> = ({
    location,
    period,
    numberOfPersons,
  }) => {
    setLocation(location)
    setPeriod(period)
    setNumberOfPersons(numberOfPersons)
  }

  const handleListButton = () => {
    setIsOnTheMap(false)
  }

  const handleGoBackButton = () => {
    if (isOnTheMap) {
      router.push('/mobile/explorer?search=true')
    } else {
      setIsOnTheMap(true)
    }
  }

  return (
    <>
      {/* {isSearchPageOpen && (
        <SearchPage setSearchPageOpen={setIsSearchPageOpen} />
      )} */}
      <header
        className={`${
          isOnTheMap ? 'fixed' : 'sticky'
        } top-0 z-50 w-full bg-white p-5`}
      >
        <form
          className="flex w-full items-center gap-4"
          id="search-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <RiArrowLeftSLine
            onClick={handleGoBackButton}
            className="min-w-[30px] cursor-pointer text-black"
            size={30}
          />
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
      <main className={isOnTheMap ? '' : 'pb-5'}>
        {isOnTheMap ? (
          <div className="flex h-screen flex-col items-center justify-end gap-5 bg-alto/30 p-5 pb-24">
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
            <button
              className="flex items-center gap-4 rounded-full bg-white/80 px-6 py-2 text-base text-black"
              onClick={handleListButton}
            >
              <RiMenu2Fill />
              Liste
            </button>
          </div>
        ) : (
          <Section title={searchData.location} isGrid>
            {[...Array(4)].map((_, i) => {
              return (
                <RestaurantCard
                  key={i}
                  thumbnail="/images/restaurant-card-thumbnail.png"
                  name="La Meurice Alain Ducasse"
                  typesOfCooking={[
                    'Cuisine créative',
                    'Cuisine traditionnelle',
                  ]}
                  location="PARIS (75001)"
                  tags={[
                    { name: 'michelin', level: 2 },
                    { name: 'etoile-verte', level: 1 },
                  ]}
                  isCertified
                  size="sm"
                  promotion={50}
                />
              )
            })}
          </Section>
        )}
      </main>
    </>
  )
}

export default Results

Results.getLayout = (page: ReactElement) => <MobileLayout>{page}</MobileLayout>
