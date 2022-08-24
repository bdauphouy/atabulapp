import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Compte = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/compte/informations-personnelles')
  }, [router])

  return <></>
}

export default Compte
