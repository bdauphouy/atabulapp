import { BASE_URL } from './variables'

type PostParams = {
  url: string
  body: string
  token?: string
}

const post = async ({ url, body, token }: PostParams) => {
  const res = await fetch(BASE_URL + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? 'Bearer ' + token : null,
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
