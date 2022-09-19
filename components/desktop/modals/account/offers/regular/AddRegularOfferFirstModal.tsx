import Checkbox from '@/components/shared/Checkbox'
import Modal from '@/components/shared/Modal'
import { IAddRegularOfferFirstForm } from '@/lib/interfaces'
import { ModalProps } from '@/lib/types'
import { useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const AddRegularOfferFirstModal = ({
  isOpen,
  onClose,
  changeModal,
}: ModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddRegularOfferFirstForm>()

  const days = useMemo(
    () => [
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
      'Dimanche',
    ],
    [],
  )

  const onSubmit: SubmitHandler<IAddRegularOfferFirstForm> = data => {
    console.log(data)
    changeModal('AddRegularOfferSecondModal')
  }

  return (
    <Modal
      title="Offres régulières"
      formId="add-offer-first-form"
      footerLeftButton={{
        text: 'Retour',
        customAction: () => onClose(),
      }}
      footerRightButton={{ text: 'Continuer' }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        id="add-offer-first-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <h3 className="mb-4 text-lg font-bold">Jour de l'offre</h3>
        {days.map((day, i) => {
          return (
            <Checkbox
              key={i}
              label={day}
              control={control}
              name={`offerDays.${i}`}
              value={day}
              withUnderline={i !== days.length - 1}
            />
          )
        })}
      </form>
    </Modal>
  )
}

export default AddRegularOfferFirstModal
