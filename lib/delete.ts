import { BASE_URL } from './variables'

type DeleteParams = {
  url: string
  queries: {
    [key: string]: string
  }
  token: string
}

const _delete = async ({ url, queries, token }: DeleteParams) => {
  const res = await fetch(BASE_URL + url + '?' + new URLSearchParams(queries), {
    method: 'DELETE',
    headers: {
      Authorization: token ? 'Bearer ' + token : null,
    },
  })

  console.log(res)
}

export default _delete
