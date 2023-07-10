import AccountLayout from '@/components/layouts/mobile/AccountLayout'
import Button from '@/components/shared/Button'
import FormFooter from '@/components/shared/FormFooter'
import { AddRegularOfferFormContext } from '@/contexts/forms/AddRegularOfferFormContext'
import api from '@/lib/api'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { ReactElement, useContext, useEffect, useMemo } from 'react'
import toast from 'react-hot-toast'

const AddOfferFourthStep = () => {
  const { setData, ...previousData } = useContext(AddRegularOfferFormContext)

  const router = useRouter()

  const formattedOfferDays = useMemo(() => {
    const filteredOfferDays = previousData.offerDays?.filter(Boolean)

    return filteredOfferDays
      ?.map((day, i) => (i > 0 ? day.toString().toLowerCase() : day))
      .join(', ')
  }, [previousData.offerDays])

  const formattedNumberOfBeneficiaries = useMemo(() => {
    const filterdNumberOfBeneficiaries =
      previousData.numberOfBeneficiaries?.filter(Boolean) || []

    return (
      filterdNumberOfBeneficiaries
        ?.map(
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
    // Add regular offer
    const week = [
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
      'Dimanche',
    ]
    const response = await api.addOffer(
      api.getRestaurantId(Cookies.get('token')),
      {
        date: new Date(
          `1970-01-0${
            week.indexOf(previousData.offerDays.filter(Boolean)[0]) + 1
          }T00:00:00.000Z`,
        ),
        meal: previousData.concernedMeal,
        discount: previousData.discount.includes('other')
          ? parseInt(previousData.discount.split('.')[1])
          : parseInt(previousData.discount),
        unit: 'percent',
        type: 'regular',
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
      router.push('/mobile/compte/restaurant/offres-regulieres')
      setData({})
    } else {
      toast.error('Un problème est survenu, veuillez réessayer.')
    }
  }

  return (
    <>
      <h3 className="mb-4 text-lg font-bold">Confirmation de l'offre</h3>
      <ul className="flex flex-col gap-4">
        <li className="flex justify-between border-b-[1px] border-solid border-alto/30 pb-4">
          <span>{formattedOfferDays}</span>
          <Button
            variant="tertiary"
            onClick={() =>
              router.push(
                '/mobile/compte/restaurant/offres-regulieres/ajouter-une-offre/1',
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
                '/mobile/compte/restaurant/offres-regulieres/ajouter-une-offre/2',
              )
            }
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
            onClick={() =>
              router.push(
                '/mobile/compte/restaurant/offres-regulieres/ajouter-une-offre/2',
              )
            }
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
            onClick={() =>
              router.push(
                '/mobile/compte/restaurant/offres-regulieres/ajouter-une-offre/3',
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
                '/mobile/compte/restaurant/offres-regulieres/ajouter-une-offre/2',
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
  return <AccountLayout title="Offres régulières">{page}</AccountLayout>
}
