import {
  ApiGetParams,
  ApiLoginData,
  ApiPostParams,
  ApiSignupCorporateData,
  ApiSignupUserData,
} from '@/lib/types'

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

    return response
  }

  private async post({ route, body, isFormData = false }: ApiPostParams) {
    const response = await fetch(this.baseUrl + route, {
      method: 'POST',
      headers: {
        'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
      },
      body,
    })

    return response
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
      responseObject.token = (response as { token?: string }).token
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
      responseObject.token = (response as { token?: string }).token
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
}

export default new Api('https://api.atabulapp.synerghetic.net/v1')
