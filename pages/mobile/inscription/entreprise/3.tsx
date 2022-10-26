import LoginSignupLayout from '@/components/layouts/mobile/LoginSignupLayout'
import Input from '@/components/shared/Input'
import Message from '@/components/shared/Message'
import { SignupCorporateFormContext } from '@/contexts/forms/SignupCorporateFormContext'
import { ICorporateThreeForm } from '@/lib/interfaces'
import { useRouter } from 'next/router'
import { ReactElement, useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const CorporateThree = () => {
  const { setData, ...previousData } = useContext(SignupCorporateFormContext)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICorporateThreeForm>({
    defaultValues: {
      privilegedFullName: previousData.privilegedFullName,
      privilegedPosition: previousData.privilegedPosition,
      privilegedEmail: previousData.privilegedEmail,
      privilegedPhoneNumber: previousData.privilegedPhoneNumber,
    },
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<ICorporateThreeForm> = data => {
    setData({ ...previousData, ...data })

    router.push('/mobile/inscription/entreprise/4')
  }

  return (
    <form
      id="privileged-contact-signup-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <header className="flex flex-col gap-1">
        <h2 className="text-2xl font-extrabold text-black">
          Contact privilégié
        </h2>
        <p className="mb-2 text-sm text-gray">
          La personne enregistrée sera la personne à contacter en cas de besoin
          et la référente du dossier de l'établissement
        </p>
      </header>
      <Input
        placeholder="Nom et prénom"
        control={control}
        setValue={setValue}
        rules={{
          required: true,
        }}
        name="privilegedFullName"
      />
      <Input
        placeholder="Fonction"
        control={control}
        setValue={setValue}
        rules={{
          required: true,
        }}
        name="privilegedPosition"
      />
      <Input
        placeholder="Email"
        control={control}
        setValue={setValue}
        rules={{
          required: true,
          pattern: {
            value:
              /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            message: 'Veuillez renseigner une adresse email valide.',
          },
        }}
        name="privilegedEmail"
      />
      <Input
        placeholder="Numéro de téléphone"
        control={control}
        setValue={setValue}
        rules={{
          required: true,
          pattern: {
            value: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
            message: 'Veuillez renseigner un numéro de téléphone valide.',
          },
        }}
        name="privilegedPhoneNumber"
      />
      {Object.keys(errors).length > 0 && (
        <Message type="error">
          {errors.privilegedPhoneNumber?.type === 'pattern'
            ? errors.privilegedPhoneNumber.message
            : errors.privilegedEmail?.type === 'pattern'
            ? errors.privilegedEmail.message
            : 'Veuillez remplir tous les champs.'}
        </Message>
      )}
    </form>
  )
}

CorporateThree.getLayout = (page: ReactElement) => (
  <LoginSignupLayout
    formId="privileged-contact-signup-form"
    footerLeftButton={{
      text: 'Retour',
      action: 'go-back',
    }}
    footerRightButton={{
      text: 'Continuer',
    }}
  >
    {page}
  </LoginSignupLayout>
)

export default CorporateThree
