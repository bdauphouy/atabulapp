import Section from '@/components/home/Section'
import DesktopLayout from '@/components/layouts/desktop/DesktopLayout'
import FiltersDropdown from '@/components/shared/FiltersDropdown'
import Mea from '@/components/shared/Mea'
import RestaurantCard from '@/components/shared/RestaurantCard'
import { RestaurantsContext } from '@/contexts/RestaurantsContext'
import { SearchContext } from '@/contexts/SearchContext'
import api from '@/lib/api'
import useLocalstorage from '@/lib/hooks/useLocalStorage'
import useModal from '@/lib/hooks/useModal'
import { requireAuth } from '@/lib/middlewares/requireAuth'
import dynamic from 'next/dynamic'
import { ReactElement, useContext, useState } from 'react'
import { SwiperSlide } from 'swiper/react'

const SearchResultMap = dynamic(import('@/components/search/SearchResultMap'), {
  ssr: false,
})

export const getServerSideProps = requireAuth(async () => {
  const { error: regularError, discounts: regularDiscounts } =
    await api.getRegularDiscounts({
      limit: 20,
      skip: 0,
      latitude: 48.856614,
      longitude: 2.3522219,
    })

  const { error: lastMinuteError, discounts: lastMinuteDiscounts } =
    await api.getLastMinuteDiscounts({
      limit: 20,
      skip: 0,
      latitude: 48.856614,
      longitude: 2.3522219,
    })

  return {
    props: {
      regularDiscounts: regularError ? [] : regularDiscounts,
      lastMinuteDiscounts: lastMinuteError ? [] : lastMinuteDiscounts,
    },
  }
})

const Home = ({ lastMinuteDiscounts, regularDiscounts }) => {
  const { hasSearched, ...searchData } = useContext(SearchContext)
  const { restaurants } = useContext(RestaurantsContext)

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
          value="Distinctions"
        />
        <FiltersDropdown
          size="lg"
          isOpen={isMealFiltersDropdownOpen}
          onToggle={() => {
            setIsMealFiltersDropdownOpen(
              isMealFiltersDropdownOpen => !isMealFiltersDropdownOpen,
            )
          }}
          value="Repas"
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
          value="Type de cuisine"
        />
      </div>
      <main className="flex flex-col gap-11 py-10">
        <div className="px-5 xl:px-32">
          <h3 className="text-2xl font-bold text-black">Localisation</h3>
          <div className="mt-4 flex flex-col-reverse gap-2 rounded-lg border-[1px] border-solid border-alto/60 p-2 md:flex-row">
            <div className="md:flex-[1]">
              <RestaurantCard
                id={1}
                thumbnail="/images/restaurant-card-thumbnail.png"
                name="La Meurice Alain Ducasse"
                typesOfCooking={['Cuisine créative']}
                location="PARIS (75001)"
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
              <SearchResultMap />
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
              {regularDiscounts.length === 0 ? (
                <div className="flex h-48 items-center justify-center">
                  <p className="text-xl text-gray">
                    Aucune offre pour le moment
                  </p>
                </div>
              ) : (
                regularDiscounts.map((_, i) => {
                  return (
                    <SwiperSlide key={i}>
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
                        promotion={30}
                      />
                    </SwiperSlide>
                  )
                })
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
                lastMinuteDiscounts.map((_, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <RestaurantCard
                        id={1}
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
                      />
                    </SwiperSlide>
                  )
                })
              )}
            </Section>
            <div className="px-5 xl:px-32">
              <Mea />
            </div>
            <Section title="Sélection Atabulapp" isSwiper>
              {[...Array(5)].map((_, i) => {
                return (
                  <SwiperSlide key={i}>
                    <RestaurantCard
                      id={1}
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
                    />
                  </SwiperSlide>
                )
              })}
            </Section>
            <Section title="Offres disponibles" isGrid>
              {lastMinuteDiscounts.length === 0 ? (
                <div className="col-span-2 flex h-48 items-center justify-center">
                  <p className="text-xl text-gray">
                    Aucune offre pour le moment
                  </p>
                </div>
              ) : (
                lastMinuteDiscounts.slice(0, 4).map((_, i) => {
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
