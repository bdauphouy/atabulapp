import LaunchLayout from '@/components/layouts/mobile/LaunchLayout'
import Button from '@/components/shared/Button'
import Checkbox from '@/components/shared/Checkbox'
import Input from '@/components/shared/Input'
import Message from '@/components/shared/Message'
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
      email: '',
      password: '',
      stayLoggedIn: false,
    },
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<ILoginForm> = async ({ email, password }) => {
    const res = await api.loginUser({
      email,
      password,
    })

    if (res.error) {
      setError('password', {
        type: 'server',
        message: res.error,
      })
    } else {
      Cookie.set('token', res.token)
      Cookie.set('token_expires', new Date().setDate(new Date().getDate() + 1))

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
            : 'Veuillez remplir tous les champs.'}
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
