import AccountLayout from '@/components/layouts/mobile/AccountLayout'
import FormFooter from '@/components/shared/FormFooter'
import Radio from '@/components/shared/Radio'
import { AddRegularOfferFormContext } from '@/contexts/forms/AddRegularOfferFormContext'
import { IAddRegularOfferThirdForm } from '@/lib/interfaces'
import { useRouter } from 'next/router'
import { ReactElement, useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const AddOfferThirdStep = () => {
  const { setData, ...previousData } = useContext(AddRegularOfferFormContext)

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IAddRegularOfferThirdForm>({
    defaultValues: {
      discount: previousData.discount?.split('.')[0] || previousData.discount,
    },
  })

  const [otherDiscountValue, setOtherDiscountValue] = useState(
    previousData.discount &&
      previousData.discount.split('.')[0] === 'other' &&
      parseInt(previousData.discount.split('.')[1]),
  )

  const router = useRouter()

  const onSubmit: SubmitHandler<IAddRegularOfferThirdForm> = ({ discount }) => {
    setData({
      ...previousData,
      discount: discount === 'other' ? `other.${otherDiscountValue}` : discount,
    })

    router.push(
      '/mobile/compte/entreprise/offres-regulieres/ajouter-une-offre/4',
    )
  }

  return (
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
        defaultEditableValue={otherDiscountValue}
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
  )
}

export default AddOfferThirdStep

AddOfferThirdStep.getLayout = (page: ReactElement) => {
  return <AccountLayout title="Offres régulières">{page}</AccountLayout>
}
