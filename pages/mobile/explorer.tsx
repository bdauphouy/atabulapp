import Section from '@/components/home/Section'
import MobileLayout from '@/components/layouts/mobile/MobileLayout'
import SearchPage from '@/components/mobile/explore/SearchPage'
import SearchHeader from '@/components/mobile/search/SearchHeader'
import Mea from '@/components/shared/Mea'
import RestaurantCard from '@/components/shared/RestaurantCard'
import { SearchContext } from '@/contexts/SearchContext'
import api from '@/lib/api'
import { ISignupRestaurantFormContext } from '@/lib/interfaces'
import { Offer } from '@/lib/types'
import { useRouter } from 'next/router'
import {
  ChangeEvent,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { SwiperSlide } from 'swiper/react'

const Explore = () => {
  const [isSearchPageOpen, setIsSearchPageOpen] = useState(false)

  const [lastMinuteDiscounts, setLastMinuteDiscounts] = useState([])
  const [nearbyDiscounts, setNearbyDiscounts] = useState([])
  const [restaurantsSelection, setRestaurantsSelection] = useState([])
  const [regularDiscounts, setRegularDiscounts] = useState([])

  const { location } = useContext(SearchContext)

  const handleInputFocus = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.blur()
    setIsSearchPageOpen(true)
  }

  const router = useRouter()

  useEffect(() => {
    if (router.query.search) {
      setIsSearchPageOpen(true)
    }
  }, [router])

  useEffect(() => {
    const getLastMinuteDiscounts = async () => {
      const { discounts } = await api.getLastMinuteDiscounts({
        limit: 20,
        skip: 0,
        latitude: 48.864,
        longitude: 2.3311,
      })

      setLastMinuteDiscounts(discounts)
    }

    const getNearbyDiscounts = async () => {
      const { discounts } = await api.getNearbyRestaurants({
        limit: 20,
        skip: 0,
        latitude: 48.864,
        longitude: 2.3311,
      })

      setNearbyDiscounts(discounts)
    }

    const getRestaurantsSelection = async () => {
      const { selection } = await api.getRestaurantsSelection()

      console.log(selection)

      setRestaurantsSelection(selection)
    }

    const getRegularDiscounts = async () => {
      const { discounts } = await api.getRegularDiscounts({
        limit: 20,
        skip: 0,
        latitude: 48.864,
        longitude: 2.3311,
      })

      setRegularDiscounts(discounts)
    }

    getLastMinuteDiscounts()
    getNearbyDiscounts()
    getRestaurantsSelection()
    getRegularDiscounts()
  }, [])

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
        <Section title="A proximité" isSwiper>
          {nearbyDiscounts.length === 0 ? (
            <div className="flex h-48 items-center justify-center">
              <p className="text-xl text-gray">Aucune offre pour le moment</p>
            </div>
          ) : (
            nearbyDiscounts.map(
              (
                discount: ISignupRestaurantFormContext & {
                  id: number
                  discount: number
                  restaurant: {
                    id: number
                    name: string
                    city: string
                    zipCode: string
                    isEmailConfirmed: boolean
                  }
                },
              ) => {
                return (
                  <SwiperSlide key={discount.id}>
                    <RestaurantCard
                      id={discount.restaurant?.id}
                      thumbnail="/images/restaurant-card-thumbnail.png"
                      name={discount.restaurant?.name}
                      typesOfCooking={[]}
                      location={`${discount.restaurant?.city} (${discount.restaurant?.zipCode})`}
                      tags={[]}
                      isCertified={discount.restaurant?.isEmailConfirmed}
                      promotion={discount.discount}
                      size="sm"
                    />
                  </SwiperSlide>
                )
              },
            )
          )}
        </Section>
        <Section title="Last minute" isSwiper isMobile>
          {lastMinuteDiscounts.length === 0 ? (
            <div className="flex h-48 items-center justify-center">
              <p className="text-xl text-gray">Aucune offre pour le moment</p>
            </div>
          ) : (
            lastMinuteDiscounts.map(
              (
                discount: Offer & {
                  restaurant: ISignupRestaurantFormContext & {
                    id: number
                    isEmailConfirmed: boolean
                  }
                },
              ) => {
                return (
                  <SwiperSlide key={discount.id}>
                    <RestaurantCard
                      id={discount.restaurant.id}
                      thumbnail="/images/restaurant-card-thumbnail.png"
                      name={discount.restaurant.name}
                      typesOfCooking={[]}
                      location={`${discount.restaurant.city} (${discount.restaurant.zipCode})`}
                      tags={[]}
                      isCertified={discount.restaurant.isEmailConfirmed}
                      promotion={discount.discount}
                      size="sm"
                    />
                  </SwiperSlide>
                )
              },
            )
          )}
        </Section>
        <div className="px-5">
          <Mea />
        </div>
        <Section title="Sélection Atabulapp" isSwiper isMobile>
          {restaurantsSelection.length === 0 ? (
            <div className="flex h-48 items-center justify-center">
              <p className="text-xl text-gray">Aucune offre pour le moment</p>
            </div>
          ) : (
            restaurantsSelection.map(restaurant => {
              return (
                <SwiperSlide key={restaurant.id}>
                  <RestaurantCard
                    id={1}
                    thumbnail="/images/restaurant-card-thumbnail.png"
                    name={restaurant.name}
                    typesOfCooking={['Cuisine créative']}
                    location={`${restaurant.city} (${restaurant.zipCode})`}
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
            })
          )}
        </Section>
        <Section title="Offres disponibles" isGrid>
          {regularDiscounts.length === 0 ? (
            <div className="col-span-2 flex h-48 items-center justify-center">
              <p className="text-xl text-gray">Aucune offre pour le moment</p>
            </div>
          ) : (
            regularDiscounts
              .slice(0, 4)
              .map(({ restaurant, ...discount }, i) => {
                return (
                  <RestaurantCard
                    id={1}
                    key={i}
                    thumbnail="/images/restaurant-card-thumbnail.png"
                    name={restaurant.name}
                    typesOfCooking={['Cuisine créative']}
                    location="PARIS (75001)"
                    tags={[
                      { name: 'michelin', level: 2 },
                      { name: 'etoile-verte', level: 1 },
                    ]}
                    isCertified
                    size="lg"
                    promotion={50}
                  />
                )
              })
          )}
        </Section>
      </main>
    </>
  )
}

export default Explore

Explore.getLayout = (page: ReactElement) => <MobileLayout>{page}</MobileLayout>
