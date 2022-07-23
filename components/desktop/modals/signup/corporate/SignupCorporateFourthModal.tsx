import HonorsBottomSheet from '@/components/mobile/additional-information/HonorsBottomSheet'
import TypeOfCuisineBottomSheet from '@/components/mobile/additional-information/TypeOfCuisineBottomSheet'
import Input from '@/components/shared/Input'
import Message from '@/components/shared/Message'
import Modal from '@/components/shared/Modal'
import { ICorporateFourForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const SignupCorporateFourthModal = ({
  isOpen,
  onClose,
  changeModal,
}: ModalProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ICorporateFourForm>()

  const watchTypesOfCuisine = watch(['typesOfCuisine'])
  const watchHonors = watch(['honors'])

  const [isTypeOfCuisineSheetOpen, setIsTypeOfCuisineSheetOpen] =
    useState(false)

  const [typesOfCuisineCheckedCount, setTypesOfCuisineCheckedCount] =
    useState(0)

  const [isHonorsSheetOpen, setIsHonorsSheetOpen] = useState(false)

  useEffect(() => {
    if (!watchTypesOfCuisine[0]) return

    const filteredFields = watchTypesOfCuisine[0].filter(
      field => typeof field === 'string',
    )

    setTypesOfCuisineCheckedCount(filteredFields.length)

    const formatedFields = filteredFields.slice(0, 2).join(', ')

    setValue(
      'typesOfCuisineString',
      filteredFields.length > 2
        ? formatedFields + ` +${filteredFields.length - 2}`
        : formatedFields,
    )
  }, [watchTypesOfCuisine, setValue])

  useEffect(() => {
    if (!watchHonors[0]) return

    const filteredFields = watchHonors[0].filter(
      field => typeof field === 'string',
    )

    const formatedFields = filteredFields.slice(0, 2).join(', ')

    setValue(
      'honorsString',
      filteredFields.length > 2
        ? formatedFields + ` +${filteredFields.length - 2}`
        : formatedFields,
    )
  }, [watchHonors, setValue])

  const router = useRouter()

  const onSubmit: SubmitHandler<ICorporateFourForm> = data => {
    console.log(data)

    changeModal('SignupCorporateFifthModal')
  }

  return (
    <Modal
      title="Informations supplémentaires"
      formId="additional-information-signup-form"
      footerLeftButton={{
        text: 'Retour',
        customAction: () => changeModal('SignupCorporateThirdModal'),
      }}
      footerRightButton={{
        text: 'Continuer',
      }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        id="additional-information-signup-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <header className="flex flex-col gap-1">
          <div className="mb-2 flex flex-col gap-1">
            <p className="text-sm text-gray">
              Les informations pourront être complétées ultérieurement et seront
              utilisées pour la fiche de l'établissement.
            </p>
            <p className="text-sm text-scarlet">* Champs obligatoires</p>
          </div>
        </header>
        <div onClick={() => setIsTypeOfCuisineSheetOpen(true)}>
          <Input
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
            placeholder="Distinctions"
            control={control}
            setValue={setValue}
            rules={{
              required: true,
            }}
            name="honorsString"
            isRequired
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
        {Object.keys(errors).length > 0 && (
          <Message type="error">Veuillez renseigner les champs requis.</Message>
        )}
      </form>
    </Modal>
  )
}

export default SignupCorporateFourthModal
