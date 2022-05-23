import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/shared/Button'

const Index = () => {
  return (
    <div>
      <header className="relative flex h-80 w-full items-start justify-end p-4">
        <Link href="/mobile">
          <Button variant="tertiary" textColor="white">
            Accéder sans connexion
          </Button>
        </Link>
        <Image
          objectFit="cover"
          src="/login-image.png"
          layout="fill"
          alt="Cuisinier en pleine action"
          className="-z-10"
        />
      </header>
      <div className="-mt-14 flex flex-col items-center px-6 pb-20">
        <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-scarlet">
          <Image width={60} height={80} src="/logo.svg" />
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
    </div>
  )
}

export default Index
