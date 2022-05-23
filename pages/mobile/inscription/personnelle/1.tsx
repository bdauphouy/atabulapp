import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/shared/Button'
import { useRouter } from 'next/router'

const PersonalOne = () => {
  const router = useRouter()

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
      <div className="-mt-20 flex flex-col gap-6 rounded-t-xl bg-white p-5 pb-32">
        <header className="flex flex-col gap-4 border-b-[1px] border-solid border-alto pb-6">
          <h2 className="text-2xl font-extrabold text-black">Inscription</h2>
          <p className="text-base text-black">
            Le coût annuel de l'inscription pour profiter des offres et
            avantages d'Atabulapp est de 30€ TTC
          </p>
        </header>
        <ul className="flex flex-col gap-4 text-base text-gray">
          <li className="flex justify-between">
            <span>Durée de l'inscription</span>
            <span>1 an</span>
          </li>
          <li className="flex justify-between">
            <span>Prix de l'abonnement</span>
            <span>30€</span>
          </li>
          <li className="flex justify-between">
            <span className="text-lg font-medium text-black">Total</span>
            <span className="text-lg font-medium text-scarlet">30€ TTC</span>
          </li>
        </ul>
        <p className="text-base text-gray">
          Le règlement se fera une fois l’inscription validée par l’équipe
          Atabulapp
        </p>
        <footer className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between border-t-[1px] border-solid border-alto bg-white p-6">
          <Button variant="tertiary" onClick={() => router.back()}>
            Retour
          </Button>
          <Link href="/mobile/inscription/personnelle/2">
            <Button variant="secondary">Continuer</Button>
          </Link>
        </footer>
      </div>
    </div>
  )
}

export default PersonalOne
