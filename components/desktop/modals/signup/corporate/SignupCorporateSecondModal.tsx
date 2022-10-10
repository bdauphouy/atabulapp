import Input from '@/components/shared/Input'
import Message from '@/components/shared/Message'
import Modal from '@/components/shared/Modal'
import { SignupCorporateFormContext } from '@/contexts/forms/SignupCorporateFormContext'
import { ICorporateTwoForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import Link from 'next/link'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const SignupCorporateSecondModal = ({
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
  } = useForm<ICorporateTwoForm>({
    defaultValues: {
      name: data.name,
      address: data.address,
      zipCode: data.zipCode,
      city: data.city,
      phoneNumber: data.phoneNumber,
    },
  })

  const onSubmit: SubmitHandler<ICorporateTwoForm> = ({
    name,
    address,
    zipCode,
    city,
    phoneNumber,
  }) => {
    data.name = name
    data.address = address
    data.zipCode = zipCode
    data.city = city
    data.phoneNumber = phoneNumber

    changeModal('SignupCorporateThirdModal')
  }
  return (
    <Modal
      title="Inscription établissement"
      formId="establishment-signup-form"
      footerLeftButton={{
        text: 'Retour',
        customAction: () => changeModal('SignupCorporateFirstModal'),
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
        {Object.keys(errors).length > 0 && (
          <Message type="error">
            {errors.phoneNumber?.type === 'pattern'
              ? errors.phoneNumber.message
              : errors.zipCode?.type === 'pattern'
              ? errors.zipCode.message
              : 'Veuillez remplir tous les champs.'}
          </Message>
        )}
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

export default SignupCorporateSecondModal
