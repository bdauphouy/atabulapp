import LoginSignupLayout from '@/components/layouts/mobile/LoginSignupLayout'
import Input from '@/components/shared/Input'
import Message from '@/components/shared/Message'
import { SignupRestaurantFormContext } from '@/contexts/forms/SignupRestaurantFormContext'
import { IRestaurantOneForm } from '@/lib/interfaces'
import { useRouter } from 'next/router'
import { ReactElement, useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const RestaurantOne = () => {
  const { setData, ...previousData } = useContext(SignupRestaurantFormContext)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IRestaurantOneForm>({
    defaultValues: {
      email: previousData.email,
      password: previousData.password,
    },
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<IRestaurantOneForm> = data => {
    setData({ ...previousData, ...data })

    router.push('/mobile/inscription/restaurant/2')
  }

  return (
    <form
      id="restaurant-signup-form"
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
              /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
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
        isPasswordInput
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

RestaurantOne.getLayout = (page: ReactElement) => (
  <LoginSignupLayout
    formId="restaurant-signup-form"
    footerLeftButton={{
      text: 'Retour',
      action: 'go-back',
    }}
    footerRightButton={{
      text: 'Accepter et continuer',
    }}
    progress={100 / 6}
  >
    {page}
  </LoginSignupLayout>
)

export default RestaurantOne
