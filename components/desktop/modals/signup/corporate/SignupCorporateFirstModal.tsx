import Input from '@/components/shared/Input'
import Message from '@/components/shared/Message'
import Modal from '@/components/shared/Modal'
import { SignupCorporateFormContext } from '@/contexts/forms/SignupCorporateFormContext'
import { ICorporateOneForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const SignupCorporateFirstModal = ({
  isOpen,
  onClose,
  changeModal,
}: ModalProps) => {
  const data = useContext(SignupCorporateFormContext)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICorporateOneForm>({
    defaultValues: {
      email: data.email,
      password: data.password,
    },
  })

  const onSubmit: SubmitHandler<ICorporateOneForm> = ({ email, password }) => {
    data.email = email
    data.password = password
    changeModal('SignupCorporateSecondModal')
  }

  return (
    <Modal
      title="Inscription"
      formId="corporate-signup-form"
      footerLeftButton={{
        text: 'Retour',
        customAction: () => changeModal('SignupFirstModal'),
      }}
      footerRightButton={{
        text: 'Continuer',
      }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        id="corporate-signup-form"
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
              message:
                'Votre mot de passe doit contenir au moins 6 caractères.',
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
    </Modal>
  )
}

export default SignupCorporateFirstModal
