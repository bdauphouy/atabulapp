import Modal from '@/components/shared/Modal'
import Radio from '@/components/shared/Radio'
import { AddRegularOfferFormContext } from '@/contexts/forms/AddRegularOfferFormContext'
import { IAddRegularOfferThirdForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const AddRegularOfferThirdModal = ({
  isOpen,
  onClose,
  changeModal,
}: ModalProps) => {
  const { setData, ...previousData } = useContext(AddRegularOfferFormContext)

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<IAddRegularOfferThirdForm>({
    defaultValues: {
      discount: previousData.discount?.split('.')[0] || previousData.discount,
    },
  })

  const [otherDiscountValue, setOtherDiscountValue] = useState(
    previousData.discount &&
      previousData.discount.split('.')[0] === 'other' &&
      parseInt(previousData.discount.split('.')[1]),
  )

  const onSubmit: SubmitHandler<IAddRegularOfferThirdForm> = ({ discount }) => {
    if (
      discount === 'other' &&
      (!otherDiscountValue || otherDiscountValue === NaN)
    ) {
      setError('discount', {
        type: 'manual',
        message: 'Veuillez renseigner une valeur',
      })
      return
    }

    setData({
      ...previousData,
      discount: discount === 'other' ? `other.${otherDiscountValue}` : discount,
    })

    changeModal('AddRegularOfferFourthModal')
  }

  return (
    <Modal
      title="Offres régulières"
      formId="add-offer-third-form"
      footerLeftButton={{
        text: 'Retour',
        customAction: () => changeModal('AddRegularOfferSecondModal'),
      }}
      footerRightButton={{
        text: previousData.hasReachedConfirmation
          ? 'Confirmer les modifications'
          : 'Continuer',
      }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        id="add-offer-third-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <h3 className="pb-4 text-lg font-bold">Réduction de l'offre</h3>
        {[...Array(7)].map((_, i) => {
          return (
            <Radio
              key={i}
              label={`${i * 5}%`}
              control={control}
              name="discount"
              value={(i * 5).toString()}
              withUnderline
            />
          )
        })}
        <Radio
          label="Autre"
          control={control}
          name="discount"
          value="other"
          isEditable
          defaultEditableValue={otherDiscountValue}
          onInput={value => setOtherDiscountValue(parseInt(value))}
          onFocus={() => setValue('discount', 'other')}
        />
      </form>
    </Modal>
  )
}

export default AddRegularOfferThirdModal
