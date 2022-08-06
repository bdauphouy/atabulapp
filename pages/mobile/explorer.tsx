import Section from '@/components/home/Section'
import MobileLayout from '@/components/layouts/mobile/MobileLayout'
import FiltersBottomSheet from '@/components/mobile/explore/FiltersBottomSheet'
import FiltersDropdown from '@/components/shared/FiltersDropdown'
import FilterTag from '@/components/shared/FilterTag'
import FormFooter from '@/components/shared/FormFooter'
import RestaurantCard from '@/components/shared/RestaurantCard'
import useStringify from '@/lib/hooks/useStringify'
import { IExploreFiltersForm } from '@/lib/interfaces'
import Link from 'next/link'
import { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RiSearchLine } from 'react-icons/ri'
import { SwiperSlide } from 'swiper/react'

const Explore = () => {
  const { control, handleSubmit, watch, setValue } =
    useForm<IExploreFiltersForm>({
      defaultValues: {
        honors: [],
      },
    })

  // const coords = useContext(GeolocationContext)

  const [isFiltersDropdownOpen, setIsFiltersDropdownOpen] = useState(false)
  const [isLastMinute, setIsLastMinute] = useState(false)
  const [searchInputValue, setSearchInputValue] = useState('')

  const watchHonors = watch(['honors'])

  const honorsString = useStringify('honorsString', watchHonors)

  const handleFiltersToggle = () => {
    setIsFiltersDropdownOpen(isFiltersDropdownOpen => !isFiltersDropdownOpen)
  }

  const handleLastMinuteChange = () => {
    setIsLastMinute(isLastMinute => !isLastMinute)
  }

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value)
  }

  useEffect(() => {
    console.log({
      isLastMinute,
      searchInputValue,
    })
  }, [isLastMinute, searchInputValue])

  const onSubmit: SubmitHandler<IExploreFiltersForm> = data => {
    console.log(data)
  }

  return (
    <div>
      <form
        id="explore-filters-form"
        className="flex flex-col gap-3 px-6 pt-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="mb-2 text-3xl font-bold text-black">Explorer</h2>
        <label className="flex max-w-3xl flex-1 items-center gap-6 overflow-hidden rounded-full bg-alto/30 pl-6">
          <RiSearchLine className="text-gray" size={20} />
          <input
            type="text"
            placeholder="Recherche"
            className="h-full w-full bg-[transparent] py-3.5 pr-6 text-lg text-black outline-none"
            onChange={handleSearchInputChange}
          />
        </label>
        <div className="flex flex-wrap gap-3">
          <FiltersDropdown
            size="md"
            isOpen={isFiltersDropdownOpen}
            onToggle={handleFiltersToggle}
          >
            Filtres
          </FiltersDropdown>
          <FiltersBottomSheet
            control={control}
            isOpen={isFiltersDropdownOpen}
            setIsOpen={setIsFiltersDropdownOpen}
            selectedFilters={{ honorsString }}
          />
          {isFiltersDropdownOpen && (
            <FormFooter
              formId="explore-filters-form"
              footerLeftButton={{
                text: 'Tout effacer',
                customAction: () => setValue('honors', []),
              }}
              footerRightButton={{
                text: 'Voir les 10 offres',
              }}
              isFixed
              isInTheForeground
            />
          )}
          <FilterTag
            isSelected={isLastMinute}
            onChange={handleLastMinuteChange}
            size="md"
            name="search-filters"
          >
            Last minute
          </FilterTag>
        </div>
      </form>
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
        <div className="px-6 lg:px-32">
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
    </div>
  )
}

export default Explore

Explore.getLayout = (page: ReactElement) => <MobileLayout>{page}</MobileLayout>
