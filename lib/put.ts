import { BASE_URL } from './variables'

const put = async (url: string, body: string) => {
  fetch(BASE_URL + url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
}

export default put
