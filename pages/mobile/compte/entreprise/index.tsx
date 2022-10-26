import MobileLayout from '@/components/layouts/mobile/MobileLayout'
import ArrowCta from '@/components/shared/ArrowCta'
import Button from '@/components/shared/Button'
import api from '@/lib/api'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

export const getServerSideProps = async ({ req }) => {
  const { token } = req.cookies

  if (!token) {
    return {
      notFound: true,
    }
  }

  const user = await api.me(token)

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user,
    },
  }
}

const AccountIndex = ({ user }) => {
  const router = useRouter()

  return (
    <div className="">
      <header className="mb-10">
        <div className="relative h-36">
          <Image
            layout="fill"
            src="/images/restaurant-card-thumbnail.png"
            alt="Bannière du restaurant"
          />
        </div>
        <div className="px-5 pt-6">
          <h2 className="text-2xl text-black">
            {user.firstName} {user.lastName}
          </h2>
          <p className="mt-2 text-base text-black">
            Restaurant certifié Atabulapp
          </p>
        </div>
      </header>
      <div className="px-5">
        <h3 className="text-lg font-bold text-black">Profil</h3>
        <div className="mt-2">
          <ArrowCta
            variant="md"
            onClick={() =>
              router.push('/mobile/compte/entreprise/informations-restaurant')
            }
          >
            Informations restaurant
          </ArrowCta>
          <ArrowCta
            withUnderline={false}
            variant="md"
            onClick={() => {
              router.push('/mobile/compte/entreprise/photos')
            }}
          >
            Photos
          </ArrowCta>
        </div>
        <h3 className="mt-6 text-lg font-bold text-black">Les offres</h3>
        <div className="mt-2">
          <ArrowCta
            variant="md"
            onClick={() =>
              router.push('/mobile/compte/entreprise/offres-regulieres')
            }
          >
            Offres régulières
          </ArrowCta>
          <ArrowCta
            variant="md"
            onClick={() => {
              router.push('/mobile/compte/entreprise/offres-last-minute')
            }}
          >
            Offres last minute
          </ArrowCta>
          <ArrowCta
            withUnderline={false}
            variant="md"
            onClick={() => {
              router.push('/mobile/compte/entreprise/scanner-un-qrcode')
            }}
          >
            Scanner un QR Code
          </ArrowCta>
        </div>
        <Button variant="tertiary" className="mt-6">
          Déconnexion
        </Button>
      </div>
    </div>
  )
}

export default AccountIndex

AccountIndex.getLayout = (page: ReactElement) => (
  <MobileLayout>{page}</MobileLayout>
)
