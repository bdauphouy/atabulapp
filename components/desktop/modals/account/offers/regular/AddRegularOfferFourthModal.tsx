import Button from '@/components/shared/Button'
import Modal from '@/components/shared/Modal'
import { AddRegularOfferFormContext } from '@/contexts/forms/AddRegularOfferFormContext'
import { ModalProps } from '@/lib/types'
import { useRouter } from 'next/router'
import { useContext, useEffect, useMemo } from 'react'

const AddRegularOfferFourthModal = ({
  isOpen,
  onClose,
  changeModal,
}: ModalProps) => {
  const { setData, removeData, ...previousData } = useContext(
    AddRegularOfferFormContext,
  )

  const router = useRouter()

  const formattedOfferDays = useMemo(() => {
    const filteredOfferDays = previousData.offerDays.filter(Boolean)

    return filteredOfferDays
      .map((day, i) => (i > 0 ? day.toString().toLowerCase() : day))
      .join(', ')
  }, [previousData.offerDays])

  const formattedNumberOfBeneficiaries = useMemo(() => {
    const filterdNumberOfBeneficiaries =
      previousData.numberOfBeneficiaries.filter(Boolean)

    return (
      filterdNumberOfBeneficiaries
        .map(
          (number, i) =>
            number +
            (i === filterdNumberOfBeneficiaries.length - 2 ? ' ou ' : ', '),
        )
        .join('')
        .slice(0, -2) +
      ` personne${
        filterdNumberOfBeneficiaries.length === 1 &&
        filterdNumberOfBeneficiaries[0] === '1'
          ? ''
          : 's'
      }`
    )
  }, [previousData.numberOfBeneficiaries])

  useEffect(() => {
    setData({
      ...previousData,
      hasReachedConfirmation: true,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = () => {
    // Add regular offer
    removeData()
  }

  return (
    <Modal
      title="Offres régulières"
      footerLeftButton={{
        text: 'Retour',
        customAction: () => changeModal('AddRegularOfferThirdModal'),
      }}
      footerRightButton={{ text: 'Valider', customAction: onSubmit }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <h3 className="mb-4 text-lg font-bold">Confirmation de l'offre</h3>
      <ul className="flex flex-col gap-4">
        <li className="flex justify-between border-b-[1px] border-solid border-alto/30 pb-4">
          <span>{formattedOfferDays}</span>
          <Button
            variant="tertiary"
            onClick={() => changeModal('AddRegularOfferFirstModal')}
          >
            Modifier
          </Button>
        </li>
        <li className="flex justify-between border-b-[1px] border-solid border-alto/30 pb-4">
          <span>
            {previousData.concernedMeal === 'lunch' ? 'Déjeuner' : 'Dîner'}
          </span>
          <Button
            variant="tertiary"
            onClick={() => changeModal('AddRegularOfferSecondModal')}
          >
            Modifier
          </Button>
        </li>
        <li className="flex justify-between border-b-[1px] border-solid border-alto/30 pb-4">
          <span>
            Réduction sur l'addition{' '}
            {previousData.withDrinks === 'withDrinks' ? 'avec' : 'hors'}{' '}
            boissons
          </span>
          <Button
            variant="tertiary"
            onClick={() => changeModal('AddRegularOfferSecondModal')}
          >
            Modifier
          </Button>
        </li>
        <li className="flex justify-between border-b-[1px] border-solid border-alto/30 pb-4">
          <span>
            {previousData.discount?.split('.')[1] || previousData.discount}%
          </span>
          <Button
            variant="tertiary"
            onClick={() => changeModal('AddRegularOfferThirdModal')}
          >
            Modifier
          </Button>
        </li>
        <li className="flex justify-between border-b-[1px] border-solid border-alto/30 pb-4">
          <span>{formattedNumberOfBeneficiaries}</span>
          <Button
            variant="tertiary"
            onClick={() => changeModal('AddRegularOfferSecondModal')}
          >
            Modifier
          </Button>
        </li>
      </ul>
    </Modal>
  )
}

export default AddRegularOfferFourthModal
