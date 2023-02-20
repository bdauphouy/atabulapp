import RestaurantAccountLayout from '@/components/layouts/desktop/RestaurantAccountLayout'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import Message from '@/components/shared/Message'
import api from '@/lib/api'
import toInternationalFormat from '@/lib/functions/toInternationalFormat'
import { IRestaurantSettingsForm } from '@/lib/interfaces'
import { requireAuth } from '@/lib/middlewares/requireAuth'
import Image from 'next/image'
import { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export const getServerSideProps = requireAuth(async ({ req }) => {
  const { token } = req.cookies
  const restaurantId = api.getRestaurantId(token)

  const { error, restaurant } = await api.getRestaurantById(restaurantId)
  const { pictures } = await api.getRestaurantPictures(restaurantId)

  if (error) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      restaurant,
      pictures,
    },
  }
})

const RestaurantInformation = ({ restaurant, pictures }) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IRestaurantSettingsForm>({
    defaultValues: {
      name: restaurant.name,
      address: restaurant.address,
      zipCode: restaurant.zipCode,
      city: restaurant.city,
      typeOfCuisine: restaurant.types
        .map((type: { name: string }) => type.name)
        .join(', '),
      honors: restaurant.distinctions
        .map((distinction: { name: string }) => distinction.name)
        .join(', '),
      chefFullName: restaurant.headChefFullName,
      pastryChefFullName: restaurant.pastryChefFullName,
      sommelierFullName: restaurant.sommelierFullName,
      roomManagerFullName: restaurant.restaurantManagerFullName,
      phoneNumber: restaurant.phone,
    },
  })

  const onSubmit: SubmitHandler<IRestaurantSettingsForm> = async data => {
    const { error } = await api.updateRestaurant(restaurant.id, {
      id: restaurant.id,
      name: data.name,
      address: data.address,
      zipCode: data.zipCode,
      city: data.city,
      coordinates: restaurant.coordinates,
      phone: toInternationalFormat(data.phoneNumber),
      email: restaurant.email,
      password: restaurant.password,
      headChefFullName: data.chefFullName,
      pastryChefFullName: data.pastryChefFullName,
      sommelierFullName: data.sommelierFullName,
      restaurantManagerFullName: data.roomManagerFullName,
      isEmailConfirmed: restaurant.isEmailConfirmed,
    })

    if (error) {
      return toast.error(error)
    }

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
          <h2 className="mt-8 text-2xl text-black">{restaurant.name}</h2>
          {restaurant.isEmailConfirmed && (
            <h4>Restaurant certifié Atabulapp</h4>
          )}
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
          }}
          name="typeOfCuisine"
          options={['test', 'test2']}
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
            required: false,
          }}
          name="chefFullName"
        />
        <Input
          placeholder="Chef(fe) patissier(e)"
          control={control}
          setValue={setValue}
          rules={{
            required: false,
          }}
          name="pastryChefFullName"
        />
        <Input
          placeholder="Somelier(e)"
          control={control}
          setValue={setValue}
          rules={{
            required: false,
          }}
          name="sommelierFullName"
        />
        <Input
          placeholder="Directeur(trice) de salle"
          control={control}
          setValue={setValue}
          rules={{
            required: false,
          }}
          name="roomManagerFullName"
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
      </form>
    </>
  )
}

export default RestaurantInformation

RestaurantInformation.getLayout = (page: ReactElement) => (
  <RestaurantAccountLayout>{page}</RestaurantAccountLayout>
)
