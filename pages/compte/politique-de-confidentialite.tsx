import AccountLayout from '@/components/layouts/desktop/AccountLayout'
import { ReactElement } from 'react'

const PrivacyPolicy = () => {
  return <h3>Politique de confidentialité</h3>
}

export default PrivacyPolicy

PrivacyPolicy.getLayout = (page: ReactElement) => (
  <AccountLayout>{page}</AccountLayout>
)
