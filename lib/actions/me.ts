import get from '../get'

const me = async (token: string) => {
  const response = {
    error: null,
    user: null,
  }

  const res = await get({
    url: '/users/me',
    token,
  })

  return response
}

export default me
