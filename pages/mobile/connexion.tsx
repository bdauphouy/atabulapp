import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/shared/Button'
import Message from '@/components/shared/Message'
import Input from '@/components/shared/Input'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import Checkbox from '@/components/shared/Checkbox'
import { ReactElement } from 'react'
import LaunchLayout from '@/components/layouts/mobile/LaunchLayout'

interface ILoginForm {
  email: string
  password: string
  stayLoggedIn: boolean
}

const Login = () => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    defaultValues: {
      email: '',
      password: '',
      stayLoggedIn: false,
    },
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<ILoginForm> = data => {
    console.log(data)
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
              /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
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
          minLength: {
            value: 6,
            message: 'Votre mot de passe doit faire un minimum 6 charactères.',
          },
        }}
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
