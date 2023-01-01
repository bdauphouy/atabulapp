import MobileLayout from '@/components/layouts/mobile/MobileLayout'
import ArrowCta from '@/components/shared/ArrowCta'
import Button from '@/components/shared/Button'
import api from '@/lib/api'
import { requireAuth } from '@/lib/middlewares/requireAuth'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

export const getServerSideProps = requireAuth(async ({ req }, user) => {
  return {
    props: {
      user,
    },
  }
})

const AccountIndex = ({ user }) => {
  const router = useRouter()

  const handleLogout = () => {
    api.logout()
    router.push('/mobile/connexion')
  }

  return (
    <div className="py-10 px-5">
      <header className="mb-10 flex flex-wrap items-center gap-6">
        <div className="h-20 w-20 rounded-full bg-[url(https://thispersondoesnotexist.com/image)] bg-cover"></div>
        <div>
          <h2 className="text-2xl text-black">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-base text-gray">Membre depuis 2022</p>
        </div>
      </header>
      <h3 className="text-lg font-bold text-black">Paramètres</h3>
      <div className="mt-2">
        <ArrowCta
          variant="md"
          onClick={() =>
            router.push('/mobile/compte/personnel/informations-personnelles')
          }
        >
          Informations personnelles
        </ArrowCta>
        <ArrowCta
          variant="md"
          onClick={() => {
            router.push('/mobile/compte/personnel/carte-membre')
          }}
        >
          Carte membre
        </ArrowCta>
        <ArrowCta variant="md" onClick={() => {}}>
          Conditions de service
        </ArrowCta>
        <ArrowCta withUnderline={false} variant="md" onClick={() => {}}>
          Politique de confidentialité
        </ArrowCta>
      </div>
      <Button variant="tertiary" className="mt-6" onClick={handleLogout}>
        Déconnexion
      </Button>
    </div>
  )
}

export default AccountIndex

AccountIndex.getLayout = (page: ReactElement) => (
  <MobileLayout>{page}</MobileLayout>
)
