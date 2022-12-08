import {
  ApiDeleteParams,
  ApiGetParams,
  ApiLoginData,
  ApiPostParams,
  ApiSignupRestaurantData,
  ApiSignupUserData,
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

    // temporary fix
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
    const response = await fetch(this.baseUrl + route, {
      method: 'POST',
      headers: {
        'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        Authorization: token ? 'Bearer ' + token : null,
      },
      body,
    })

    // temporary fix
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

    // temporary fix
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

    const response = await this.post({
      route: '/users/auth/signup',
      body: JSON.stringify({
        ...data,
        birthDate: new Date(data.birthDate).toISOString(),
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
    Cookie.remove('token')
  }

  async loginUser(data: ApiLoginData) {
    const responseObject = {
      error: null,
      token: null,
    }

    const response = await this.post({
      route: '/users/auth/login',
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
}

export default new Api('https://api.atabulapp.synerghetic.net/v1')
