import AccountLayout from '@/components/layouts/mobile/AccountLayout'
import Button from '@/components/shared/Button'
import FormFooter from '@/components/shared/FormFooter'
import { AddLastMinuteOfferFormContext } from '@/contexts/forms/AddLastMinuteOfferFormContext'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useRouter } from 'next/router'
import { ReactElement, useContext, useEffect, useMemo } from 'react'
import toast from 'react-hot-toast'

const AddOfferFourthStep = () => {
  const { setData, ...previousData } = useContext(AddLastMinuteOfferFormContext)

  const router = useRouter()

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
    // Add last minute offer
    toast.success('Offre ajoutée avec succès !')
  }

  return (
    <>
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
            onClick={() =>
              router.push(
                '/mobile/compte/restaurant/offres-last-minute/ajouter-une-offre/1',
              )
            }
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
            onClick={() =>
              router.push(
                '/mobile/compte/restaurant/offres-last-minute/ajouter-une-offre/2',
              )
            }
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
            onClick={() =>
              router.push(
                '/mobile/compte/restaurant/offres-last-minute/ajouter-une-offre/2',
              )
            }
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
            onClick={() =>
              router.push(
                '/mobile/compte/restaurant/offres-last-minute/ajouter-une-offre/3',
              )
            }
          >
            Modifier
          </Button>
        </li>
        <li className="flex justify-between border-b-[1px] border-solid border-alto/30 pb-4">
          <span>{formattedNumberOfBeneficiaries}</span>
          <Button
            variant="tertiary"
            onClick={() =>
              router.push(
                '/mobile/compte/restaurant/offres-last-minute/ajouter-une-offre/2',
              )
            }
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
    </>
  )
}

export default AddOfferFourthStep

AddOfferFourthStep.getLayout = (page: ReactElement) => {
  return <AccountLayout title="Last minute">{page}</AccountLayout>
}
