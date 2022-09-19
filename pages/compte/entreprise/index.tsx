import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Compte = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/compte/entreprise/informations-restaurant')
  }, [router])

  return <></>
}

export default Compte
