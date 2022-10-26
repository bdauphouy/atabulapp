import AccountLayout from '@/components/layouts/mobile/AccountLayout'
import MobileLayout from '@/components/layouts/mobile/MobileLayout'
import { ReactElement } from 'react'

const Pictures = () => {
  return <div>Photos</div>
}

export default Pictures

Pictures.getLayout = (page: ReactElement) => {
  return (
    <MobileLayout>
      <AccountLayout title="Photos">{page}</AccountLayout>
    </MobileLayout>
  )
}
