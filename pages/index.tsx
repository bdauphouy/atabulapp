import Section from '@/components/home/Section'
import DesktopLayout from '@/components/layouts/desktop/DesktopLayout'
import Button from '@/components/shared/Button'
import FiltersDropdown from '@/components/shared/FiltersDropdown'
import FilterTag from '@/components/shared/FilterTag'
import Mea from '@/components/shared/Mea'
import RestaurantCard from '@/components/shared/RestaurantCard'
import { GeolocationContext } from '@/contexts/GeolocationContext'
import { ShowLoginModal } from '@/contexts/ShowLoginModal'
import { UserContext } from '@/contexts/UserContext'
import api from '@/lib/api'
import useModal from '@/lib/hooks/useModal'
import { ISignupRestaurantFormContext } from '@/lib/interfaces'
import { Offer } from '@/lib/types'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement, useContext, useEffect, useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { SwiperSlide } from 'swiper/react'

export const getServerSideProps = async ({ req }) => {
  const { token } = req.cookies

  if (token) {
    return {
      redirect: {
        destination: req.url.startsWith('/mobile')
          ? '/mobile/explorer'
          : '/accueil',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

const Home = () => {
  const coords = useContext(GeolocationContext)

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isFiltersDropdownOpen, setIsFiltersDropdownOpen] = useState(false)
  const [isLastMinute, setIsLastMinute] = useState(false)
  const [filterDropdownValue, setFilterDropdownValue] = useState('Filtres')
  const [lastMinuteDiscounts, setLastMinuteDiscounts] = useState([])
  const [regularDiscounts, setRegularDiscounts] = useState([])
  const [nearbyDiscounts, setNearbyDiscounts] = useState([])
  const [restaurantsSelection, setRestaurantsSelection] = useState([])

  const { Modal, changeModal } = useModal('LoginModal')

  const { user } = useContext(UserContext)
  const { showLoginModal, setShowLoginModal } = useContext(ShowLoginModal)

  const router = useRouter()

  const filterDropdownOptions = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]

  useEffect(() => {
    if (user?.id) {
      router.push('/accueil')
    }
  }, [router, user])

  useEffect(() => {
    showLoginModal && changeModal('AskToLoginModal')
    setIsLoginModalOpen(showLoginModal)
  }, [showLoginModal, changeModal])

  useEffect(() => {
    const getRegularDiscounts = async () => {
      const { discounts } = await api.getRegularDiscounts({
        limit: 20,
        skip: 0,
        latitude: 48.864,
        longitude: 2.3311,
      })

      console.log({
        discounts,
      })

      setRegularDiscounts(discounts)
    }

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

    getRegularDiscounts()
    getLastMinuteDiscounts()
    getNearbyDiscounts()
    getRestaurantsSelection()
  }, [])

  return (
    <div>
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        changeModal={changeModal}
      />
      <header className="flex h-28 lg:h-[450px]">
        <div className="flex w-full items-center justify-between bg-white-rock px-6 py-8 lg:flex-[2] lg:py-40">
          <div className="relative h-full w-20 lg:w-full">
            <Image
              src="/images/full-logo.svg"
              alt="Logo d'Atabulapp"
              layout="fill"
            />
          </div>
          <Button
            className="z-50 lg:hidden"
            onClick={() => setIsLoginModalOpen(true)}
            variant="primary"
          >
            Se connecter
          </Button>
        </div>
        <div className="relative hidden flex-[5] items-start justify-end pr-6 pt-6 lg:flex xl:pr-32">
          <Button
            className="z-50"
            onClick={() => setIsLoginModalOpen(true)}
            variant="primary"
          >
            Se connecter
          </Button>
          <Image
            layout="fill"
            src="/images/homepage-header.png"
            alt="Assiette gastronomique"
            objectFit="cover"
          />
        </div>
      </header>
      <div className="flex flex-col gap-6 px-5 pt-5 md:flex-row xl:px-32">
        <label
          onClick={() => setShowLoginModal(true)}
          className="flex max-w-3xl flex-1 items-center gap-6 overflow-hidden rounded-full bg-alto/30 pl-6"
        >
          <RiSearchLine className="text-gray" size={20} />
          <input
            type="text"
            placeholder="Recherche"
            className="h-full w-full bg-[transparent] py-3.5 pr-6 text-lg text-black outline-none"
            disabled
          />
        </label>
        <div
          className="flex flex-wrap gap-6"
          onClick={() => setShowLoginModal(true)}
        >
          <FiltersDropdown
            size="lg"
            isOpen={isFiltersDropdownOpen}
            onToggle={() =>
              setIsFiltersDropdownOpen(
                isFiltersDropdownOpen => !isFiltersDropdownOpen,
              )
            }
            onChange={value => setFilterDropdownValue(value)}
            value="Filtres"
          />
          <FilterTag
            isSelected={isLastMinute}
            onChange={() => setIsLastMinute(isLastMinute => !isLastMinute)}
            size="lg"
            name="search-filters"
          >
            Last minute
          </FilterTag>
          <Button variant="primary">Localisation</Button>
        </div>
      </div>
      <main className="flex flex-col gap-11 py-10">
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
    </div>
  )
}

export default Home

Home.getLayout = (page: ReactElement) => (
  <DesktopLayout hasHeader={false}>{page}</DesktopLayout>
)
