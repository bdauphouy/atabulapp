import PersonalAccountLayout from '@/components/layouts/desktop/PersonalAccountLayout'
import Message from '@/components/shared/Message'
import RestaurantCard from '@/components/shared/RestaurantCard'
import api from '@/lib/api'
import { requireAuth } from '@/lib/middlewares/requireAuth'
import { ChangeEvent, ReactElement, useState } from 'react'
import { Flipper } from 'react-flip-toolkit'
import { RiSearchLine } from 'react-icons/ri'

export const getServerSideProps = requireAuth(async ({ req }) => {
  const { token } = req.cookies

  if (!token) {
    return {
      redirect: {
        destination: '/',
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
})

const Favorites = ({ favorites: f }) => {
  const [favorites, setFavorites] = useState(f)
  const [searchInputValue, setSearchInputValue] = useState('')

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value)
  }

  return (
    <div>
      <label className="flex max-w-3xl flex-1 items-center gap-6 overflow-hidden rounded-full bg-alto/30 pl-6">
        <RiSearchLine className="text-gray" size={20} />
        <input
          type="text"
          name="search"
          placeholder="Recherche"
          className="h-full w-full bg-[transparent] py-3.5 pr-6 text-lg text-black outline-none"
          onChange={handleSearchInputChange}
        />
      </label>
      {favorites.length > 0 ? (
        <>
          <header className="mt-6 flex items-end justify-between">
            <h3 className="text-lg font-bold text-black">Offres actuelles</h3>
            <h4 className="text-sm uppercase text-gray">
              {favorites.length} restaurants
            </h4>
          </header>
          <Flipper
            flipKey={favorites.map(({ id }) => id).join('-')}
            staggerConfig={{
              default: {
                reverse: false,
                speed: 4,
              },
            }}
            className="mt-4 flex flex-col-reverse gap-6 pb-10"
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
        </>
      ) : (
        <p className="mt-8 text-lg text-black">
          Vous n'avez pas encore de favoris.
        </p>
      )}
    </div>
  )
}

export default Favorites

Favorites.getLayout = (page: ReactElement) => (
  <PersonalAccountLayout>{page}</PersonalAccountLayout>
)
