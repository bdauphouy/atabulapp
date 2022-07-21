import Section from '@/components/homepage/Section'
import DesktopLayout from '@/components/layouts/DesktopLayout'
import FiltersDropdown from '@/components/shared/FiltersDropdown'
import RestaurantCard from '@/components/shared/RestaurantCard'
import { SearchContext } from '@/contexts/SearchContext'
import { ReactElement, useContext, useState } from 'react'

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

  const handleHonorsFiltersToggle = () => {
    setIsHonorsFiltersDropdownOpen(
      isHonorsFiltersDropdownOpen => !isHonorsFiltersDropdownOpen,
    )
  }

  const handleMealFiltersToggle = () => {
    setIsMealFiltersDropdownOpen(
      isMealFiltersDropdownOpen => !isMealFiltersDropdownOpen,
    )
  }

  const handleTypeOfCuisineFiltersToggle = () => {
    setIsTypeOfCuisineFiltersDropdownOpen(
      isTypeOfCuisineFiltersDropdownOpen => !isTypeOfCuisineFiltersDropdownOpen,
    )
  }

  return (
    <div>
      <pre>{JSON.stringify(searchData)}</pre>
      <div className="flex gap-6 px-6 pt-6 lg:px-32">
        <FiltersDropdown
          size="lg"
          isOpen={isHonorsFiltersDropdownOpen}
          onToggle={handleHonorsFiltersToggle}
        >
          Distinctions
        </FiltersDropdown>
        <FiltersDropdown
          size="lg"
          isOpen={isMealFiltersDropdownOpen}
          onToggle={handleMealFiltersToggle}
        >
          Repas
        </FiltersDropdown>
        <FiltersDropdown
          size="lg"
          isOpen={isTypeOfCuisineFiltersDropdownOpen}
          onToggle={handleTypeOfCuisineFiltersToggle}
        >
          Type de cuisine
        </FiltersDropdown>
      </div>
      <main className="flex flex-col gap-11 py-10">
        <div className="px-6 lg:px-32">
          <h3 className="text-2xl font-bold text-black">Localisation</h3>
          <div className="mt-4 flex gap-2 rounded-lg border-[1px] border-solid border-alto/60 p-2">
            <div className="flex-[1]">
              <RestaurantCard
                thumbnail="/images/restaurant-card-thumbnail.png"
                name="La Meurice Alain Ducasse"
                typesOfCooking={['Cuisine créative']}
                location="PARIS (75001)"
                tags={[
                  { name: 'michelin', level: 2 },
                  { name: 'etoile-verte', level: 1 },
                ]}
                certified
                size="small"
                promotion={50}
              />
            </div>
            <div className="flex-[3] overflow-hidden rounded-md bg-alto/60">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42027.16171034499!2d2.3421359866132287!3d48.82583085395752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1657555032540!5m2!1sen!2sfr"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              ></iframe>
            </div>
          </div>
        </div>
        {searchData.location && (
          <Section title={`Offres à ${searchData.location}`} isGrid>
            {[...Array(6)].map((_, i) => {
              return (
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
                  certified
                  size="large"
                  promotion={50}
                />
              )
            })}
          </Section>
        )}
      </main>
    </div>
  )
}

export default Home

Home.getLayout = (page: ReactElement) => <DesktopLayout>{page}</DesktopLayout>
