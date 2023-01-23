import ImportImageArea from '@/components/shared/ImportImageArea'
import Message from '@/components/shared/Message'
import Modal from '@/components/shared/Modal'
import { SignupRestaurantFormContext } from '@/contexts/forms/SignupRestaurantFormContext'
import api from '@/lib/api'
import toInternationalFormat from '@/lib/functions/toInternationalFormat'
import { IRestaurantFiveForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import { useRouter } from 'next/router'
import { useContext, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RiAddLine } from 'react-icons/ri'

const SignupRestaurantFifthModal = ({
  isOpen,
  onClose,
  changeModal,
}: ModalProps) => {
  const { setData, ...previousData } = useContext(SignupRestaurantFormContext)
  const [numberOfAdditionalPictures, setNumberOfAdditionalPictures] =
    useState(0)

  const {
    handleSubmit,
    control,
    setError,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IRestaurantFiveForm>({
    defaultValues: {
      additionalPictures: previousData.additionalPictures,
      coverPicture: previousData.coverPicture,
    },
  })

  const router = useRouter()

  const additionalPictures = watch(['additionalPictures'])

  const picturesGridRef = useRef<HTMLDivElement>()

  const handleAddPictureClick = () => {
    setValue('additionalPictures', [...additionalPictures[0], undefined])
    setTimeout(() => {
      picturesGridRef.current.children[
        picturesGridRef.current.children.length - 2
      ]
        .querySelector('input')
        .click()
    })
  }

  const onSubmit: SubmitHandler<IRestaurantFiveForm> = async data => {
    setData({ ...previousData, ...data })

    const response = await api.signupRestaurant({
      name: previousData.name,
      address: previousData.address,
      zipCode: previousData.zipCode,
      city: previousData.city,
      phone: toInternationalFormat(previousData.phoneNumber),
      email: previousData.email,
      password: previousData.password,
      coordinates: '+90.0, -127.554334', // wip
      preferredContact: {
        fullName: previousData.privilegedFullName,
        phone: toInternationalFormat(previousData.privilegedPhoneNumber),
        email: previousData.privilegedEmail,
      },
      types: [1], // wip
      distinctions: [1], // wip
      headChefFullName: previousData.chefFullName,
      pastryChefFullName: previousData.pastryChefFullName,
      sommelierFullName: previousData.sommelierFullName,
      restaurantManagerFullName: previousData.roomManagerFullName,
    })

    if (response.error) {
      setError('coverPicture', {
        type: 'server',
        message: response.error,
      })
    } else {
      for (const picture of data.additionalPictures.filter(Boolean)) {
        await api.addRestaurantPicture(response.user.id, picture)
      }

      setData(null)
      changeModal('SignupRestaurantSixthModal')
    }
  }

  return (
    <Modal
      title="Photos"
      formId="pictures-signup-form"
      footerLeftButton={{
        text: 'Retour',
        customAction: () => changeModal('SignupRestaurantFourthModal'),
      }}
      footerRightButton={{
        text: 'Continuer',
      }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        id="pictures-signup-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <p className="text-sm text-gray">
          Les photos sont obligatoires pour inscrire votre établissement. Vous
          pourrez en ajouter plus tard sur la gestion de votre profil.
        </p>
        <div>
          <h3 className="mb-3 text-sm text-black">Photo de couverture</h3>
          <ImportImageArea
            title="Photo de couverture"
            name="coverPicture"
            control={control}
            variant="full"
          />
        </div>
        <header className="flex flex-col gap-2">
          <h3 className="text-sm text-black">Photos supplémentaires</h3>
          <h4 className="text-sm text-gray">
            Il vous faut importer au minimum 4 photos supplémentaires pour
            valider votre profil.
          </h4>
        </header>
        <div className="grid grid-cols-2 gap-4" ref={picturesGridRef}>
          {additionalPictures[0].map((_, i) => {
            return (
              <ImportImageArea
                key={i}
                title={`Photo supplémentaire ${i + 1}`}
                variant="full"
                control={control}
                name={`additionalPictures.${i}`}
              />
            )
          })}
          <div className="relative" onClick={handleAddPictureClick}>
            <div className="relative flex h-40 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-scarlet">
              <RiAddLine
                className="rounded-full border-2 border-solid border-scarlet text-scarlet"
                size={36}
              />
            </div>
          </div>
        </div>
        {Object.keys(errors).length > 0 && (
          <Message type="error">
            {errors.coverPicture?.type === 'server'
              ? errors.coverPicture?.message
              : 'Veuillez remplir tous les champs'}
          </Message>
        )}
      </form>
    </Modal>
  )
}

export default SignupRestaurantFifthModal
