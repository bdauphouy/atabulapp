import Input from '@/components/shared/Input'
import Message from '@/components/shared/Message'
import Modal from '@/components/shared/Modal'
import { SignupRestaurantFormContext } from '@/contexts/forms/SignupRestaurantFormContext'
import { IRestaurantThreeForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const SignupRestaurantThirdModal = ({
  isOpen,
  onClose,
  changeModal,
}: ModalProps) => {
  const { setData, ...previousData } = useContext(SignupRestaurantFormContext)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IRestaurantThreeForm>({
    defaultValues: {
      privilegedFullName: previousData.privilegedFullName,
      privilegedPosition: previousData.privilegedPosition,
      privilegedEmail: previousData.privilegedEmail,
      privilegedPhoneNumber: previousData.privilegedPhoneNumber,
    },
  })

  const onSubmit: SubmitHandler<IRestaurantThreeForm> = data => {
    setData({ ...previousData, ...data })

    changeModal('SignupRestaurantFourthModal')
  }

  return (
    <Modal
      title="Contact privilégié"
      formId="privileged-contact-signup-form"
      footerLeftButton={{
        text: 'Retour',
        customAction: () => changeModal('SignupRestaurantSecondModal'),
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
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
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

export default SignupRestaurantThirdModal
