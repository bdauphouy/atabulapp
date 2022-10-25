import PersonalAccountLayout from '@/components/layouts/desktop/PersonalAccountLayout'
import RestaurantCard from '@/components/shared/RestaurantCard'
import api from '@/lib/api'
import { ReactElement } from 'react'
import { RiSearchLine } from 'react-icons/ri'

export const getServerSideProps = async ({ req }) => {
  const { token } = req.cookies

  if (!token) {
    return {
      notFound: true,
    }
  }

  const { error, favorites } = await api.getFavorites(token)

  if (error) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      favorites,
    },
  }
}

const Favorites = ({ favorites }) => {
  console.log(favorites)
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
        <h4 className="text-sm uppercase text-gray">
          {favorites.length} restaurants
        </h4>
      </header>
      <div className="mt-4 flex flex-col gap-6 pb-10">
        {favorites.map((favorite: any, i: number) => {
          return (
            <RestaurantCard
              key={i}
              thumbnail="/images/restaurant-card-thumbnail.png"
              name={favorite.name}
              typesOfCooking={['Cuisine créative']}
              location={favorite.city}
              tags={[
                { name: 'michelin', level: 2 },
                { name: 'etoile-verte', level: 1 },
              ]}
              isCertified
              isDefaultLiked
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
  <PersonalAccountLayout>{page}</PersonalAccountLayout>
)
