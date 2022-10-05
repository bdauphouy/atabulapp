import post from '../post'

const signup = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  workStatus: string,
  birthDate: string,
  city: string,
) => {
  const response = {
    error: null,
    user: null,
    token: null,
  }

  const res = await post(
    '/users/auth/signup',
    JSON.stringify({
      email,
      password,
      firstName,
      lastName,
      workStatus,
      birthDate: new Date(birthDate).toISOString(),
      city,
    }),
  )

  if (res.status === 409) {
    response.error = 'Cet email est déjà utilisé.'
  } else {
    response.user = res.user
    response.token = res.token
  }

  return response
}

export default signup
