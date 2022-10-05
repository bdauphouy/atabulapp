import { BASE_URL } from './variables'

type PostParams = {
  url: string
  body: string
}

const post = async ({ url, body }: PostParams) => {
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
