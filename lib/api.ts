import {
  ApiDeleteParams,
  ApiGetParams,
  ApiLoginData,
  ApiPostParams,
  ApiSignupCorporateData,
  ApiSignupUserData,
} from '@/lib/types'
import serialize from './functions/serialize'
class Api {
  baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async get({ route, token }: ApiGetParams) {
    const response = await fetch(this.baseUrl + route, {
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

  async signupCorporate(data: ApiSignupCorporateData) {
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

  async removeFavorites(restaurantId: number, token: string) {
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
}

export default new Api('https://api.atabulapp.synerghetic.net/v1')
