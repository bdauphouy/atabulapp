import api from '@/lib/api'

export default async (url: string) => {
  const response = await fetch(api.baseUrl + '/' + url)
  const blob = await response.blob()
  const file = new File([blob], 'image.jpg', { type: blob.type })
  return file
}
