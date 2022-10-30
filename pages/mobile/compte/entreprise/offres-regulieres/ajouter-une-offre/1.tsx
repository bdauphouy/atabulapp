import AccountLayout from '@/components/layouts/mobile/AccountLayout'
import Checkbox from '@/components/shared/Checkbox'
import FormFooter from '@/components/shared/FormFooter'
import { AddRegularOfferFormContext } from '@/contexts/forms/AddRegularOfferFormContext'
import { IAddRegularOfferFirstForm } from '@/lib/interfaces'
import { useRouter } from 'next/router'
import { ReactElement, useContext, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const AddOfferFirstStep = () => {
  const { setData, ...previousData } = useContext(AddRegularOfferFormContext)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddRegularOfferFirstForm>({
    defaultValues: {
      offerDays: previousData.offerDays,
    },
  })

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

  const router = useRouter()

  const onSubmit: SubmitHandler<IAddRegularOfferFirstForm> = ({
    offerDays,
  }) => {
    setData({
      ...previousData,
      offerDays,
    })

    router.push(
      `/mobile/compte/entreprise/offres-regulieres/ajouter-une-offre/${
        previousData.hasReachedConfirmation ? 4 : 2
      }`,
    )
  }

  return (
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
  )
}

export default AddOfferFirstStep

AddOfferFirstStep.getLayout = (page: ReactElement) => {
  return <AccountLayout title="Offres régulières">{page}</AccountLayout>
}
