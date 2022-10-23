import Checkbox from '@/components/shared/Checkbox'
import Modal from '@/components/shared/Modal'
import Radio from '@/components/shared/Radio'
import { AddRegularOfferFormContext } from '@/contexts/forms/AddRegularOfferFormContext'
import { IAddRegularOfferSecondForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const AddRegularOfferSecondModal = ({
  isOpen,
  onClose,
  changeModal,
}: ModalProps) => {
  const data = useContext(AddRegularOfferFormContext)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddRegularOfferSecondForm>({
    defaultValues: {
      concernedMeal: data.concernedMeal,
      numberOfBeneficiaries: data.numberOfBeneficiaries,
      withDrinks: data.withDrinks,
    },
  })

  const onSubmit: SubmitHandler<IAddRegularOfferSecondForm> = ({
    concernedMeal,
    numberOfBeneficiaries,
    withDrinks,
  }) => {
    console.log(numberOfBeneficiaries)
    data.concernedMeal = concernedMeal
    data.numberOfBeneficiaries = numberOfBeneficiaries
    data.withDrinks = withDrinks

    changeModal(
      data.hasReachedConfirmation
        ? 'AddRegularOfferFourthModal'
        : 'AddRegularOfferThirdModal',
    )
  }

  return (
    <Modal
      title="Offres régulières"
      formId="add-offer-second-form"
      footerLeftButton={{
        text: 'Retour',
        customAction: () => changeModal('AddRegularOfferFirstModal'),
      }}
      footerRightButton={{
        text: data.hasReachedConfirmation
          ? 'Confirmer les modifications'
          : 'Continuer',
      }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        id="add-offer-second-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4">
          <h3 className="mb-4 text-lg font-bold">Repas concerné</h3>
          <Radio
            control={control}
            rules={{
              required: 'Veuillez cocher une des cases.',
            }}
            value="lunch"
            name="concernedMeal"
            label="Déjeuner"
            withUnderline
          />
          <Radio
            control={control}
            value="dinner"
            name="concernedMeal"
            label="Dîner"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="my-4 text-lg font-bold">Menu de l'offre</h3>
          <Radio
            control={control}
            rules={{
              required: 'Veuillez cocher une des cases.',
            }}
            value="withDrinks"
            name="withDrinks"
            label="Réduction sur l'addition avec boissons"
            withUnderline
          />
          <Radio
            control={control}
            value="withoutDrinks"
            name="withDrinks"
            label="Réduction sur l'addition hors boissons"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="mt-4 pb-4 text-lg font-bold">
            Nombre de bénéficiaires
          </h3>
          {[...Array(5)].map((_, i) => {
            return (
              <Checkbox
                key={i + 1}
                control={control}
                value={(i + 1).toString()}
                name={`numberOfBeneficiaries.${i}`}
                label={`${i + 1} personne${i + 1 > 1 ? 's' : ''}`}
                withUnderline={i !== 4}
              />
            )
          })}
        </div>
      </form>
    </Modal>
  )
}

export default AddRegularOfferSecondModal
