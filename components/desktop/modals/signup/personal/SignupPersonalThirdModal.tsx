import Input from '@/components/shared/Input'
import Message from '@/components/shared/Message'
import Modal from '@/components/shared/Modal'
import Radio from '@/components/shared/Radio'
import { SignupPersonalFormContext } from '@/contexts/forms/SignupPersonalFormContext'
import { IPersonalTwoForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import Link from 'next/link'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const SignupPersonalThirdModal = ({
  isOpen,
  onClose,
  changeModal,
}: ModalProps) => {
  const { setData, ...previousData } = useContext(SignupPersonalFormContext)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IPersonalTwoForm>({
    defaultValues: {
      email: previousData.email,
      password: previousData.password,
      firstName: previousData.firstName,
      lastName: previousData.lastName,
      workStatus: previousData.workStatus,
      birthDate: previousData.birthDate,
      city: previousData.city,
      phoneNumber: previousData.phoneNumber,
    },
  })

  const onSubmit: SubmitHandler<IPersonalTwoForm> = data => {
    setData({ ...previousData, ...data })

    changeModal('SignupPersonalFourthModal')
  }

  return (
    <Modal
      title="Inscription"
      formId="signup-form"
      footerLeftButton={{
        text: 'Retour',
        customAction: () => changeModal('SignupPersonalSecondModal'),
      }}
      footerRightButton={{
        text: 'Continuer',
      }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        id="signup-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        {Object.keys(errors).length > 0 && (
          <Message type="error">
            {errors.birthDate?.type === 'pattern'
              ? errors.birthDate.message
              : ['pattern', 'server'].includes(errors.email?.type)
              ? errors.email.message
              : errors.password?.type === 'minLength'
              ? errors.password.message
              : 'Veuillez remplir tous les champs.'}
          </Message>
        )}
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
          placeholder="Nom"
          control={control}
          setValue={setValue}
          rules={{
            required: true,
          }}
          name="lastName"
        />
        <Input
          placeholder="Prénom"
          control={control}
          setValue={setValue}
          rules={{
            required: true,
          }}
          name="firstName"
        />
        <Input
          placeholder="Date de naissance (jj/mm/aaaa)"
          control={control}
          setValue={setValue}
          rules={{
            required: true,
            pattern: {
              value:
                /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/,
              message: 'Veuillez renseigner une date de naissance valide.',
            },
          }}
          name="birthDate"
          isDateInput
        />
        <Input
          placeholder="Commune de résidence"
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
        <h3 className="-mb-2 text-lg font-bold text-black">
          Situation professionnelle
        </h3>
        <Radio
          control={control}
          rules={{
            required: true,
          }}
          value="student"
          name="workStatus"
          label="Etudiant.e en restauration et hôtellerie"
        />
        <Radio
          control={control}
          value="employee"
          name="workStatus"
          label="Employé.e en restauration et hôtellerie"
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

export default SignupPersonalThirdModal
