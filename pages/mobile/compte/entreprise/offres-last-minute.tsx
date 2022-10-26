import AccountLayout from '@/components/layouts/mobile/AccountLayout'
import MobileLayout from '@/components/layouts/mobile/MobileLayout'
import { ReactElement } from 'react'

const LastMinuteOffers = () => {
  return <div>Offres last minute</div>
}

export default LastMinuteOffers

LastMinuteOffers.getLayout = (page: ReactElement) => {
  return (
    <MobileLayout>
      <AccountLayout title="Last minute">{page}</AccountLayout>
    </MobileLayout>
  )
}
