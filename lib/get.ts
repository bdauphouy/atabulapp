import { BASE_URL } from './variables'

const get = async (url: string) => {
  const res = await fetch(BASE_URL + url, {
    method: 'GET',
  })

  if (res.ok) {
    return res.json()
  } else {
  }
}

export default get
