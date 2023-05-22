import LaunchLayout from '@/components/layouts/mobile/LaunchLayout'
import Input from '@/components/shared/Input'
import Message from '@/components/shared/Message'
import { IChangePasswordForm } from '@/lib/interfaces'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const ChangePassword = () => {
  const {
    control,
    setValue,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<IChangePasswordForm>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<IChangePasswordForm> = async ({
    password,
    confirmPassword,
  }) => {
    console.log(password, confirmPassword)
  }

  return (
    <form
      id="change-password-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      {Object.keys(errors).length > 0 && (
        <Message type="error">
          {errors.password?.type === 'pattern'
            ? errors.password.message
            : errors.confirmPassword?.type === 'validate'
            ? 'Les mots de passe ne correspondent pas.'
            : 'Veuillez renseigner tous les champs.'}
        </Message>
      )}
      <h2 className="text-2xl font-extrabold text-black">
        Changer mon mot de passe
      </h2>
      <p className="mb-6 text-base text-gray">
        Veuillez entrer votre nouveau mot de passe.
      </p>
      <Input
        control={control}
        setValue={setValue}
        placeholder="Mot de passe"
        name="password"
        rules={{
          required: true,
        }}
        isPasswordInput
      />
      <Input
        control={control}
        setValue={setValue}
        placeholder="Confirmer le mot de passe"
        name="confirmPassword"
        rules={{
          required: true,
          validate: value => value === watch('password'),
        }}
        isPasswordInput
      />
    </form>
  )
}

ChangePassword.getLayout = (page: ReactElement) => (
  <LaunchLayout
    formId="change-password-form"
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

export default ChangePassword
