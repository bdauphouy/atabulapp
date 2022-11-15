import MobileLayout from '@/components/layouts/mobile/MobileLayout'
import RestaurantCard from '@/components/shared/RestaurantCard'
import api from '@/lib/api'
import { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'

export const getServerSideProps = async ({ req }) => {
  const { token } = req.cookies

  if (!token) {
    return {
      redirect: {
        destination: '/mobile/connexion',
      },
    }
  }

  const { error, favorites } = await api.getFavorites(token)

  if (error) {
    return {
      redirect: {
        destination: '/',
      },
    }
  }

  return {
    props: {
      favorites,
    },
  }
}

const Favorites = ({ favorites }) => {
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
    <>
      <div className="flex flex-col gap-3 px-5 pt-5">
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
      <main className="flex flex-col gap-8 py-8 px-5">
        <div>
          <header className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-black">Offres actuelles</h3>
            <span className="text-sm uppercase text-gray">
              {favorites.length} restaurants
            </span>
          </header>
          <div className="mt-4 flex flex-col gap-6 border-b-[1px] border-solid border-alto/60 pb-8">
            {favorites.map((favorite: any, i: number) => {
              return (
                <RestaurantCard
                  id={1}
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
          <header className="flex items-center justify-between pt-8">
            <h3 className="text-lg font-bold text-black">Sans offre</h3>
            <span className="text-sm uppercase text-gray">
              {favorites.length} restaurants
            </span>
          </header>
          <div className="mt-4 flex flex-col gap-6"></div>
        </div>
      </main>
    </>
  )
}

export default Favorites

Favorites.getLayout = (page: ReactElement) => (
  <MobileLayout>{page}</MobileLayout>
)
