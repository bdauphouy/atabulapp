import Offer from '@/components/account/Offer'
import RestaurantAccountLayout from '@/components/layouts/desktop/RestaurantAccountLayout'
import FilterTag from '@/components/shared/FilterTag'
import api from '@/lib/api'
import useModal from '@/lib/hooks/useModal'
import { requireAuth } from '@/lib/middlewares/requireAuth'
import { Offer as OfferType } from '@/lib/types'
import { ReactElement, useMemo, useState } from 'react'
import { RiAddCircleLine } from 'react-icons/ri'

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
            discount.type === 'regular',
        )
        .reverse(),
      restaurantId: restaurant.id,
    },
  }
})

const days = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
  'Dimanche',
]

const RegularOffers = ({ offers: o, restaurantId }) => {
  const [offers, setOffers] = useState(o)

  const [isAddRegularOfferModalOpen, setIsAddRegularOfferModalOpen] =
    useState(false)
  const [selectedDay, setSelectedDay] = useState(days[0])

  const handleAddRegularOfferClick = () => {
    setIsAddRegularOfferModalOpen(true)
  }

  const { Modal, changeModal } = useModal('AddRegularOfferFirstModal')

  const handleModalClose = async () => {
    setIsAddRegularOfferModalOpen(false)
    const { restaurant } = await api.getRestaurantById(restaurantId)

    if (restaurant) {
      setOffers(
        restaurant.discounts
          .filter(
            (discount: { type: 'regular' | 'lastMinute' }) =>
              discount.type === 'regular',
          )
          .reverse(),
      )
    }
  }

  const filteredOffers = useMemo(
    () =>
      offers.filter(
        (offer: OfferType) =>
          days[new Date(offer.date).getDate() - 1] === selectedDay,
      ),
    [selectedDay, offers],
  )

  const handleOfferDelete = async (restaurantId: number, id: number) => {
    const { error } = await api.deleteOffer(restaurantId, id)

    if (error) {
      return
    }

    setOffers(offers.filter((offer: OfferType) => offer.id !== id))
  }

  return (
    <div>
      <Modal
        isOpen={isAddRegularOfferModalOpen}
        onClose={handleModalClose}
        changeModal={changeModal}
      />
      <div className="flex flex-wrap gap-2">
        {days.map((day, i) => (
          <FilterTag
            key={i}
            isSelected={selectedDay === day}
            onChange={() => setSelectedDay(day)}
            size="md"
            name={`offer-day-${day}s`}
            type="radio"
          >
            {day}
          </FilterTag>
        ))}
      </div>
      <h3 className="mt-8 mb-2 text-lg font-bold text-black">
        Les offres régulières
      </h3>
      {filteredOffers.length === 0 ? (
        <p className="text-lg text-black">
          Vous n'avez pas d'offre le {selectedDay.toLowerCase()}.
        </p>
      ) : (
        filteredOffers.map((offer: OfferType, i: number) => {
          return (
            <Offer
              key={i}
              promotion={offer.discount}
              concernedMeal={offer.meal}
              withDrink={offer.offer === 'foodWithDrink'}
              onDelete={() => handleOfferDelete(offer.restaurantId, offer.id)}
            />
          )
        })
      )}
      <button
        onClick={handleAddRegularOfferClick}
        className="mt-10 flex items-center gap-2 text-lg text-scarlet"
      >
        <RiAddCircleLine size={26} />
        Ajouter une offre
      </button>
    </div>
  )
}

export default RegularOffers

RegularOffers.getLayout = (page: ReactElement) => (
  <RestaurantAccountLayout>{page}</RestaurantAccountLayout>
)
