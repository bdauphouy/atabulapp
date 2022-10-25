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

    return response.json()
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

    if (response.status !== 204) {
      // temporary fix
      return response.json()
    }

    return response.text()
  }

  private async delete({ route, queries, token }: ApiDeleteParams) {
    const response = await fetch(this.baseUrl + route + serialize(queries), {
      method: 'DELETE',
      headers: {
        Authorization: token ? 'Bearer ' + token : null,
      },
    })

    if (response.status !== 204) {
      // temporary fix
      return response.json()
    }

    return response.text()
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
      responseObject.user = response
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
      responseObject.user = response
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

    if (response.status === 401) {
      responseObject.error = 'Votre email ou mot de passe est incorrect.'
    } else {
      responseObject.token = response.token
    }

    return responseObject
  }

  async loginCorporate(data: ApiLoginData) {
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

    if (response.status === 401) {
      responseObject.error = 'Votre email ou mot de passe est incorrect.'
    } else {
      responseObject.token = response.token
    }

    return responseObject
  }

  async me(token: string) {
    const response = await this.get({
      route: '/users/me',
      token,
    })

    return response
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

    if (response === '') {
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

    if (response === '') {
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

    if (response.length) {
      responseObject.favorites = response
    }

    return responseObject
  }
}

export default new Api('https://api.atabulapp.synerghetic.net/v1')