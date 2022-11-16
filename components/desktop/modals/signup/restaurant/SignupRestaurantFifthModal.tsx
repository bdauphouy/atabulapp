import ImportImageArea from '@/components/shared/ImportImageArea'
import Message from '@/components/shared/Message'
import Modal from '@/components/shared/Modal'
import { SignupRestaurantFormContext } from '@/contexts/forms/SignupRestaurantFormContext'
import api from '@/lib/api'
import toInternationalFormat from '@/lib/functions/toInternationalFormat'
import { IRestaurantFiveForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const SignupRestaurantFifthModal = ({
  isOpen,
  onClose,
  changeModal,
}: ModalProps) => {
  const { setData, ...previousData } = useContext(SignupRestaurantFormContext)

  const {
    handleSubmit,
    control,
    setError,
    watch,
    formState: { errors },
  } = useForm<IRestaurantFiveForm>({
    defaultValues: {
      additionalPictures: previousData.additionalPictures,
      coverPicture: previousData.coverPicture,
    },
  })

  const router = useRouter()

  const additionalPictures = watch(['additionalPictures'])

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
      changeModal('SignupRestaurantFourthModal')
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
        <div>
          <h3 className="text-sm text-black">Photos supplémentaires</h3>
          <p className="mt-2 mb-3 text-sm text-gray">
            Il vous faut importer au minimum 4 photos supplémentaires pour
            valider votre profil.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <ImportImageArea
              title="Photo supplémentaire 1"
              name="additionalPictures.0"
              control={control}
              variant="normal"
            />
            <ImportImageArea
              title="Photo supplémentaire 2"
              name="additionalPictures.1"
              control={control}
              variant="normal"
            />
            <ImportImageArea
              title="Photo supplémentaire 3"
              name="additionalPictures.2"
              control={control}
              variant="normal"
            />
            <ImportImageArea
              title="Photo supplémentaire 4"
              name="additionalPictures.3"
              control={control}
              variant="normal"
            />
            <ImportImageArea
              title="Photo supplémentaire 5"
              name="additionalPictures.4"
              control={control}
              variant="dashed"
            />
            {[
              ...Array(
                Math.max(0, additionalPictures[0].filter(Boolean).length - 4),
              ),
            ].map((_, i) => (
              <ImportImageArea
                key={i}
                title={`Photo supplémentaire ${i + 6}`}
                name={`additionalPictures.${i + 6}`}
                control={control}
                variant="dashed"
              />
            ))}
            {/* <label
              htmlFor="test"
              className="flex h-28 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-scarlet"
            >
              <RiAddLine
                className="rounded-full border-2 border-solid border-scarlet text-scarlet"
                size={36}
              />
            </label>
            <input hidden type="file" id="test" /> */}
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
