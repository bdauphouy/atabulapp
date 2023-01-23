import { requireAuth } from '@/lib/middlewares/requireAuth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const getServerSideProps = requireAuth(async () => ({
  props: {},
}))

const AccountIndex = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/compte/restaurant/informations-restaurant')
  }, [router])

  return <></>
}

export default AccountIndex
