import Section from '@/components/home/Section'
import MobileLayout from '@/components/layouts/mobile/MobileLayout'
import SearchPage from '@/components/mobile/explore/SearchPage'
import SearchHeader from '@/components/mobile/search/SearchHeader'
import RestaurantCard from '@/components/shared/RestaurantCard'
import { SearchContext } from '@/contexts/SearchContext'
import { IExploreFiltersForm } from '@/lib/interfaces'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RiSearchLine } from 'react-icons/ri'
import { SwiperSlide } from 'swiper/react'

const Explore = () => {
  const {
    setLocation,
    setPeriod,
    setNumberOfPersons,
    setHonors,
    ...searchData
  } = useContext(SearchContext)

  const [isSearchPageOpen, setIsSearchPageOpen] = useState(false)
  const [isLastMinute, setIsLastMinute] = useState(false)
  const [searchInputValue, setSearchInputValue] = useState('')

  const router = useRouter()

  const watchHonors = watch(['honors'])

  const { location } = useContext(SearchContext)

  const handleInputFocus = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.blur()
    setIsSearchPageOpen(true)
  }

  useEffect(() => {
    if (router.query.search) {
      setIsSearchPageOpen(true)
    }
  }, [router])

  const onSubmit: SubmitHandler<IExploreFiltersForm> = data => {
    setHonors(data.honors)
  }

  return (
    <>
      {isSearchPageOpen && (
        <SearchPage setSearchPageOpen={setIsSearchPageOpen} />
      )}
      <SearchHeader>
        <h2 className="mb-2 text-3xl font-bold text-black">Explorer</h2>
        <label className="flex max-w-3xl flex-1 items-center gap-6 overflow-hidden rounded-full bg-alto/30 pl-6">
          <RiSearchLine className="text-gray" size={20} />
          <input
            type="text"
            name="search"
            placeholder="Recherche"
            className="h-full w-full bg-[transparent] py-3.5 pr-6 text-lg text-black outline-none"
            onFocus={handleInputFocus}
            key={location}
            defaultValue={location}
          />
        </label>
      </SearchHeader>
      <main className="flex flex-col gap-8 py-8">
        <Section title="A proximité" isSwiper isMobile>
          {[...Array(5)].map((_, i) => {
            return (
              <SwiperSlide key={i}>
                <Link href="/mobile/restaurants/1">
                  <RestaurantCard
                    key={i}
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
                  />
                </Link>
              </SwiperSlide>
            )
          })}
        </Section>
        <Section title="Last minute" isSwiper isMobile>
          {[...Array(5)].map((_, i) => {
            return (
              <SwiperSlide key={i}>
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
                  promotion={50}
                  size="sm"
                />
              </SwiperSlide>
            )
          })}
        </Section>
        <div className="px-5">
          <div className="flex h-48 w-full items-center justify-center rounded-lg bg-alto text-lg font-bold text-white">
            PUB
          </div>
        </div>
        <Section title="Sélection Atabulapp" isSwiper isMobile>
          {[...Array(5)].map((_, i) => {
            return (
              <SwiperSlide key={i}>
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
                  promotion={50}
                  size="sm"
                />
              </SwiperSlide>
            )
          })}
        </Section>
        <Section title="Offres disponibles" isGrid>
          {[...Array(4)].map((_, i) => {
            return (
              <RestaurantCard
                key={i}
                thumbnail="/images/restaurant-card-thumbnail.png"
                name="La Meurice Alain Ducasse"
                typesOfCooking={['Cuisine créative', 'Cuisine traditionnelle']}
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
      </main>
    </>
  )
}

export default Explore

Explore.getLayout = (page: ReactElement) => <MobileLayout>{page}</MobileLayout>
