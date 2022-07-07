import { BASE_URL } from './variables'

const post = async (url: string, body: string) => {
  fetch(BASE_URL + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
}

export default post
