import AccountLayout from '@/components/layouts/desktop/AccountLayout'
import { ReactElement } from 'react'

const PersonalInformation = () => {
  return <h3>Informations personnelles</h3>
}

export default PersonalInformation

PersonalInformation.getLayout = (page: ReactElement) => (
  <AccountLayout>{page}</AccountLayout>
)
