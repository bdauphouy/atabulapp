import LoginSignupLayout from '@/components/layouts/mobile/LoginSignupLayout'
import Input from '@/components/shared/Input'
import Message from '@/components/shared/Message'
import { SignupRestaurantFormContext } from '@/contexts/forms/SignupRestaurantFormContext'
import { IRestaurantTwoForm } from '@/lib/interfaces'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const RestaurantTwo = () => {
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

  const router = useRouter()

  const onSubmit: SubmitHandler<IRestaurantTwoForm> = data => {
    setData({ ...previousData, ...data })

    router.push('/mobile/inscription/restaurant/3')
  }

  return (
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
      <h2 className="mb-2 text-2xl font-extrabold text-black">
        Inscription établissement
      </h2>
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
  )
}

RestaurantTwo.getLayout = (page: ReactElement) => (
  <LoginSignupLayout
    formId="establishment-signup-form"
    footerLeftButton={{
      text: 'Retour',
      action: 'go-back',
    }}
    footerRightButton={{
      text: 'Accepter et continuer',
    }}
    progress={2 * (100 / 6)}
  >
    {page}
  </LoginSignupLayout>
)

export default RestaurantTwo
