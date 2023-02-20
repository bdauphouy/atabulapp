import FormFooter from '@/components/shared/FormFooter'
import Modal from '@/components/shared/Modal'
import Radio from '@/components/shared/Radio'
import { AddLastMinuteOfferFormContext } from '@/contexts/forms/AddLastMinuteOfferFormContext'
import { IAddLastMinuteOfferThirdForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const AddLastMinuteOfferThirdModal = ({
  isOpen,
  onClose,
  changeModal,
}: ModalProps) => {
  const { setData, ...previousData } = useContext(AddLastMinuteOfferFormContext)

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<IAddLastMinuteOfferThirdForm>({
    defaultValues: {
      discount: previousData.discount?.split('.')[0] || previousData.discount,
    },
  })

  const [otherDiscountValue, setOtherDiscountValue] = useState(
    previousData.discount &&
      previousData.discount.split('.')[0] === 'other' &&
      parseInt(previousData.discount.split('.')[1]),
  )

  const onSubmit: SubmitHandler<IAddLastMinuteOfferThirdForm> = ({
    discount,
  }) => {
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

    changeModal('AddLastMinuteOfferFourthModal')
  }

  return (
    <Modal
      title="Offres last minute"
      formId="add-offer-third-form"
      footerLeftButton={{
        text: 'Retour',
        customAction: () => onClose(),
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
          defaultEditableValue={
            otherDiscountValue === NaN ? 0 : otherDiscountValue
          }
          onInput={value => setOtherDiscountValue(parseInt(value))}
          onFocus={() => setValue('discount', 'other')}
        />
        <FormFooter
          formId="add-offer-third-form"
          footerLeftButton={{
            text: 'Retour',
            action: 'go-back',
          }}
          footerRightButton={{
            text: 'Continuer',
          }}
        />
      </form>
    </Modal>
  )
}

export default AddLastMinuteOfferThirdModal
