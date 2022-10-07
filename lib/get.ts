import { BASE_URL } from './variables'

type GetParams = {
  url: string
  token?: string
}

const get = async ({ url, token }: GetParams) => {
  const res = await fetch(BASE_URL + url, {
    method: 'GET',
    headers: {
      Authorization: token ? 'Bearer ' + token : null,
    },
  })
}

export default get
