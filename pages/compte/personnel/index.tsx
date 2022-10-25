import { useRouter } from 'next/router'
import { useEffect } from 'react'

const AccountIndex = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/compte/personnel/informations-personnelles')
  }, [router])

  return <></>
}

export default AccountIndex
