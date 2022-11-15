import LoginSignupLayout from '@/components/layouts/mobile/LoginSignupLayout'
import ImportImageArea from '@/components/shared/ImportImageArea'
import Message from '@/components/shared/Message'
import { SignupCorporateFormContext } from '@/contexts/forms/SignupCorporateFormContext'
import api from '@/lib/api'
import toInternationalFormat from '@/lib/functions/toInternationalFormat'
import { ICorporateFiveForm } from '@/lib/interfaces'
import { useRouter } from 'next/router'
import { ReactElement, useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const CorporateFive = () => {
  const { setData, ...previousData } = useContext(SignupCorporateFormContext)

  const {
    handleSubmit,
    control,
    setError,
    watch,
    formState: { errors },
  } = useForm<ICorporateFiveForm>({
    defaultValues: {
      additionalPictures: previousData.additionalPictures,
      coverPicture: previousData.coverPicture,
    },
  })

  const router = useRouter()

  const additionalPictures = watch(['additionalPictures'])

  const onSubmit: SubmitHandler<ICorporateFiveForm> = async data => {
    setData({ ...previousData, ...data })

    const response = await api.signupCorporate({
      name: previousData.name,
      address: previousData.address,
      zipCode: previousData.zipCode,
      city: previousData.city,
      phone: toInternationalFormat(previousData.phoneNumber),
      email: previousData.email,
      password: previousData.password,
      coordinates: '90.0, -127.554334', // wip
      preferredContact: {
        fullName: previousData.privilegedFullName,
        phone: toInternationalFormat(previousData.privilegedPhoneNumber),
        email: previousData.privilegedEmail,
      },
      types: [1], // wip
      distinctions: [1], // wip
      headChefFullName: previousData.chefFullName,
      pastryChefFullName: previousData.pastryChefFullName,
      sommelierFullName: previousData.sommelierFullName,
      restaurantManagerFullName: previousData.roomManagerFullName,
    })

    if (response.error) {
      setError('coverPicture', {
        type: 'server',
        message: response.error,
      })
    } else {
      router.push('/mobile/inscription/entreprise/6')
    }
  }

  return (
    <form
      id="pictures-signup-form"
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
          <ImportImageArea
            title="Photo supplémentaire 5"
            name="additionalPictures.4"
            control={control}
            variant="dashed"
          />
          {[
            ...Array(
              Math.max(0, additionalPictures[0].filter(Boolean).length - 4),
            ),
          ].map((_, i) => (
            <ImportImageArea
              key={i}
              title={`Photo supplémentaire ${i + 5}`}
              name={`additionalPictures.${i + 5}`}
              control={control}
              variant="dashed"
            />
          ))}
        </div>
      </div>
      {Object.keys(errors).length > 0 && (
        <Message type="error">
          {errors.coverPicture?.type === 'server'
            ? errors.coverPicture?.message
            : 'Veuillez remplir tous les champs'}
        </Message>
      )}
    </form>
  )
}

CorporateFive.getLayout = (page: ReactElement) => (
  <LoginSignupLayout
    formId="pictures-signup-form"
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
