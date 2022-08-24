import AccountLayout from '@/components/layouts/desktop/AccountLayout'
import { ReactElement } from 'react'

const TermsOfService = () => {
  return <h3>Conditions de service</h3>
}

export default TermsOfService

TermsOfService.getLayout = (page: ReactElement) => (
  <AccountLayout>{page}</AccountLayout>
)
