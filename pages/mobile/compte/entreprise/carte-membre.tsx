import AccountLayout from '@/components/layouts/mobile/AccountLayout'
import MobileLayout from '@/components/layouts/mobile/MobileLayout'
import Image from 'next/image'
import { ReactElement } from 'react'

export const getServerSideProps = async ({ req }) => {
  const { qrData } = req.cookies

  if (!qrData) {
    return {
      redirect: {
        destination: '/mobile/compte/entreprise/scanner-un-qrcode',
      },
    }
  }

  return {
    props: {
      qrData: JSON.parse(qrData),
    },
  }
}

const MemberCard = ({ qrData }) => {
  console.log()
  return (
    <>
      <header className="flex justify-between">
        <div>
          <h3 className="text-sm text-gray">Prénom</h3>
          <span>
            {qrData.user.firstName} {qrData.user.lastName}
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
            src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${qrData.qr}`}
          />
        </div>
      </div>
      <p className="text-sm text-black">
        Cette carte membre permet de certifier que votre statut de professionnel
        de la restauration est à jour.
      </p>
      <p
        className={`mt-10 text-sm ${
          qrData.user.isCertificateValid ? 'text-green-600' : 'text-scarlet'
        }`}
      >
        {`Ce certificat est ${
          qrData.user.isCertificateValid ? 'valide' : 'non valide'
        }.`}
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
