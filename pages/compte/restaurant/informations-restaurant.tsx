import RestaurantAccountLayout from '@/components/layouts/desktop/RestaurantAccountLayout'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import { IRestaurantSettingsForm } from '@/lib/interfaces'
import Image from 'next/image'
import { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const RestaurantInformation = () => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IRestaurantSettingsForm>({
    defaultValues: {
      name: 'test',
    },
  })

  const onSubmit: SubmitHandler<IRestaurantSettingsForm> = data => {
    console.log(data)
    toast.success('Les modifications ont bien été prises en compte.')
  }

  return (
    <>
      <form
        id="restaurant-settings-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <header className="mb-4 flex flex-col">
          <div className="relative h-44 overflow-hidden rounded-lg">
            <Image
              src="/images/restaurant-card-thumbnail.png"
              alt="Bannière du restaurant"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h2 className="mt-8 text-2xl text-black">
            La Meurice - Alain Ducasse
          </h2>
          <h4>Restaurant certifié Atabulapp</h4>
          <Button variant="tertiary" className="mt-8 self-end" isSubmit>
            Enregistrer les modifications
          </Button>
        </header>
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

RestaurantInformation.getLayout = (page: ReactElement) => (
  <RestaurantAccountLayout>{page}</RestaurantAccountLayout>
)
