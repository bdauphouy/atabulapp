import Offer from '@/components/account/Offer'
import RestaurantAccountLayout from '@/components/layouts/desktop/RestaurantAccountLayout'
import FilterTag from '@/components/shared/FilterTag'
import useModal from '@/lib/hooks/useModal'
import { ReactElement, useMemo, useState } from 'react'
import { RiAddCircleLine } from 'react-icons/ri'

const RegularOffers = () => {
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

  const [isAddRegularOfferModalOpen, setIsAddRegularOfferModalOpen] =
    useState(false)
  const [selectedDay, setSelectedDay] = useState(days[0])

  const handleAddRegularOfferClick = () => {
    setIsAddRegularOfferModalOpen(true)
  }

  const { Modal, changeModal } = useModal('AddRegularOfferFirstModal')

  return (
    <div>
      <Modal
        isOpen={isAddRegularOfferModalOpen}
        onClose={() => setIsAddRegularOfferModalOpen(false)}
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
      <Offer promotion={30} concernedMeal="dinner" />
      <Offer promotion={30} concernedMeal="dinner" />
      <Offer promotion={30} concernedMeal="dinner" />
      <Offer promotion={30} concernedMeal="dinner" />
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
