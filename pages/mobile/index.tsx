import LaunchLayout from '@/components/layouts/mobile/LaunchLayout'
import Button from '@/components/shared/Button'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'

const Index = () => {
  return (
    <div className="-mt-20 flex flex-col items-center">
      <div className="mt-1 flex h-28 w-28 items-center justify-center rounded-2xl bg-scarlet">
        <Image
          width={60}
          height={80}
          src="/images/logo.svg"
          alt="Logo d'Atabulapp"
        />
      </div>
      <h1 className="mt-6 text-2xl font-extrabold text-black">Atabulapp</h1>
      <p className="mb-10 mt-4 text-center text-base text-gray">
        Offres et avantages pour les professionnels de la restauration et de
        l'hôtellerie
      </p>
      <Link href="/mobile/connexion">
        <Button variant="primary">Se connecter</Button>
      </Link>
      <Link href="/mobile/inscription">
        <Button variant="tertiary" className="mt-6">
          S'inscrire
        </Button>
      </Link>
    </div>
  )
}

Index.getLayout = (page: ReactElement) => (
  <LaunchLayout isLaunchScreen imageFilter={false} hasFooter={false}>
    {page}
  </LaunchLayout>
)

export default Index
