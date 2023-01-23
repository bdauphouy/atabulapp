import {
  ApiDeleteParams,
  ApiGetDiscountsParams,
  ApiGetParams,
  ApiLoginData,
  ApiPostParams,
  ApiPutParams,
  ApiSignupRestaurantData,
  ApiSignupUserData,
  ApiUpdateRestaurantData,
  ApiUpdateUserData,
} from '@/lib/types'
import Cookie from 'js-cookie'
import { LatLngBounds } from 'leaflet'
import serialize from './functions/serialize'

class Api {
  baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async get({ route, queries, token }: ApiGetParams) {
    const response = await fetch(this.baseUrl + route + serialize(queries), {
      method: 'GET',
      headers: {
        Authorization: token ? 'Bearer ' + token : null,
      },
    })

    return {
      data:
        response.status !== 204 ? await response.json() : await response.text(),
      status: response.status,
    }
  }

  private async post({
    route,
    body,
    token,
    isFormData = false,
  }: ApiPostParams) {
    const headers = {
      Authorization: token ? 'Bearer ' + token : null,
    }

    if (!isFormData) {
      headers['Content-Type'] = 'application/json'
    }

    const response = await fetch(this.baseUrl + route, {
      method: 'POST',
      headers,
      body,
    })

    return {
      data:
        response.status !== 204 ? await response.json() : await response.text(),
      status: response.status,
    }
  }

  private async delete({ route, queries, token }: ApiDeleteParams) {
    const response = await fetch(this.baseUrl + route + serialize(queries), {
      method: 'DELETE',
      headers: {
        Authorization: token ? 'Bearer ' + token : null,
      },
    })

    return {
      data:
        response.status !== 204 ? await response.json() : await response.text(),
      status: response.status,
    }
  }

  private async put({ route, body, token }: ApiPutParams) {
    const response = await fetch(this.baseUrl + route, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? 'Bearer ' + token : null,
      },
      body,
    })

    return {
      data:
        response.status !== 204 ? await response.json() : await response.text(),
      status: response.status,
    }
  }

  async signupUser(data: ApiSignupUserData) {
    const responseObject = {
      error: null,
      user: null,
    }

    const [day, month, year] = data.birthDate.split('/')

    const response = await this.post({
      route: '/users/auth/signup',
      body: JSON.stringify({
        ...data,
        birthDate: new Date(`${month}/${day}/${year}`).toISOString(),
      }),
    })

    if (response.status === 409) {
      responseObject.error = 'Cet email est déjà utilisé.'
    } else {
      responseObject.user = response.data
    }

    return responseObject
  }

  async signupRestaurant(data: ApiSignupRestaurantData) {
    const responseObject = {
      error: null,
      user: null,
    }

    const response = await this.post({
      route: '/restaurants/auth/signup',
      body: JSON.stringify(data),
    })

    if (response.status === 409) {
      responseObject.error = 'Cet email est déjà utilisé.'
    } else {
      responseObject.user = response.data
    }

    return responseObject
  }

  async logout() {
    return new Promise(resolve => {
      Cookie.remove('token')
      setTimeout(resolve, 1000)
    })
  }

  async loginUser(data: ApiLoginData) {
    const responseObject = {
      error: null,
      token: null,
    }

    console.log(data)

    const response = await this.post({
      route: '/users/auth/login',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })

    console.log(response)

    switch (response.status) {
      case 401:
        responseObject.error = 'Votre email ou mot de passe est incorrect.'
        break
      case 403:
        responseObject.error = "Votre compte n'est pas encore validé."
        break
      case 404:
        responseObject.error = "Cet utilisateur n'existe pas."
      default:
        responseObject.token = response.data.token
    }

    return responseObject
  }

  async loginRestaurant(data: ApiLoginData) {
    const responseObject = {
      error: null,
      token: null,
    }

    const response = await this.post({
      route: '/restaurants/auth/login',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })

    switch (response.status) {
      case 401:
        responseObject.error = 'Votre email ou mot de passe est incorrect.'
        break
      case 403:
        responseObject.error = "Votre compte n'est pas encore validé."
        break
      case 404:
        responseObject.error = "Ce restaurant n'existe pas."
      default:
        responseObject.token = response.data.token
    }

    return responseObject
  }

  async me(token: string) {
    const responseObject = {
      error: null,
      user: null,
    }

    const response = await this.get({
      route: '/users/me',
      token,
    })

    if (response.status === 401) {
      responseObject.error = 'Le token est invalide.'
    } else {
      responseObject.user = response.data
    }

    return responseObject
  }

  async updateMe(token: string, data: ApiUpdateUserData) {
    const responseObject = {
      error: null,
      success: false,
    }

    const response = await this.put({
      route: '/users/me',
      body: JSON.stringify(data),
      token,
    })

    if (response.status === 204) {
      responseObject.success = true
    } else {
      responseObject.error =
        'Une erreur est survenue lors de la modification de ce profil.'
    }

    return responseObject
  }

  async addFavorite(restaurantId: number, token: string) {
    const responseObject = {
      error: null,
      success: false,
    }

    const response = await this.post({
      route: '/users/favorite-restaurants',
      body: JSON.stringify({ restaurantId }),
      token,
    })

    if (response.data === '') {
      responseObject.success = true
    }

    return responseObject
  }

  async removeFavorite(restaurantId: number, token: string) {
    const responseObject = {
      error: null,
      success: false,
    }

    const response = await this.delete({
      route: '/users/favorite-restaurants',
      queries: {
        restaurantId,
      },
      token,
    })

    if (response.data === '') {
      responseObject.success = true
    }

    return responseObject
  }

  async getFavorites(token: string) {
    const responseObject = {
      error: null,
      favorites: [],
    }

    const response = await this.get({
      route: '/users/favorite-restaurants',
      token,
    })

    if (response.data.length) {
      responseObject.favorites = response.data
    }

    return responseObject
  }

  async getRestaurantsIntoBounds(bounds: LatLngBounds) {
    const responseObject = {
      error: null,
      restaurants: [],
    }

    const formattedBoundaries = {
      ne: bounds.getNorthEast(),
      sw: bounds.getSouthWest(),
    }

    const response = await fetch(
      'https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-emplacement-des-stations&q=&rows=1000',
    )
    const data = await response.json()

    if (data) {
      responseObject.restaurants = data.records
    }

    // const response = await this.get({
    //   route: '/restaurants',
    //   queries: {
    //     boundaries: JSON.stringify(formattedBoundaries),
    //   },
    // })

    // if (response.data.length) {
    //   responseObject.restaurants = response.data
    // }

    return responseObject
  }

  async getRestaurantById(id: number) {
    const responseObject = {
      error: null,
      restaurant: null,
    }

    const response = await this.get({
      route: '/restaurants/' + id,
    })

    if (response.status === 200) {
      responseObject.restaurant = response.data
    } else {
      responseObject.error = "Ce restaurant n'existe pas."
    }

    return responseObject
  }

  async updateRestaurant(id: number, data: ApiUpdateRestaurantData) {
    const responseObject = {
      error: null,
      success: false,
    }

    const response = await this.put({
      route: '/restaurants/' + id,
      body: JSON.stringify(data),
    })

    if (response.status === 204) {
      responseObject.success = true
    } else {
      responseObject.error =
        'Une erreur est survenue lors de la modification de ce restaurant.'
    }

    return responseObject
  }

  async getRegularDiscounts(queries: ApiGetDiscountsParams) {
    const responseObject = {
      error: null,
      discounts: null,
    }

    const response = await this.get({
      route: '/restaurants/discounts',
      queries: {
        type: 'regular',
        ...queries,
      },
    })

    if (response.status === 200) {
      responseObject.discounts = response.data
    } else {
      responseObject.error = "Une erreur s'est produite."
    }

    return responseObject
  }

  async getLastMinuteDiscounts(queries: ApiGetDiscountsParams) {
    const responseObject = {
      error: null,
      discounts: null,
    }

    const response = await this.get({
      route: '/restaurants/discounts',
      queries: {
        type: 'lastMinute',
        ...queries,
      },
    })

    if (response.status === 200) {
      responseObject.discounts = response.data
    } else {
      responseObject.error = "Une erreur s'est produite."
    }

    return responseObject
  }

  async addRestaurantPicture(id: number, picture: File) {
    const responseObject = {
      error: null,
      success: false,
    }

    const formData = new FormData()
    formData.append('file', picture)

    const response = await this.post({
      route: '/restaurants/' + id + '/photos',
      body: formData,
      isFormData: true,
    })

    if (response.status === 204) {
      responseObject.success = true
    } else {
      responseObject.error = "Une erreur s'est produite."
    }

    return responseObject
  }

  async getRestaurantPictures(id: number) {
    const responseObject = {
      error: null,
      pictures: [],
    }

    const response = await this.get({
      route: '/restaurants/' + id + '/photos',
    })

    if (response.status === 200) {
      responseObject.pictures = response.data
    } else {
      responseObject.error = "Une erreur s'est produite."
    }

    return responseObject
  }

  getRestaurantPictureUrl(suffix: string) {
    return this.baseUrl + '/' + suffix
  }

  async getAutocompleteSuggestions(query: string) {
    const responseObject = {
      error: null,
      suggestions: [],
    }

    const response = await this.get({
      route: '/restaurants/autocomplete',
      queries: {
        place: query,
      },
    })

    if (response.status === 200) {
      responseObject.suggestions = response.data
    } else {
      responseObject.error = "Une erreur s'est produite."
    }

    return responseObject
  }

  async searchRestaurants(queries: {
    place: string
    lowerDate: string
    upperDate: string
    limit: number
    skip: number
  }) {
    const responseObject = {
      error: null,
      restaurants: [],
    }

    const response = await this.get({
      route: '/restaurants/search',
      queries,
    })

    if (response.status === 200) {
      responseObject.restaurants = response.data
    } else {
      responseObject.error = "Une erreur s'est produite."
    }

    return responseObject
  }
}

export default new Api('https://api.atabulapp.synerghetic.net/v1')
