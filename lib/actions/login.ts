import post from '../post'

const login = async (email: string, password: string) => {
  const response = {
    error: null,
    token: null,
  }

  const res = await post({
    url: '/users/auth/login',
    body: JSON.stringify({
      email,
      password,
    }),
  })

  if (res.status === 401) {
    response.error = 'Votre email ou mot de passe est incorrect.'
  } else {
    response.token = res.token
  }

  return response
}

export default login
