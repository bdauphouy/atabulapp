import AccountLayout from '@/components/layouts/mobile/AccountLayout'
import MobileLayout from '@/components/layouts/mobile/MobileLayout'
import { ReactElement } from 'react'

const RegularOffer = () => {
  return <div>Offres régulières</div>
}

export default RegularOffer

RegularOffer.getLayout = (page: ReactElement) => {
  return (
    <MobileLayout>
      <AccountLayout title="Régulières">{page}</AccountLayout>
    </MobileLayout>
  )
}
