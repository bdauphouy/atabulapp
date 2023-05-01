import LaunchLayout from '@/components/layouts/mobile/LaunchLayout'
import Input from '@/components/shared/Input'
import Message from '@/components/shared/Message'
import { IForgotPasswordForm, ILoginForm } from '@/lib/interfaces'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const ForgotPassword = () => {
  const {
    control,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IForgotPasswordForm>({
    defaultValues: {
      email: '',
    },
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<IForgotPasswordForm> = async ({ email }) => {
    console.log(email)
  }

  return (
    <form
      id="forgot-password-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <h2 className="text-2xl font-extrabold text-black">
        Mot de passe oublié
      </h2>
      <p className="mb-6 text-base text-gray">
        Veuillez entrer votre email, vous reçeverez un lien pour modifier votre
        mot de passe.
      </p>
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
        name="email"
      />
      {Object.keys(errors).length > 0 && (
        <Message type="error">
          {errors.email?.type === 'pattern'
            ? errors.email.message
            : 'Veuillez renseigner votre email.'}
        </Message>
      )}
    </form>
  )
}

ForgotPassword.getLayout = (page: ReactElement) => (
  <LaunchLayout
    formId="forgot-password-form"
    footerLeftButton={{
      text: 'Retour',
      action: 'go-to-[/mobile/connexion]',
    }}
    footerRightButton={{
      text: 'Valider',
    }}
  >
    {page}
  </LaunchLayout>
)

export default ForgotPassword
