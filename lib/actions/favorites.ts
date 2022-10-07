import _delete from '../delete'
import get from '../get'
import post from '../post'

export const addFavorite = async (restaurantId: number, token: string) => {
  const res = await post({
    url: '/users/favorite-restaurants',
    body: JSON.stringify({
      restaurantId,
    }),
    token,
  })

  console.log(res)
}

export const removeFavorite = async (restaurantId: number, token: string) => {
  const res = await _delete({
    url: '/users/favorite-restaurants',
    queries: {
      restaurantId: restaurantId.toString(),
    },
    token,
  })

  console.log(res)
}

export const getFavorites = async (token: string) => {
  const res = await get({
    url: '/users/favorite-restaurants',
    token,
  })

  console.log(res)
}
