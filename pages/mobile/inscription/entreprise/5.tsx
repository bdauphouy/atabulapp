import LoginSignupLayout from '@/components/layouts/mobile/LoginSignupLayout'
import ImportImageArea from '@/components/shared/ImportImageArea'
import { ICorporateFiveForm } from '@/lib/interfaces'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const CorporateFive = () => {
  const { handleSubmit, control } = useForm<ICorporateFiveForm>()

  const router = useRouter()

  const onSubmit: SubmitHandler<ICorporateFiveForm> = data => {
    console.log(data)

    router.push('/mobile/inscription/entreprise/6')
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
      <div>
        <h3 className="mb-3 text-sm text-black">Photo de couverture</h3>
        <ImportImageArea
          title="Photo de couverture"
          name="coverPicture"
          control={control}
          variant="full"
        />
      </div>
      <div>
        <h3 className="text-sm text-black">Photos supplémentaires</h3>
        <p className="mt-2 mb-3 text-sm text-gray">
          Il vous faut importer au minimum 4 photos supplémentaires pour valider
          votre profil.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <ImportImageArea
            title="Photo supplémentaire 1"
            name="additionalPictures.0"
            control={control}
            variant="normal"
          />
          <ImportImageArea
            title="Photo supplémentaire 2"
            name="additionalPictures.1"
            control={control}
            variant="normal"
          />
          <ImportImageArea
            title="Photo supplémentaire 2"
            name="additionalPictures.2"
            control={control}
            variant="normal"
          />
          <ImportImageArea
            title="Photo supplémentaire 3"
            name="additionalPictures.3"
            control={control}
            variant="normal"
          />
        </div>
      </div>
    </form>
  )
}

CorporateFive.getLayout = (page: ReactElement) => (
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

export default CorporateFive
