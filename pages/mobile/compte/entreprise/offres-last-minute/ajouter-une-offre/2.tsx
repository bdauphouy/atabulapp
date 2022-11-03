import AccountLayout from '@/components/layouts/mobile/AccountLayout'
import Checkbox from '@/components/shared/Checkbox'
import FormFooter from '@/components/shared/FormFooter'
import Radio from '@/components/shared/Radio'
import { AddLastMinuteOfferFormContext } from '@/contexts/forms/AddLastMinuteOfferFormContext'
import { IAddLastMinuteOfferSecondForm } from '@/lib/interfaces'
import { useRouter } from 'next/router'
import { ReactElement, useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const AddOfferSecondStep = () => {
  const { setData, ...previousData } = useContext(AddLastMinuteOfferFormContext)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddLastMinuteOfferSecondForm>({
    defaultValues: {
      concernedMeal: previousData.concernedMeal,
      numberOfBeneficiaries: previousData.numberOfBeneficiaries,
      withDrinks: previousData.withDrinks,
    },
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<IAddLastMinuteOfferSecondForm> = data => {
    setData({ ...previousData, ...data })

    router.push(
      `/mobile/compte/entreprise/offres-last-minute/ajouter-une-offre/${
        previousData.hasReachedConfirmation ? 4 : 3
      }`,
    )
  }

  return (
    <form
      id="add-offer-second-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-4">
        <h3 className="mb-4 text-lg font-bold">Repas concerné</h3>
        <Radio
          control={control}
          rules={{
            required: 'Veuillez cocher une des cases.',
          }}
          value="lunch"
          name="concernedMeal"
          label="Déjeuner"
          withUnderline
        />
        <Radio
          control={control}
          value="dinner"
          name="concernedMeal"
          label="Dîner"
        />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="my-4 text-lg font-bold">Menu de l'offre</h3>
        <Radio
          control={control}
          rules={{
            required: 'Veuillez cocher une des cases.',
          }}
          value="withDrinks"
          name="withDrinks"
          label="Réduction sur l'addition avec boissons"
          withUnderline
        />
        <Radio
          control={control}
          value="withoutDrinks"
          name="withDrinks"
          label="Réduction sur l'addition hors boissons"
        />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="mt-4 pb-4 text-lg font-bold">Nombre de bénéficiaires</h3>
        {[...Array(5)].map((_, i) => {
          return (
            <Checkbox
              key={i + 1}
              control={control}
              value={(i + 1).toString()}
              name={`numberOfBeneficiaries.${i}`}
              label={`${i + 1} personne${i + 1 > 1 ? 's' : ''}`}
              withUnderline={i !== 4}
            />
          )
        })}
      </div>
      <FormFooter
        formId="add-offer-second-form"
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

export default AddOfferSecondStep

AddOfferSecondStep.getLayout = (page: ReactElement) => {
  return <AccountLayout title="Last minute">{page}</AccountLayout>
}
