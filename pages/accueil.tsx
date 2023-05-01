import Section from '@/components/home/Section'
import DesktopLayout from '@/components/layouts/desktop/DesktopLayout'
import FiltersDropdown from '@/components/shared/FiltersDropdown'
import Mea from '@/components/shared/Mea'
import RestaurantCard from '@/components/shared/RestaurantCard'
import { HonorsContext } from '@/contexts/HonorsContext'
import { RestaurantsContext } from '@/contexts/RestaurantsContext'
import { SearchContext } from '@/contexts/SearchContext'
import { TypesOfCuisineContext } from '@/contexts/TypesOfCuisineContext'
import api from '@/lib/api'
import useLocalstorage from '@/lib/hooks/useLocalStorage'
import useModal from '@/lib/hooks/useModal'
import { ISignupRestaurantFormContext } from '@/lib/interfaces'
import { requireAuth } from '@/lib/middlewares/requireAuth'
import { Offer } from '@/lib/types'
import dynamic from 'next/dynamic'
import { ReactElement, useContext, useEffect, useState } from 'react'
import { SwiperSlide } from 'swiper/react'

const SearchResultMap = dynamic(import('@/components/search/SearchResultMap'), {
  ssr: false,
})

export const getServerSideProps = requireAuth(async () => {
  return {
    props: {},
  }
})

const Home = () => {
  const { hasSearched, ...searchData } = useContext(SearchContext)
  const { restaurants } = useContext(RestaurantsContext)
  const honors = useContext(HonorsContext)
  const typesOfCuisine = useContext(TypesOfCuisineContext)

  const [isHonorsFiltersDropdownOpen, setIsHonorsFiltersDropdownOpen] =
    useState(false)
  const [isMealFiltersDropdownOpen, setIsMealFiltersDropdownOpen] =
    useState(false)
  const [
    isTypeOfCuisineFiltersDropdownOpen,
    setIsTypeOfCuisineFiltersDropdownOpen,
  ] = useState(false)

  const { Modal } = useModal('SettingsModal')

  const [settings, setSettings] = useLocalstorage('settings', false)

  const [lastMinuteDiscounts, setLastMinuteDiscounts] = useState([])
  const [nearbyDiscounts, setNearbyDiscounts] = useState([])
  const [restaurantsSelection, setRestaurantsSelection] = useState([])
  const [regularDiscounts, setRegularDiscounts] = useState([])
  const [activeRestaurant, setActiveRestaurant] = useState(null)

  const [filters, setFilters] = useState({
    honor: '',
    meal: '',
    typeOfCuisine: '',
  })

  const handleMarkerClick = async (restaurantId: number) => {
    const { restaurant } = await api.getRestaurantById(restaurantId)
    setActiveRestaurant(restaurant)
  }

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

  useEffect(() => {
    console.log(filters)
  }, [filters])

  return (
    <>
      {!settings && (
        <div className="fixed top-0 z-50">
          <Modal
            isOpen={settings}
            onClose={() => {
              setSettings(true)
            }}
          />
        </div>
      )}
      <div className="flex flex-wrap gap-6 px-5 pt-5 xl:px-32">
        <FiltersDropdown
          size="lg"
          isOpen={isHonorsFiltersDropdownOpen}
          onToggle={() =>
            setIsHonorsFiltersDropdownOpen(
              isHonorsFiltersDropdownOpen => !isHonorsFiltersDropdownOpen,
            )
          }
          value={filters.honor || 'Distinctions'}
          options={[
            { label: 'Distinctions', value: 'Distinctions' },
            ...honors.map(honor => ({
              label: honor.title,
              value: honor.title,
            })),
          ]}
          onChange={value => setFilters({ ...filters, honor: value })}
        />
        <FiltersDropdown
          size="lg"
          isOpen={isMealFiltersDropdownOpen}
          onToggle={() => {
            setIsMealFiltersDropdownOpen(
              isMealFiltersDropdownOpen => !isMealFiltersDropdownOpen,
            )
          }}
          value={filters.meal || 'Repas'}
          options={[
            { label: 'Repas', value: 'Repas' },
            { label: 'Déjeuner', value: 'Déjeuner' },
            { label: 'Dîner', value: 'Dîner' },
          ]}
          onChange={value => setFilters({ ...filters, meal: value })}
        />
        <FiltersDropdown
          size="lg"
          isOpen={isTypeOfCuisineFiltersDropdownOpen}
          onToggle={() => {
            setIsTypeOfCuisineFiltersDropdownOpen(
              isTypeOfCuisineFiltersDropdownOpen =>
                !isTypeOfCuisineFiltersDropdownOpen,
            )
          }}
          value={filters.typeOfCuisine || 'Type de cuisine'}
          options={[
            { label: 'Type de cuisine', value: 'Type de cuisine' },
            ...typesOfCuisine.map(typeOfCuisine => ({
              label: typeOfCuisine,
              value: typeOfCuisine,
            })),
          ]}
          onChange={value => setFilters({ ...filters, typeOfCuisine: value })}
        />
      </div>
      <main className="flex flex-col gap-11 py-10">
        <div className="px-5 xl:px-32">
          <h3 className="text-2xl font-bold text-black">Localisation</h3>
          <div className="mt-4 flex flex-col-reverse gap-2 rounded-lg border-[1px] border-solid border-alto/60 p-2 md:flex-row">
            <div className="md:flex-[1]">
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
                size="md"
                promotion={50}
              />
            </div>
            <div className="h-60 overflow-hidden rounded-md md:h-auto md:flex-[3]">
              <SearchResultMap onMarkerClick={handleMarkerClick} />
            </div>
          </div>
        </div>
        {hasSearched ? (
          <Section title={`Offres à "${searchData.location}"`} isGrid>
            {restaurants.length > 0 ? (
              restaurants.map((_, i) => {
                return (
                  <RestaurantCard
                    id={1}
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
                    size="lg"
                    promotion={50}
                  />
                )
              })
            ) : (
              <p className="mt-4 text-lg text-black">Aucune offre disponible</p>
            )}
          </Section>
        ) : (
          <>
            <Section title="A proximité" isSwiper>
              {nearbyDiscounts.length === 0 ? (
                <div className="flex h-48 items-center justify-center">
                  <p className="text-xl text-gray">
                    Aucune offre pour le moment
                  </p>
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
                        />
                      </SwiperSlide>
                    )
                  },
                )
              )}
            </Section>
            <Section title="Last minute" isSwiper>
              {lastMinuteDiscounts.length === 0 ? (
                <div className="flex h-48 items-center justify-center">
                  <p className="text-xl text-gray">
                    Aucune offre pour le moment
                  </p>
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
                        />
                      </SwiperSlide>
                    )
                  },
                )
              )}
            </Section>
            <div className="px-5 xl:px-32">
              <Mea />
            </div>
            <Section title="Sélection Atabulapp" isSwiper>
              {restaurantsSelection.length === 0 ? (
                <div className="flex h-48 items-center justify-center">
                  <p className="text-xl text-gray">
                    Aucune offre pour le moment
                  </p>
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
                      />
                    </SwiperSlide>
                  )
                })
              )}
            </Section>
            <Section title="Offres disponibles" isGrid>
              {regularDiscounts.length === 0 ? (
                <div className="col-span-2 flex h-48 items-center justify-center">
                  <p className="text-xl text-gray">
                    Aucune offre pour le moment
                  </p>
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
          </>
        )}
      </main>
    </>
  )
}

export default Home

Home.getLayout = (page: ReactElement) => <DesktopLayout>{page}</DesktopLayout>
