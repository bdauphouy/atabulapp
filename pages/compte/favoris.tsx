import AccountLayout from '@/components/layouts/desktop/AccountLayout'
import RestaurantCard from '@/components/shared/RestaurantCard'
import { ReactElement } from 'react'
import { RiSearchLine } from 'react-icons/ri'

const Favorites = () => {
  return (
    <div>
      <label className="flex max-w-3xl flex-1 items-center gap-6 overflow-hidden rounded-full bg-alto/30 pl-6">
        <RiSearchLine className="text-gray" size={20} />
        <input
          type="text"
          name="search"
          placeholder="Recherche"
          className="h-full w-full bg-[transparent] py-3.5 pr-6 text-lg text-black outline-none"
        />
      </label>
      <header className="mt-6 flex items-end justify-between">
        <h3 className="text-lg font-bold text-black">Offres actuelles</h3>
        <h4 className="text-sm uppercase text-gray">4 restaurants</h4>
      </header>
      <div className="mt-4 flex flex-col gap-6 pb-10">
        {[...Array(4)].map((_, i) => {
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
              size="sm"
            />
          )
        })}
      </div>
    </div>
  )
}

export default Favorites

Favorites.getLayout = (page: ReactElement) => (
  <AccountLayout>{page}</AccountLayout>
)
