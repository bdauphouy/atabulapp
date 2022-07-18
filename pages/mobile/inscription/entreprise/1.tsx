import LoginSignupLayout from '@/components/layouts/mobile/LoginSignupLayout'
import Input from '@/components/shared/Input'
import Message from '@/components/shared/Message'
import { ICorporateOneForm } from '@/lib/interfaces'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const CorporateOne = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICorporateOneForm>()

  const router = useRouter()

  const onSubmit: SubmitHandler<ICorporateOneForm> = data => {
    console.log(data)
    router.push('/mobile/inscription/entreprise/2')
  }

  return (
    <form
      id="corporate-signup-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <h2 className="mb-2 text-2xl font-extrabold text-black">
        Inscription établissement
      </h2>
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
        placeholder="Mot de passe"
        control={control}
        setValue={setValue}
        rules={{
          required: true,
          minLength: {
            value: 6,
            message: 'Votre mot de passe doit contenir au moins 6 caractères.',
          },
        }}
        name="password"
      />
      {Object.keys(errors).length > 0 && (
        <Message type="error">
          {errors.email?.type === 'pattern'
            ? errors.email.message
            : errors.password?.type === 'minLength'
            ? errors.password.message
            : 'Veuillez remplir tous les champs.'}
        </Message>
      )}
    </form>
  )
}

CorporateOne.getLayout = (page: ReactElement) => (
  <LoginSignupLayout
    formId="corporate-signup-form"
    footerLeftButton={{
      text: 'Retour',
      action: 'go-back',
    }}
    footerRightButton={{
      text: 'Accepter et continuer',
    }}
  >
    {page}
  </LoginSignupLayout>
)

export default CorporateOne
