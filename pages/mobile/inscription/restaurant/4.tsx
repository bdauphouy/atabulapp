import LoginSignupLayout from '@/components/layouts/mobile/LoginSignupLayout'
import HonorsBottomSheet from '@/components/mobile/additional-information/HonorsBottomSheet'
import TypeOfCuisineBottomSheet from '@/components/mobile/additional-information/TypeOfCuisineBottomSheet'
import Input from '@/components/shared/Input'
import Message from '@/components/shared/Message'
import { SignupRestaurantFormContext } from '@/contexts/forms/SignupRestaurantFormContext'
import { IRestaurantFourForm } from '@/lib/interfaces'
import { useRouter } from 'next/router'
import { ReactElement, useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const RestaurantFour = () => {
  const { setData, ...previousData } = useContext(SignupRestaurantFormContext)

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<IRestaurantFourForm>({
    defaultValues: {
      typesOfCuisineString: previousData.typesOfCuisineString,
      typesOfCuisine: previousData.typesOfCuisine,
      honorsString: previousData.honorsString,
      honors: previousData.honors,
      chefFullName: previousData.chefFullName,
      pastryChefFullName: previousData.pastryChefFullName,
      sommelierFullName: previousData.sommelierFullName,
      roomManagerFullName: previousData.roomManagerFullName,
    },
  })

  const watchTypesOfCuisine = watch(['typesOfCuisine'])
  const watchHonors = watch(['honors'])

  const [isTypeOfCuisineSheetOpen, setIsTypeOfCuisineSheetOpen] =
    useState(false)
  const [typesOfCuisineCheckedCount, setTypesOfCuisineCheckedCount] =
    useState(0)
  const [isHonorsSheetOpen, setIsHonorsSheetOpen] = useState(false)

  const router = useRouter()

  const onSubmit: SubmitHandler<IRestaurantFourForm> = data => {
    setData({ ...previousData, ...data })

    router.push('/mobile/inscription/restaurant/5')
  }

  return (
    <form
      id="additional-information-signup-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      {Object.keys(errors).length > 0 && (
        <Message type="error">Veuillez renseigner les champs requis.</Message>
      )}
      <header className="flex flex-col gap-1">
        <div className="mb-2 flex flex-col gap-1">
          <h2 className="text-2xl font-extrabold text-black">
            Informations supplémentaires
          </h2>
          <p className="text-sm text-gray">
            Les informations pourront être complétées ultérieurement et seront
            utilisées pour la fiche de l'établissement.
          </p>
          <p className="text-sm text-scarlet">* Champs obligatoires</p>
        </div>
      </header>
      <div onClick={() => setIsTypeOfCuisineSheetOpen(true)}>
        <Input
          key={getValues().typesOfCuisineString}
          placeholder="Types de cuisine"
          control={control}
          setValue={setValue}
          rules={{
            required: true,
          }}
          name="typesOfCuisineString"
          isRequired
          isDisabled
          isFocusedLike={isTypeOfCuisineSheetOpen}
        />
      </div>
      <TypeOfCuisineBottomSheet
        control={control}
        isOpen={isTypeOfCuisineSheetOpen}
        setIsOpen={setIsTypeOfCuisineSheetOpen}
        isDisabled={typesOfCuisineCheckedCount >= 3}
      />
      <div onClick={() => setIsHonorsSheetOpen(true)}>
        <Input
          key={getValues().honorsString}
          placeholder="Distinctions"
          control={control}
          setValue={setValue}
          rules={{
            required: false,
          }}
          name="honorsString"
          isDisabled
          isFocusedLike={isHonorsSheetOpen}
        />
      </div>
      <HonorsBottomSheet
        control={control}
        isOpen={isHonorsSheetOpen}
        setIsOpen={setIsHonorsSheetOpen}
      />
      <Input
        placeholder="Prénom et nom de chef de cuisine"
        control={control}
        setValue={setValue}
        rules={{
          required: false,
        }}
        name="chefFullName"
      />
      <Input
        placeholder="Prénom et nom patisser(ère)"
        control={control}
        setValue={setValue}
        rules={{
          required: false,
        }}
        name="pastryChefFullName"
      />
      <Input
        placeholder="Prénom et nom sommelier(ère)"
        control={control}
        setValue={setValue}
        rules={{
          required: false,
        }}
        name="sommelierFullName"
      />
      <Input
        placeholder="Prénom et nom directeur(rice) de salle"
        control={control}
        setValue={setValue}
        rules={{
          required: false,
        }}
        name="roomManagerFullName"
      />
    </form>
  )
}

RestaurantFour.getLayout = (page: ReactElement) => (
  <LoginSignupLayout
    formId="additional-information-signup-form"
    footerLeftButton={{
      text: 'Retour',
      action: 'go-back',
    }}
    footerRightButton={{
      text: 'Continuer',
    }}
    progress={4 * (100 / 6)}
  >
    {page}
  </LoginSignupLayout>
)

export default RestaurantFour
