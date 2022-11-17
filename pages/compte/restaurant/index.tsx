import { useRouter } from 'next/router'
import { useEffect } from 'react'

const AccountIndex = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/compte/restaurant/informations-restaurant')
  }, [router])

  return <></>
}

export default AccountIndex
