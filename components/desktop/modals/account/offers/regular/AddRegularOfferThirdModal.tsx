import Modal from '@/components/shared/Modal'
import Radio from '@/components/shared/Radio'
import { IAddRegularOfferThirdForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const AddRegularOfferThirdModal = ({
  isOpen,
  onClose,
  changeModal,
}: ModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IAddRegularOfferThirdForm>()

  const onSubmit: SubmitHandler<IAddRegularOfferThirdForm> = data => {
    changeModal('AddRegularOfferFourthModal')
    console.log(data, discountValue)
  }

  const [discountValue, setDiscountValue] = useState<number>()

  return (
    <Modal
      title="Offres régulières"
      formId="add-offer-third-form"
      footerLeftButton={{
        text: 'Retour',
        customAction: () => changeModal('AddRegularOfferSecondModal'),
      }}
      footerRightButton={{ text: 'Continuer' }}
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
          onInput={value => setDiscountValue(value)}
          onFocus={() => setValue('discount', 'other')}
        />
      </form>
    </Modal>
  )
}

export default AddRegularOfferThirdModal
