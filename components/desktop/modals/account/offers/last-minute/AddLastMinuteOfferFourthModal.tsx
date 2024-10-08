import Button from '@/components/shared/Button'
import FormFooter from '@/components/shared/FormFooter'
import Modal from '@/components/shared/Modal'
import { AddLastMinuteOfferFormContext } from '@/contexts/forms/AddLastMinuteOfferFormContext'
import api from '@/lib/api'
import { ModalProps } from '@/lib/types'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import Cookies from 'js-cookie'
import { useContext, useEffect, useMemo } from 'react'
import toast from 'react-hot-toast'

const AddLastMinuteOfferFourthModal = ({
  isOpen,
  onClose,
  changeModal,
}: ModalProps) => {
  const { setData, ...previousData } = useContext(AddLastMinuteOfferFormContext)

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

  const onSubmit = async () => {
    const response = await api.addOffer(
      api.getRestaurantId(Cookies.get('token')),
      {
        date: previousData.offerDay,
        meal: previousData.concernedMeal,
        discount: previousData.discount.includes('other')
          ? parseInt(previousData.discount.split('.')[1])
          : parseInt(previousData.discount),
        unit: 'percent',
        type: 'lastMinute',
        maxRecipients: Math.max(
          ...previousData.numberOfBeneficiaries
            .filter(Boolean)
            .map(i => parseInt(i)),
        ),
        offer:
          previousData.withDrink === 'withDrink' ? 'foodWithDrink' : 'onlyFood',
      },
    )

    if (response.success) {
      toast.success('Offre ajoutée avec succès !')
      onClose()
    } else {
      toast.error('Un problème est survenu, veuillez réessayer.')
    }
  }

  return (
    <Modal
      title="Offres last minute"
      footerLeftButton={{
        text: 'Retour',
        customAction: () => changeModal('AddLastMinuteOfferThirdModal'),
      }}
      footerRightButton={{ text: 'Valider', customAction: onSubmit }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <h3 className="mb-4 text-lg font-bold">Confirmation de l'offre</h3>
      <ul className="flex flex-col gap-4">
        <li className="flex justify-between border-b-[1px] border-solid border-alto/30 pb-4">
          <span className="capitalize">
            {previousData.offerDay &&
              format(previousData.offerDay, 'EEEE d MMMM yyyy', {
                locale: fr,
              })}
          </span>
          <Button
            variant="tertiary"
            onClick={() => changeModal('AddLastMinuteOfferFirstModal')}
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
            onClick={() => changeModal('AddLastMinuteOfferSecondModal')}
          >
            Modifier
          </Button>
        </li>
        <li className="flex justify-between border-b-[1px] border-solid border-alto/30 pb-4">
          <span>
            Réduction sur l'addition{' '}
            {previousData.withDrink === 'withDrink' ? 'avec' : 'hors'} boissons
          </span>
          <Button
            variant="tertiary"
            onClick={() => changeModal('AddLastMinuteOfferSecondModal')}
          >
            Modifier
          </Button>
        </li>
        <li className="flex justify-between border-b-[1px] border-solid border-alto/30 pb-4">
          <span>
            {previousData.discount?.split('.')[1] || previousData.discount || 0}
            %
          </span>
          <Button
            variant="tertiary"
            onClick={() => changeModal('AddLastMinuteOfferThirdModal')}
          >
            Modifier
          </Button>
        </li>
        <li className="flex justify-between border-b-[1px] border-solid border-alto/30 pb-4">
          <span>{formattedNumberOfBeneficiaries}</span>
          <Button
            variant="tertiary"
            onClick={() => changeModal('AddLastMinuteOfferSecondModal')}
          >
            Modifier
          </Button>
        </li>
      </ul>
      <FormFooter
        footerLeftButton={{
          text: 'Retour',
          action: 'go-back',
        }}
        footerRightButton={{
          text: "Confirmer l'offre",
          customAction: onSubmit,
        }}
      />
    </Modal>
  )
}

export default AddLastMinuteOfferFourthModal
