import Button from '@/components/shared/Button'
import LoginSignupLayout from '@/components/layouts/LoginSignupLayout'
import { ReactElement } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const PersonalFour = () => {
  return (
    <div className="relative mt-24 flex flex-col items-center p-6">
      <h2 className="relative mb-2 text-center text-2xl font-extrabold text-black">
        <div className="absolute inline -translate-y-3 -translate-x-5">
          <Image
            src="/images/success-icon.svg"
            width={25}
            height={25}
            alt="Icône de succès"
            className="inline-block"
          />
        </div>
        Inscription en cours de validation
      </h2>

      <p className="mt-1 text-center text-base text-black">
        Vous recevrez un mail pour finaliser l'inscription
      </p>
      <Link href="/">
        <Button variant="primary" className="mt-20">
          Accéder à l'application
        </Button>
      </Link>
    </div>
  )
}

PersonalFour.getLayout = (page: ReactElement) => (
  <LoginSignupLayout footer={false}>{page}</LoginSignupLayout>
)

export default PersonalFour
