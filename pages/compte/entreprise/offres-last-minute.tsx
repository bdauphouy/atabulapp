import CorporateAccountLayout from '@/components/layouts/desktop/CorporateAccountLayout'
import { ReactElement } from 'react'

const LastMinuteOffers = () => {
  return <div>A venir</div>
}

export default LastMinuteOffers

LastMinuteOffers.getLayout = (page: ReactElement) => (
  <CorporateAccountLayout>{page}</CorporateAccountLayout>
)
