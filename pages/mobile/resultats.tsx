import Section from '@/components/home/Section'
import MobileLayout from '@/components/layouts/mobile/MobileLayout'
import SearchPage from '@/components/mobile/explore/SearchPage'
import SearchHeader from '@/components/mobile/search/SearchHeader'
import RestaurantCard from '@/components/shared/RestaurantCard'
import { SearchContext } from '@/contexts/SearchContext'
import api from '@/lib/api'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import {
  FocusEvent,
  FormEvent,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react'
import { RiArrowLeftSLine, RiMenu2Fill } from 'react-icons/ri'

const SearchResultMap = dynamic(import('@/components/search/SearchResultMap'), {
  ssr: false,
})

const Results = () => {
  const {
    setLocation,
    setPeriod,
    setNumberOfPersons,
    setIsLastMinute,
    ...searchData
  } = useContext(SearchContext)

  const [isSearchPageOpen, setIsSearchPageOpen] = useState(false)
  const [isOnTheMap, setIsOnTheMap] = useState(true)
  const [focusedInput, setFocusedInput] = useState<HTMLInputElement>()
  const [activeRestaurant, setActiveRestaurant] = useState(null)

  const router = useRouter()

  const handleListButton = () => {
    setIsOnTheMap(false)
  }

  const handleMarkerClick = async (restaurantId: number) => {
    const { restaurant } = await api.getRestaurantById(restaurantId)
    setActiveRestaurant(restaurant)
  }

  const handleGoBackButton = () => {
    if (isSearchPageOpen) {
      setIsSearchPageOpen(false)
    }
    if (isOnTheMap) {
      !isSearchPageOpen && router.push('/mobile/explorer')
    } else {
      !isSearchPageOpen && setIsOnTheMap(true)
    }
  }

  const handleInputFocus = async (e: FocusEvent<HTMLInputElement>) => {
    setIsSearchPageOpen(true)
    setFocusedInput(e.target)
  }

  const handleSearch = async () => {
    const { restaurants } = await api.searchRestaurants({
      place: searchData.location,
      lowerDate: '2021-10-01',
      upperDate: '2021-10-02',
      limit: 20,
      skip: 0,
    })

    console.log(restaurants)
  }

  useEffect(() => {
    isSearchPageOpen && focusedInput.focus()
  }, [isSearchPageOpen, focusedInput])

  return (
    <>
      {isSearchPageOpen && (
        <SearchPage
          onSearch={handleSearch}
          setSearchPageOpen={setIsSearchPageOpen}
        />
      )}
      <header
        className={`${
          isOnTheMap ? 'fixed' : 'sticky'
        } top-0 z-50 w-full bg-white pb-3`}
      >
        <SearchHeader>
          <div className="flex w-full items-center gap-4">
            <RiArrowLeftSLine
              onClick={handleGoBackButton}
              className="min-w-[30px] cursor-pointer text-black"
              size={30}
            />
            <div className="flex w-full overflow-auto rounded-full bg-alto/30 p-2">
              <input
                type="text"
                key={isSearchPageOpen ? 'search' : 'location'}
                className="w-32 flex-1 border-r-2 border-solid border-white bg-[transparent] py-1 px-2 text-lg text-black outline-none"
                placeholder="Localisation"
                defaultValue={searchData.location}
                onInput={e => setLocation((e.target as HTMLInputElement).value)}
                onFocus={handleInputFocus}
              />
              <input
                type="text"
                className="w-32 flex-1 bg-[transparent] py-1 px-2 text-lg text-black outline-none"
                placeholder="Période"
                defaultValue={searchData.period}
                onInput={e => setPeriod((e.target as HTMLInputElement).value)}
                onFocus={handleInputFocus}
              />
              <button hidden />
            </div>
          </div>
        </SearchHeader>
      </header>
      <main className={isOnTheMap ? '' : 'pb-40'}>
        {isOnTheMap ? (
          <div>
            <div className="absolute top-0 -z-10 h-full w-full">
              <SearchResultMap
                onMarkerClick={handleMarkerClick}
                centerDelta={0.015}
              />
            </div>
            <div className="absolute bottom-20 left-1/2 flex w-full -translate-x-1/2 flex-col items-center gap-5 p-5 pb-2">
              <RestaurantCard
                id={activeRestaurant?.id || 1}
                thumbnail={
                  activeRestaurant?.thumbnail ||
                  '/images/restaurant-card-thumbnail.png'
                }
                name={activeRestaurant?.name || 'La Meurice Alain Ducasse'}
                typesOfCooking={['Cuisine créative']}
                location={`${activeRestaurant?.city} (${activeRestaurant?.zipCode})`}
                tags={[
                  { name: 'michelin', level: 2 },
                  { name: 'etoile-verte', level: 1 },
                ]}
                isCertified
                isResult
                size="sm"
                promotion={50}
                variant="horizontal"
              />
              <button
                className="flex items-center gap-4 rounded-full bg-white/80 px-6 py-2 text-base text-black"
                onClick={handleListButton}
              >
                <RiMenu2Fill />
                Liste
              </button>
            </div>
          </div>
        ) : (
          <Section title={searchData.location} isGrid>
            {[...Array(4)].map((_, i) => {
              return (
                <RestaurantCard
                  id={i}
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
