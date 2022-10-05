import PersonalAccountLayout from '@/components/layouts/desktop/PersonalAccountLayout'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import { UserContext } from '@/contexts/UserContext'
import { IPersonalSettingsForm } from '@/lib/interfaces'
import { ReactElement, useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const PersonalInformation = () => {
  const { user } = useContext(UserContext)

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IPersonalSettingsForm>({
    defaultValues: {
      lastName: user?.lastName || '...',
      firstName: user?.firstName || '...',
      location: user?.location || '...',
      email: user?.email || '...',
      phoneNumber: user?.phoneNumber || '...',
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
        placeholder="Localisation"
        control={control}
        setValue={setValue}
        rules={{
          required: true,
        }}
        name="location"
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
      />
      <Input
        placeholder="Téléphone"
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
      <div>
        <header>
          <h3 className="text-lg font-bold text-black">Identité vérifiée</h3>
          <h4 className="text-sm text-gray">Valable jusqu'au 21/02/2022</h4>
        </header>
      </div>
      {/* {Object.keys(errors).length > 0 && (
          <Message type="error">
            {errors.email?.type === 'pattern'
              ? errors.email.message
              : errors.password?.type === 'minLength'
              ? errors.password.message
              : 'Veuillez remplir tous les champs.'}
          </Message>
        )} */}
    </form>
  )
}

export default PersonalInformation

PersonalInformation.getLayout = (page: ReactElement) => (
  <PersonalAccountLayout>{page}</PersonalAccountLayout>
)
