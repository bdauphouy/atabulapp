import Calendar from '@/components/account/Calendar'
import FormFooter from '@/components/shared/FormFooter'
import Modal from '@/components/shared/Modal'
import { AddLastMinuteOfferFormContext } from '@/contexts/forms/AddLastMinuteOfferFormContext'
import { ModalProps } from '@/lib/types'
import { startOfToday } from 'date-fns'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useState } from 'react'

const AddLastMinuteOfferFirstModal = ({
  isOpen,
  onClose,
  changeModal,
}: ModalProps) => {
  const { setData, ...previousData } = useContext(AddLastMinuteOfferFormContext)

  const [selectedDay, setSelectedDay] = useState(
    previousData.offerDay ?? startOfToday(),
  )

  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    setData({ ...previousData, offerDay: selectedDay })

    changeModal(
      previousData.hasReachedConfirmation
        ? 'AddLastMinuteOfferFourthModal'
        : 'AddLastMinuteOfferSecondModal',
    )
  }

  return (
    <Modal
      title="Offres last minute"
      formId="add-offer-first-form"
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
      <form id="add-offer-first-form" onSubmit={handleSubmit}>
        <h3 className="mb-10 text-lg font-bold text-black">Jour de l'offre</h3>
        <Calendar
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          offers={[
            {
              startDate: '2022-11-07',
            },
          ]}
        />
        <FormFooter
          formId="add-offer-first-form"
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

export default AddLastMinuteOfferFirstModal
