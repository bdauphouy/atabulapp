import LaunchLayout from '@/components/layouts/mobile/LaunchLayout'
import Button from '@/components/shared/Button'
import Checkbox from '@/components/shared/Checkbox'
import Input from '@/components/shared/Input'
import Message from '@/components/shared/Message'
import Radio from '@/components/shared/Radio'
import api from '@/lib/api'
import { ILoginForm } from '@/lib/interfaces'
import Cookie from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const Login = () => {
  const {
    control,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILoginForm>({
    defaultValues: {
      accountType: null,
      email: '',
      password: '',
      stayLoggedIn: false,
    },
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<ILoginForm> = async ({
    accountType,
    email,
    password,
  }) => {
    const response = await api[
      accountType === 'personal' ? 'loginUser' : 'loginRestaurant'
    ]({
      email,
      password,
    })

    Cookie.set('accountType', accountType)

    if (response.error) {
      setError('password', {
        type: 'server',
        message: response.error,
      })
    } else {
      Cookie.set('token', response.token)

      router.push('/mobile/explorer')
    }
  }

  return (
    <form
      id="login-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <h2 className="text-2xl font-extrabold text-black">Connexion</h2>
      <h3 className="text-base text-gray">Choisissez votre type de compte.</h3>
      <Radio
        control={control}
        name="accountType"
        label="Personnel"
        value="personal"
        rules={{
          required: 'Veuillez sélectionner un type de compte.',
        }}
      />
      <Radio
        control={control}
        name="accountType"
        label="Restaurant"
        value="restaurant"
        className="mb-6"
        rules={{
          required: 'Veuillez sélectionner un type de compte.',
        }}
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
        name="email"
      />
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
      {Object.keys(errors).length > 0 && (
        <Message type="error">
          {errors.email?.type === 'pattern'
            ? errors.email.message
            : errors.password?.type === 'server'
            ? errors.password.message
            : errors.accountType?.message ||
              'Veuillez remplir tous les champs.'}
        </Message>
      )}
      <Link href="/mobile/mot-de-passe-oublie" className="self-end">
        <Button variant="tertiary">Mot de passe oublié ?</Button>
      </Link>
      <Checkbox control={control} name="stayLoggedIn" label="Rester connecté" />
    </form>
  )
}

Login.getLayout = (page: ReactElement) => (
  <LaunchLayout
    formId="login-form"
    footerLeftButton={{
      text: "S'inscrire",
      action: 'go-to-[/mobile/inscription]',
    }}
    footerRightButton={{
      text: 'Se connecter',
    }}
  >
    {page}
  </LaunchLayout>
)

export default Login
