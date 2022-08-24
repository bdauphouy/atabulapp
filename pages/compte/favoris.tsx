import AccountLayout from '@/components/layouts/desktop/AccountLayout'
import { ReactElement } from 'react'

const Favorites = () => {
  return <h3>Favoris</h3>
}

export default Favorites

Favorites.getLayout = (page: ReactElement) => (
  <AccountLayout>{page}</AccountLayout>
)
