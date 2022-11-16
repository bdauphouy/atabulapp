import RestaurantAccountLayout from '@/components/layouts/desktop/RestaurantAccountLayout'
import { ReactElement } from 'react'

const LastMinuteOffers = () => {
  return <div>A venir</div>
}

export default LastMinuteOffers

LastMinuteOffers.getLayout = (page: ReactElement) => (
  <RestaurantAccountLayout>{page}</RestaurantAccountLayout>
)
