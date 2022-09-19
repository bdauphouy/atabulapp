import PersonalAccountLayout from '@/components/layouts/desktop/PersonalAccountLayout'
import { ReactElement } from 'react'

const TermsOfService = () => {
  return <h3>Conditions de service</h3>
}

export default TermsOfService

TermsOfService.getLayout = (page: ReactElement) => (
  <PersonalAccountLayout>{page}</PersonalAccountLayout>
)
