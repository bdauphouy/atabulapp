import Calendar from '@/components/account/Calendar'
import AccountLayout from '@/components/layouts/mobile/AccountLayout'
import FormFooter from '@/components/shared/FormFooter'
import { AddLastMinuteOfferFormContext } from '@/contexts/forms/AddLastMinuteOfferFormContext'
import { startOfToday } from 'date-fns'
import { useRouter } from 'next/router'
import { FormEvent, ReactElement, useContext, useState } from 'react'

export const getServerSideProps = () => {
  return {
    props: {
      offers: [],
    },
  }
}

const AddOfferFirstStep = ({ offers }) => {
  const { setData, ...previousData } = useContext(AddLastMinuteOfferFormContext)

  const [selectedDay, setSelectedDay] = useState(
    previousData.offerDay ?? startOfToday(),
  )

  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    setData({ ...previousData, offerDay: selectedDay })

    router.push(
      `/mobile/compte/restaurant/offres-last-minute/ajouter-une-offre/${
        previousData.hasReachedConfirmation ? 4 : 2
      }`,
    )
  }

  return (
    <form id="add-offer-first-form" onSubmit={handleSubmit}>
      <h3 className="mb-10 text-lg font-bold text-black">Jour de l'offre</h3>
      <Calendar
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        offers={offers}
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
  )
}

export default AddOfferFirstStep

AddOfferFirstStep.getLayout = (page: ReactElement) => {
  return <AccountLayout title="Last minute">{page}</AccountLayout>
}
