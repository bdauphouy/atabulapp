import LoginSignupLayout from '@/components/layouts/mobile/LoginSignupLayout'
import Button from '@/components/shared/Button'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

const PersonalFour = () => {
  const router = useRouter()

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
      <Button
        variant="primary"
        className="mt-20"
        onClick={() => router.push('/mobile/explorer')}
      >
        Accéder à l'application
      </Button>
    </div>
  )
}

PersonalFour.getLayout = (page: ReactElement) => (
  <LoginSignupLayout hasFooter={false}>{page}</LoginSignupLayout>
)

export default PersonalFour
