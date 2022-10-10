import Input from '@/components/shared/Input'
import Message from '@/components/shared/Message'
import Modal from '@/components/shared/Modal'
import { SignupCorporateFormContext } from '@/contexts/forms/SignupCorporateFormContext'
import { ICorporateThreeForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const SignupCorporateThirdModal = ({
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
  } = useForm<ICorporateThreeForm>({
    defaultValues: {
      privilegedFullName: data.privilegedFullName,
      privilegedPosition: data.privilegedPosition,
      privilegedEmail: data.privilegedEmail,
      privilegedPhoneNumber: data.privilegedPhoneNumber,
    },
  })

  const onSubmit: SubmitHandler<ICorporateThreeForm> = ({
    privilegedFullName,
    privilegedPosition,
    privilegedEmail,
    privilegedPhoneNumber,
  }) => {
    data.privilegedFullName = privilegedFullName
    data.privilegedPosition = privilegedPosition
    data.privilegedEmail = privilegedEmail
    data.privilegedPhoneNumber = privilegedPhoneNumber

    changeModal('SignupCorporateFourthModal')
  }

  return (
    <Modal
      title="Contact privilégié"
      formId="privileged-contact-signup-form"
      footerLeftButton={{
        text: 'Retour',
        customAction: () => changeModal('SignupCorporateSecondModal'),
      }}
      footerRightButton={{
        text: 'Continuer',
      }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        id="privileged-contact-signup-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <p className="mb-2 text-sm text-gray">
          La personne enregistrée sera la personne à contacter en cas de besoin
          et la référente du dossier de l'établissement
        </p>
        <Input
          placeholder="Nom et prénom"
          control={control}
          setValue={setValue}
          rules={{
            required: true,
          }}
          name="privilegedFullName"
        />
        <Input
          placeholder="Fonction"
          control={control}
          setValue={setValue}
          rules={{
            required: true,
          }}
          name="privilegedPosition"
        />
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
          name="privilegedEmail"
        />
        <Input
          placeholder="Numéro de téléphone"
          control={control}
          setValue={setValue}
          rules={{
            required: true,
            pattern: {
              value: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
              message: 'Veuillez renseigner un numéro de téléphone valide.',
            },
          }}
          name="privilegedPhoneNumber"
        />
        {Object.keys(errors).length > 0 && (
          <Message type="error">
            {errors.privilegedPhoneNumber?.type === 'pattern'
              ? errors.privilegedPhoneNumber.message
              : errors.privilegedEmail?.type === 'pattern'
              ? errors.privilegedEmail.message
              : 'Veuillez remplir tous les champs.'}
          </Message>
        )}
      </form>
    </Modal>
  )
}

export default SignupCorporateThirdModal
