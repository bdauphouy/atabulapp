import Section from '@/components/home/Section'
import DesktopLayout from '@/components/layouts/desktop/DesktopLayout'
import FiltersDropdown from '@/components/shared/FiltersDropdown'
import RestaurantCard from '@/components/shared/RestaurantCard'
import { SearchContext } from '@/contexts/SearchContext'
import useLocalstorage from '@/lib/hooks/useLocalStorage'
import useModal from '@/lib/hooks/useModal'

import dynamic from 'next/dynamic'

import { ReactElement, useContext, useState } from 'react'

import { requireAuth } from '@/lib/middlewares/requireAuth'

const SearchResultMap = dynamic(import('@/components/search/SearchResultMap'), {
  ssr: false,
})

export const getServerSideProps = requireAuth(async () => ({ props: {} }))

const Home = () => {
  const searchData = useContext(SearchContext)

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
        >
          Distinctions
        </FiltersDropdown>
        <FiltersDropdown
          size="lg"
          isOpen={isMealFiltersDropdownOpen}
          onToggle={() => {
            setIsMealFiltersDropdownOpen(
              isMealFiltersDropdownOpen => !isMealFiltersDropdownOpen,
            )
          }}
        >
          Repas
        </FiltersDropdown>
        <FiltersDropdown
          size="lg"
          isOpen={isTypeOfCuisineFiltersDropdownOpen}
          onToggle={() => {
            setIsTypeOfCuisineFiltersDropdownOpen(
              isTypeOfCuisineFiltersDropdownOpen =>
                !isTypeOfCuisineFiltersDropdownOpen,
            )
          }}
        >
          Type de cuisine
        </FiltersDropdown>
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
        {searchData.location && (
          <Section title={`Offres à ${searchData.location}`} isGrid>
            {[...Array(6)].map((_, i) => {
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
            })}
          </Section>
        )}
      </main>
    </>
  )
}

export default Home

Home.getLayout = (page: ReactElement) => <DesktopLayout>{page}</DesktopLayout>
