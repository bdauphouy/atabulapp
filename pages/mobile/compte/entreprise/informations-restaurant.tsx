import AccountLayout from '@/components/layouts/mobile/AccountLayout'
import MobileLayout from '@/components/layouts/mobile/MobileLayout'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import { ICorporateSettingsForm } from '@/lib/interfaces'
import { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const RestaurantInformation = () => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ICorporateSettingsForm>({
    defaultValues: {
      name: 'test',
    },
  })

  const onSubmit: SubmitHandler<ICorporateSettingsForm> = data => {
    console.log(data)
    toast.success('Les modifications ont bien été prises en compte.')
  }

  return (
    <>
      <form
        id="corporate-settings-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 pb-32"
      >
        <header className="flex justify-end">
          <Button variant="tertiary" isSubmit>
            Enregistrer
          </Button>
        </header>
        <h3 className="text-lg font-bold text-black">Informations générales</h3>
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
          placeholder="Adresse"
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
          }}
          name="zipCode"
        />
        <Input
          placeholder="Ville ou commune"
          control={control}
          setValue={setValue}
          rules={{
            required: true,
          }}
          name="city"
        />
        <Input
          placeholder="Type de cuisine"
          control={control}
          setValue={setValue}
          rules={{
            required: true,
            pattern: {
              value: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
              message: 'Veuillez renseigner un numéro de téléphone valide.',
            },
          }}
          name="typeOfCuisine"
          options={['test', 'test2']}
        />
        <Input
          placeholder="Distinctions"
          control={control}
          setValue={setValue}
          rules={{
            required: true,
          }}
          name="honors"
          options={['test', 'test2']}
        />
        <h3 className="mt-2 text-lg font-bold text-black">Équipe</h3>
        <Input
          placeholder="Chef(fe) cuisinier(e)"
          control={control}
          setValue={setValue}
          rules={{
            required: true,
          }}
          name="chefFullName"
        />
        <Input
          placeholder="Chef(fe) patissier(e)"
          control={control}
          setValue={setValue}
          rules={{
            required: true,
          }}
          name="pastryChefFullName"
        />
        <Input
          placeholder="Somelier(e)"
          control={control}
          setValue={setValue}
          rules={{
            required: true,
          }}
          name="sommelierFullName"
        />
        <Input
          placeholder="Directeur(trice) de salle"
          control={control}
          setValue={setValue}
          rules={{
            required: true,
          }}
          name="roomManagerFullName"
        />
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
    </>
  )
}

export default RestaurantInformation

RestaurantInformation.getLayout = (page: ReactElement) => {
  return (
    <MobileLayout>
      <AccountLayout title="Restaurant">{page}</AccountLayout>
    </MobileLayout>
  )
}
