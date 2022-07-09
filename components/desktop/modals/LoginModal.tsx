import Button from '@/components/shared/Button'
import Checkbox from '@/components/shared/Checkbox'
import Input from '@/components/shared/Input'
import Message from '@/components/shared/Message'
import Modal from '@/components/shared/Modal'
import { ILoginForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'

const LoginModal = ({ isOpen, onClose, changeModal }: ModalProps) => {
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
    <Modal
      title="Connexion"
      formId="login-form"
      footerLeftButton={{
        text: "S'inscrire",
        customAction: () => changeModal('SignupFirstModal'),
      }}
      footerRightButton={{ text: 'Se connecter' }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        id="login-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-96 flex-col gap-6"
      >
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
              message:
                'Votre mot de passe doit faire un minimum 6 charactères.',
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
