import AccountLayout from '@/components/layouts/mobile/AccountLayout'
import MobileLayout from '@/components/layouts/mobile/MobileLayout'
import { ReactElement } from 'react'

const RestaurantInformation = () => {
  return <div>Informations restaurant</div>
}

export default RestaurantInformation

RestaurantInformation.getLayout = (page: ReactElement) => {
  return (
    <MobileLayout>
      <AccountLayout title="Restaurant">{page}</AccountLayout>
    </MobileLayout>
  )
}
