import AccountLayout from '@/components/layouts/mobile/AccountLayout'
import MobileLayout from '@/components/layouts/mobile/MobileLayout'
import api from '@/lib/api'
import Image from 'next/image'
import { ReactElement } from 'react'

export const getServerSideProps = async ({ req }) => {
  const { token } = req.cookies

  if (!token) {
    return {
      notFound: true,
    }
  }

  const { error, user } = await api.me(token)

  if (error) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        ...user,
        token,
      },
    },
  }
}

const MemberCard = ({ user }) => {
  return (
    <>
      <header className="flex justify-between">
        <div>
          <h3 className="text-sm text-gray">Prénom</h3>
          <span>
            {user.firstName} {user.lastName}
          </span>
        </div>
        <div className="flex flex-col items-end text-right">
          <h3 className="text-sm text-gray">Date de validité</h3>
          <span>16/12/2022</span>
        </div>
      </header>
      <div className="px-10">
        <div className="relative my-12 mx-auto aspect-square w-full max-w-lg">
          <Image
            alt="Carte membre"
            className="aspect-square"
            layout="fill"
            src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${user.token}`}
          />
        </div>
      </div>
      <p className="text-sm text-black">
        Cette carte membre permet de certifier que votre statut de professionnel
        de la restauration est à jour.
      </p>
    </>
  )
}

export default MemberCard

MemberCard.getLayout = (page: ReactElement) => {
  return (
    <MobileLayout>
      <AccountLayout title="Carte membre">{page}</AccountLayout>
    </MobileLayout>
  )
}
