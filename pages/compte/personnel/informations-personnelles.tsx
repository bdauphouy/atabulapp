import PersonalAccountLayout from '@/components/layouts/desktop/PersonalAccountLayout'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
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

  const user = await api.me(token)

  if (!user) {
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
              /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            message: 'Veuillez renseigner une adresse email valide.',
          },
        }}
        name="email"
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
