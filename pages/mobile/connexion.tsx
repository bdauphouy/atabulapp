import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/shared/Button'
import Message from '@/components/shared/Message'
import Input from '@/components/shared/Input'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import Checkbox from '@/components/shared/Checkbox'

interface ISignupForm {
  email: string
  password: string
  stayLoggedIn: boolean
}

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupForm>({
    defaultValues: {
      stayLoggedIn: false,
    },
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<ISignupForm> = data => {
    console.log(data)
  }

  return (
    <div>
      <header className="relative flex h-80 w-full items-start justify-end p-4">
        <Link href="/mobile">
          <Button variant="tertiary" textColor="white">
            Accéder sans connexion
          </Button>
        </Link>
        <Image
          objectFit="cover"
          src="/login-image.png"
          layout="fill"
          alt="Cuisinier en pleine action"
          className="-z-10"
        />
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="-mt-16 flex flex-col gap-6 rounded-t-xl bg-white p-5 pb-32"
      >
        <h2 className="text-2xl font-extrabold text-black">Connexion</h2>
        <Controller
          control={control}
          rules={{
            pattern: {
              value:
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
              message: 'Veuillez renseigner une adresse email valide.',
            },
          }}
          name="email"
          render={({ field: { onChange, name, value } }) => (
            <Input
              placeholder="Email"
              onChange={onChange}
              name={name}
              defaultValue={value}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, name, value } }) => (
            <div className="flex flex-col gap-3">
              <Input
                placeholder="Mot de passe"
                onChange={onChange}
                name={name}
                defaultValue={value}
                isPasswordInput
              />
              {Object.keys(errors).length > 0 && (
                <Message type="error">
                  {errors.email
                    ? errors.email.message
                    : 'Veuillez remplir tous les champs.'}
                </Message>
              )}
              <Link href="/mobile/mot-de-passe-oublie" className="self-end">
                <Button variant="tertiary">Mot de passe oublié ?</Button>
              </Link>
            </div>
          )}
        />
        <Controller
          control={control}
          name="stayLoggedIn"
          render={({ field: { onChange, name, value } }) => (
            <Checkbox
              name={name}
              checked={value}
              label="Rester connecté"
              onChange={onChange}
            />
          )}
        />

        <footer className="fixed bottom-0 left-0 flex w-full items-center justify-between border-t-[1px] border-solid border-alto bg-white p-6">
          <Link href="/mobile/inscription">
            <Button variant="tertiary">S'inscrire</Button>
          </Link>
          <Button submit variant="secondary">
            Se connecter
          </Button>
        </footer>
      </form>
    </div>
  )
}

export default Login
