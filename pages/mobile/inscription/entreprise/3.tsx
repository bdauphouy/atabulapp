import LoginSignupLayout from '@/components/layouts/LoginSignupLayout'
import Input from '@/components/shared/Input'
import Message from '@/components/shared/Message'
import { useRouter } from 'next/router'
import React, { ReactElement, useState, useContext, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import TypeOfCuisineBottomPopup from '@/components/mobile/additional-information/TypeOfCuisineBottomPopup'

import { TypesOfCuisineContext } from '@/contexts/TypesOfCuisineContext'
import { useDidMount, useDidUpdate } from 'rooks'

interface ICorporateThreeForm {
  typesOfCuisineString: string
  typesOfCuisine: boolean[]
  honors: string[]
  chefFullName: string
  pastryChefFullName: string
  sommelierFullName: string
  roomManagerFullName: string
}

const CorporateOne = () => {
  const typesOfCuisine = useContext(TypesOfCuisineContext)

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ICorporateThreeForm>({
    defaultValues: {
      typesOfCuisine: new Array(typesOfCuisine.length).fill(false),
    },
  })

  const watchTypesOfCuisine = watch(['typesOfCuisine'])

  const [isTypeOfCookingPopupOpen, setIsTypeOfCookingPopupOpen] =
    useState(false)

  const [isHonorsPopupOpen, setIsHonorsPopupOpen] = useState(false)

  const router = useRouter()

  const onSubmit: SubmitHandler<ICorporateThreeForm> = data => {
    console.log(data)
  }

  useDidUpdate(() => {
    const filteredFields = watchTypesOfCuisine[0].filter(
      field => typeof field === 'string',
    )

    const formatedFields = filteredFields.slice(0, 2).join(', ')

    setValue(
      'typesOfCuisineString',
      filteredFields.length > 2
        ? formatedFields + ` +${filteredFields.length - 2}`
        : formatedFields,
    )
  }, [watchTypesOfCuisine])

  useDidUpdate(() => {
    const handleClick = (e: MouseEvent) => {
      console.log(e.target)
    }

    document.addEventListener('click', handleClick)
  })

  return (
    <form
      id="additional-information-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
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
      <div onClick={() => setIsTypeOfCookingPopupOpen(true)}>
        <Input
          placeholder="Types de cuisine"
          control={control}
          setValue={setValue}
          rules={{
            required: false,
          }}
          name="typesOfCuisineString"
          isMandatory
          isDisabled
          isFocusedLike={isTypeOfCookingPopupOpen}
        />
      </div>
      <TypeOfCuisineBottomPopup
        control={control}
        isOpen={isTypeOfCookingPopupOpen}
      />
      <Input
        placeholder="Distinctions"
        control={control}
        setValue={setValue}
        rules={{
          required: false,
        }}
        name="honors"
        isMandatory
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
      {Object.keys(errors).length > 0 && <Message type="error">error</Message>}
    </form>
  )
}

CorporateOne.getLayout = (page: ReactElement) => (
  <LoginSignupLayout
    formId="additional-information-form"
    footerLeftButton={{
      text: 'Retour',
      action: 'go-back',
    }}
    footerRightButton={{
      text: 'Continuer',
    }}
  >
    {page}
  </LoginSignupLayout>
)

export default CorporateOne
