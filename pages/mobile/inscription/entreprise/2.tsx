import LoginSignupLayout from '@/components/layouts/mobile/LoginSignupLayout'
import Input from '@/components/shared/Input'
import Message from '@/components/shared/Message'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface ICorporateTwoForm {
  fullName: string
  position: string
  email: string
  phoneNumber: string
}

const CorporateTwo = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICorporateTwoForm>()

  const router = useRouter()

  const onSubmit: SubmitHandler<ICorporateTwoForm> = data => {
    console.log(data)
    router.push('/mobile/inscription/entreprise/3')
  }

  return (
    <form
      id="privileged-contact-form"
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
        name="fullName"
      />
      <Input
        placeholder="Fonction"
        control={control}
        setValue={setValue}
        rules={{
          required: true,
        }}
        name="position"
      />
      <Input
        placeholder="Email"
        control={control}
        setValue={setValue}
        rules={{
          required: true,
          pattern: {
            value:
              /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            message: 'Veuillez renseigner une adresse email valide.',
          },
        }}
        name="email"
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
        name="phoneNumber"
      />
      {Object.keys(errors).length > 0 && (
        <Message type="error">
          {errors.phoneNumber?.type === 'pattern'
            ? errors.phoneNumber.message
            : errors.email?.type === 'pattern'
            ? errors.email.message
            : 'Veuillez remplir tous les champs.'}
        </Message>
      )}
    </form>
  )
}

CorporateTwo.getLayout = (page: ReactElement) => (
  <LoginSignupLayout
    formId="privileged-contact-form"
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

export default CorporateTwo
