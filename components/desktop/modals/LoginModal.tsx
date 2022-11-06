import Button from '@/components/shared/Button'
import Checkbox from '@/components/shared/Checkbox'
import Input from '@/components/shared/Input'
import Message from '@/components/shared/Message'
import Modal from '@/components/shared/Modal'
import api from '@/lib/api'
import { ILoginForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import Cookie from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const LoginModal = ({ isOpen, onClose, changeModal }: ModalProps) => {
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

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const onSubmit: SubmitHandler<ILoginForm> = async ({
    email,
    password,
    stayLoggedIn,
  }) => {
    setIsLoading(true)

    const response = await api.loginRestaurant({ email, password })

    setIsLoading(false)

    if (response.error) {
      setError('password', {
        type: 'server',
        message: response.error,
      })
    } else {
      Cookie.set('token', response.token)

      router.push('/accueil')
    }
  }

  return (
    <Modal
      title="Connexion"
      formId="login-form"
      footerLeftButton={{
        text: "S'inscrire",
        customAction: () => changeModal('SignupFirstModal'),
      }}
      footerRightButton={{ text: 'Se connecter', isLoading }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        id="login-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
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
        <Checkbox
          control={control}
          name="stayLoggedIn"
          label="Rester connecté"
        />
      </form>
    </Modal>
  )
}

export default LoginModal
