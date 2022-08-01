import MobileLayout from '@/components/layouts/mobile/MobileLayout'
import RestaurantCard from '@/components/shared/RestaurantCard'
import { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'

const Favorites = () => {
  const [searchInputValue, setSearchInputValue] = useState('')

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value)
  }

  useEffect(() => {
    console.log({
      searchInputValue,
    })
  }, [searchInputValue])

  return (
    <div>
      <div className="flex flex-col gap-3 px-6 pt-6">
        <h2 className="mb-2 text-3xl font-bold text-black">Favoris</h2>
        <label className="flex max-w-3xl flex-1 items-center gap-6 overflow-hidden rounded-full bg-alto/30 pl-6">
          <RiSearchLine className="text-gray" size={20} />
          <input
            type="text"
            placeholder="Recherche"
            className="h-full w-full bg-[transparent] py-3.5 pr-6 text-lg text-black outline-none"
            onChange={handleSearchInputChange}
          />
        </label>
      </div>
      <main className="flex flex-col gap-8 py-8 px-6">
        <div>
          <header className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-black">Offres actuelles</h3>
            <span className="text-sm uppercase text-gray">5 restaurants</span>
          </header>
          <div className="mt-4 flex flex-col gap-6 border-b-[1px] border-solid border-alto/60 pb-8">
            {[...Array(5)].map((_, i) => {
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
                  isCertified
                  promotion={50}
                  size="sm"
                />
              )
            })}
          </div>
          <header className="flex items-center justify-between pt-8">
            <h3 className="text-lg font-bold text-black">Sans offre</h3>
            <span className="text-sm uppercase text-gray">5 restaurants</span>
          </header>
          <div className="mt-4 flex flex-col gap-6">
            {[...Array(5)].map((_, i) => {
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
                  isCertified
                  promotion={50}
                  size="sm"
                />
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Favorites

Favorites.getLayout = (page: ReactElement) => (
  <MobileLayout>{page}</MobileLayout>
)
