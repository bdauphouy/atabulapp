import Input from '@/components/shared/Input'
import Message from '@/components/shared/Message'
import Modal from '@/components/shared/Modal'
import { SignupRestaurantFormContext } from '@/contexts/forms/SignupRestaurantFormContext'
import { IRestaurantTwoForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import Link from 'next/link'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const SignupRestaurantSecondModal = ({
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
  } = useForm<IRestaurantTwoForm>({
    defaultValues: {
      name: previousData.name,
      address: previousData.address,
      zipCode: previousData.zipCode,
      city: previousData.city,
      phoneNumber: previousData.phoneNumber,
    },
  })

  const onSubmit: SubmitHandler<IRestaurantTwoForm> = data => {
    setData({ ...previousData, ...data })

    changeModal('SignupRestaurantThirdModal')
  }

  return (
    <Modal
      title="Inscription établissement"
      formId="establishment-signup-form"
      footerLeftButton={{
        text: 'Retour',
        customAction: () => changeModal('SignupRestaurantFirstModal'),
      }}
      footerRightButton={{
        text: 'Continuer',
      }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        id="establishment-signup-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        {Object.keys(errors).length > 0 && (
          <Message type="error">
            {errors.phoneNumber?.type === 'pattern'
              ? errors.phoneNumber.message
              : errors.zipCode?.type === 'pattern'
              ? errors.zipCode.message
              : 'Veuillez remplir tous les champs.'}
          </Message>
        )}
        <Input
          placeholder="Nom du restaurant"
          control={control}
          setValue={setValue}
          rules={{
            required: true,
          }}
          name="name"
        />
        <Input
          placeholder="Nº de rue et nom de rue"
          control={control}
          setValue={setValue}
          rules={{
            required: true,
          }}
          name="address"
        />
        <Input
          placeholder="Code postal"
          control={control}
          setValue={setValue}
          rules={{
            required: true,
            pattern: {
              value: /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/,
              message: 'Veuillez renseigner un code postal valide.',
            },
          }}
          name="zipCode"
        />
        <Input
          placeholder="Ville ou localité"
          control={control}
          setValue={setValue}
          rules={{
            required: true,
          }}
          name="city"
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
          name="phoneNumber"
        />

        <p className="text-sm text-black">
          En selectionnant Accepter et continuer, j'accepte les{' '}
          <Link href="/conditions-generales" className="text-scarlet">
            Conditions générales
          </Link>{' '}
          et la{' '}
          <Link href="/politique-de-confidentialite" className="text-scarlet">
            Politique de confidentialité
          </Link>{' '}
          d'Atabul'app
        </p>
      </form>
    </Modal>
  )
}

export default SignupRestaurantSecondModal
