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
  const { setData, ...previousData } = useContext(SignupCorporateFormContext)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICorporateOneForm>({
    defaultValues: {
      email: previousData.email,
      password: previousData.password,
    },
  })

  const onSubmit: SubmitHandler<ICorporateOneForm> = data => {
    setData({ ...previousData, ...data })

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
