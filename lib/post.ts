import { BASE_URL } from './variables'

const post = async (url: string, body: string) => {
  const res = await fetch(BASE_URL + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })

  if (res.ok) {
    return res.json()
  }

  return {
    status: res.status,
    message: await res.text(),
  }
}

export default post
