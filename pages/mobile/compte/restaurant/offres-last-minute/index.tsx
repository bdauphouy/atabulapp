import Offer from '@/components/account/Offer'
import AccountLayout from '@/components/layouts/mobile/AccountLayout'
import { AddLastMinuteOfferFormContext } from '@/contexts/forms/AddLastMinuteOfferFormContext'
import api from '@/lib/api'
import { requireAuth } from '@/lib/middlewares/requireAuth'
import { Offer as OfferType } from '@/lib/types'
import { add, format, isSameDay, startOfToday } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useRouter } from 'next/router'
import { ReactElement, useContext, useMemo, useState } from 'react'
import {
  RiAddCircleLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from 'react-icons/ri'

export const getServerSideProps = requireAuth(async ({ req }) => {
  const { token } = req.cookies
  const restaurantId = api.getRestaurantId(token)

  const { error, restaurant } = await api.getRestaurantById(restaurantId)

  if (error) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      offers: restaurant.discounts
        .filter(
          (discount: { type: 'regular' | 'lastMinute' }) =>
            discount.type === 'lastMinute',
        )
        .reverse(),
      restaurantId: restaurant.id,
    },
  }
})

const LastMinuteOffers = ({ offers: o, restaurantId }) => {
  const [offers, setOffers] = useState(o)

  const router = useRouter()

  const { setData, ...previousData } = useContext(AddLastMinuteOfferFormContext)

  const [selectedDay, setSelectedDay] = useState(
    previousData.offerDay ?? startOfToday(),
  )

  const filteredOffers = useMemo(
    () =>
      offers.filter((offer: OfferType) =>
        isSameDay(new Date(offer.date), selectedDay),
      ),
    [selectedDay, offers],
  )

  const handleAddLastMinuteOfferClick = () => {
    router.push(
      '/mobile/compte/restaurant/offres-last-minute/ajouter-une-offre/1',
    )
  }

  const handleOfferDelete = async (restaurantId: number, id: number) => {
    const { error } = await api.deleteOffer(restaurantId, id)

    if (error) {
      return
    }

    setOffers(offers.filter((offer: OfferType) => offer.id !== id))
  }

  const handleAddDayClick = () => {
    setSelectedDay(add(selectedDay, { days: 1 }))
  }

  const handleRemoveDayClick = () => {
    setSelectedDay(add(selectedDay, { days: -1 }))
  }

  return (
    <div>
      <header className="flex items-center justify-between gap-6">
        <h3 className="text-lg font-bold capitalize text-black">
          {format(selectedDay, 'EEEE d MMMM', { locale: fr })}
        </h3>
        <div className="flex items-center gap-6">
          <button
            onClick={handleRemoveDayClick}
            type="button"
            className="rounded-full border-[1px] border-solid border-scarlet p-0.5 hover:text-gray"
          >
            <RiArrowLeftSLine size={16} className="text-scarlet" />
          </button>
          <button
            onClick={handleAddDayClick}
            type="button"
            className="rounded-full border-[1px] border-solid border-scarlet p-0.5"
          >
            <RiArrowRightSLine size={16} className="text-scarlet" />
          </button>
        </div>
      </header>
      <ul>
        {filteredOffers.length === 0 ? (
          <p className="mt-2 text-lg text-black">
            Vous n'avez pas d'offre le{' '}
            {format(selectedDay, 'EEEE d MMMM', { locale: fr })}.
          </p>
        ) : (
          filteredOffers.map((offer: OfferType, i: number) => {
            return (
              <li key={offer.id}>
                <Offer
                  key={i}
                  promotion={offer.discount}
                  concernedMeal={offer.meal}
                  withDrink={offer.offer === 'foodWithDrink'}
                  onDelete={() =>
                    handleOfferDelete(offer.restaurantId, offer.id)
                  }
                />
              </li>
            )
          })
        )}
      </ul>
      <button
        onClick={handleAddLastMinuteOfferClick}
        className="mt-8 flex items-center gap-2 text-lg text-scarlet"
      >
        <RiAddCircleLine size={26} />
        Ajouter une offre
      </button>
    </div>
  )
}

export default LastMinuteOffers

LastMinuteOffers.getLayout = (page: ReactElement) => {
  return <AccountLayout title="Last minute">{page}</AccountLayout>
}
