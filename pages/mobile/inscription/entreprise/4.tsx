import { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import LoginSignupLayout from '@/components/layouts/mobile/LoginSignupLayout'
import { useRouter } from 'next/router'

interface ICorporateFourForm {}

const CorporateFour = () => {
  const { handleSubmit } = useForm<ICorporateFourForm>()

  const router = useRouter()

  const onSubmit: SubmitHandler<ICorporateFourForm> = data => {
    console.log(data)

    // router.push('/mobile/inscription/entreprise/5')
  }

  return (
    <form
      id="additional-information-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <header className="flex flex-col gap-1">
        <div className="mb-2 flex flex-col gap-1">
          <h2 className="text-2xl font-extrabold text-black">Photos</h2>
          <p className="text-sm text-gray">
            Les photos sont obligatoires pour inscrire votre établissement. Vous
            pourrez en ajouter plus tard sur la gestion de votre profil.
          </p>
        </div>
      </header>
    </form>
  )
}

CorporateFour.getLayout = (page: ReactElement) => (
  <LoginSignupLayout
    formId="additional-information-form"
    footerLeftButton={{
      text: 'Retour',
      action: 'go-back',
    }}
    footerRightButton={{
      text: "Finaliser l'inscription",
    }}
  >
    {page}
  </LoginSignupLayout>
)

export default CorporateFour
