import AccountLayout from '@/components/layouts/mobile/AccountLayout'
import MobileLayout from '@/components/layouts/mobile/MobileLayout'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import Message from '@/components/shared/Message'
import api from '@/lib/api'
import { IPersonalSettingsForm } from '@/lib/interfaces'
import { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export const getServerSideProps = async ({ req }) => {
  const { token } = req.cookies

  if (!token) {
    return {
      notFound: true,
    }
  }

  const { error, user } = await api.me(token)

  if (error) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user,
    },
  }
}

const PersonalInformation = ({ user }) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IPersonalSettingsForm>({
    defaultValues: {
      lastName: user?.lastName || '...',
      firstName: user?.firstName || '...',
      location: user?.city || '...',
      email: user?.email || '...',
      phoneNumber: user?.phoneNumber || '...',
      proofOfIdentity: user?.proofOfIdentity || '...',
      workCertificate: user?.workCertificate || '...',
    },
  })

  const onSubmit: SubmitHandler<IPersonalSettingsForm> = data => {
    console.log(data)
    toast.success('Les modifications ont bien été prises en compte.')
  }

  return (
    <form
      id="personal-settings-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <div className="mb-8 flex items-end justify-between">
        <div className="h-28 w-28 rounded-full bg-[url(https://thispersondoesnotexist.com/image)] bg-cover"></div>
        <Button variant="tertiary" isSubmit>
          Enregistrer les modifications
        </Button>
      </div>
      <Input
        placeholder="Nom"
        control={control}
        setValue={setValue}
        rules={{
          required: true,
        }}
        name="lastName"
        isDisabled
      />
      <Input
        placeholder="Prénom"
        control={control}
        setValue={setValue}
        rules={{
          required: true,
        }}
        name="firstName"
        isDisabled
      />
      <Input
        placeholder="Localisation"
        control={control}
        setValue={setValue}
        rules={{
          required: true,
        }}
        name="location"
        isDisabled
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
        name="email"
        canBeModified
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
        canBeModified
      />
      <div>
        <header>
          <h3 className="text-lg font-bold text-black">Identité vérifiée</h3>
          <h4 className="text-sm uppercase text-gray">
            Valable jusqu'au 21/02/2022
          </h4>
        </header>
      </div>
      <Input
        placeholder="Pièce d'identité"
        control={control}
        setValue={setValue}
        rules={{
          required: true,
        }}
        name="proofOfIdentity"
        canBeModified
      />
      <Input
        placeholder="Justificatif de travail"
        control={control}
        setValue={setValue}
        rules={{
          required: true,
        }}
        name="workCertificate"
        canBeModified
      />
      {Object.keys(errors).length > 0 && (
        <Message type="error">
          {errors.email?.type === 'pattern'
            ? errors.email.message
            : errors.phoneNumber?.type === 'pattern'
            ? errors.phoneNumber.message
            : 'Veuillez remplir tous les champs.'}
        </Message>
      )}
    </form>
  )
}

export default PersonalInformation

PersonalInformation.getLayout = (page: ReactElement) => (
  <MobileLayout>
    <AccountLayout title="Modifier l'identité">{page}</AccountLayout>
  </MobileLayout>
)
