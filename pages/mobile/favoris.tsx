import MobileLayout from '@/components/layouts/mobile/MobileLayout'
import RestaurantCard from '@/components/shared/RestaurantCard'
import api from '@/lib/api'
import { ChangeEvent, ReactElement, useState } from 'react'
import { Flipper } from 'react-flip-toolkit'
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

const Favorites = ({ favorites: f }) => {
  const [favorites, setFavorites] = useState(f)
  const [searchInputValue, setSearchInputValue] = useState('')

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value)
  }

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
          <Flipper
            flipKey={favorites.map(({ id }) => id).join('-')}
            staggerConfig={{
              default: {
                reverse: false,
                speed: 4,
              },
            }}
            className="mt-4 flex flex-col-reverse gap-6 border-b-[1px] border-solid border-alto/60 pb-8"
          >
            {favorites.map((favorite: any, i: number) => {
              return (
                <RestaurantCard
                  key={i}
                  id={favorite.id}
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
                  promotion={20}
                  onLike={isLiked =>
                    !isLiked &&
                    setFavorites(
                      favorites.filter((f: any) => f.id !== favorite.id),
                    )
                  }
                />
              )
            })}
          </Flipper>
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
